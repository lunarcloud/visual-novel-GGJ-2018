ig.module(
    'game.logos'
)
.requires(
    'plugins.ss.logo-splash'
)
.defines(function()
{

Logos = ss.LogoSplash.extend({
    timeToShow: 3,
    logos: [
        //new ig.Image("media/antiford-flag-64.png")
    ]
});

});
