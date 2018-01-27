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
    'plugins.ss.menu.cursor'
)
.requires(
    'plugins.ss.menu.option'
)
.defines(function(){
    if (typeof(ss) === "undefined") ss = {};

    ss.Cursor = ig.Class.extend({
        isHovering: false,
        hasMoved: false,
        lastPosition: {
            x: -1,
            y: -1
        },
        currentPosition: {
            x: -1,
            y: -1
        },
        lastMovedTimer: null,

        init: function()
        {
            this.lastMovedTimer = new ig.Timer(2);
            this.lastMovedTimer.set(2);
            this.lastMovedTimer.reset();
        },

        update: function(items, menuIndex)
        {
            var position = {
                x: ig.input.mouse.x,
                y: ig.input.mouse.y
            };
            if (position.x != this.lastPosition.x && position.y != this.lastPosition.y )
            {
                this.currentPosition = this.lastPosition;
                this.lastPosition = position;

                this.lastMovedTimer.reset();
            }

            this.setHovering(false);
            //this.lastMovedTimer.tick();
            if (this.lastMovedTimer.delta() >= 0) {
                this.setHovering(false);
            }
            else if (!!items)
            {
                for (var i = 0; i < items.length; i++)
                {
                    var selectX = typeof(items[i].selectTarget.x) === "function" ? items[i].selectTarget.x() : items[i].selectTarget.x;
                    var selectY = typeof(items[i].selectTarget.y) === "function" ? items[i].selectTarget.y() : items[i].selectTarget.y;

                    if (   position.x > selectX // left boundry check
                        && position.x < selectX + items[i].selectTarget.width // right boundry check
                        && position.y > selectY // top boundry check
                        && position.y < selectY + items[i].selectTarget.height // bottom boundry check
                        && items[i].selectable === true
                       ) {
                        menuIndex = i;
                        this.setHovering(true);
                    }
                }
            }

            return {isHovering: this.isHovering, menuIndex: menuIndex};
        },

        setHovering: function(isHovering) {
            this.isHovering = isHovering;
            ig.system.canvas.style.cursor = this.isHovering ? "pointer" : "";
        }

    });
});
