ig.module(
    'plugins.simple-splash-loader'
)
.requires(
    'impact.loader'
)
.defines(function(){

ig.SimpleSplashLoader = ig.Loader.extend({

    endTime: 0,
    fadeToBlackTime: 200,
    fadeToGameTime: 800,

    end: function() {
        this.parent();
        this.endTime = Date.now();

        // This is a bit of a hack - set this class instead of ig.game as the delegate.
        // The delegate will be set back to ig.game after the screen fade is complete.
        ig.system.setDelegate( this );
    },


    // Proxy for ig.game.run to show the screen fade after everything is loaded
        run: function() {
        var t = Date.now() - this.endTime;
        var alpha = 1;
        if( t < this.fadeToBlackTime ) {
            // Draw the logo -> fade to black
            this.draw();
            alpha = t.map( 0, this.fadeToBlackTime, 0, 1);
        } else if( t < this.fadeToGameTime ) {
            // Draw the game -> fade from black
            ig.game.run();
            alpha = t.map( this.fadeToBlackTime, this.fadeToGameTime, 1, 0);
        } else {
            // All done! Dismiss the preloader completely, set the delegate
            // to ig.game
            ig.system.setDelegate( ig.game );
            return;
        }

        // Draw the black rect over the whole screen
        ig.system.context.fillStyle = 'rgba(0,0,0,'+alpha+')';
        ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
    },


    draw: function() {

        // Some damping for the status bar
        this._drawStatus += (this.status - this._drawStatus)/5;

        var ctx = ig.system.context;
        var w = ig.system.realWidth;
        var h = ig.system.realHeight;
        var scale = 2;
        var center = w/2;
        var barHeight = 100;
        var brandFontSize= 50 * scale;

        // Clear
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect( 0, 0, w, h );

        // Loading bar ('visually' centered for the brand)
        ctx.lineWidth = '10';
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.strokeRect( w/6, h*(3/7), w*(4/6), (h/7) );

        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect( w/6, h*(3/7), w*(4/6) * this._drawStatus, (h/7) );

        ctx.restore();
    },

    drawPaths: function( color, paths ) {
        var ctx = ig.system.context;
        ctx.fillStyle = color;

        for( var i = 0; i < paths.length; i+=2 ) {
            ctx[ig.ImpactSplashLoader.OPS[paths[i]]].apply( ctx, paths[i+1] );
        }
    }
});

});
