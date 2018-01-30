/**
 * @author  Samuel J Sarette
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this module.
 *
 * Copyright (C) 2016  Samuel J Sarette
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the copyright holder shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the copyright holder.
 *
 * @licend  The above is the entire license notice for the JavaScript code in this module.
 */
ig.module(
    'plugins.ss.dialog'
)
.requires(
    'impact.system',
    'impact.game',
    'impact.timer',
    'impact.entity',
    'plugins.ss.texture-canvas',
    'plugins.ss.menu.cursor',
    'plugins.ss.true-font'
)
.defines(function() {
    "use strict";
    if (typeof(ss) === "undefined") ss = {};

    /*
        Define your first DialogMoment
        Use with your NPC to start and continue interaction with the dialog menus.
    */

    ss.GlobalDialogManager = {
        dialogIsActive: false,
        textSize: 10,
        minHeight: 20,
        textLinePadding: 2,
        textEdgePadding: 2,
        outlineThickness: 4,
        bottomMargin: 20,
        leftMargin: 100,
        rightMargin: 100,
        choiceCursorPadding: 10,
        fontName: "sans-serif bold",
        fontColor: "rgba(0,0,0,1)",
        bgColor: "rgba(190, 190, 190, 1)",
        outlineColor: "rgb(30, 30, 30)",
        upButtons: ['up'],
        downButtons: ['down'],
        leftButtons: ['left'],
        rightButtons: ['right'],
        selectButtons: ['primary'],
        cancelButtons: ['cancel'],
        cursor: new ss.Cursor(),
        inputNavDelayTimer: new ig.Timer(),
        betweenActionsTimer: new ig.Timer(),
        trueFont: undefined,
        loadFont: function(name, css) {
            this.trueFont = new ss.TrueFont(name, this.textSize, this.fontColor, css);
        }
    };

    var scaled = function(value) {
        return value * ig.system.scale;
    }

    var descaled = function(value) {
        return value / ig.system.scale;
    }

    var eachPlayer = function(action) {
        if (typeof(ig.game.player) === "object") {
            action(ig.game.player);
        } else if (typeof(ig.game.players) === "object" && ig.game.players.length > 0) {
            for (var i = 0; i < ig.game.players.length; i++) {
                action(ig.game.players[i]);
            }
        } else {
            // No players detected (yet)
        }
    }

    var anyUpPressed = function() {
        for (var i = 0; i < ss.GlobalDialogManager.upButtons.length; i++) {
            if (ig.input.pressed(ss.GlobalDialogManager.upButtons[i])) {
                return true;
            }
        }
        return false
    }
    var anyDownPressed = function() {
        for (var i = 0; i < ss.GlobalDialogManager.downButtons.length; i++) {
            if (ig.input.pressed(ss.GlobalDialogManager.downButtons[i])) {
                return true;
            }
        }
        return false
    }
    var anyLeftPressed = function() {
        for (var i = 0; i < ss.GlobalDialogManager.leftButtons.length; i++) {
            if (ig.input.pressed(ss.GlobalDialogManager.leftButtons[i])) {
                return true;
            }
        }
        return false
    }
    var anyRightPressed = function() {
        for (var i = 0; i < ss.GlobalDialogManager.rightButtons.length; i++) {
            if (ig.input.pressed(ss.GlobalDialogManager.rightButtons[i])) {
                return true;
            }
        }
        return false
    }
    var anySelectReleased = function() {
        for (var i = 0; i < ss.GlobalDialogManager.selectButtons.length; i++) {
            if (ig.input.released(ss.GlobalDialogManager.selectButtons[i])) {
                return true;
            }
        }
        return false
    }
    var anyCancelReleased = function() {
        for (var i = 0; i < ss.GlobalDialogManager.cancelButtons.length; i++) {
            if (ig.input.released(ss.GlobalDialogManager.cancelButtons[i])) {
                return true;
            }
        }
        return false
    }

    ss.DialogManagedEntity = ig.Entity.extend({
        dialogManager: undefined,

        update: function() {
            this.parent();
            if (typeof(this.dialogManager) !== "undefined") {
                this.dialogManager.update();
            }
        },
    });


    ss.DialogCharacter = ig.Class.extend({
        x:0,
        y:0,
        animation: undefined,
        init: function(x, y, animation) {
            this.x = x || 0;
            this.y = y || 0;
            this.animation = animation;
            if (animation instanceof ig.Animation == false) {
                throw "Must provide an animation!";
            }
        }
    });

    /*
        A menu representing a moment in the dialog.
        There are delayed definitions for actions.
    */
    ss.DialogMoment = ig.Class.extend({
        text: undefined,
        character: undefined,
        init: function(text, character) {
            if (typeof(text) === "function") {
                this._getText = text;
                this.refreshText();
            }
            else {
                this.text = text;
            }
            if (typeof(character) === "object") {
                this.setCharacter(character);
            }
        },
        refreshText: function()
        {
            if (typeof(this._getText) === "function")
            {
                this.text = this._getText();
            }
        },
        trigger: function(manager, action)
        {
            if (ss.GlobalDialogManager.betweenActionsTimer.delta() < 0) return;


            if (action instanceof ss.DialogAction) {
                action.trigger(manager);
            } else {
                manager.endDialog();
            }

            ss.GlobalDialogManager.betweenActionsTimer.set(0.4);
        },
        setCharacter: function(character) {
            this.character = character;
            if (character instanceof ss.DialogCharacter === false) {
                throw "Character must be of type ss.DialogCharacter!";
            }
        }
    });


    /*
        Function to run and next moment.
    */
    ss.DialogAction = ig.Class.extend({
        handler: undefined,
        nextMoment: undefined,
        init: function(handler, moment)
        {
            this.handler = handler;
            this.nextMoment = moment;
        },

        setHandler: function(handler) { this.handler = handler; },
        setNextMoment: function(moment) { this.nextMoment = moment; },
        trigger:  function(manager) {
            var choice = manager.selectedChoiceIndex;
            manager.changeActiveMoment(null);
            if (typeof(this.handler) === "function") {
                 this.handler(choice);
            }
            if (this.nextMoment instanceof ss.DialogMoment === false) {
                manager.endDialog();
            } else {
                manager.changeActiveMoment(this.nextMoment);
            }
        }
    });


    /*
        Creates a menu with text and a next button.
        Next button is a delayed defined function.
        You may delayed define a “nextMoment”
    */
    ss.DialogTextMoment = ss.DialogMoment.extend({
        action: undefined,
        nextMoment: undefined,

        init: function(text, character, action) {
            this.parent(text, character);
            this.action = action;
        },

        setAction: function(action) { this.action = action; },

        trigger: function(manager)
        {
            this.parent(manager, this.action);
        }
    });


    /*
        Creates a menu with a few choices, no next button.
        All choices have a delayed defined:
        •Function
        •“nextMoment”
    */
    ss.DialogChoiceMoment = ss.DialogMoment.extend({

        choices: [],
        _getChoices: {},
        actions: [],

        init: function(text, character, choices, actions)
        {
            this.parent(text, character);
            this.actions = actions;
            this.setChoices(choices);
        },

        setChoices: function(choices)
        {
            this.choices = choices;

            for (var i = 0; i < choices.length; i++) {
                if (typeof(choices[i]) === "function") {
                    this._getChoices[i] = choices[i];
                    this.refreshChoice(i);
                }
            }
        },

        refreshChoice: function(index)
        {
            if (typeof(this._getChoices[index]) === "function")
            {
                this.choices[index] = this._getChoices[index]();
            }
        },

        setActions: function(actions) { this.actions = actions; },

        trigger: function(manager)
        {
            this.parent(manager, this.actions[manager.selectedChoiceIndex]);
        }
    });


    ss.DialogTextItem = ig.Class.extend({
        isChoice: false,
        selectable: true,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        selectTarget: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },

        init: function(text, isChoice){
            this.text = text;
            this.isChoice = isChoice;

            ss.texture2DContext.font = ss.GlobalDialogManager.textSize + "px " + ss.GlobalDialogManager.fontName;
            this.unscaledWidth = ss.texture2DContext.measureText(this.text).width + ss.GlobalDialogManager.choiceCursorPadding;

            ss.texture2DContext.font = scaled(ss.GlobalDialogManager.textSize) + "px " + ss.GlobalDialogManager.fontName;
            this.width = ss.texture2DContext.measureText(this.text).width + scaled(ss.GlobalDialogManager.choiceCursorPadding);

            this.height = scaled(ss.GlobalDialogManager.textSize + ss.GlobalDialogManager.textLinePadding) * text.split('\n').length;

            this.unscaledHeight = (ss.GlobalDialogManager.textSize + ss.GlobalDialogManager.textLinePadding) * text.split('\n').length;

            // for now, it's the same as the (unscaled) draw geometry
            this.selectTarget.width = this.unscaledWidth;
            this.selectTarget.height = this.unscaledHeight;
        },

        setPosition: function(x, y) {
            this.unscaledX = x;
            this.unscaledY = y;
            this.x = scaled(x);
            this.y = scaled(y);

            // for now, it's the same as the draw geometry
            this.selectTarget.x = this.unscaledX;
            this.selectTarget.y = this.unscaledY;
        }

    });

    ig.Game.inject({
        drawDialogManagedContent: function() {
            var dialogManagedEntities = this.getEntitiesByType(ss.DialogManagedEntity);
            for (var i = 0; i < dialogManagedEntities.length; i++) {
                if (typeof(dialogManagedEntities[i].dialogManager) !== "undefined") {
                    dialogManagedEntities[i].dialogManager.draw();
                }
            }
        }
    });

    ss.DialogManager = ig.Class.extend({
        enabled: false,

        originalMoment: undefined,
        activeMoment: undefined,

        activeGeometry: {
            height: 0,
            textBacking: (function() {
                return {
                    x: function() { return scaled(ss.GlobalDialogManager.leftMargin); }, // doesn't change
                    y: 0, // this changes with the activeMoment
                    unscaledY: 0, // this changes with the activeMoment
                    getWidth: function(){
                        return ss.texture2DCanvas.width - (this.x() + scaled(ss.GlobalDialogManager.rightMargin));
                    },
                    getHeight: function(){
                        return ss.texture2DCanvas.height - (this.y + scaled(ss.GlobalDialogManager.bottomMargin));
                    },
                    asMouseableItem: function() {
                        var backing = this;
                        return {
                            selectable: true,
                            selectTarget: {
                                x: function() { return descaled(backing.x()); },
                                y: function() { return backing.unscaledY; } ,
                                width: function(){
                                    return ss.texture2DCanvas.width - (backing.x() + ss.GlobalDialogManager.rightMargin);
                                },
                                height: function(){
                                    return ss.texture2DCanvas.height - (backing.y + ss.GlobalDialogManager.bottomMargin);
                                }
                            }
                        };
                    }
                };
            })(),
            hasChoices: false,
            items: []
        },
        selectedChoiceIndex: 0,

        blinkTimer: undefined,

        init: function( firstMoment /* ss.DialogMoment */ )
        {
            if ( ig.global.wm ) return;

            if ( typeof(firstMoment) == "undefined" ) throw "Need a first moment!";

            this.blinkTimer = new ig.Timer(1);

            this.setStartMoment(firstMoment);
        },

        setStartMoment: function(moment)
        {
            this.originalMoment = moment;
            if (typeof(this.activeMoment) === "undefined") this.changeActiveMoment(this.originalMoment);
        },

        changeActiveMoment: function(moment)
        {
            this.selectedChoiceIndex = 0;
            this.activeMoment = moment;
            this._prepActiveGeometry(moment);
            this._prepImage(moment);
        },

        _prepActiveGeometry: function(moment)
        {
            this.activeGeometry.items = [];
            if (moment instanceof ss.DialogMoment == false) return;

            moment.refreshText();
            this.activeGeometry.items.push( new ss.DialogTextItem(moment.text, false) );
            if ( moment instanceof ss.DialogChoiceMoment ) for (var i = 0; i < moment.choices.length; i++) {
                moment.refreshChoice(i);
                this.activeGeometry.items.push( new ss.DialogTextItem(moment.choices[i], true) );
            }

            this.activeGeometry.textBacking.y = ss.texture2DCanvas.height - scaled(ss.GlobalDialogManager.textEdgePadding + ss.GlobalDialogManager.bottomMargin);
            this.activeGeometry.textBacking.unscaledY = descaled(ss.texture2DCanvas.height) - (ss.GlobalDialogManager.textEdgePadding + ss.GlobalDialogManager.bottomMargin);

            for (var i = 0; i < this.activeGeometry.items.length; i++) {
                this.activeGeometry.textBacking.y -= scaled(this.activeGeometry.items[i].height + ss.GlobalDialogManager.textLinePadding);
                this.activeGeometry.textBacking.unscaledY -= this.activeGeometry.items[i].height + ss.GlobalDialogManager.textLinePadding;
            }

            var minY = descaled(ss.texture2DCanvas.height - (ss.GlobalDialogManager.minHeight + ss.GlobalDialogManager.textEdgePadding + ss.GlobalDialogManager.bottomMargin));

            if (this.activeGeometry.textBacking.unscaledY < minY) {
                this.activeGeometry.textBacking.unscaledY = descaled(ss.texture2DCanvas.height) - minY;
                this.activeGeometry.textBacking.y = ss.texture2DCanvas.height - scaled(minY);
            }

            var currentY = this.activeGeometry.textBacking.unscaledY + ss.GlobalDialogManager.textEdgePadding;
            for (var i = 0; i < this.activeGeometry.items.length; i++) {
                this.activeGeometry.items[i].setPosition(
                    ss.GlobalDialogManager.textEdgePadding + ss.GlobalDialogManager.leftMargin,
                    ss.GlobalDialogManager.textLinePadding + currentY
                );
                currentY += this.activeGeometry.items[i].unscaledHeight;
            }
        },

        _choiceCursorImage: (new Image()),
        _textCursorImage: (new Image()),

        _prepCursors : function() {

            ss.texture2DContext.clearRect(0, 0, ss.texture2DCanvas.width, ss.texture2DCanvas.height );
            ss.texture2DContext.font = scaled(ss.GlobalDialogManager.textSize) + "px sans-serif";
            ss.texture2DContext.fillStyle = ss.GlobalDialogManager.fontColor;

            ss.texture2DContext.fillText('▼', 0, 0);
            this._textCursorImage.src = ss.texture2DCanvas.toDataURL('image/png');

            ss.texture2DContext.clearRect(0, 0, ss.texture2DCanvas.width, ss.texture2DCanvas.height );
            ss.texture2DContext.fillText('▶', 0, 0 );
            this._choiceCursorImage.src = ss.texture2DCanvas.toDataURL('image/png');
        },

        _preparedImage: (new Image()),

        _prepImage: function(moment)
        {
            ss.texture2DContext.clearRect(0, 0, ss.texture2DCanvas.width, ss.texture2DCanvas.height );

            var outPX = ss.GlobalDialogManager.outlineThickness;
            ss.texture2DContext.fillStyle = ss.GlobalDialogManager.outlineColor;
            ss.texture2DContext.beginPath();
            ss.texture2DContext.rect(
                this.activeGeometry.textBacking.x() - outPX,
                this.activeGeometry.textBacking.y - outPX,
                this.activeGeometry.textBacking.getWidth() + (outPX*2),
                this.activeGeometry.textBacking.getHeight() + (outPX*2)
            );
            ss.texture2DContext.closePath();
            ss.texture2DContext.fill();

            ss.texture2DContext.fillStyle = ss.GlobalDialogManager.bgColor;
            ss.texture2DContext.beginPath();
            ss.texture2DContext.rect(
                this.activeGeometry.textBacking.x(),
                this.activeGeometry.textBacking.y,
                this.activeGeometry.textBacking.getWidth(),
                this.activeGeometry.textBacking.getHeight()
            );
            ss.texture2DContext.closePath();
            ss.texture2DContext.fill();

            ss.texture2DContext.fillStyle = ss.GlobalDialogManager.fontColor;
            ss.texture2DContext.textAlign = "start";
            ss.texture2DContext.textBaseline = "top";
            ss.texture2DContext.direction = "ltr";
            ss.texture2DContext.font = scaled(ss.GlobalDialogManager.textSize) + "px " + ss.GlobalDialogManager.fontName;

            for (var i = 0; i < this.activeGeometry.items.length; i++)
            {
                var lines = this.activeGeometry.items[i].text.split('\n');
                for (var j = 0; j < lines.length; j++) {
                    ss.texture2DContext.fillText(
                        lines[j],
                        this.activeGeometry.items[i].x
                            + scaled(this.activeGeometry.items[i].isChoice ? ss.GlobalDialogManager.choiceCursorPadding : 0),
                        this.activeGeometry.items[i].y
                            - scaled(ss.GlobalDialogManager.textLinePadding)
                            + ( j * scaled( ss.GlobalDialogManager.textSize + ss.GlobalDialogManager.textLinePadding))
                    );
                }
            }

            this._preparedImage.src = ss.texture2DCanvas.toDataURL('image/png');
        },

        update: function()
        {
            if ( ig.global.wm ) return;

            if (this.triggering === true || ss.GlobalDialogManager.dialogIsActive !== true) return;

            if ( this.activeMoment instanceof ss.DialogChoiceMoment
                && this.activeMoment.choices instanceof Array
                && this.activeMoment.choices.length > 0)
            {
                if (ss.GlobalDialogManager.inputNavDelayTimer.delta() < 0) {
                    //NOTHING!
                } else if ( anyUpPressed() || anyLeftPressed() ) {
                    var proposedIndex = this.selectedChoiceIndex -1;
                    if (proposedIndex >= 0) this.selectedChoiceIndex = proposedIndex;

                    ss.GlobalDialogManager.inputNavDelayTimer.set(0.1);
                } else  if ( anyDownPressed() || anyRightPressed()  ) {
                    var proposedIndex = this.selectedChoiceIndex +1;
                    var totalItems = this.activeMoment.choices.length;
                    if (proposedIndex < totalItems) this.selectedChoiceIndex = proposedIndex;

                    ss.GlobalDialogManager.inputNavDelayTimer.set(0.1);
                }

                var mouseInfo = ss.GlobalDialogManager.cursor.update(this.activeGeometry.items.slice(1), this.selectedChoiceIndex);
                if (mouseInfo.isHovering)
                {
                    this.selectedChoiceIndex = mouseInfo.menuIndex;
                }
            }
            else
            {
                ss.GlobalDialogManager.cursor.update([this.activeGeometry.textBacking.asMouseableItem()], 0);
            }

            if ( ( ig.input.released('click')  || anySelectReleased() ) && this.activeMoment instanceof ss.DialogMoment )
            {
                this.activeMoment.trigger(this);
            }
        },

        draw: function()
        {
            if ( ig.global.wm
                || ss.GlobalDialogManager.dialogIsActive !== true
                || this.activeMoment instanceof ss.DialogMoment == false) return;

            //Draw Prepared Text

            if (ss.mainCanvasIs2D) {
                ig.system.context.globalAlpha = 1;
                if (typeof(this.activeMoment.character) === "object") {
                    this.activeMoment.character.animation.draw(
                        this.activeMoment.character.x,
                        this.activeMoment.character.y
                    );
                }
                ig.system.context.drawImage(this._preparedImage, 0, 0);
            } else {
                // webgl rendering
                //TODO http://murfy.de/read/webgl-text-rendering
            }

            //Draw Cursor
            var cursorOpacity = Math.sin(Math.abs(this.blinkTimer.delta() % Math.PI));

            if (ss.mainCanvasIs2D)
            {
                ig.system.context.globalAlpha = cursorOpacity;
                if ( this.activeMoment instanceof ss.DialogTextMoment ) {
                    ig.system.context.drawImage(
                        this._textCursorImage,
                        ss.texture2DCanvas.width - scaled(ss.GlobalDialogManager.textSize + ss.GlobalDialogManager.textEdgePadding + ss.GlobalDialogManager.rightMargin),
                        ss.texture2DCanvas.height - scaled(ss.GlobalDialogManager.textSize + ss.GlobalDialogManager.bottomMargin)
                    );
                } else /* ss.DialogChoiceMoment */ {
                    ig.system.context.drawImage(
                        this._choiceCursorImage,
                        scaled(ss.GlobalDialogManager.textEdgePadding + ss.GlobalDialogManager.leftMargin),
                        this.activeGeometry.items[this.selectedChoiceIndex+1].y - scaled(ss.GlobalDialogManager.textSize / 2)
                    );
                }
                ig.system.context.globalAlpha = 1; //reset to 1
            }
            else
            {
                // webgl rendering
                //TODO http://murfy.de/read/webgl-text-rendering
                if ( this.activeMoment instanceof ss.DialogTextMoment ) {} else {}
            }
        },

        triggering: false,
        trigger: function()
        {
            if ( ig.global.wm ) return;

            if (this.triggering == true
                || ss.GlobalDialogManager.dialogIsActive === true
                || typeof(this.originalMoment) === "undefined" ) return;

            //console.debug("Dialog triggered.");
            this.triggering = true;

            this._prepCursors();
            this.changeActiveMoment(this.originalMoment);

            this.selectedChoiceIndex = 0;
            ss.GlobalDialogManager.dialogIsActive = true;
            eachPlayer(function(player) {
                if ( player.currentAnim == player.anims["walk"+player.currentDirection()]) {
                    player.currentAnim = player.anims["idle"+player.currentDirection()].rewind();
                }
            });

            this.triggering = false;
        },

        endDialog: function()
        {
            if ( ig.global.wm ) return;

            var manager = this;
            ss.GlobalDialogManager.cursor.setHovering(false);
            manager.triggering = true;
            setTimeout(function(){
                ss.GlobalDialogManager.dialogIsActive = false;
                manager.changeActiveMoment(manager.originalMoment);
                manager.triggering = false;
            }, 300);
        }
    });

});
