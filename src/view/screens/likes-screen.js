import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {HeaderBackButton} from 'react-navigation'
import connect from 'react-redux/es/connect/connect'

import Article from '../widgets/article'
import {likeItem, saveImage, shareImage, unlikeItem} from '../../redux/actions/article-actions'
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
        this._renderItem = this._renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getLikedItems()
        this.props.navigation.addListener('willFocus', () => this.props.getLikedItems())
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
    unlikeItem: item => dispatch(unlikeItem(item)),
    saveImage: item => dispatch(saveImage(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(LikesScreen);