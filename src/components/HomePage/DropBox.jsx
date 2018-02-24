import React from 'react';

require('./DropBox.less');

const DraggableThumb = require('./DraggableThumb.jsx');
const Loading = require('../global/Loading.jsx');

const { positionManager } = require('../../singletons');

module.exports = class DropBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading_positions: true,
            drag_begin_x : 0,
            drag_begin_y : 0,
            pos_x : 0,
            pos_y : 0,
        }
        this.onDragStartHandler = this.onDragStartHandler.bind(this);
        this.onDropHandler = this.onDropHandler.bind(this);
    }

    componentWillMount() {

        positionManager.loadPosition().then(positions => {
            console.log("Init positions:", positions);
            this.setState({loading_positions : false}, () => {
                let { pos_x, pos_y } = positionManager.limit(positions, this.dropbox, this.draggable);
                this.setState({pos_x, pos_y});
            });
        })

    }

    onDragStartHandler(event) {
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
        let pos_x, pos_y;
        this.setState(prevState => {

            let positions = positionManager.limit({
                pos_x : prevState.pos_x + drop_x - prevState.drag_begin_x,
                pos_y : prevState.pos_y + drop_y - prevState.drag_begin_y,
            }, this.dropbox, this.draggable);

            pos_x = positions.pos_x;
            pos_y = positions.pos_y;

            return {
                pos_x,
                pos_y,
                drag_begin_x : 0,
                drag_begin_y : 0,
            }

        }, () => { positionManager.savePosition(pos_x, pos_y); })
    }

    render() {
        return (
            <div >
                {
                    this.state.loading_positions ? 

                    <Loading /> :

                    <div

                        ref={el => { this.dropbox = el; }}
                        className="drop-box"
                        onDrop={this.onDropHandler}
                        onDragOver={this.onDragOverHandler}>

                        <DraggableThumb

                            getElement={el => { this.draggable = el}}
                            full_name={this.props.full_name}
                            pos_x={this.state.pos_x}
                            pos_y={this.state.pos_y}
                            onDragStartHandler={this.onDragStartHandler} />

                    </div>
                }
            </div>
        );
    }
}