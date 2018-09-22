import React, {Component} from 'react'
import {View} from 'react-native'
import Article from "../widgets/article";

export default class Example extends Component {

    render() {
        const a = () => {}

        return (
            <View style={{flex: 1}} >
                <Article
                    onLike={a}
                    onUnlike={a}
                    onShare={a}
                    onSave={a}
                    liked={false}
                    image={{uri: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'}}/>
            </View>
        )
    }
}
