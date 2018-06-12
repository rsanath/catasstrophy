import React, {Component} from 'react'
import {Image, Text, View, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import CardView from 'react-native-cardview'
import LikeButton from "../like-button"
import Icon from 'react-native-vector-icons/Ionicons'
import DoubleTouchable from '../double-touchable/index'


function getHeightForFullWidth(imgWidth, imgHeight) {
    let {width} = Dimensions.get('window');
    return width * (imgHeight / imgWidth);
}

export default class Article extends Component {

    constructor(props) {
        super(props);

        let screenWidth = Dimensions.get('window').width;
        this.state = {
            width: screenWidth,
            height: screenWidth
        };
        this._onImageDoublePress = this._onImageDoublePress.bind(this);
        this._onSavePressed = this._onSavePressed.bind(this);
    }

    componentDidMount() {
        Image.getSize(this.props.image.uri, (width, height) => {
            this.setState({
                width: Dimensions.get('screen').width,
                height: getHeightForFullWidth(width, height)
            })
        });
    }

    _onImageDoublePress() {
        this.refs.likeButton._onPress();
    }

    _onSavePressed() {
        this.props.onSave && this.props.onSave()
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
                    <LikeButton ref="likeButton" liked={false} size={35}/>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity onPress={this._onSavePressed} >
                            <Icon name={'md-download'} size={35} color={'black'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginLeft: 18
                        }}>
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