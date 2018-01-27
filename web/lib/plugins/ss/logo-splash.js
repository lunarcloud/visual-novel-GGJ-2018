ig.module(
    'plugins.ss.logo-splash'
)
.requires(
    'impact.game',
    'impact.image'
)
.defines(function()
{
if (typeof(ss) === "undefined") ss = {};

ss.LogoSplash = ig.Class.extend({

    callback: function (){},
    timeToShow: 5,
    timeToFadeOut: 1,
    timeToFadeIn: 1,
    displayingTimer: undefined,
    fadingTimer: undefined,
    currentLogoIndex: -1,
    clearScreen: false,
    isRunning: false,
    logos: [], // extend to add these

    init: function() {
    },

    run: function(callback) {
        this.callback = typeof(callback) === "function" ? callback : function(){};
        this.isRunning = true;
        this.displayingTimer = new ig.Timer(0);
        this.fadingTimer = new ig.Timer(0);

        this._update();
        this._draw();
    },

    _update: function() {
        if (!this.isRunning) return;
        this.update();
        var logos = this;
        requestAnimationFrame(function(){ logos._update(); });
    },

    update: function() {
        if (this.displayingTimer.delta() >= 0) {
            this.currentLogoIndex++;
            if (this.currentLogoIndex >= this.logos.length) {
                this.callback();
                this.isRunning = false;
                return;
            }
            this.displayingTimer = new ig.Timer(this.timeToShow);
            this.clearScreen = true;
        }
    },

    _draw: function() {
        if (!this.isRunning) return;
        this.draw();
        var logos = this;
        requestAnimationFrame(function(){ logos._draw(); });
    },

    draw: function() {

        if (this.logos[this.currentLogoIndex] instanceof ig.Image)
        this.logos[this.currentLogoIndex].draw(
            (ig.system.width - this.logos[this.currentLogoIndex].width) / 2,
            (ig.system.height - this.logos[this.currentLogoIndex].height) / 2,
        );

        var drawBlack = false;
        if (this.timeToShow - this.timeToFadeIn < -this.displayingTimer.delta()) {
            alpha = (-this.displayingTimer.delta() - (this.timeToShow - this.timeToFadeIn)) / this.timeToFadeIn;
        } else if (this.timeToFadeOut > -this.displayingTimer.delta()) {
            alpha = (this.timeToFadeOut + this.displayingTimer.delta()) / this.timeToFadeOut;
        }
        if (!!alpha) {
            ig.system.context.fillStyle = 'rgba(0,0,0,'+alpha+')';
            ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
        }
    }
});

});
