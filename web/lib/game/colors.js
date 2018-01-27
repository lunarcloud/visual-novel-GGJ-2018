ig.module(
    'game.colors'
)
.requires()
.defines(function() {
    NormalGameColors = {
        DialogBGOutline: "#f49242",
        DialogBG: "#f7efd7",
        DialogFG: "#444"
    };
    AltGameColors = {
        DialogBGOutline: "#000",
        DialogBG: "#1F1F1F",
        DialogFG: "#cfcfcf"
    };
    GameColors = NormalGameColors;

    hexToRgbA = function(hex, opacity){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', ' + ( isNaN(opacity) ? 1 : opacity) + ' )';
        }
        throw new Error('Bad Hex');
    }
});
