import React, {Component} from 'react'
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native'
import Article from '../../components/article/index'
import {getCats} from "../../data/catapi"
import {saveImage} from '../../data/file-system/file'


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            isLoadingMore: false,
        };
        this._loadMore = this._loadMore.bind(this);
        this._refreshContent = this._refreshContent.bind(this);
    }

    componentDidMount() {
        getCats(10).then(data => this.setState({data}))
    }

    _renderItem({item}) {
        const _save = () => saveImage(item.url).then((res) => {
            console.log('The file saved to ', res.path())
        });
        return (
            <Article onSave={_save} image={{uri: item.url}}/>
        )
    }

    _loadMore({distanceFromEnd}) {
        this.setState({isLoadingMore: true});
        getCats(6).then(result => {
            this.setState({
                isLoadingMore: false,
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
                    ListFooterComponent={<ActivityIndicator animating={this.state.data.length != 0} size="large"/>}
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