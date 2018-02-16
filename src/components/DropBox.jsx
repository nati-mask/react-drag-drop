import React from 'react';

require('./DropBox.less');

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
        this.setState(prevState => ({
            pos_x: prevState.pos_x + (drop_x - prevState.drag_begin_x),
            pos_y: prevState.pos_y + (drop_y - prevState.drag_begin_y),
            drag_begin_x : 0,
            drag_begin_y : 0,
        }))
    }

    render() {
        return (
            <div className="drop-box" onDrop={this.onDropHandler} onDragOver={this.onDragOverHandler}>
                <DraggableThumb pos_x={this.state.pos_x} pos_y={this.state.pos_y} onDragStartHandler={this.onDragStartHandler}/>
            </div>
        );
    }
}