const Promise = require('es6-promise').Promise;
const { mashape_key } = require('../../.env.json');

module.exports = class PositionManager {
    constructor(ajaxmanager) {
        this.ajax = ajaxmanager;
    }

    getPosition() {
        return Promise.all([

            this.ajax({
                url: 'https://kvstore.p.mashape.com/collections/positionals/items/pos_x',
                headers: {
                    'X-Mashape-Key': mashape_key
                }
            }),

            this.ajax({
                url: 'https://kvstore.p.mashape.com/collections/positionals/items/pos_y',
                headers: {
                    'X-Mashape-Key': mashape_key
                }
            })

        ]).then(([{ value: pos_x }, { value: pos_y }]) => ({pos_x : parseInt(pos_x), pos_y : parseInt(pos_y)}));
    }

    setPosition(pos_x, pos_y) {
        return Promise.all([

            $.ajax({
                url: 'https://kvstore.p.mashape.com/collections/positionals/items/pos_x',
                method: 'PUT',
                data: String(pos_x),
                headers: {
                    'X-Mashape-Key': mashape_key
                }
            }),

            $.ajax({
                url: 'https://kvstore.p.mashape.com/collections/positionals/items/pos_y',
                method: 'PUT',
                data: String(pos_y),
                headers: {
                    'X-Mashape-Key': mashape_key
                }
            })

        ])
    }
}