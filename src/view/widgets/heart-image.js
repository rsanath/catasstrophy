import React, {Component} from 'react'
import {Animated} from 'react-native'
import {getScreenWidth, log} from '../../helpers/application-helper'
import DoubleTouchable from '../../widgets/double-touchable'
import Icon from 'react-native-vector-icons/Ionicons'
import CacheImage from '../widgets/cache-image'


export default class HeartImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            likeOpacity: new Animated.Value(0)
        };
        this._onDoublePress = this._onDoublePress.bind(this);
        this._playHeartFadeAnimation = this._playHeartFadeAnimation.bind(this);
    }

    _playHeartFadeAnimation() {
        Animated.sequence([
            Animated.timing(
                this.state.likeOpacity,
                {
                    toValue: 1,
                    duration: 350,
                    useNativeDriver: true
                }),
            Animated.timing(
                this.state.likeOpacity,
                {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true
                })
        ]).start();
    }

    _onDoublePress() {
        this._playHeartFadeAnimation();
        this.props.onDoublePress();
    }

    render() {
        return (
            <DoubleTouchable onDoublePress={this._onDoublePress}>
                <CacheImage
                    style={styles.image}
                    url={this.props.image}>

                    <DoubleTouchable onDoublePress={this._onDoublePress}>
                        <Animated.Text style={{opacity: this.state.likeOpacity}}>
                            <Icon name={'md-heart'} size={getScreenWidth() / 2.5} color={'white'}/>
                        </Animated.Text>
                    </DoubleTouchable>

                </CacheImage>
            </DoubleTouchable>
        )
    }
}

const styles = {
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    }
};