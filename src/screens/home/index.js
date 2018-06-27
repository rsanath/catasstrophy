import React, {Component} from 'react'
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native'
import Article from '../../components/article/index'
import {getCats} from "../../data/catapi"
import {saveImage} from '../../helpers/save-image-helper'
import {checkAndRequestStoragePermission} from "../../helpers/permission";
import {toast} from "../../helpers/helper";


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {data: [], refreshing: false,};
        this._loadMore = this._loadMore.bind(this);
        this._refreshContent = this._refreshContent.bind(this);
        this._saveImage = this._saveImage.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    async componentDidMount() {
        this.setState({
            data: await getCats(10),
        });
    }

    async _saveImage(url) {
        if (await checkAndRequestStoragePermission())
            toast('Saving image...');
            saveImage(url).then(res => {if (res.successful) toast(`Saved at ${res.path}`)});
    }

    _renderItem({item}) {
        const onSave = () => this._saveImage(item.url);
        const onShare = () => toast('share');

        return <Article onShare={onShare} onSave={onSave} image={{uri: item.url}}/>
    }

    _loadMore({distanceFromEnd}) {
        getCats(6).then(result => {
            this.setState({
                data: [...this.state.data, ...result]
            })
        })
    }

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