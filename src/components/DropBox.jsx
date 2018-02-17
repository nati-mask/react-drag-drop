import React from 'react';

require('./DropBox.less');

const { mashape_key } = require('../../.env.json');

const DraggableThumb = require('./DraggableThumb.jsx');

module.exports = class DropBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drag_begin_x : 0,
            drag_begin_y : 0,
            pos_x : 0,
            pos_y : 0,
        }
        this.onDragStartHandler = this.onDragStartHandler.bind(this);
        this.onDropHandler = this.onDropHandler.bind(this);
    }

    componentWillMount() {

        $.ajax({
            url: 'https://kvstore.p.mashape.com/collections/positionals/items/pos_x',
            headers: {
                'X-Mashape-Key': mashape_key
            }
        }).then(result => {
            console.log("init pos_x:", result.value);
            this.setState({ pos_x: parseInt(result.value) });
        })

        $.ajax({
            url: 'https://kvstore.p.mashape.com/collections/positionals/items/pos_y',
            headers: {
                'X-Mashape-Key': mashape_key
            }
        }).then(result => {
            console.log("init pos_y:", result.value);
            this.setState({ pos_y: parseInt(result.value) });
        })

    }

    onDragStartHandler(event) {
        // event.preventDefault();
        console.log('Start Dragging!');
        console.log(event.screenX);
        this.setState({
            drag_begin_x: event.screenX,
            drag_begin_y: event.screenY,
        })
    }

    onDragOverHandler(event) {
        event.preventDefault();
    }

    onDropHandler (event) {
        console.log('Dropped');
        event.preventDefault();
        var drop_x = event.screenX;
        var drop_y = event.screenY;
        var pos_x, pos_y;
        this.setState(prevState => {

            pos_x = prevState.pos_x + drop_x - prevState.drag_begin_x;
            pos_y = prevState.pos_y + drop_y - prevState.drag_begin_y;

            return {
                pos_x, pos_y,
                drag_begin_x : 0,
                drag_begin_y : 0,
            }

        }, () => {

            $.ajax({
                url: 'https://kvstore.p.mashape.com/collections/positionals/items/pos_x',
                method: 'PUT',
                data: String(pos_x),
                headers: {
                    'X-Mashape-Key': mashape_key
                }
            })

            $.ajax({
                url: 'https://kvstore.p.mashape.com/collections/positionals/items/pos_y',
                method: 'PUT',
                data: String(pos_y),
                headers: {
                    'X-Mashape-Key': mashape_key
                }
            })

        })
    }

    render() {
        return (
            <div className="drop-box" onDrop={this.onDropHandler} onDragOver={this.onDragOverHandler}>
                <DraggableThumb pos_x={this.state.pos_x} pos_y={this.state.pos_y} onDragStartHandler={this.onDragStartHandler}/>
            </div>
        );
    }
}