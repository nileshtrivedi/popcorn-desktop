(function (App) {
    'use strict';

    var BookBrowser = App.View.PCTBrowser.extend({
        collectionModel: App.Model.BookCollection,
        providerType: 'book',
    });

    App.View.BookBrowser = BookBrowser;
})(window.App);
