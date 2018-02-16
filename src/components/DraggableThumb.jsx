import React from 'react';

require('./DraggableThumb.less');

module.exports = class DraggableThumb extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className="draggable-thumb"
                style={{ top: this.props.pos_y, left: this.props.pos_x }}
                draggable={true}
                onDragStart={this.props.onDragStartHandler}
            >
                Drag Me
            </div>
        );
    }
}