/**
*   Test file
*/
"user strict";

console.debug("Ink Version: " + storyContent.inkVersion);

console.debug("Variables: ");
for (var item in storyContent.listDefs) {
    if (typeof(storyContent.listDefs[item]) === "object") {
        console.debug("\t" + item + ": ");
        for (var sub in storyContent.listDefs[item]) {
            console.debug("\t\t" + sub + ": " + storyContent.listDefs[item][sub]);
        }
    } else {
        console.debug("\t" + item + ": " + storyContent.listDefs[item]);
    }
}

var story = new inkjs.Story(storyContent);

do {
    do {
        story.Continue();
        for (var i = 0; i < story.currentTags.length; i++) {
            console.log("#" + story.currentTags[i]);
        }
        console.log("\t" + story.currentText);
    } while (story.canContinue);
    for (var i = 0; i < story.currentChoices.length; i++) {
        console.log("\t\t* " + story.currentChoices[i].text);
    }
    if (story.currentChoices.length > 0) {
        story.ChooseChoiceIndex(0);
    } else {
        break;
    }
} while (!story.state.didSafeExit);

function save() {
    var saveState = story.state.toJson();
    // write to file or localstorage
}

function load() {
    var loadState = "";
    // load from file or localstorage
    story.state.LoadJson(loadState);
}
