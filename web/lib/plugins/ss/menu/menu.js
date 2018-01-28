ig.module(
    'plugins.ss.menu.menu'
)
.requires(
    'impact.system',
    'plugins.touch-button',
    'plugins.ss.menu.option',
    'plugins.ss.menu.cursor'
)
.defines(function(){
    if (typeof(ss) === "undefined") ss = {};

    ss.Menu = ig.Class.extend({
        Page: {},

        cursor: new ss.Cursor(),

        useText: true,
        useTrueFont: false,
        useSelectedFont: false,

        font: null,
        trueFont: null,
        selectedFont: null,
        selectedTrueFont: null,

        useSideCursorImage: false,
        sideCursorImage: null,

        actions: {
            prev: [ "up", "left" ],
            next: [ "down", "right" ],
            select: [ "primary", "paused" ],
            back: [ "secondary" ]
        },

        tapToContinueWait: false,
        dontRefreshGamepad: false,
        menuIndex: 0,
        currentPage: 0,
        options: [],

        changePage: function(index)
        {
            this.setupTouchControls();

            if (index < 0) index = 0;
            else if (index >= this.options.length) index = this.options.length - 1;

            this.currentPage = index;

            this.menuIndex = 0;

            while (this.menuIndex < this.options[this.currentPage].length && this.options[this.currentPage][this.menuIndex].selectable === false)
            {
                this.menuIndex += 1;
            }

            if (this.menuIndex === this.options[this.currentPage].length) this.menuIndex = 0;
        },

        // Override
        pageBack: function()
        {
            this.changePage( this.currentPage - 1 );
        },

        updateAllText: function()
        {
            for ( var i = 0; i < this.options.length; i++ )
            {
                for ( var j = 0; j < this.options[i].length; j++ )
                {
                    if (this.options[i][j] instanceof ss.MenuOption) this.options[i][j].updateText();
                }
            }
        },

        setupTouchControls: function()
        {
            if (typeof(ig.game.disableNormalTouchControls) === "function" ) ig.game.disableNormalTouchControls();

            if (this.options.length <= 0) return false;

            var menu = this;
            ig.game.touchControlsSetup = function() { menu.setupTouchControls(); };

            var touchButtons = [];

            for ( var i = 0; i < this.options[this.currentPage].length; i++ ) {
                var touchButton = this.options[this.currentPage][i].getTouchButton();
                if (touchButton instanceof ig.TouchButton) touchButtons.push(touchButton);
            }

            ig.game.touchButtons = new ig.TouchButtonCollection(touchButtons);
            ig.game.touchButtons.align();

            return true;
        },

        init: function() {
            // update things if a gamepad is added or removed
            var menu = this;
            if (typeof(ig.input.onGamepadChange) === "function")
            ig.input.onGamepadChange( function() {
                if (menu.dontRefreshGamepad !== true) {
                    menu.createMenuOptions();
                }
            });
        },

        update: function() {
            if (this.options instanceof Array === false || this.options.length === 0) return;

            for (var i = 0; i < this.actions.prev.length; i++) {
                if ( ig.input.released(this.actions.prev[i]) ) {
                    var proposedIndex = this.menuIndex;

                    proposedIndex -= 1;
                    while ( proposedIndex >= 0 && this.options[this.currentPage][proposedIndex].selectable === false ) proposedIndex -= 1;

                    if (proposedIndex >= 0) this.menuIndex = proposedIndex;
                }
            }

            for (var i = 0; i < this.actions.next.length; i++) {
                if ( ig.input.released(this.actions.next[i]) ) {
                    var proposedIndex = this.menuIndex;
                    var totalItems = this.options[this.currentPage].length;

                    proposedIndex += 1;
                    while (proposedIndex < totalItems && this.options[this.currentPage][proposedIndex].selectable === false) proposedIndex += 1;

                    if (proposedIndex < totalItems) this.menuIndex = proposedIndex;
                }
            }

            for (var i = 0; i < this.actions.back.length; i++) {
                if ( ig.input.released(this.actions.back[i]) ) {
                    this.pageBack();
                }
            }

            /* Mouse & Key / Gamepad Options */
            var mouseInfo = this.cursor.update(this.options[this.currentPage], this.menuIndex);
            if (mouseInfo.isHovering)
            {
                this.menuIndex = mouseInfo.menuIndex;
            }

            if (this.options.length > 0) for (var i = 0; i < this.options[this.currentPage].length; i++) {
                this.options[this.currentPage][i].update(this.menuIndex === i);
            }

            if ( typeof(this.options[this.currentPage]) !== "undefined")
            {
                for (var i = 0; i < this.actions.select.length; i++) {
                    if ( ig.input.released(this.actions.select[i]) ) {
                        this.options[this.currentPage][this.menuIndex].action();
                        this.cursor.setHovering(false);
                    }
                }
            }

            if ( ig.input.released('click') && mouseInfo.isHovering ) {
                this.options[this.currentPage][this.menuIndex].action();
                this.cursor.setHovering(false);
            }
        },

        draw: function() {
            if (this.options.length > 0) for (var i = 0; i < this.options[this.currentPage].length; i++)
            {
                this.options[this.currentPage][i].draw();
            }
        }

    });
});
