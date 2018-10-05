ig.module(
    'game.menu.daily'
)
.requires(
    'impact.image',
    'plugins.ss.menu.menu'
)
.defines(function() {

ss.MenuImageOption = ss.MenuOption.extend({
    image: undefined,
    init: function(menu, image, action, x, y, padding, visible) {
        this.parent(menu, function(){return "";}, action, x, y, ig.Font.ALIGN.LEFT, padding, visible);
        if (image instanceof ig.Image === false) throw "image must be an ig.Image!";
        this.image = image;
        this.width = this.image.width;
        this.height = this.image.height;
        this.selectTarget.x = this.x - this.padding;
        this.selectTarget.y = this.y - this.padding;
        this.selectTarget.width = this.width + (this.padding*2);
        this.selectTarget.height = this.height + (this.padding*2);
        this.createTouchButton();
    },
    updateText: function() {
        return "";
    },
    draw: function() {
        this.image.draw(this.x, this.y);
    }
});

DailyMenu = ss.Menu.extend({

    useTrueFont: true,
    trueFont: new ss.TrueFont("Cavalcade", 24, "#ccc", "fonts/Cavalcade/Cavalcade-Regular.css"),

    useSelectedFont: true,
    selectedTrueFont: new ss.TrueFont("Cavalcade", 24, "#eee", "fonts/Cavalcade/Cavalcade-Regular.css"),

    inkStory: undefined,
    inkStoryChoices: undefined,

    Page: {
        MAIN : 0
    },

    day: 0,

    actions: {
        prev: [ "up", "left" ],
        next: [ "down", "right" ],
        select: [ "primary" ],
        back: [ "secondary" ]
    },

    images: {
        briggs: new ig.Image('media/desk/briggs.png'),
        custer: new ig.Image('media/desk/custer.png'),
        doherty: new ig.Image('media/desk/doherty.png'),
        hughes: new ig.Image('media/desk/hughes.png'),
        wiley: new ig.Image('media/desk/wiley.png'),
        note: new ig.Image('media/desk/note.png')
    },

    init: function(inkStory, inkStoryChoices, day)
    {
        this.inkStory = inkStory;
        this.inkStoryChoices = inkStoryChoices;
        this.startBlinkTimer = new ig.Timer();
        this.createMenuOptions();
        ss.GlobalDialogManager.dialogIsActive = false;
        this.day = day;
        this.parent();
    },

    createMenuOptions: function()
    {
        var menu = this;

        var options = [[]];

        var show = {
            wiley: false,
            briggs: false,
            doherty: false,
            hughes: false,
            custer: false
        };
        for (var i = 0; i < this.inkStoryChoices.length; i++) {
            for (var j in show) {
                if (this.inkStoryChoices[i].toLowerCase().includes(j)) {
                    show[j] = true;
                }
            }
        }

        options[menu.Page.MAIN].push(new ss.MenuImageOption(
            /* menu */ menu,
            /* image */ this.images.note,
            /* action */ function() {
                menu.inkStory.dailyMenuChosen("note");
            },
            /* x */ 544,
            /* y */ 340
        ));

        options[menu.Page.MAIN].push(new ss.MenuOption(
            /* menu */ menu,
            /* textGetter */ function() { return "Refer to Note"; },
            /* action */ function() {
                menu.inkStory.dailyMenuChosen("note");
            },
            /* x */ 544 + 128,
            /* y */ 340 + 256,
            /* alignment */ ig.Font.ALIGN.CENTER,
            /* padding */ undefined // default
        ));

        if (show.wiley) {
            options[menu.Page.MAIN].push(new ss.MenuImageOption(
                /* menu */ menu,
                /* image */ this.images.wiley,
                /* action */ function() {
                    menu.inkStory.dailyMenuChosen("wiley");
                },
                /* x */ 894,
                /* y */ 246
            ));

            options[menu.Page.MAIN].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return "Officer Wiley"; },
                /* action */ function() {
                        menu.inkStory.dailyMenuChosen("wiley");
                },
                /* x */ 894 + 64,
                /* y */ 246 + 128,
                /* alignment */ ig.Font.ALIGN.CENTER,
                /* padding */ undefined // default
            ));
        }

        if (show.briggs) {
            options[menu.Page.MAIN].push(new ss.MenuImageOption(
                /* menu */ menu,
                /* image */ this.images.briggs,
                /* action */ function() {
                    menu.inkStory.dailyMenuChosen("briggs");
                },
                /* x */ 1098,
                /* y */ 246
            ));
            options[menu.Page.MAIN].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return "Sergeant Briggs"; },
                /* action */ function() {
                        menu.inkStory.dailyMenuChosen("briggs");
                },
                /* x */ 1098 + 64,
                /* y */ 246 + 128,
                /* alignment */ ig.Font.ALIGN.CENTER,
                /* padding */ undefined // default
            ));
        }

        if (show.doherty) {
            options[menu.Page.MAIN].push(new ss.MenuImageOption(
                /* menu */ menu,
                /* image */ this.images.doherty,
                /* action */ function() {
                    menu.inkStory.dailyMenuChosen("doherty");
                },
                /* x */ 894,
                /* y */ 466
            ));
            options[menu.Page.MAIN].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return "Sergeant Doherty"; },
                /* action */ function() {
                        menu.inkStory.dailyMenuChosen("doherty");
                },
                /* x */ 894 + 64,
                /* y */ 466 + 128,
                /* alignment */ ig.Font.ALIGN.CENTER,
                /* padding */ undefined // default
            ));
        }

        var fourthX = 1098;
        var fourthY = 466;
        if (show.hughes) {
            options[menu.Page.MAIN].push(new ss.MenuImageOption(menu, this.images.hughes,
                /* action */ function() {
                menu.inkStory.dailyMenuChosen("hughes");
                }, fourthX, fourthY
            ));
            options[menu.Page.MAIN].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return "Lt. Gerald Hughes"; },
                /* action */ function() {
                        menu.inkStory.dailyMenuChosen("hughes");
                },
                /* x */ fourthX + 64,
                /* y */ fourthY + 128,
                /* alignment */ ig.Font.ALIGN.CENTER,
                /* padding */ undefined // default
            ));
        }
        if (show.custer) {
            options[menu.Page.MAIN].push(new ss.MenuImageOption(menu, this.images.custer,
                /* action */ function() {
                menu.inkStory.dailyMenuChosen("custer");
                }, fourthX, fourthY
            ));
            options[menu.Page.MAIN].push(new ss.MenuOption(
                /* menu */ menu,
                /* textGetter */ function() { return "Officer Custer"; },
                /* action */ function() {
                        menu.inkStory.dailyMenuChosen("custer");
                },
                /* x */ fourthX + 64,
                /* y */ fourthY + 128,
                /* alignment */ ig.Font.ALIGN.CENTER,
                /* padding */ undefined // default
            ));
        }

        this.options = options;
    },

    update: function()
    {
        this.parent();
    },

    draw: function()
    {
        this.parent();
    }
});

});
