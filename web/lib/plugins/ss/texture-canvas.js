ig.module(
    'plugins.ss.texture-canvas'
)
.requires()
.defines(function()
{
if (typeof(ss) === "undefined") ss = {};

ss.texture2DCanvas = undefined;
ss.texture2DContext = undefined;
ss.mainCanvasIs2D = false;

ig.System.inject({
    init: function()
    {
        this.parent.apply(this, arguments);

        ss.texture2DCanvas = this.canvas.cloneNode(false);
        ss.texture2DCanvas.id = "dialog-manager";
        ss.texture2DCanvas.width  = this.canvas.width;
        ss.texture2DCanvas.height = this.canvas.height;
        ss.texture2DCanvas.style.display   = "none";
        ss.texture2DCanvas.style.background   = "transparent";
        ss.texture2DCanvas.style.backgroundColor   = "transparent";

        document.body.appendChild(ss.texture2DCanvas);
        ss.texture2DContext = ss.texture2DCanvas.getContext("2d");

        ss.mainCanvasIs2D = this.context instanceof CanvasRenderingContext2D;
    }
});

});
