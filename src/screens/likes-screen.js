import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {getLikedImages, likeImage, removeLike} from '../helpers/likes-helper'
import Article from "../widgets/article"
import {HeaderBackButton} from 'react-navigation'
import {checkAndRequestStoragePermission} from '../helpers/permissions-helper'
import {saveAndShareImage} from "../helpers/share-image-helper"
import {toast} from '../helpers/application-helper'
import {saveImage} from '../helpers/save-image-helper'


export default class LikesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>,
            headerTitle: 'Likes'
        };
    };

    constructor(props) {
        super(props);
        this.state = {data: []};
        this._saveImage = this._saveImage.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._getShareFunction = this._getShareFunction.bind(this);
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus',
            async () => this.setState({data: await getLikedImages()})
        )
    }

    async _saveImage(url) {
        if (await checkAndRequestStoragePermission()) {
            toast('Saving image...');
            saveImage(url).then(res => {
                if (res.successful) toast(`Saved at ${res.path}`)
            });
        }
    }

    _getShareFunction(url) {
        return async (message) => {
            if (!(await checkAndRequestStoragePermission())) return;
            toast('Saving and sharing image...');
            saveAndShareImage(url, message);
        }
    }

    _renderItem({item}) {
        const onSave = () => this._saveImage(item.url);
        const onShare = this._getShareFunction(item.url);
        const onLike = () => likeImage(item.url);
        const onUnlike = () => removeLike(item.url);

        return <Article
            onLike={onLike}
            onUnlike={onUnlike}
            onShare={onShare}
            onSave={onSave}
            liked={true}
            image={{uri: item.url}}/>
    }

    render() {
        return (
            <View style={styles.root}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.id}
                    renderItem={this._renderItem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)'
    }
});