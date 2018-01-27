ig.module(
    'plugins.ss.ink'
)
.requires(
)
.defines(function()
{
if (typeof(ss) === "undefined") ss = {};

ss.Ink = ig.Class.extend({

    story: undefined,
    content: undefined,
    consoleDebug: false,
    tagHandlers: [],
    tagLackHandlers: [],

    init: function(content) {
        this.content = content;
        this.story = new inkjs.Story(content);
    },

    getSaveState: function() {
        return this.story.state.toJson();
    },

    loadState: function(dataString) {
        this.story.state.LoadJson(loadState);
    },

    getVar: function(key) {
        var varObj = this.story.variablesState[key];
        for (var i in varObj._keys) {
            return varObj._keys[i].itemName;
        }
        return null;
    },

    continue: function(choiceIndex) {
        if (this.story.currentChoices.length > 0 ) {
            if (typeof(choiceIndex) !== "number") {
                throw "Must provide a choice index";
            } else if (choiceIndex < 0 || choiceIndex >= this.story.currentChoices.length) {
                throw choiceIndex + " is not a valid choice index value. (valid: 0-"
                    + (this.story.currentChoices.length - 1) +")";
            }
            this.story.ChooseChoiceIndex(choiceIndex);
        }

        if (this.story.canContinue === false) {
            throw "Can't continue";
        }
        this.story.Continue();
        this.processTags(this.getTags());
        if (this.consoleDebug) console.debug("INK: TEXT:" + this.story.currentText);
    },

    isEnded: function() {
        return this.story.state.didSafeExit
            || (this.story.currentChoices.length == 0 && !this.story.canContinue);
    },

    getText: function() {
        return this.story.currentText;
    },

    getChoices: function() {
        var choices = [];
        for (var i = 0; i < this.story.currentChoices.length; i++) {
            choices.push(story.currentChoices[i].text);
        }
        return choices;
    },

    getTags: function() {
        return this.story.currentTags;
    },

    processTags: function(tags) {
        if (tags == undefined) return;

        var usedTags = {};
        for (var i = 0; i < tags.length; i++) {
            if (this.consoleDebug) console.debug("INK: TAGS: " + tags[i]);

            for (var j in this.tagHandlers) {
                if (tags[i].includes(j+":")) {
                    this.tagHandlers[j].apply(null, tags[i].split(":"));
                    usedTags[j] = true;
                }
            }
        }
        for (var j in this.tagLackHandlers) {
            if (!usedTags[j]) {
                this.tagLackHandlers[j]();
            }
        }
    }
});

});
