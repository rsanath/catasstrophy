import React, {Component} from 'react'
import RootNavigator from './screens/navigator';

console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return <RootNavigator/>
    }
}