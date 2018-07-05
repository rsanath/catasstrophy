import React, {Component} from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
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
                    <Icon name={'md-close'} size={iconSize} color={'black'}/>
                </TouchableOpacity>

                <TextInput
                    autoFocus={true}
                    placeholder={'Enter share message'}
                    style={{flex: 1}}
                    onChangeText={shareMessage => this.setState({shareMessage})}/>

                <TouchableOpacity onPress={this._onShare}>
                    <Icon name={'md-share'} size={iconSize} color={'black'}/>
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
    }
}