import React, {Component} from 'react'
import {View, Text, ScrollView} from 'react-native'
import {getCats} from "../data/catapi"
import HomeScreen from "./home/index";

export default class ExampleScreen extends Component {

    componentDidMount() {
        getCats()
    }

    render(): any {
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