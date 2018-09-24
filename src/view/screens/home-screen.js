import React, {Component} from 'react'
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'

import Article from '../widgets/article'
import {fetchCats, fetchMoreCats, refreshCats} from '../../redux/actions/home-actions'
import {likeItem, unlikeItem, saveImage, shareImage} from '../../redux/actions/article-actions'


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
        this._getShareFunction = this._getShareFunction.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({goToLikesScreen: this._goToLikesScreen.bind(this)});
        this.props.fetchCats();
    }

    _goToLikesScreen() {
        this.props.navigation.navigate('Likes')
    }

    _getShareFunction(item) {
        return async (message) => {
            await shareImage(item, message)
        }
    }

    _renderItem({item}) {
        return <Article
            onLike={() => this.props.likeItem(item)}
            onUnlike={() => this.props.unlikeItem(item)}
            onShare={this._getShareFunction(item)}
            onSave={() => this.props.saveImage(item)}
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
    unlikeItem: item => dispatch(unlikeItem(item)),
    saveImage: item => dispatch(saveImage(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);