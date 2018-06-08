import React, {Component} from 'react'
import {View} from 'react-native'
import HomeScreen from "./home/index";

export default class ExampleScreen extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'rgb(250,250,250)'
            }}>
                <HomeScreen/>
            </View>
        )
    }
}