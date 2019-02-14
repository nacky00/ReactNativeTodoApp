/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react'
import {AppRegistry} from 'react-native'
import { Provider } from 'react-redux'
import store from './app/store'
import MainComponent from './app/components/Main'

const App = () => {
    return (
        <Provider store={store}>
            <MainComponent />
        </Provider>
    )
}
AppRegistry.registerComponent('todolist', () => App);

