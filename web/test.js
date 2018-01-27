/**
*   Test file
*/
"user strict";

function save() {
    var saveState = story.state.toJson();
    // write to file or localstorage
}

function load() {
    var loadState = "";
    // load from file or localstorage
    story.state.LoadJson(loadState);
}

function processTags(tags) {
    if (tags == undefined) return;

    var hadPortrait = false;
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].includes("portrait:")) {
            portrait(tags[i].replace(/portrait:/, ""));
            hadPortrait = true;
        } else if (tags[i].includes("music:")) {
            music(tags[i].replace(/music:/, ""));
        } else {
            console.log("#" + tags[i]);
        }
        if (!hadPortrait) {
            portrait("none");
        }
    }
}

function portrait(character) {
    console.log("☺️ " + character);
}

function music(title) {
    console.log("🎵 " + title);
}


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
        processTags(story.currentTags);
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
