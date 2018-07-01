import React, {Component} from 'react'
import HomeScreen from "./screens/home";

console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return <HomeScreen/>
    }
}