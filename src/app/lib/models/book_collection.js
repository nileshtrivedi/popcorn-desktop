(function (App) {
    'use strict';

    var BookCollection = App.Model.Collection.extend({
        model: App.Model.Movie,
        popid: 'mal_id',
        type: 'books',
        getProviders: function () {
            return {
                torrents: App.Config.getProviderForType('book'),
                metadata: App.Config.getProviderForType('metadata')
            };
        },
    });

    App.Model.BookCollection = BookCollection;
})(window.App);
