/**
 * Copyright (c) 2018. Suzhou DHMS Information Technology Co.,Ltd.
 * Author: Wuyuan Created:2018/7/5
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    LayoutStyle,
    TextStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import ColorPropTypes from 'react-native/Libraries/StyleSheet/ColorPropType'
import {
    StyleSheet,
    Dimensions,
} from 'react-native'
import {Constants} from 'expo'
import {
    Badge,
} from 'react-native-elements'
import {
    TabView,
    TabBar,
    SceneMap,
} from 'react-native-tab-view'
import Article from './components/article'
import Contacts from './components/contacts'
import Albums from './components/albums'
import Chat from './components/chat'

const INITIAL_LAYOUT = {
    height: 0,
    width: Dimensions.get('window').width,
}

class MyTabs extends React.Component {
    state = {
        index: 1,
        routes: [
            {key: 'article', title: 'Article'},
            {key: 'contacts', title: 'Contacts'},
            {key: 'albums', title: 'Albums'},
            {key: 'chat', title: 'Chat'},
        ],
    }

    render () {
        const {
            style,
        } = this.props
        const containerStyle = [styles.container, style]
        return (
            <TabView
                style={containerStyle}
                navigationState={this.state}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
                onIndexChange={this.handleIndexChange}
                initialLayout={INITIAL_LAYOUT}
            />
        )
    }

    renderTabBar = props => {
        console.log('renderTabBar ', props)
        return (
            <TabBar
                {...props}
                scrollEnabled
                indicatorStyle={styles.indicator}
                style={styles.tabbar}
                tabStyle={styles.tab}
                labelStyle={styles.label}
                renderBadge={this.renderBadge}
            />
        )
    }

    renderBadge = ({route = {}}) => {
        console.log('renderBadge ', route)
        const containerStyle = {
            backgroundColor: '#08f',
            padding: 0,
            margin: 0,
        }
        const textStyle = {
            color: '#fff',
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 5,
            paddingRight: 5,
            margin: 0,
            fontSize: 16,
            lineHeight: 16,
        }

        return (
            <Badge
                value={100}
                containerStyle={containerStyle}
                textStyle={textStyle}
            />
        )
    }

    renderScene = SceneMap({
        albums: Albums,
        contacts: Contacts,
        article: Article,
        chat: Chat,
    })

    handleIndexChange = index => {
        this.setState({index})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    tabbar: {
        backgroundColor: '#cccccc',
    },
    tab: {
        height: 40,
        width: 120,
        margin: 0,
        padding: 0,
    },
    indicator: {
        height: 2,
        width: 40,
        backgroundColor: '#3f51b5',
        position: 'relative',
        marginTop: 40 - 2,
        marginLeft: 40,
    },
    label: {
        margin: 0,
        padding: 0,
        color: '#000',
        fontWeight: '400',
    },
})

const activeKeyPropTypes = PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
MyTabs.propTypes = {
    /**
     * The current actived key
     */
    activeKey: activeKeyPropTypes,
    /**
     * Tab info list need to render
     * key: The tab id
     * title: The tab title
     */
    routes: PropTypes.arrayOf(PropTypes.shape({
        key: activeKeyPropTypes,
        title: PropTypes.string.isRequired,
        component: PropTypes.node.isRequired,
    })).isRequired,

    /**
     * A callback function to render a custom Badge node
     *
     * key: The current changed key
     * route: The current route data
     *
     * eg:
     * renderBadge: (key, route) => {
     *  return <Badge value={10} />
     * }
     */
    renderBadge: PropTypes.func,

    /**
     * U'll get  `key` as the first argument and `route data` as the second argument,
     * Specified in props `routes`
     * U should save is as the `activeKey` in your wrapper component
     *
     * key: The current changed key
     * route: The current route data
     *
     * eg:
     * onChange = (key, route) => {
     *  this.setState({activeKey: key})
     * }
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Custom tab style
     */
    tabStyle: LayoutStyle,
    /**
     * Custom title text style
     */
    titleTextStyle: TextStyle,
    /**
     * Active title text color
     */
    titleTextActiveColor: ColorPropTypes,
    /**
     * Custom underline bar style
     */
    underlineBarStyle: LayoutStyle,
}
MyTabs.defaultProps = {
    activeKey: '',
}

export default MyTabs
