import React, {Component} from 'react'
import {ImageBackground, Image, Animated,} from 'react-native'
import {getHeightForFullWidth, getScreenWidth} from "../../helpers/application-helper";
import DoubleTouchable from "../double-touchable";
import Icon from "react-native-vector-icons/Ionicons";


export default class HeartImage extends Component {

    constructor(props) {
        super(props);
        let screenWidth = getScreenWidth();
        this.state = {
            // Initialize the view as blank square until the Image is loaded.
            width: screenWidth,
            height: screenWidth,
            likeOpacity: new Animated.Value(0)
        };
        this._onDoublePress = this._onDoublePress.bind(this);
        this._playHeartFadeAnimation = this._playHeartFadeAnimation.bind(this);
    }

    componentDidMount() {
        Image.getSize(this.props.image.uri, (width, height) => {
            this.setState({
                height: getHeightForFullWidth(width, height)
            })
        });
    }

    _playHeartFadeAnimation() {
        Animated.sequence([
            Animated.timing(
                this.state.likeOpacity,
                {
                    toValue: 1,
                    duration: 350,
                }),
            Animated.timing(
                this.state.likeOpacity,
                {
                    toValue: 0,
                    duration: 350,
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
                <ImageBackground
                    style={[{width: this.state.width, height: this.state.height,}, styles.image]}
                    source={this.props.image}>

                    <DoubleTouchable onDoublePress={this._onDoublePress}>
                        <Animated.Text style={{opacity: this.state.likeOpacity}}>
                            <Icon name={'md-heart'} size={getScreenWidth() / 2.5} color={'white'}/>
                        </Animated.Text>
                    </DoubleTouchable>

                </ImageBackground>
            </DoubleTouchable>
        )
    }
}

const styles = {
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
};