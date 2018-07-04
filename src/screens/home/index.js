import React, {Component} from 'react'
import {View, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import Article from '../../components/article/index'
import {getCats} from "../../data/catapi"
import {saveImage} from '../../helpers/save-image-helper'
import {checkAndRequestStoragePermission} from "../../helpers/permissions-helper";
import {toast} from "../../helpers/application-helper";
import {saveAndShareImage} from "../../helpers/share-image-helper";
import {likeImage, removeLike} from "../../helpers/likes-helper";
import Icon from 'react-native-vector-icons/Ionicons'


export default class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => {
        let viewLikesButton = (
            <TouchableOpacity onPress={navigation.getParam('goToLikesScreen')}>
                <Icon style={{marginRight: 13}} name={'md-heart'} size={30} color={'black'}/>
            </TouchableOpacity>);

        return {
            headerTitle: 'Cats',
            headerRight: viewLikesButton,
        };
    };

    constructor(props) {
        super(props);
        this.state = {data: [], refreshing: false,};
        this._loadMore = this._loadMore.bind(this);
        this._refreshContent = this._refreshContent.bind(this);
        this._saveImage = this._saveImage.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._shareImage = this._shareImage.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({goToLikesScreen: this._goToLikesScreen.bind(this)});
        getCats(10).then(data => this.setState({data}))
    }

    _goToLikesScreen() {
        this.props.navigation.navigate('Likes')
    }

    async _saveImage(url) {
        if (await checkAndRequestStoragePermission()) {
            toast('Saving image...');
            saveImage(url).then(res => {
                if (res.successful) toast(`Saved at ${res.path}`)
            });
        }
    }

    async _shareImage(url) {
        if (await checkAndRequestStoragePermission()) {
            toast('Saving and sharing image...');
            saveAndShareImage(url)
        }
    }

    _renderItem({item}) {
        const onSave = () => this._saveImage(item.url);
        const onShare = () => this._shareImage(item.url);
        const onLike = () => likeImage(item.url);
        const onUnlike = () => removeLike(item.url);

        return <Article
            onLike={onLike}
            onUnlike={onUnlike}
            onShare={onShare}
            onSave={onSave}
            liked={false}
            image={{uri: item.url}}/>
    }

    _loadMore() {
        getCats(6).then(result => {
            this.setState({
                data: [...this.state.data, ...result]
            })
        })
    }

    /**
     * Pull to refresh's callback
     *
     * @private
     */
    _refreshContent() {
        this.setState({refreshing: true});
        getCats().then(data => this.setState({data, refreshing: false}))
    }

    render() {
        return (
            <View style={styles.root}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.id}
                    renderItem={this._renderItem}
                    onEndReached={this._loadMore}
                    onEndReachedThreshold={1}
                    ListFooterComponent={<ActivityIndicator size="large"/>}
                    refreshing={this.state.refreshing}
                    onRefresh={this._refreshContent}/>
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