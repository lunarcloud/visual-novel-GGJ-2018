ig.module(
    'plugins.ss.random'
)
.requires()
.defines(function()
{
if (typeof(ss) === "undefined") ss = {};

ss.Random = new (ig.Class.extend({
    int: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    item: function() {
        var array = [];
        if (arguments[0] instanceof Array) {
            array = arguments[0];
        } else {
            array = arguments;
        }
        var index = this.int(0, array.length - 1);
        return array[index];
    }
}));
});
