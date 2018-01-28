ig.module(
    'game.entities.ink-visual-novel'
)
.requires(
    'impact.entity',
    'plugins.ss.random',
    'plugins.ss.dialog',
    'game.inkstory'
)
.defines(function(){

EntityInkVisualNovel = ss.DialogManagedEntity.extend({
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(28, 230, 128, 0.7)',

    size: {x: 32, y: 32},

    name: "",
    dialogManager: undefined,

    init: function( x, y, settings ) {
        this.parent( x, y, settings );

        if ( ig.global.wm ) return;

        this.cutscene = new InkStory();
    },

    update: function() {
        this.parent();
        this.cutscene.update();
    },

    draw: function() {
        this.parent();
        this.cutscene.draw();
    },

    beingTriggered: false,
    trigger: function()
    {
        this.cutscene.trigger();
    }
});

});
