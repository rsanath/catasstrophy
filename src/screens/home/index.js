import React, {Component} from 'react'
import {View, ActivityIndicator, StyleSheet, FlatList, Alert} from 'react-native'
import Article from '../../components/article/index'
import {getCats} from "../../data/catapi"
import {saveImage} from '../../data/file'
import {checkStoragePermission, requestStoragePermission} from "../../commons/permission";
import {toast} from "../../commons/helper";


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            permissionGranted: false,
        };
        this._loadMore = this._loadMore.bind(this);
        this._refreshContent = this._refreshContent.bind(this);
        this._saveImage = this._saveImage.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    componentDidMount() {
        getCats(10).then(data => this.setState({data}));

        checkStoragePermission().then(result => this.state({permissionGranted: result}))
    }

    _saveImage(url) {
        if (this.state.permissionGranted)
            saveImage(url).then(res => {
                if (res.status === 'success') toast(`Saved at ${res.path}`)
            });
        else
            requestStoragePermission()
                .then(result => {
                    this.setState({permissionGranted: result});
                    if (result === true) this._saveImage(url)
                })
    }

    _renderItem({item}) {
        const onSave = () => this._saveImage(item.url);
        return (
            <Article onSave={onSave} image={{uri: item.url}}/>
        )
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
                    ListFooterComponent={
                        <ActivityIndicator animating={this.state.data.length !== 0} size="large"/>}
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