import React, { Component } from 'react'
import HomeScreen from "./screens/home/index"
import ExampleScreen from "./screens/example";

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return <ExampleScreen/>
  }
}