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
        this.dialogManager = new ss.DialogManager(this.cutscene.getNextMoment());
        this.cutscene.setDialogManager(this.dialogManager);
        this.dialogManager.trigger();
    },

    update: function() {
        this.parent();
        if (this.dialogManager) {
            this.dialogManager.update();
        }
    },

    draw: function() {
        this.parent();
        this.cutscene.drawBG();
        this.cutscene.drawPortrait();
        if (this.dialogManager) {
            this.dialogManager.draw();
        }
    },

    beingTriggered: false,
    trigger: function()
    {
        if (this.dialogManager) {
            this.dialogManager.trigger();
        }
    }
});

});
