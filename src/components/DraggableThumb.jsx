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
                style={{ top: this.props.pos_y || 0, left: this.props.pos_x || 0 }}
                draggable={true}
                onDragStart={this.props.onDragStartHandler}
            >
                <div className="user-avatar">
                    <img src="/img/Avatar_BIG.jpg" />
                </div>
                <div className="username">
                    {this.props.full_name}
                </div>
            </div>
        );
    }
}