ig.module(
    'game.main'
)
.requires(
    //'impact.debug.debug',
    'plugins.impact-splash-loader',
    'impact.game',
    'impact.font',

    'plugins.ss.true-font',
    'plugins.chrome-app',
    'plugins.localstorage',

    'game.colors',
    'game.logos',
    'game.menu.title',
    'game.levels.blank'

)
.defines(function(){

ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.M4A]

SwitchboardCopperGame = ig.Game.extend({

    musicEnabled: true,
    localStorage: new ig.localStorage(),
    menu: null,
    logos: new Logos(),

    fadeInTime: 1,
    fadeOutTime: 1,
    fadeInTimer: undefined,
    fadeOutTimer: undefined,

    music: {
        menu: new ig.Sound( 'media/music/Jahzzar - Airship Fury.*', false),
        hall1: new ig.Sound( 'media/music/Kevin MacLeod - Hall of the Mountain King - 1.*', false),
        hall2: new ig.Sound( 'media/music/Kevin MacLeod - Hall of the Mountain King - 2.*', false),
        hall3: new ig.Sound( 'media/music/Kevin MacLeod - Hall of the Mountain King - 3.*', false),
        hall4: new ig.Sound( 'media/music/Kevin MacLeod - Hall of the Mountain King - 4.*', false),
        hall5: new ig.Sound( 'media/music/Kevin MacLeod - Hall of the Mountain King - 5.*', false)
    },

    init: function() {
        // Initialize your game here; bind keys etc.

        // Add all music
        for (var i in this.music) {
            ig.music.add( this.music[i], i);
            //ig.music.volume = 0.4;
        }
        ig.music.volume = 1;
        ig.music.loop = true;

        this.setupDialogManager();

        // Setup Controls
        ig.input.bind( ig.KEY.MOUSE1, 'click' );

        if( ig.ua.mobile ) {
            //this.setupNormalTouchControls();
        } else {
            this.setupDesktopControls();
        }

        this.fadeInTimer = new ig.Timer(0);
        this.fadeOutTimer = new ig.Timer(0);
        this.logos.run(function() {
            ig.game.fadeInTimer = new ig.Timer(ig.game.fadeInTime);
            ig.game.loadMainMenu();
            setTimeout(function() {
                ig.music.play("menu");
            }, 400);
        }, true);
    },

    setupDialogManager: function() {
        ss.GlobalDialogManager.fontName = "Cavalcade";
        setTimeout(function(){
            ss.GlobalDialogManager.loadFont("Cavalcade", "/fonts/Cavalcade/Cavalcade-Regular.css");
        }, 1);
        ss.GlobalDialogManager.textSize = 36;
        ss.GlobalDialogManager.textEdgePadding = 10;
        ss.GlobalDialogManager.textLinePadding = 10;
        ss.GlobalDialogManager.outlineThickness = 2;
        ss.GlobalDialogManager.choiceCursorPadding= 30;
        ss.GlobalDialogManager.outlineColor = hexToRgbA(GameColors.DialogBGOutline);
        ss.GlobalDialogManager.bgColor = hexToRgbA(GameColors.DialogBG);
        ss.GlobalDialogManager.fontColor = hexToRgbA(GameColors.DialogFG);
        ss.GlobalDialogManager.minHeight = 1000;
    },

    loadMainMenu: function()
    {
        ig.music.fadeOut();
        this.menu = new TitleMenu();
    },

    setupDesktopControls: function() {
        // Setup keyboard & mouse controls
        ig.input.bind( ig.KEY.UP_ARROW, 'up' );
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.SPACE, 'primary' );
        ig.input.bind( ig.KEY.BACKSPACE, 'secondary' );

        ig.input.bind( ig.KEY.ENTER, 'pause' );

        ss.GlobalDialogManager.selectButtons.push('primary');
        ss.GlobalDialogManager.cancelButtons.push('secondary');

        if (ig.system.isNMJSEnvironment)
        {
            ig.input.bind( ig.KEY.F, 'toggleFullscreen' );
            ig.input.bind( ig.KEY.ESC, 'exitPointerLock' );
            ig.input.bind( ig.KEY.ESC, 'exitFullscreen' );
        }
        else
        {
            window.addEventListener("keydown", function(e) {
                switch (e.which)
                {
                    case ig.KEY.F:
                        ig.system.toggleFullscreen();
                        break;
                    case ig.KEY.ESC:
                        if (ig.system.isFullscreen) document.exitFullscreen();
                        break;
                }
            });
        }
    },

    startNewGame: function()
    {
        ig.game.autoSort = true;
        ig.game.sortBy = ig.Game.SORT.POS_Y;

        this.fadeOutTimer = new ig.Timer(this.fadeOutTime);
        //ig.music.fadeOut();
        setTimeout(function() {

            if (location.search.length > 0) ig.game.loadLevel(self["Level"+location.search.replace("?level=","")]);
            else ig.game.loadLevel(LevelBlank);

            ig.game.fadeInTimer = new ig.Timer(ig.game.fadeInTime);
        }, ig.game.fadeOutTime * 1000);
    },

    loadLevel: function(data)
    {
        this.menu = null;
        this.parent(data);
    },

    update: function() {
        if (this.logos.isRunning) return;
        this.parent();
        if (this.menu) return this.menu.update();
    },

    draw: function(dialogDraw) {
        // Draw all entities and backgroundMaps

        if (this.logos.isRunning) return;
        if (this.menu) {
            this.menu.draw();
        } else {
            this.parent();
            this.drawDialogManagedContent();
        }

        if ( this.fadeInTimer.delta() < 0 ) {
            var fadeAlpha = ( 1 - (ig.game.fadeInTime + this.fadeInTimer.delta()) ) / ig.game.fadeInTime;
            ig.system.context.fillStyle = 'rgba(0,0,0,'+fadeAlpha+')';
            ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
        }
        if ( this.fadeOutTimer.delta() < 0 ) {
            var fadeAlpha = ( ig.game.fadeOutTime + this.fadeOutTimer.delta() ) / ig.game.fadeOutTime;
            ig.system.context.fillStyle = 'rgba(0,0,0,'+fadeAlpha+')';
            ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
        }
    }
});

var fps = 60;
var gameWidth = 720;
var gameHeight = gameWidth * (16/9);
var scale = 1;

ig.System.scaleMode = ig.System.SCALE.SMOOTH;
ig.main( '#canvas', SwitchboardCopperGame, fps, gameHeight, gameWidth, scale, ig.ImpactSplashLoader);

});
