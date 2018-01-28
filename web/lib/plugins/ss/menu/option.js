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
    'plugins.ss.menu.option'
)
.requires(
    'impact.font',
    'plugins.touch-button'
)
.defines(function() {
    if (typeof(ss) === "undefined") ss = {};

    ss.MenuOption = ig.Class.extend({

        x: 0,
        y: 0,
        selectTarget: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        width: 0,
        height: 0,
        textFunction: function() { return ""; },
        text: "",
        action: function() { return console.error("This MenuOption somehow doesn't have an action associated with it."); },
        touchButton: null,
        alpha: 1,
        selected: false,
        selectable: true,
        disabled: false,
        visible: true,
        alignment: ig.Font.ALIGN.CENTER,
        menu: null,

        init: function(menu, textGetter, action, x, y, alignment, padding, visible)
        {
            if (typeof(menu) !== "object") throw "Must provide menu object";

            if (menu.useText === false) {
                //NOTHING
            } else if (menu.useTrueFont) {
                if (typeof(menu.trueFont) === "undefined" || menu.trueFont instanceof ss.TrueFont === false) throw "menu.trueFont must be a ss.TrueFont";
            } else {
                if (typeof(menu.font) === "undefined" || menu.font instanceof ig.Font === false) throw "menu.font must be a ig.Font";
            }

            if (typeof(textGetter) !== "function") throw "textGetter must be a function";

            if (typeof(action) !== "function")
            {
                action = function(){ return console.error("This MenuOption is not selectable! Something is coded wrong."); };
                this.selectable = false;
            }

            if (this.selectable === false) {
                this.alpha = 0.8;
            }

            if (isNaN(x)) throw "x must be a number";
            if (isNaN(y)) throw "y must be a number";
            if (alignment in Object.keys(ig.Font.ALIGN) === false) throw "alignment must be a value of ig.Font.ALIGN";

            if (typeof(padding) === "undefined") padding = 6;
            else if (isNaN(padding)) throw "padding must be a number if provided";

            this.menu = menu;
            this.textGetter = textGetter;
            this.action = action;
            this.x = Math.floor(x);
            this.y = Math.floor(y);
            this.alignment = alignment;
            this.padding = padding;
            this.visible = typeof(visible) === "boolean" ? visible : true;

            this.updateText();
        },

        updateText: function()
        {
            if (this.menu.useText === false) return;

            this.text = this.textGetter();
            if (typeof(this.text) !== "string") {
                console.error("Option text update failed to produce valid text.");
                return;
            }
            var newlines = (this.text.match(/\n/g) || []).length;

            if (this.menu.useTrueFont) {
                this.width = Math.ceil(this.menu.trueFont.widthForString(this.text));
                this.height = Math.ceil(this.menu.trueFont.heightForString(this.text)) + this.padding;
            } else {
                this.width = Math.ceil(this.menu.font.widthForString(this.text));
                this.height = (this.menu.font.height * (1+newlines)) + this.padding;
            }

            if (this.alignment === ig.Font.ALIGN.LEFT) {
                this.selectTarget.x = this.x - this.padding;
            } else if (this.alignment === ig.Font.ALIGN.CENTER) {
                this.selectTarget.x = this.x - Math.floor(this.width / 2) - this.padding;
            } else if (this.alignment === ig.Font.ALIGN.RIGHT) {
                this.selectTarget.x = this.x - this.width - this.padding;
            }

            this.selectTarget.y = this.y - this.padding;

            if (this.selectTarget.x < 0) this.selectTarget.x = 0;
            this.selectTarget.width = this.width + this.padding + (this.menu.useSideCursorImage ? this.menu.sideCursorImage.width : 0);
            if (this.selectTarget.width > ig.system.width) this.selectTarget.width = ig.system.width + (this.menu.useSideCursorImage ? this.menu.sideCursorImage.width : 0);

            if (this.selectTarget.y < 0) this.selectTarget.y = 0;
            this.selectTarget.height = this.height + this.padding;
            if (this.selectTarget.height > ig.system.height) this.selectTarget.height = ig.system.height;

            this.createTouchButton();

            if (this.menu.useTrueFont) {
                this.menu.trueFont.prepareImage(this.text, this.x, this.y, this.alignment, this.alpha, undefined, false);
                if (this.menu.useSelectedFont) {
                    this.menu.selectedTrueFont.prepareImage(this.text, this.x, this.y, this.alignment, this.alpha, undefined, false);
                }
            }

            return this.text;
        },

        update: function(isSelected) {
            if (this.selectable === false) return;
            this.selected = isSelected;
        },

        createTouchButton: function() {
            this.touchButton = new ig.TouchButton( this.text , { left: this.selectTarget.x, top: this.selectTarget.y }, this.selectTarget.width, this.selectTarget.height );
            return this.touchButton;
        },

        getTouchButton: function() {
            if (this.touchButton === null) { this.createTouchButton(); }
            return this.touchButton;
        },

        draw: function() {
            if (this.menu.useSideCursorImage) {
                var cursorX = this.selectTarget.x - this.menu.sideCursorImage.width;
                if (this.selected) {
                    this.menu.sideCursorImage.draw(cursorX, this.y);
                }
            }

            if (this.menu.useText === false) return;
            if (this.menu.useTrueFont) {
                if (this.menu.useSelectedFont && this.selected ) {
                    this.menu.selectedTrueFont.draw(this.text, this.x, this.y, this.alignment, this.alpha, undefined, false);
                } else {
                    this.menu.trueFont.draw(this.text, this.x, this.y, this.alignment, this.alpha, undefined, false);
                }

            } else if (this.menu.useSelectedFont && this.selected ) {
                this.menu.selectedFont.draw(this.text, this.x, this.y, this.alignment, this.alpha);
            } else {
                this.menu.font.draw(this.text, this.x, this.y, this.alignment, this.alpha);
            }
        }
    });
});
