ig.module(
    'game.cutscenes.character'
)
.requires(
    'impact.animation'
)
.defines(function(){

CutsceneCharacter = ig.Class.extend({

    name: '',
    sheet: undefined,
    animations: {},
    width: 0,
    height: 0,
    flipOnRight: false,

    init: function( name, w, h, flipOnRight, ...anims ) {
        this.name = name;
        this.sheet = new ig.AnimationSheet('media/' + name + '-bodies.png', w, h);
        this.width = w;
        this.height = h;
        this.flipOnRight = flipOnRight;
        for (var i = 0; i < anims.length; i++) {
            this.animations[anims[i]] = new ig.Animation(
                this.sheet,
                /* s/f */ 1,
                /* f's */ [i],
                /* stop on last f */ true);
        }
    },

    get: function(animation, direction) {
        var x = 0;
        if (direction.toLowerCase() === "right") {
            x = ig.system.width - this.width;
            this.animations[animation].flip.x = this.flipOnRight;
        } else {
            this.animations[animation].flip.x = false;
        }
        return new ss.DialogCharacter( x, /* y */ ig.system.height - this.height, this.animations[animation]);
    }
});

});
