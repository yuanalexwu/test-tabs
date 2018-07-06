/**
 * Copyright (c) 2018. Suzhou DHMS Information Technology Co.,Ltd.
 * Author: Wuyuan Created:2018/7/5
 */
import React from 'react'
import {
    View,
    Text,
} from 'react-native'
import {Badge} from 'react-native-elements'
import MyTabs from './components/my_tabs'
import Article from './components/article'
import Contacts from './components/contacts'
import Albums from './components/albums'
import Chat from './components/chat'

const viewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
}
const Foo = () => <View style={viewStyle}><Text>dadfadsfadsf</Text></View>

export default class Main extends React.Component {
    state = {
        activeKey: 'contacts',
        routes: [
            {key: 'article', title: 'Article', component: Article},
            {key: 'contacts', title: 'Contacts', component: Contacts},
            {key: 'albums', title: 'Albums', component: Albums},
            {key: 'chat', title: 'Chat', component: Chat},
            {key: 'test', title: 'Test', component: Foo},
        ],
    }

    render () {
        const {
            activeKey = '',
            routes = [],
        } = this.state

        const containerStyle = {
            marginTop: 40,
        }

        return (
            <MyTabs
                activeKey={activeKey}
                routes={routes}
                onChange={this.handleTabChange}
                renderBadge={this.renderBadge}
                containerStyle={containerStyle}
            />
        )
    }

    renderBadge = route => {
        const containerStyle = {
            backgroundColor: 'blue',
        }
        const textStyle = {
            color: '#ffffff',
        }

        return (
            <Badge
                value={100}
                containerStyle={containerStyle}
                textStyle={textStyle}
            />
        )
    }

    handleTabChange = (activeKey, route) => {
        this.setState({activeKey})
    }
}
