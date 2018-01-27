ig.module(
    'game.main'
)
.requires(
    'plugins.impact-splash-loader',
    'impact.game',
    'impact.font',

    'plugins.ss.true-font',
    'plugins.chrome-app',
    'plugins.localstorage',

    'game.colors',
    'game.logos',
    'game.menu.title',
    'game.entities.void',
    'game.entities.ink-visual-novel',
    'plugins.ss.dialog',

    'game.levels.blank'

    //'impact.debug.debug',
)
.defines(function(){

ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.M4A]

VNGGJ2018 = ig.Game.extend({

    musicEnabled: true,
    localStorage: new ig.localStorage(),
    menu: null,
    logos: new Logos(),

    fadeInTime: 1,
    fadeOutTime: 1,
    fadeInTimer: undefined,
    fadeOutTimer: undefined,

    titleMusic: new ig.Sound( 'media/music/Kevin_MacLeod_-_Carefree.*', false),

    init: function() {
        // Initialize your game here; bind keys etc.

        ig.music.add( this.titleMusic, "Title");
        ig.music.volume = 0.4;
        ig.music.play("Title");

        ig.game.localStorage.get("music-enabled", function(musicEnabled) {
            if (musicEnabled === null) return;

            console.debug("Setting loaded: music-enabled = " + musicEnabled);

            ig.game.musicEnabled = typeof(musicEnabled) === "boolean" ? musicEnabled : musicEnabled === "true";
            if (ig.game.musicEnabled) ig.music.play();
            else ig.music.stop();
        });

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
        ss.GlobalDialogManager.bgColor = hexToRgbA(GameColors.DialogBG);
        ss.GlobalDialogManager.fontColor = hexToRgbA(GameColors.DialogFG);
        ss.GlobalDialogManager.minHeight = 100;
    },

    loadMainMenu: function()
    {
        this.menu = new TitleMenu();
        ig.music.play("Title");
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
        setTimeout(function() {
            ig.music.fadeOut();

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
    },

    toggleMusic : function()
    {
        if (ig.game.musicEnabled) ig.game.stopMusic();
        else ig.game.startMusic();

        return ig.game.musicEnabled;
    },

    startMusic : function()
    {
        if (ig.game.musicEnabled == false)
        {
            ig.game.musicEnabled = true;
            ig.music.play();
            ig.game.localStorage.set("music-enabled", true);
        }
        return ig.game.musicEnabled;
    },

    stopMusic : function()
    {
        if (ig.game.musicEnabled == true)
        {
            ig.game.musicEnabled = false;
            ig.music.stop();
            ig.game.localStorage.set("music-enabled", false);
        }
        return ig.game.musicEnabled;
    },


});

var fps = 60;
var gameWidth = 720;
var gameHeight = gameWidth * (16/9);
var scale = 1;

ig.System.scaleMode = ig.System.SCALE.SMOOTH;
ig.main( '#canvas', VNGGJ2018, fps, gameHeight, gameWidth, scale, ig.ImpactSplashLoader);

});
