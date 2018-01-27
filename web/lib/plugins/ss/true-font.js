ig.module(
    'plugins.ss.true-font'
)
.requires(
    'plugins.ss.texture-canvas'
)
.defines(function()
{
if (typeof(ss) === "undefined") ss = {};

ss.TrueFont = ig.Class.extend({

    fontName: "",
    color: "black",
    direction: "ltr",
    textSize: 10,
    lineSpacing: 1,
    alpha: 0,

    loaded: false,
    failed: false,
    loadCallback: null,

    cache: {},
    currentImage: (new Image()),

    init: function(fontName, size, color, fontCSS)
    {
        this.fontName = fontName;
        this.textSize = size;
        this.color = color;

        if ( typeof(fontName) !== "string" ) {
            this.fontName = "sans-serif";
            console.warn("Font initialized without specifying font name");
        }
        if (typeof(size) !== "number") {
            this.textSize = 10;
            console.warn("Font initialized without specifying size");
        }
        if (typeof(color) !== "string") {
            this.color = "black";
            console.warn("Font initialized without specifying color");
        }

        if (typeof(fontCSS) !== "string") {
            this.loaded = true;
        }
        this.load();

        if (typeof(fontCSS) === "string") {
            var trueFont = this;
            if (typeof(WebFont) === "undefined") {
                console.warn("I highly reccomend using the Web Font Loader [ https://github.com/typekit/webfontloader ] with this plugin for consistent results.");
                setTimeout(function() {
                    trueFont.prepareImage("#test#", 0, 0, undefined, undefined, true);
                    setTimeout(function() {
                        trueFont.prepareImage("#test#", 0, 0, undefined, undefined, true);
                        trueFont.loaded = true;
                        trueFont.onload();
                    }, 1000);
                }, 400);
            } else {
                var webDir = location.pathname.substr(0, location.pathname.lastIndexOf("/"), -1) + '/';
                WebFont.load({
                    custom: {
                        families: [this.fontName],
                        urls: [webDir + fontCSS]
                    },
                    active: function() {
                        trueFont.onload();
                    },
                    timeout: 2000
                });
            }
        }
    },

    load: function( loadCallback ) {
        if (this.loaded) {
            this.loadCallback = loadCallback
            return this.onload();
        }
        else if ( !this.loaded && ig.ready ) this.loadCallback = loadCallback;
        else ig.addResource( this );
    },

    onload: function() {
        this.loaded = true;
        this.cache = {}; // clear cache when font loads
        if ( typeof(this.loadCallback) === "function" ) this.loadCallback( undefined, true );
    },

    widthForString: function( text )
    {
        ss.texture2DContext.font = this.textSize + "px/1em " + this.fontName;

        var textLines = text.split('\n');
        var biggestWidth = 0;

        for (var i = 0; i < textLines.length; i++) {
            var width = ss.texture2DContext.measureText(textLines[i]).width;
            if (width > biggestWidth) biggestWidth = width;
        }

        return width;
    },

    heightForString: function( text )
    {
        return text.split('\n').length
            * (this.textSize + this.lineSpacing);
    },

    prepareImage: function( text, x, y, align, alpha, textBaseline, overrideCache )
    {
        if (!ss.texture2DContext) return;

        if ( typeof this.cache[alpha] === "undefined") {
            this.cache[alpha] = {};
        }
        if ( typeof this.cache[alpha][text] !== "undefined" && overrideCache !== true ) {
            this.currentImage = this.cache[alpha][text];
            return;
        }

        ss.texture2DContext.clearRect(0, 0, ss.texture2DCanvas.width, ss.texture2DCanvas.height );
        ss.texture2DContext.fillStyle = this.color;
        ss.texture2DContext.direction = this.direction;

        ss.texture2DContext.textAlign = typeof(align) === "undefined" ? "start" : ss.TrueFont.convertAlignment(align);
        ss.texture2DContext.textBaseline = typeof(textBaseline) === "string" ? textBaseline : "top";

        ss.texture2DContext.font = (ig.system.scale * this.textSize) + "px/1em " + this.fontName;

        if( alpha !== 1 ) {
            ig.system.context.globalAlpha = alpha;
        }

        ss.texture2DContext.fillText(
            text,
            ig.system.scale * x,
            ig.system.scale * (y + this.lineSpacing)
        );

        if( alpha !== 1 ) {
            ig.system.context.globalAlpha = 1;
        }

        this.currentImage = new Image();
        this.currentImage.src = ss.texture2DCanvas.toDataURL('image/png');
        this.cache[alpha][text] = this.currentImage;
    },

    draw: function( text, x, y, align, alpha, textBaseline, overrideCache ) {
        if (typeof(align) === "number") {
            switch (align) {
                case 0 /*ig.Font.ALIGN.LEFT*/:
                    align = ss.TrueFont.ALIGN.START;
                    break;
                case 1 /*ig.Font.ALIGN.RIGHT*/:
                    align = ss.TrueFont.ALIGN.END;
                    break;
                case 2 /*ig.Font.ALIGN.CENTER*/:
                    align = ss.TrueFont.ALIGN.CENTER;
                    break;
            }
        }
        if (typeof(alpha) !== "number" || alpha < 0 || alpha > 1) {
            alpha = this.alpha;
        }
        this.prepareImage( text, x, y, align, alpha, textBaseline, overrideCache );
        // Transfer image over to the main canvas
        if (ss.mainCanvasIs2D) {
            ig.system.context.drawImage(this.currentImage, 0, 0);
        } else {
            // webgl rendering
            //TODO http://murfy.de/read/webgl-text-rendering
        }
    }
});

ss.TrueFont.ALIGN = {
    LEFT: 0,
    RIGHT: 1,
    CENTER: 2,
};

ss.TrueFont.ActualAlignments = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
    START: "start",
    END: "end"
};

ss.TrueFont.convertAlignment = function(value) {
    if (typeof(value) === "string") {
        switch (value) {
            case ss.TrueFont.ActualAlignments.LEFT:
            case ss.TrueFont.ActualAlignments.START:
                return ss.TrueFont.ALIGN.LEFT;
            case ss.TrueFont.ActualAlignments.CENTER:
                return ss.TrueFont.ALIGN.CENTER;
            case ss.TrueFont.ActualAlignments.RIGHT:
            case ss.TrueFont.ActualAlignments.END:
                return ss.TrueFont.ALIGN.RIGHT;
        }
    } else if (typeof(value) === "number") {
        switch (value) {
            case ss.TrueFont.ALIGN.LEFT:
                return ss.TrueFont.ActualAlignments.LEFT;
            case ss.TrueFont.ALIGN.CENTER:
                return ss.TrueFont.ActualAlignments.CENTER;
            case ss.TrueFont.ALIGN.RIGHT:
                return ss.TrueFont.ActualAlignments.RIGHT;
        }
    } else {
        throw "need 0-2 or left-end...";
    }
}

});
