ig.module(
    'game.inkstory'
)
.requires(
    'impact.entity',
    'plugins.ss.dialog',
    'plugins.ss.ink',
    'game.menu.daily'
)
.defines(function(){

InkStory = ig.Class.extend({

    name: "Speech",
    ink: undefined,
    commonTextAction: undefined,
    commonChoiceAction: undefined,
    currentPortrait: undefined,
    portraitCache: {},
    currentBackground: undefined,
    dialogManager: undefined,
    dailymenu: undefined,
    backgroundCache: {},

    init: function() {
        if ( ig.global.wm ) return;

        this.ink = new ss.Ink(storyContent);

        var inkstory = this;

        this.commonTextAction = new ss.DialogAction(function() {
            if (inkstory.ink.isEnded()) {
                this.setNextMoment(null);
                return inkstory.end();
            }

            this.setNextMoment(inkstory.getNextMoment());
        });
        this.commonChoiceAction = new ss.DialogAction(function(choiceIndex) {
            if (inkstory.ink.isEnded()) {
                this.setNextMoment(null);
                return inkstory.end();
            }
            this.setNextMoment(inkstory.getNextMoment(choiceIndex));
        });

        this.ink.tagHandlers["portrait"] = function(key, character, position) {
            if (!position) {
                if (character.toLowerCase() == "telegraph") {
                    position = "right";
                } else {
                    position = "center";
                }
            }

            if (character == null || character == "none") {
                inkstory.currentPortrait = undefined;
            } else {
                inkstory.currentPortrait = {
                    character: character.toLowerCase(),
                    position: position.toLowerCase()
                };
            }
        };
        this.ink.tagHandlers["background"] = function(key, name) {
            inkstory.currentBackground = name == null || name == "none" ? undefined : name;
        };
        this.ink.tagHandlers["music"] = function(key, title) {
            if (title in ig.music.namedTracks) {
                console.debug("🎵 " + title);
            } else {
                console.debug("🎵 ??" + title);
                return;
            }
            if (ig.music.currentTrack !== ig.music.namedTracks[title]) ig.music.play(title);
        };

        this.ink.tagHandlers["dailymenu"] = function(key, day) {
            if (!inkstory.dailyMenuChosen("continue")) {
                inkstory.dailymenu = new DailyMenu(inkstory, inkstory.ink.getChoices(), parseInt(day.replace(/day/,'')));
            }
        };


        this.dialogManager = new ss.DialogManager(this.getNextMoment());
        this.dialogManager.trigger();
    },

    dailyMenuChosen: function(option) {
        var choices = this.ink.getChoices();
        for (var i = 0; i < choices.length; i++) {
            if (choices[i].toLowerCase().includes(option)) {
                ss.GlobalDialogManager.dialogIsActive = true;
                this.dailymenu = undefined;
                this.dialogManager = new ss.DialogManager(this.getNextMoment(i));
                return true;
            }
        }
        return false;
    },

    getNextMoment: function(choiceIndex) {
        this.ink.continue(choiceIndex);
        var text = this.ink.getText();
        var sizedText = "";
        var needNewline = false;
        for (var i = 0; i < text.length; i++) {
            sizedText += text[i];
            if (i > 61 && i % 62 === 0) {
                needNewline = true;
            }
            if (needNewline) {
                if (/[\s\.?!\-+=”"']/.test(text[i]) && !/[\s\.?!\-+=”"']/.test(text[i+1])) {
                    sizedText += '\n';
                    needNewline = false;
                } else if ( i !== text.length-1 && i > 67 && i % 68 === 0) {
                    if (/[\s\.?!\-+=”"']/.test(text[i])) {
                        sizedText += '\n';
                    } else {
                        sizedText += '-\n';
                    }
                    needNewline = false;
                }
            }
        }
        var choicesTexts = this.ink.getChoices();
        if (choicesTexts.length == 0) {
            var moment = new ss.DialogTextMoment(
                sizedText,
                undefined,
                this.commonTextAction
            );
        } else {
            var actions = [];
            for (var i = 0; i < choicesTexts.length; i++) {
                actions.push(this.commonChoiceAction);
            }
            var moment = new ss.DialogChoiceMoment(
                sizedText,
                undefined,
                choicesTexts,
                actions
            );
        }
        return moment;
    },

    end: function() {
        ig.game.fadeOutTimer = new ig.Timer(ig.game.fadeOutTime + 0.1);
        setTimeout(function() {
            ig.game.loadMainMenu();
            ig.game.fadeInTimer = new ig.Timer(ig.game.fadeInTime);
        }, ig.game.fadeOutTime * 1000);
    },

    drawBG: function() {
        if (typeof(this.currentBackground) === "undefined") {
            ig.system.context.fillStyle = '#fff';
            ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
        } else {
            if (this.currentBackground in this.backgroundCache === false) {
                this.backgroundCache[this.currentBackground] = new ig.Image('media/background/'+this.currentBackground+'.jpg');
            }
            var cached = this.backgroundCache[this.currentBackground];
            if (typeof(cached) === "undefined") {
                console.error("Missing art for background: " + this.currentBackground);
            } else {
                cached.draw(0, 0);
            }
        }
    },

    drawPortrait: function() {
        if (typeof(this.currentPortrait) === "undefined") return;

        if ( this.currentPortrait.character in this.portraitCache === false ) {
            this.portraitCache[this.currentPortrait.character] = new ig.Image('media/portrait/'+this.currentPortrait.character+'.png');;
        }
        var cached = this.portraitCache[this.currentPortrait.character];
        if (typeof(cached) === "undefined") {
            console.error("Missing art for portrait: " + this.currentPortrait.character);
        } else {
            cached.draw(this.getPortraitX(this.currentPortrait.position, cached.width), 0);
        }
    },

    getPortraitX: function(position, width) {
        switch (position) {
            case "left":
                return 20;
            case "right":
                return ig.system.width - width - 20;
            default:
                //center
                return (ig.system.width - width) / 2;
        }
    },

    update: function() {
        if (this.dailymenu) {
            this.dailymenu.update();
        } else if (this.dialogManager) {
            this.dialogManager.update();
        }
    },

    draw: function() {
        this.drawBG();
        this.drawPortrait();
        if (this.dailymenu) {
            this.dailymenu.draw();
        } else if (this.dialogManager) {
            this.dialogManager.draw();
        }
    },

    trigger: function()
    {
        if (this.dialogManager) {
            this.dialogManager.trigger();
        }
    }
});

});
