'use strict';

const Generic = require('./generic');
const sanitize = require('butter-sanitize');
const i18n = require('i18n');

class BookApi extends Generic {
  constructor(args) {
    super(args);

    this.language = args.language;
  }

  extractIds(items) {
    return items.results.map(item => item.mal_id);
  }

  fetch(filters) {
    const params = {
      sort: 'seeds',
      limit: '500'
    };

    if (filters.keywords) {
      params.keywords = filters.keywords.trim();
    }
    if (filters.genre) {
      params.genre = filters.genre;
    }
    if (filters.order) {
      params.order = filters.order;
    }
    if (filters.sorter && filters.sorter !== 'popularity') {
      params.sort = filters.sorter;
    }

    // const uri = `books/${filters.page}?` + new URLSearchParams(params);
    const uri = '';
    return this._get(0, uri).then(books => {
      books.forEach(book => {
        return {
          images: {
            poster: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562985482l/40796176._SY475_.jpg',
            banner: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562985482l/40796176._SY475_.jpg',
            fanart: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562985482l/40796176._SY475_.jpg',
          },
          mal_id: book._id,
          haru_id: book._id,
          tvdb_id: 'mal-' + book._id,
          imdb_id: book._id,
          slug: book.slug,
          title: book.title,
          year: book.year,
          type: book.type,
          item_data: book.type,
          rating: book.rating
        };
      });

      return { results: sanitize(books), hasMore: true };
    });
  }

  async getRaw(url) {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
  }

  detail(torrent_id, old_data, debug) {
    const uri = `book/${torrent_id}`;

    return this.getRaw(`https://api.npoint.io/a896078eda06afe5e3c4`).then(book => {
      var result = {
        mal_id: book._id,
        haru_id: book._id,
        tvdb_id: 'mal-' + book._id,
        imdb_id: book._id,
        slug: book.slug,
        title: book.title,
        item_data: book.type,
        country: 'Japan',
        genre: book.genres,
        genres: book.genres,
        num_seasons: 1,
        runtime: book.runtime,
        status: book.status,
        synopsis: book.synopsis,
        network: [], //FIXME
        rating: book.rating,
        images: {
          poster: 'https://media.kitsu.io/book/poster_images/' + book._id + '/large.jpg',
          banner: 'https://media.kitsu.io/book/cover_images/' + book._id + '/original.jpg',
          fanart: 'https://media.kitsu.io/book/cover_images/' + book._id + '/original.jpg',
        },
        year: book.year,
        type: book.type
      };

      return sanitize(result);
    });
  }

  filters() {
    const data = {
      genres: [
        'All',
        'Mathematics',
        'Physics',
        'Fiction',
        'Business',
        ''
      ],
      sorters: ['popularity', 'name', 'year']
    };
    let filters = {
      genres: {},
      sorters: {}
    };
    for (const genre of data.genres) {
      filters.genres[genre] = i18n.__(genre.capitalizeEach());
    }
    for (const sorter of data.sorters) {
      filters.sorters[sorter] = i18n.__(sorter.capitalizeEach());
    }

    return Promise.resolve(filters);
  }
}

BookApi.prototype.config = {
  name: 'BookApi',
  uniqueId: 'mal_id',
  tabName: 'Books',
  type: 'book',
  metadata: 'trakttv:book-metadata'
};

module.exports = BookApi;
