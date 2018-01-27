ig.module(
    'game.cutscenes.speech'
)
.requires(
    'impact.entity',
    'game.i18n',
    'game.cutscenes.characters',
    'plugins.ss.random',
    'plugins.ss.dialog'
)
.defines(function(){

var asyncSleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

CutsceneRecruitSpeech = ig.Class.extend({

    name: "Speech",

    bit1: undefined,

    soldiersKeepRumbling: false,
    rumbleSoldiers: function() {
            var speech = this;
            var soldiers = ig.game.getEntitiesByType('EntityImperialSoldier');
            return function() {
                speech.soldiersKeepRumbling = true;
                setTimeout(async function() {

                while (speech.soldiersKeepRumbling) {
                    soldiers.forEach(function(entity) {
                        entity.vel.x = ss.Random.int(-10, 10);
                        entity.vel.y = ss.Random.int(-2, 2);
                    });
                    await asyncSleep(200);
                }
                soldiers.forEach(function(entity) {
                    entity.vel.x = 0;
                    entity.vel.y = 0;
                });
            }, 0);
        }
    },

    init: function() {

        if ( ig.global.wm ) return;

        var speech = this;

        //Sprite for actions
        var emperor = ig.game.getEntitiesByType("EntityEmperor")[0];

        this.bit1 = new ss.DialogTextMoment(
            ig.i18n().Cutscenes.RecruitSpeech['1E'],
            CutscenesCharacters.emperor.get('talk', 'right')
        );

        var bit2 = new ss.DialogTextMoment(
            ig.i18n().Cutscenes.RecruitSpeech['2A'],
            CutscenesCharacters.crowd.get('cheering', 'left')
        );
        this.bit1.setAction(new ss.DialogAction(this.rumbleSoldiers(), bit2));

        var bit3 = new ss.DialogTextMoment(
            ig.i18n().Cutscenes.RecruitSpeech['3E'],
            CutscenesCharacters.emperor.get('talk', 'right')
        );
        bit2.setAction(new ss.DialogAction(function() {
            speech.soldiersKeepRumbling = false;
        }, bit3));

        var bit4 = new ss.DialogTextMoment(
            ig.i18n().Cutscenes.RecruitSpeech['4E'],
            CutscenesCharacters.emperor.get('talk', 'right')
        );
        bit3.setAction(new ss.DialogAction(async function() {
            speech.soldiersKeepRumbling = false;
            emperor.currentAnim = emperor.anims.walkleft.rewind();
            emperor.vel.x = -20;
            await asyncSleep(2000);
            emperor.vel.x = 0;
            emperor.currentAnim = emperor.anims.idledown.rewind();
        }, bit4));

        var bit5 = new ss.DialogTextMoment(
            ig.i18n().Cutscenes.RecruitSpeech['5A'],
            CutscenesCharacters.crowd.get('cheering', 'left')
        );
        bit4.setAction(new ss.DialogAction(this.rumbleSoldiers(), bit5));

        var bit6 = new ss.DialogTextMoment(
            ig.i18n().Cutscenes.RecruitSpeech['6E'],
            CutscenesCharacters.emperor.get('talk', 'right')
        );
        bit5.setAction(new ss.DialogAction(async function() {
            speech.soldiersKeepRumbling = false;
            emperor.currentAnim = emperor.anims.walkright.rewind();
            emperor.vel.x = 20;
            await asyncSleep(2000);
            emperor.vel.x = 0;
            emperor.currentAnim = emperor.anims.idledown.rewind();
        }, bit6));

        var bit7 = new ss.DialogTextMoment(
            ig.i18n().Cutscenes.RecruitSpeech['7A'],
            CutscenesCharacters.crowd.get('cheering', 'left')
        );
        bit6.setAction(new ss.DialogAction(this.rumbleSoldiers(), bit7));

        var bit8 = new ss.DialogTextMoment(
            ig.i18n().Cutscenes.RecruitSpeech['8E'],
            CutscenesCharacters.emperor.get('talk', 'right')
        );
        bit7.setAction(new ss.DialogAction(function() {
            speech.soldiersKeepRumbling = false;
            emperor.currentAnim = emperor.anims.idledown.rewind();
            emperor.vel.x = 0;
        }, bit8));

        var bit9 = new ss.DialogTextMoment(
            ig.i18n().Cutscenes.RecruitSpeech['9P'],
            CutscenesCharacters.p1.get('determined', 'left')
        );
        bit8.setAction(new ss.DialogAction(null, bit9));

        bit9.setAction(new ss.DialogAction(function() {
            ig.game.fadeOutTimer = new ig.Timer(ig.game.fadeOutTime + 0.1);
            setTimeout(function() {
                ig.game.loadMainMenu();
                ig.game.fadeInTimer = new ig.Timer(ig.game.fadeInTime);
            }, ig.game.fadeOutTime * 1000);
        }));
    },

    getFirstMoment: function() {
        return this.bit1;
    },

    addAnimations: function(name, sheet) {
        animations[name] = {};
    },

    addNormal: function(name, sheet) {
        animations[name].normal = new ig.Animation( animSheet, 1, [0] );
    },

    addNormal: function(name, sheet) {
        animations[name].normal = new ig.Animation( animSheet, 1, [0] );
    },

    addNormal: function(name, sheet) {
        animations[name].normal = new ig.Animation( animSheet, 1, [0] );
    },
});

});
