import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View, Animated, Platform} from 'react-native'
import CardView from 'react-native-cardview'
import LikeButton from './like-button'
import Icon from 'react-native-vector-icons/Feather'
import {safeCall} from '../../helpers/util'
import {getConstants} from '../../helpers/application-helper'
import ShareBar from './share-bar'
import HeartImage from './heart-image'


/**
 * The image holder component that has like, save and share buttons.
 */
export default class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shareMode: false,
            shareMessage: '',
            likeOpacity: new Animated.Value(0)
        };
        this._getDefaultActionTray = this._getDefaultActionTray.bind(this);
    }

    _onLike() {
        if (this.props.liked) return;
        safeCall(this.props.onLike)
    }

    _onUnlike() {
        if (!this.props.liked) return;
        safeCall(this.props.onUnlike)
    }

    _onSavePressed() {
        safeCall(this.props.onSave)
    }

    _onSharePressed() {
        this.setState(state => ({shareMode: !state.shareMode}));
    }

    _getDefaultActionTray() {
        const {iconSize} = getConstants();

        return (<View style={styles.actions}>
            <LikeButton
                onLike={this._onLike.bind(this)}
                onUnlike={this._onUnlike.bind(this)}
                ref="likeButton"
                liked={this.props.liked}
                size={iconSize}/>

            <View style={{flexDirection: 'row'}}>

                <TouchableOpacity onPress={this._onSavePressed.bind(this)}>
                    <Icon name={'save'} size={iconSize} color={'black'}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._onSharePressed.bind(this)} style={{marginLeft: 5}}>
                    <Icon name={'share-2'} size={iconSize} color={'black'}/>
                </TouchableOpacity>

            </View>
        </View>)
    }

    _getActionTray() {
        const onShare = this.props.onShare;
        const onClose = () => this.setState({shareMode: false});

        return this.state.shareMode ?
            <ShareBar onShare={onShare} onClose={onClose}/> :
            this._getDefaultActionTray()
    }

    render() {

        return (
            <CardView
                cardElevation={3}
                cornerRadius={2}
                style={styles.root}>

                <HeartImage
                    image={this.props.image}
                    onDoublePress={this._onLike.bind(this)}/>

                <View style={styles.actionTray}>
                    {this._getActionTray()}
                </View>

            </CardView>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        marginBottom: 15,
        backgroundColor: 'grey',
        flexDirection: 'column'
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionTray: {
        flexDirection: 'row',
        marginBottom: Platform.OS == 'android' ? 7 : 0,  // To fix margin issue in react-native-card-view
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'rgb(255,255,255)',
    },
    action: {
        fontSize: 30,
        marginHorizontal: 20
    }
});