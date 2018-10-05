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
        trueFont: new ss.TrueFont("Cavalcade", 36, "#ccc", "fonts/Cavalcade/Cavalcade-Regular.css"),

        useSelectedFont: true,
        selectedTrueFont: new ss.TrueFont("Cavalcade", 36, "#fff", "fonts/Cavalcade/Cavalcade-Regular.css"),

        background: new ig.Image("media/background/desk.jpg"),

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

        titleFont: new ss.TrueFont("Cavalcade", 64, "#111", "fonts/Cavalcade/Cavalcade-Regular.css"),
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

            options[menu.Page.MAIN].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return ig.i18n().MainMenu.Main.Play; },
                /* action */ function() {
                    ig.game.startNewGame();
                },
                /* x */ 160,
                /* y */ (ig.system.height - 320),
                /* alignment */ ig.Font.ALIGN.CENTER,
                /* padding */ undefined // default
            ));

            var currentCreditsY = 280;

            for (var i = 0; i < ig.i18n().Credits.length; i++) {
                let credit = ig.i18n().Credits[i];

                var credits = new ss.MenuOption(
                    /* menu */ menu,
                    /* textGetter */ function() { return credit; },
                    /* action */ function() { },
                    /* x */ ig.system.width - 680,
                    /* y */ currentCreditsY,
                    /* alignment */ ig.Font.ALIGN.LEFT,
                    /* padding */ undefined // default
                );
                credits.selectable = false;
                options[menu.Page.MAIN].push(credits);
                currentCreditsY += this.trueFont.textSize + 4;
            }

            this.options = options; // TODO remove if you implement more screens
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
            //ig.system.context.fillStyle = '#f7efd7';
            //ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
            this.background.draw(0, 0);

            ig.system.context.fillStyle = '#af874c';
            ig.system.context.fillRect((ig.system.width/2)-290, 110, 580, 120 );
            ig.system.context.fillStyle = '#826539';
            ig.system.context.fillRect((ig.system.width/2)-280, 120, 560, 100 );
            this.titleFont.draw(this.titleText(), ig.system.width/2, 140, ss.TrueFont.ALIGN.CENTER, 1);

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
