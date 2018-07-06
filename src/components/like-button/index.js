import React, {Component} from 'react'
import {TouchableOpacity} from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import {safeCall} from "../../helpers/util";

/**
 * An Instagram style like button
 */
export default class LikeButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.color || 'firebrick',
            size: props.size || 30,
        };
        this._onPress = this._onPress.bind(this)
    }

    _getIcon() {
        let size = this.state.size || 30;
        let color = this.props.liked ? this.state.color : 'black';

        return this.props.liked ?
            <Ionicon name={'md-heart'} size={size} color={color} /> :
            <Ionicon name={'md-heart-outline'} size={size} color={color} />
    }

    _onPress() {
        if (this.props.liked) {
            safeCall(this.props.onUnlike)
        } else {
            safeCall(this.props.onLike)
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                {this._getIcon()}
            </TouchableOpacity>
        )
    }
}