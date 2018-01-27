/*
* Copyright (C) Samuel Sarette - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Samuel Sarette <samuelsarette@linux.com>
*/
ig.module('game.i18n')
.requires(
    'plugins.localstorage'
)
.defines(function()
 {

    Lang = ig.Class.extend({
        name: "",
        code: "",
        init: function (reviewed, name, code, strings)
        {
            if (typeof(reviewed) !== "boolean") throw "Reviewed must be a boolean!";
            if (typeof(name) !== "string") throw "Language must have a name";
            if (typeof(code) !== "string") throw "Language must have an i18n code";

            this.reviewed = reviewed;
            this.name = name;
            this.code = code;

            for (var i in strings) {
                this[i] = strings[i];
            }
        }
    });

    ig.langs = new (ig.Class.extend({

        enUS: new Lang(true, "US English", "enUS", {
            "GameTitle": "Visual Novel GGJ 2018",
            "menuback": "back",
            "PauseMenu": {
                "Main": {
                    "Continue" : "Continue",
                    "Toggle Fullscreen" : "Toggle Fullscreen (F)",
                    "Main Menu" : "Main Menu",
                    "Save": "Save",
                    "Quit": "Quit",
                },
                "MainMenuSure": "Quit to Menu? You will lose unsaved progress.",
                "QuitSure" : "Really Quit?"
            },
            "MainMenu": {
                "Push": {
                    "Press Start": "Press Start"
                },
                "Main": {
                    "Play": "Play",
                    "Load": "Load",
                    "Options": "Options",
                    "Achievements": "Achievements",
                    "Quit": "Quit"
                },
                "Options": {
                    "Fullscreen": "Toggle Fullscreen (F)",
                    "Controls": "Controls",
                    "Language": "Language",
                    "Music Enabled": "Music: Enabled",
                    "Music Disabled": "Music: Disabled"
                },
                "Controls": {
                },
                "QuitSure": "Really Quit?"
            },
            "Answer" : {
                "yes" : "yes",
                "sure" : "sure",
                "no" : "no",
            }
        })
    }));

    ig.lang = new (ig.Class.extend({

        current: null,
        localStorage: new ig.localStorage(),

        init: function()
        {
            var lang = this;
            this.localStorage.get("lang", function(language) {
            if (language === null) {
                var languageCode = navigator.language.replace(/-/, "");
                var autoLang = ig.langs[languageCode];
                if (!!autoLang) {
                    console.debug("Detected language: " + languageCode);
                    lang.set(autoLang, true);
                } else {
                    var langFound = false;
                    var countryCode = navigator.language.substring(0, navigator.language.indexOf('-'));
                    var codes = this.getCodes();

                    for ( var i = 0; i < codes.length; i++) {
                        if (codes[i].indexOf(countryCode) == 0) {
                            console.debug("Detected language: " + codes[i]);
                            lang.set(ig.langs[codes[i]], false);
                            langFound = true;
                            break;
                        }
                    }

                    if (!langFound) {
                        console.debug("Language defaulting to: enUS");
                        lang.set(ig.langs.enUS, true);
                    }
                }
            } else {
                console.debug("Setting loaded: lang = " + language);
                lang.set(ig.langs[language], false);
            }
        });
        },

        set: function(lang, save)
        {
            if (typeof(lang) === "string")
            {
                if (lang in ig.langs === false) throw "No such language!";

                lang = ig.langs[lang];
            }

            if (save !== false) this.localStorage.set("lang", lang.code);

            this.current = lang;

            if (lang.reviewed === false) console.warn("This language has not been reviewed! Expect bad a transalation!");
        },

        getCodes: function(reviewedOnly)
        {
            var langArray = Object.keys(ig.langs);

            if (reviewedOnly === false)
            {
                return langArray;
            }

            return langArray.filter(function(value)
            {
                return ig.langs[value].reviewed;
            });
        },

        /**
         * This is for use in translatable text with variables
         */
        format: function(text)
        {
            if (typeof(sprintf) !== "function") throw "sprintf not available!";

            return sprintf.apply(undefined, arguments);
        }
    }));

    ig.i18n = function()
    {
        return ig.lang.current;
    };

});
