import React, {Component} from 'react'
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'

import Article from '../widgets/article'
import {fetchCats, fetchMoreCats, refreshCats} from '../../redux/actions/home-actions'
import {saveImage} from '../../helpers/save-image-helper'
import {checkAndRequestStoragePermission} from '../../helpers/permissions-helper'
import {toast} from '../../helpers/application-helper'
import {saveAndShareImage} from '../../helpers/share-image-helper'
import {likeItem, unlikeItem} from '../../redux/actions/article-actions'


class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => {
        let viewLikesButton = (
            <TouchableOpacity onPress={navigation.getParam('goToLikesScreen')}>
                <Icon style={{marginRight: 13}} name={'md-heart'} size={30} color={'black'}/>
            </TouchableOpacity>);

        return {
            headerTitle: 'Cats',
            headerRight: viewLikesButton,
        };
    }

    constructor(props) {
        super(props);
        this._saveImage = this._saveImage.bind(this);
        this._getShareFunction = this._getShareFunction.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({goToLikesScreen: this._goToLikesScreen.bind(this)});
        this.props.fetchCats();
    }

    _goToLikesScreen() {
        this.props.navigation.navigate('Likes')
    }

    async _saveImage(url) {
        if (!(await checkAndRequestStoragePermission())) return;
        toast('Saving image...');
        saveImage(url).then(res => {
            if (res.successful) toast(`Saved at ${res.path}`);
            else toast('Unable to save image.');
        });
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
            <FlatList
                data={this.props.data}
                keyExtractor={item => item.id}
                renderItem={this._renderItem.bind(this)}
                onEndReached={this.props.fetchMoreCats}
                onEndReachedThreshold={1}
                ListFooterComponent={<ActivityIndicator size="large"/>}
                refreshing={this.props.refreshing}
                onRefresh={this.props.refreshCats}
                keyboardShouldPersistTaps={'always'}/>
        )
    }
}

const mapStateToProps = ({home}) => ({...home});

const mapDispatchToProps = dispatch => ({
    fetchCats: () => dispatch(fetchCats()),
    fetchMoreCats: () => dispatch(fetchMoreCats()),
    refreshCats: () => dispatch(refreshCats()),
    likeItem: item => dispatch(likeItem(item)),
    unlikeItem: item => dispatch(unlikeItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);