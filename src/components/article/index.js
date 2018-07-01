import React, {Component} from 'react'
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import CardView from 'react-native-cardview'
import LikeButton from "../like-button"
import Icon from 'react-native-vector-icons/Ionicons'
import DoubleTouchable from '../double-touchable/index'
import {safeCall} from "../../helpers/util";

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

        let screenWidth = Dimensions.get('window').width;
        this.state = {
            // Initialize the view as blank square until the Image is loaded.
            width: screenWidth,
            height: screenWidth
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

    _onLike() {
        safeCall(this.props.onLike)
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
        safeCall(this.props.onShare)
    }

    render() {
        return (
            <CardView
                cardElevation={3}
                cornerRadius={2}
                style={styles.root}>
                <DoubleTouchable onDoublePress={this._onImageDoublePress}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            width: this.state.width,
                            height: this.state.height,
                        }}
                        source={this.props.image}/>
                </DoubleTouchable>
                <View style={styles.actions}>
                    <LikeButton
                        onLike={this._onLike}
                        onUnlike={this._onUnlike}
                        ref="likeButton"
                        liked={false} size={35}/>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity onPress={this._onSavePressed}>
                            <Icon name={'md-download'} size={35} color={'black'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._onSharePressed} style={{marginLeft: 18}}>
                            <Icon name={'md-share'} size={35} color={'black'}/>
                        </TouchableOpacity>
                    </View>
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
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'rgb(255,255,255)',
    },
    action: {
        fontSize: 30,
        marginHorizontal: 20
    }
});