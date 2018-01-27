ig.module(
    'game.menu.title'
)
.requires(
    'game.i18n',
    'plugins.ss.menu.menu',
    'plugins.ss.true-font'
)
.defines(function() {

    TitleMenu = ss.Menu.extend({

        startBlinkTimer: null,

        useTrueFont: true,
        trueFont: new ss.TrueFont("Cavalcade", 42, "#ccc", "/fonts/Cavalcade/Cavalcade-Regular.css"),

        useSelectedFont: true,
        selectedTrueFont: new ss.TrueFont("Cavalcade", 42, "#f4b342", "/fonts/Cavalcade/Cavalcade-Regular.css"),

        Page: {
            MAIN : 0,
            SETTINGS : 1,
            CONTROLS : 2,
            LANGUAGE : 3,
            LOAD     : 4,
            QUITSURE : 5
        },

        actions: {
            prev: [ "up", "left" ],
            next: [ "down", "right" ],
            select: [ "primary" ],
            back: [ "secondary" ]
        },

        init: function()
        {
            this.startBlinkTimer = new ig.Timer();
            this.createMenuOptions();
            this.parent();
        },

        titleFont: new ss.TrueFont("Cavalcade", 64, "#ccc", "/fonts/Cavalcade/Cavalcade-Regular.css"),
        titleText: function() { return ig.i18n().GameTitle; },

        pageBack: function()
        {
            switch (this.currentPage) {
                case this.Page.CONTROLS:
                case this.Page.LANGUAGE:
                    this.changePage( this.Page.SETTINGS );
                    break;
                case this.Page.SETTINGS:
                case this.Page.LOAD:
                case this.Page.QUITSURE:
                    this.changePage( this.Page.MAIN );
                    break;
                default:
                    break;
            }
        },

        createMenuOptions: function()
        {
            var menu = this;

            var options = [];
            for (var i = 0; i < Object.keys(menu.Page).length; i++ ) options.push([]);


            var firstYAfterTitle = this.titleFont.textSize + 40;

            //TODO

            var nextOptionSpace = function(page)
            {
                if (options[page].length < 1 ) return firstYAfterTitle;
                else if (!isNaN(options[page][options[page].length - 1].endY)) return options[page][options[page].length - 1].endY + 10;
                else return options[page][options[page].length - 1].y + options[page][options[page].length - 1].height + 10;
            };

            var backButton = new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return ig.i18n().menuback; },
                /* action */ function(){ menu.pageBack(); },
                /* x */ 8,
                /* y */ this.titleFont.textSize,
                /* alignment */ ig.Font.ALIGN.LEFT,
                /* padding */ 0 // default
            );

            options[menu.Page.MAIN].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return ig.i18n().MainMenu.Main["Play"]; },
                /* action */ function() {
                    ig.game.startNewGame();
                },
                /* x */ (ig.system.width + 10) / 2 ,
                /* y */ nextOptionSpace(menu.Page.MAIN) ,
                /* alignment */ ig.Font.ALIGN.CENTER,
                /* padding */ undefined // default
            ));

            options[menu.Page.MAIN].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return ig.i18n().MainMenu.Main["Load"]; },
                /* action */ function(){ menu.changePage(menu.Page.LOAD);  },
                /* x */ (ig.system.width + 10) / 2 ,
                /* y */ nextOptionSpace(menu.Page.MAIN) ,
                /* alignment */ ig.Font.ALIGN.CENTER,
                /* padding */ undefined // default
            ));

            options[menu.Page.MAIN].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return ig.i18n().MainMenu.Main["Options"]; },
                /* action */ function(){ menu.changePage(menu.Page.SETTINGS); },
                /* x */ (ig.system.width + 10) / 2 ,
                /* y */ nextOptionSpace(menu.Page.MAIN) ,
                /* alignment */ ig.Font.ALIGN.CENTER,
                /* padding */ undefined // default
            ));

            if ( ig.system.isChromeApp || ig.system.isPopup )
            {
                options[menu.Page.MAIN].push(new ss.MenuOption(
                    /* menu */ menu,
                    /* textGetter */ function() { return ig.i18n().MainMenu.Main["Quit"]; },
                    /* action */ function(){ menu.changePage(menu.Page.QUITSURE); },
                    /* x */ (ig.system.width + 10) / 2 ,
                    /* y */ nextOptionSpace(menu.Page.MAIN) ,
                    /* alignment */ ig.Font.ALIGN.CENTER,
                    /* padding */ undefined // default
                ));

                options[menu.Page.QUITSURE].push(new ss.MenuOption(
                    /* menu */ menu,
                    /* textGetter */ function() { return ig.i18n().MainMenu.QuitSure; },
                    /* action */ undefined,
                    /* x */ (ig.system.width + 10) / 2 ,
                    /* y */ nextOptionSpace(menu.Page.QUITSURE) ,
                    /* alignment */ ig.Font.ALIGN.CENTER,
                    /* padding */ undefined // default
                ));

                options[menu.Page.QUITSURE].push(new ss.MenuOption(
                    /* menu */ menu,
                    /* textGetter */ function() { return ig.i18n().Answer.yes; },
                    /* action */ function(){ ig.system.quit(); },
                    /* x */ (ig.system.width + 10) / 2 ,
                    /* y */ nextOptionSpace(menu.Page.QUITSURE) ,
                    /* alignment */ ig.Font.ALIGN.CENTER,
                    /* padding */ undefined // default
                ));

                options[menu.Page.QUITSURE].push(new ss.MenuOption(
                    /* menu */ menu,
                    /* textGetter */ function() { return ig.i18n().Answer.no; },
                    /* action */ function(){ menu.pageBack(); },
                    /* x */ (ig.system.width + 10) / 2 ,
                    /* y */ nextOptionSpace(menu.Page.QUITSURE) ,
                    /* alignment */ ig.Font.ALIGN.CENTER,
                    /* padding */ undefined // default
                ));
            }

            // Add back buttons last
            options[menu.Page.SETTINGS].push(backButton);
            options[menu.Page.CONTROLS].push(backButton);
            options[menu.Page.LOAD].push(backButton);


            this.options = options;
        },

        update: function()
        {
            if (this.stopListeningToInput) return;

            if (this.currentPage === this.Page.LOBBY)
            {
                var gamepadsCount = gi.gamepadsCount();
                if (gamepadsCount !== this.lastCountedGamepads) {
                    this.lastCountedGamepads = gi.gamepadsCount();
                    this.playersStatusOption.updateText();
                }

                /* Hold to start */
                if (ig.input.state("p1-pause")) {
                    if (this.holdATimer.target === 0) {
                        this.holdATimer.set(1);
                        this.holdToStartOption.updateText();
                    } else if (this.holdATimer.delta() >= 0) {
                        this.stopListeningToInput = true;
                        ig.game.startNewGame();
                    }
                }
                else {
                    this.holdATimer.set(0);
                    this.holdToStartOption.updateText();
                }
            }

            this.parent();

            // Add your own, additional update code here
        },

        draw: function()
        {
            //background
            //this.startImage.draw(0, 0);
            ig.system.context.fillStyle = 'rgb(70,70,70)';
            ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
            this.titleFont.draw(this.titleText(), ig.system.width/2, 10, ss.TrueFont.ALIGN.CENTER, 1);

            if (this.currentPage === this.Page.LOBBY)
            {

                for (var i = 1; i <= this.lastCountedGamepads; i++) {

                    this.joinImage[i].draw(
                        (ig.system.width * ((i-1)/ig.input.maxPlayers))
                            + ((ig.system.width/ig.input.maxPlayers) - this.joinImage[i].width ) / 2,
                        ig.system.height - this.joinImage[i].height - 20
                    );
                    var icon = ig.input.getGameInputIcon(i);
                    icon.draw(
                        (ig.system.width * ((i-1)/ig.input.maxPlayers))
                            + ((ig.system.width/ig.input.maxPlayers) - icon.width ) / 2,
                        ig.system.height - icon.height - 10
                    );
                }
                if ( this.lastCountedGamepads === 0 )
                {
                    this.joinImage[i].draw(
                        ((ig.system.width/ig.input.maxPlayers) - this.joinImage[i].width ) / 2,
                        ig.system.height - this.joinImage[i].height - 20
                    );

                    icon = ig.input.icons.keyboard;
                    icon.draw(
                        ((ig.system.width/ig.input.maxPlayers) - icon.width ) / 2,
                        ig.system.height - icon.height - 10
                    );
                }
            }

            this.parent(); // menu options etc
        }

    });
});
