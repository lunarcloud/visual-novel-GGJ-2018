ig.module(
    'game.cutscenes.characters'
)
.requires(
    'impact.game',
    'impact.system',
    'game.cutscenes.character'
)
.defines(function(){

CutscenesCharacters = {

    name: 'Cutscenes Common',

    crowd: new CutsceneCharacter( 'crowd', 640, 640, true, 'cheering', 'running' ),
    emperor: new CutsceneCharacter( 'emperor', 380, 640, false, 'talk', 'smirk', 'yell' ),
    p1: new CutsceneCharacter( 'player1', 380, 640, false, 'determined', 'confused', 'worried'),
    p2: new CutsceneCharacter( 'player2', 380, 640, false, 'determined', 'confused', 'worried'),
    p3: new CutsceneCharacter( 'player3', 380, 640, false, 'determined', 'confused', 'worried'),
    p4: new CutsceneCharacter( 'player4', 380, 640, false, 'determined', 'confused', 'worried')
}
});
