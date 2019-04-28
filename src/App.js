import React, {Component} from 'react'
import RootNavigator from './view/screens/navigator'
import {Provider} from 'react-redux'
import store from './redux/store'


console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootNavigator/>
            </Provider>
        )
    }
}