import React, {Component} from 'react'
import ExampleScreen from "./screens/example";

console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return <ExampleScreen/>
    }
}