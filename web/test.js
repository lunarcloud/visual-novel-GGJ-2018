/**
*   Test file
*/
"user strict";

function getInkGlobalVar(key) {
    var varObj = story.variablesState[key];
    for (var i in varObj._keys) {
        return varObj._keys[i].itemName;
    }
    return null;
}

function getSaveState() {
    return story.state.toJson();
}

function loadState(dataString) {
    story.state.LoadJson(loadState);
}

function processTags(tags) {
    if (tags == undefined) return;

    var usedTags = {};
    for (var i = 0; i < tags.length; i++) {
        for (var j in tagHandlers) {
            if (tags[i].includes(j+":")) {
                tagHandlers[j].apply(null, tags[i].split(":"));
                usedTags[j] = true;
            }
        }
    }
    for (var j in tagLackHandlers) {
        if (!usedTags[j]) {
            tagLackHandlers[j]();
        }
    }
}

var tagHandlers = {
    portrait: function(key, character, position) {
        if (typeof(position) !== "string") position = "center";
        if (character == null) {
            console.log("☺️ none");
        } else {
            console.log("☺️ " + character + " - " + position);
        }
    },
    music: function(key, title) {
        console.log("🎵 " + title);
    }
}

var tagLackHandlers = {
    portrait: function() {
        tagHandlers.portrait(null, null);
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
