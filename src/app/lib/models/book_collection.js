(function (App) {
    'use strict';

    var BookCollection = App.Model.Collection.extend({
        model: App.Model.Movie,
        popid: 'mal_id',
        type: 'books',
        getProviders: function () {
            return {
                torrents: App.Config.getProviderForType('anime')
            };
        },
    });

    App.Model.BookCollection = BookCollection;
})(window.App);
