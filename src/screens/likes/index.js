import React, {Component} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {getLikedImages, likeImage, removeLike} from "../../helpers/likes-helper";
import Article from "../../components/article";
import { HeaderBackButton } from 'react-navigation';


export default class LikesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
            headerTitle: 'Likes'
        };
    };

    constructor(props) {
        super(props);
        this.state = {data: []};
        this._renderItem = this._renderItem.bind(this);
    }

    async componentDidMount() {
        this.setState({data: await getLikedImages()})
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