import React, {Component} from 'react'
import {TouchableWithoutFeedback} from 'react-native'

export default class DoubleTouchable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doublePressDelay: props.doublePressDelay || 300,
            onPress: props.onPress || (() => null),
            onDoublePress: props.onDoublePress || (() => null)
        };
        this.handlePress = this.handlePress.bind(this)
    }

    handlePress(e) {
        const now = new Date().getTime();

        this.state.onPress(e);

        if (this.lastPress && (now - this.lastPress) < this.state.doublePressDelay) {
            delete this.lastPress;

            this.state.onDoublePress(e);
        }
        else {
            this.lastPress = now;
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback {...this.props} onPress={this.handlePress}>
                {this.props.children}
            </TouchableWithoutFeedback>
        )
    }
}