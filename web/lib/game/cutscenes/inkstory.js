ig.module(
    'game.cutscenes.inkstory'
)
.requires(
    'impact.entity',
    //'game.cutscenes.characters',
    'plugins.ss.dialog',
    'plugins.ss.ink'
)
.defines(function(){

InkStory = ig.Class.extend({

    name: "Speech",
    ink: new ss.Ink(storyContent),
    commonAction: undefined,
    currentPortrait: undefined,

    init: function() {
        if ( ig.global.wm ) return;

        var inkstory = this;

        this.commonAction = new ss.DialogAction(function() {
            if (inkstory.ink.isEnded()) return inkstory.end();

            var moment = inkstory.getNextMoment(0);
            this.setNextMoment(moment);
        });

        this.ink.tagHandlers["portrait"] = function(key, character, position) {
            if (!position) position = "left";

            if (character == null) {
                inkstory.currentPortrait = undefined;
            } else {
                inkstory.currentPortrait = {
                    character: character,
                    position: position
                };
            }
        };
        this.ink.tagHandlers["music"] = function(key, title) {
            console.debug("🎵 " + title);
        };

        this.ink.tagLackHandlers["portrait"] = function() {
            inkstory.currentPortrait = undefined;
        };
    },

    getNextMoment: function(choiceIndex) {
        this.ink.continue(choiceIndex);
        if (typeof(this.currentPortrait) === "undefined") {
            console.log("☺️ -");
        } else {
            console.log("☺️ " + this.currentPortrait.character + " - " + this.currentPortrait.position);
        }
        var text = this.ink.getText();
        var sizedText = "";
        var needNewline = false;
        for (var i = 0; i < text.length; i++) {
            sizedText += text[i];
            if (i > 59 && i % 70 === 0) {
                needNewline = true;
            }
            if (needNewline && text[i] == " ") {
                sizedText += '\n';
                needNewline = false;
            }
        }
        var moment = new ss.DialogTextMoment(
            sizedText,
            undefined, //CutscenesCharacters.emperor.get('talk', 'right')
            this.commonAction
        );
        return moment;
    },

    end: function() {
        ig.game.loadMainMenu();
    }
});

});
