import React, {Component} from 'react'
import {
    Dimensions, ImageBackground, Image, StyleSheet,
    TouchableOpacity, View, Animated, TextInput
} from 'react-native'
import CardView from 'react-native-cardview'
import LikeButton from "../like-button"
import Icon from 'react-native-vector-icons/Ionicons'
import DoubleTouchable from '../double-touchable/index'
import {safeCall} from "../../helpers/util";
import {getConstants, getScreenWidth} from "../../helpers/application-helper";
import ShareBar from "../share-bar";

/**
 * This method will give the the relative height of an image with respect
 * to the device's screen width.
 *
 * @param imgWidth
 * @param imgHeight
 * @returns {number}
 */
function getHeightForFullWidth(imgWidth, imgHeight) {
    let {width} = Dimensions.get('window');
    return width * (imgHeight / imgWidth);
}

/**
 * The image holder component that has like, save and share buttons.
 */
export default class Article extends Component {

    constructor(props) {
        super(props);

        let screenWidth = getScreenWidth();
        this.state = {
            // Initialize the view as blank square until the Image is loaded.
            width: screenWidth,
            height: screenWidth,
            shareMode: false,
            shareMessage: '',
            likeOpacity: new Animated.Value(0)
        };
        this._onImageDoublePress = this._onImageDoublePress.bind(this);
        this._onSavePressed = this._onSavePressed.bind(this);
        this._onSharePressed = this._onSharePressed.bind(this);
        this._onLike = this._onLike.bind(this);
        this._onUnlike = this._onUnlike.bind(this);
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

    _onLike() {
        this._playHeartFadeAnimation();
        this.props.onLike()
    }

    _onUnlike() {
        safeCall(this.props.onUnlike)
    }

    _onImageDoublePress() {
        //  refs = Reference to the like button button child component.
        this.refs.likeButton._onPress();
    }

    _onSavePressed() {
        safeCall(this.props.onSave)
    }

    _onSharePressed() {
        this.setState(state => ({shareMode: !state.shareMode}));
    }

    _getDefaultActions() {
        const {iconSize} = getConstants();

        return (<View style={styles.actions}>
            <LikeButton
                onLike={this._onLike}
                onUnlike={this._onUnlike}
                ref="likeButton"
                liked={this.props.liked} size={iconSize}/>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this._onSavePressed}>
                    <Icon name={'md-download'} size={iconSize} color={'black'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onSharePressed} style={{marginLeft: 18}}>
                    <Icon name={'md-share'} size={iconSize} color={'black'}/>
                </TouchableOpacity>
            </View>
        </View>)
    }

    _getActionTray() {
        const onShare = this.props.onShare;
        const onClose = () => this.setState({shareMode: false});

        return this.state.shareMode ?
            <ShareBar onShare={onShare} onClose={onClose}/> :
            this._getDefaultActions()
    }

    render() {

        return (
            <CardView
                cardElevation={3}
                cornerRadius={2}
                style={styles.root}>

                <DoubleTouchable onDoublePress={this._onImageDoublePress}>

                    <ImageBackground
                        style={[{width: this.state.width, height: this.state.height,}, styles.image]}
                        source={this.props.image}>

                        <DoubleTouchable onDoublePress={this._onImageDoublePress}>
                            <Animated.Text style={{opacity: this.state.likeOpacity}}>
                                <Icon name={'md-heart'} size={getScreenWidth() / 2.5} color={'white'}/>
                            </Animated.Text>
                        </DoubleTouchable>

                    </ImageBackground>

                </DoubleTouchable>

                <View style={styles.actionTray}>
                    {this._getActionTray()}
                </View>

            </CardView>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        marginBottom: 20,
        backgroundColor: 'grey',
        flexDirection: 'column'
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionTray: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'rgb(255,255,255)',
    },
    action: {
        fontSize: 30,
        marginHorizontal: 20
    }
});