import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {HeaderBackButton} from 'react-navigation'
import connect from 'react-redux/es/connect/connect'

import Article from '../widgets/article'
import {saveImage} from '../../helpers/save-image-helper'
import {toast} from '../../helpers/application-helper'
import {saveAndShareImage} from '../../helpers/share-image-helper'
import {checkAndRequestStoragePermission} from '../../helpers/permissions-helper'
import {likeItem, unlikeItem} from '../../redux/actions/article-actions'
import {getLikedItems} from '../../redux/actions/likes-actions'


class LikesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>,
            headerTitle: 'Likes'
        };
    };

    constructor(props) {
        super(props);
        this._saveImage = this._saveImage.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._getShareFunction = this._getShareFunction.bind(this);
    }

    componentDidMount() {
        this.props.getLikedItems()
        this.props.navigation.addListener('willFocus', () => this.props.getLikedItems())
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
        const onLike = () => this.props.likeItem(item);
        const onUnlike = () => this.props.unlikeItem(item);

        return <Article
            onLike={onLike}
            onUnlike={onUnlike}
            onShare={onShare}
            onSave={onSave}
            liked={item.liked}
            image={item.url}/>
    }

    render() {
        return (
            <View style={styles.root}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.id}
                    renderItem={this._renderItem}
                    keyboardShouldPersistTaps={'always'}/>
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

const mapStateToProps = ({likes}) => ({...likes});

const mapDispatchToProps = dispatch => ({
    getLikedItems: () => dispatch(getLikedItems()),
    likeItem: item => dispatch(likeItem(item)),
    unlikeItem: item => dispatch(unlikeItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(LikesScreen);