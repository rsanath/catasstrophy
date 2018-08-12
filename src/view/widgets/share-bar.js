import React, {Component} from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {getConstants} from "../helpers/application-helper";

export default class ShareBar extends Component {

    constructor(props) {
        super(props);
        this.state = {shareMessage: ''};
        this._onShare = this._onShare.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    _onShare() {
        this.props.onShare(this.state.shareMessage);
        this.props.onClose();
    }

    _onBlur() {
        if (this.state.shareMessage.length == 0) {
            // this.props.onClose();
        }
    }

    render() {

        const {iconSize} = getConstants();

        return (
            <View style={styles.root}>
                <TouchableOpacity onPress={this.props.onClose}>
                    <Icon name={'x'} size={iconSize} color={'black'}/>
                </TouchableOpacity>

                <TextInput
                    placeholder={'Enter share message'}
                    style={styles.message}
                    onBlur={this._onBlur}
                    onChangeText={shareMessage => this.setState({shareMessage})}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={this._onShare}
                    autoFocus={true}/>

                <TouchableOpacity onPress={this._onShare}>
                    <Icon name={'share-2'} size={iconSize} color={'black'}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    root: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    message: {
        flex: 1,
        fontSize: 17,
        padding: 0,
    }
};