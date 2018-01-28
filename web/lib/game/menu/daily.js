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

    useText: false,

    inkStory: undefined,

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

    init: function(inkStory, day)
    {
        this.inkStory = inkStory;
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


        options[menu.Page.MAIN].push(new ss.MenuImageOption(
            /* menu */ menu,
            /* image */ this.images.note,
            /* action */ function() {
                menu.inkStory.dailyMenuChosen("note");
            },
            /* x */ 192,
            /* y */ ig.system.height / 3
        ));

        options[menu.Page.MAIN].push(new ss.MenuImageOption(
            /* menu */ menu,
            /* image */ this.images.wiley,
            /* action */ function() {
                menu.inkStory.dailyMenuChosen("wiley");
            },
            /* x */ ig.system.width - 352,
            /* y */ ig.system.height - 352
        ));

        options[menu.Page.MAIN].push(new ss.MenuImageOption(
            /* menu */ menu,
            /* image */ this.images.briggs,
            /* action */ function() {
                menu.inkStory.dailyMenuChosen("briggs");
            },
            /* x */ ig.system.width - 192,
            /* y */ ig.system.height - 352
        ));

        options[menu.Page.MAIN].push(new ss.MenuImageOption(
            /* menu */ menu,
            /* image */ this.images.doherty,
            /* action */ function() {
                menu.inkStory.dailyMenuChosen("doherty");
            },
            /* x */ ig.system.width - 352,
            /* y */ ig.system.height - 192
        ));

        var fourthX = ig.system.width - 192;
        var fourthY = ig.system.height - 192;
        if (this.day == 5) {
            options[menu.Page.MAIN].push(new ss.MenuImageOption(menu, this.images.hughes,
                /* action */ function() {
                menu.inkStory.dailyMenuChosen("hughes");
                }, fourthX, fourthY
            ));
        } else {
            options[menu.Page.MAIN].push(new ss.MenuImageOption(menu, this.images.custer,
                /* action */ function() {
                menu.inkStory.dailyMenuChosen("custer");
                }, fourthX, fourthY
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
