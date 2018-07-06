import React, {Component} from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {getConstants} from "../../helpers/application-helper";

export default class ShareBar extends Component {

    constructor(props) {
        super(props);
        this.state = {shareMessage: ''};
        this._onShare = this._onShare.bind(this);
    }

    _onShare() {
        this.props.onShare(this.state.shareMessage);
        this.props.onClose();
    }

    render() {

        const {iconSize} = getConstants();

        return (
            <View style={styles.root}>
                <TouchableOpacity onPress={this.props.onClose}>
                    <Icon name={'x'} size={iconSize} color={'black'}/>
                </TouchableOpacity>

                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    autoFocus={true}
                    placeholder={'Enter share message'}
                    style={styles.message}
                    onChangeText={shareMessage => this.setState({shareMessage})}/>

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
        flexDirection: 'row',
        alignItems: 'center'
    },
    message: {
        flex: 1,
        fontSize: 20
    }
};