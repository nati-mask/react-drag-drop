const Promise = require('es6-promise').Promise;
const { mashape_key } = require('../../.env.json');

module.exports = class PositionManager {
    constructor(ajaxmanager) {
        this.ajax = ajaxmanager;
    }

    loadPosition() {
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

    savePosition(pos_x, pos_y) {
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

    limit({pos_x, pos_y}, out_el, in_el) {
        let limited_pos_x = pos_x, limited_pos_y = pos_y;
        if (isNaN(limited_pos_x)) limited_pos_x = 0;
        if (isNaN(limited_pos_y)) limited_pos_y = 0;
        let in_width = $(in_el).width(), in_height = $(in_el).height();
        let out_width = $(out_el).width(), out_height = $(out_el).height();
        if ((limited_pos_x + in_width) > out_width) limited_pos_x = out_width - in_width;
        if ((limited_pos_y + in_height) > out_height) limited_pos_y = out_height - in_height;
        if(limited_pos_x < 0) limited_pos_x = 0;
        if(limited_pos_y < 0) limited_pos_y = 0;
        return {pos_x : limited_pos_x, pos_y : limited_pos_y};
    }
}