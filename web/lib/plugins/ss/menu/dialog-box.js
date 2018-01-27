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
    'plugins.ss.menu.dialog-box'
)
.requires(
    'plugins.ss.menu.menu',
    'plugins.ss.menu.cursor',
    'plugins.ss.menu.option'
)
.defines(function(){
    if (typeof(ss) === "undefined") ss = {};

    ss.DialogBox = ss.Menu.extend({

        height: 44,
        enabled: false,
        font: new ig.Font( 'media/press-start-2p-9.font.png', { fontColor: GameboyColors.Dark} ),

        pageIndex: [],

        init: function(text)
        {
            var lines = arguments;

            if (typeof(lines[0]) !== "string") {
                throw "Must provide text, even if an empty string";
            }

            if ( this.font.widthForString(text[0]) + 4 > ig.system.canvas.width ) {
                console.warn("Your text will go off the screen:\n \"" + text[0] + "\"");
            }

            this.height = this.font.heightForString(lines[0]) + 4;

            this.createMenuOptions(lines);
            this.updateBackground();
            this.parent();
        },

        createMenuOptions: function(lines)
        {
            var menu = this;
            var options = [];

            var addPageIndex = function(index, depthMarker)
            {
                var indexName = depthMarker + index + "";
                menu.pageIndex.push(indexName);
                return indexName;
            }

            var addAnotherPage = function(lines, depthMarker = "")
            {
                if (lines instanceof Array)
                {
                    for (var i = 0; i < lines.length; i++)
                    {
                        var lowerDepthMarker = addPageIndex(i, depthMarker);
                        options.push([]);
                        addAnotherPage(lines[i], lowerDepthMarker);
                    }
                }
                else if (typeof(lines) == "object")
                {
                    var keys = Object.keys(lines);
                    for (var i = 0; i < keys.length; i++)
                    {
                        var lowerDepthMarker = addPageIndex(i, depthMarker);
                        options.push([]);
                        addAnotherPage(lines[i], lowerDepthMarker);
                    }
                }
            }
            menu.pageIndex = [];
            addAnotherPage(lines);

            var startY = ig.system.canvas.height - this.height;

            var nextOptionSpace = function(page, item)
            {
                if (item == 0) return startY + 4;

                var nextSpace = 0;
                for (var i = 0; i < options[page].length; i++) {
                    nextSpace += menu.font.widthForString(options[page][item].textGetter())
                }
                return nextSpace + 4;
            };

            options[0].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return lines[0]; },
                /* action */ undefined,
                /* x */ 4,
                /* y */ nextOptionSpace(0,0),
                /* alignment */ ig.Font.ALIGN.LEFT,
                /* padding */ 4 // default
            ));

            for (var i in lines)
            {
                if (typeof(lines[i]) === "string")
                {
                    // Text and next
                    options[i].push(new ss.MenuOption(
                        /* menu */ menu,
                        /* textGetter */ function() { return lines[i]; },
                        /* action */ undefined,
                        /* x */ 4,
                        /* y */ nextOptionSpace(0,i),
                        /* alignment */ ig.Font.ALIGN.LEFT,
                        /* padding */ 4 // default
                    ));

                    //TODO next button
                }
                else if (lines[i] instanceof Object)
                {
                    // Options
                    for (var j in lines[i])
                    {
                        var action = undefined;
                        if (typeof(lines[i][j][0]) === "string")
                        {

                        }
                        else if(typeof(lines[i][j][0]) === "function")
                        {

                        }
                        else
                        {
                            throw "needs to be an action, choice, or function";
                        }

                        options[i].push(new ss.MenuOption(
                            /* menu */ menu,
                            /* textGetter */ function() { return j; },
                            /* action */ function(){

                            },
                            /* x */ 4,
                            /* y */ nextOptionSpace(0,i),
                            /* alignment */ ig.Font.ALIGN.LEFT,
                            /* padding */ 4 // default
                        ));
                    }
                    debugger;

                }
                else if (typeof(lines[i]) === "function")
                {
                    // perform action at this point and then next
                }
                else
                {
                    throw "needs to be an action, choice, or function";
                }
            }

            this.options = options;
        },

        updateBackground: function()
        {

        },

        update: function()
        {
            this.parent();
            if (this.enabled !== true) return;

            // Add your own, additional update code here
        },

        draw: function()
        {
            if (this.enabled !== true) return;

            //TODO draw background of dialog, based on height of dialog and width of screen and/or menu options
            var textHeight = this.font.heightForString(this.options[0][0].text) + 8;

            ig.system.context.fillStyle = GameboyColors.Light;
            ig.system.context.beginPath();
            ig.system.context.rect(
                0,
                ig.system.canvas.height - textHeight,
                ig.system.canvas.width,
                textHeight
            );
            ig.system.context.closePath();
            ig.system.context.fill();

            //TODO draw the dialog
            if (this.options instanceof Array === true
             && typeof(this.options[0]) !== "undefined"
             && typeof(this.options[0][0]) !== "undefined")
                this.options[0][0].draw();
        }
    });

});
