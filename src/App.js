import React, {Component} from 'react'
import RootNavigator from './view/screens/navigator'
import {Provider} from 'react-redux'
import store from './redux/store'
import Example from './view/screens/example'


console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return (
            //<Example/>
            <Provider store={store}>
                <RootNavigator/>
            </Provider>
        )
    }
}