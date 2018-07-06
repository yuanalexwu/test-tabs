/**
 * Copyright (c) 2018. Suzhou DHMS Information Technology Co.,Ltd.
 * Author: Wuyuan Created:2018/7/5
 */
import React from 'react'
import lodash from 'lodash'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native'
import {
    TabView,
    TabBar,
    SceneMap,
} from 'react-native-tab-view'

const DEFAULT_TAB_CONTAINER_COLOR = '#fff'
const DEFAULT_ACTIVE_COLOR = '#2a66ef'

const INITIAL_LAYOUT = {
    height: 0,
    width: Dimensions.get('window').width,
}

class MyTabs extends React.Component {
    render () {
        const navigationState = this.parseNavigationState()
        const {
            containerStyle = {},
        } = this.props
        return (
            <TabView
                style={[styles.container, containerStyle]}
                navigationState={navigationState}
                renderScene={this.parseRenderScene()}
                renderTabBar={this.renderTabBar}
                onIndexChange={this.handleIndexChange}
                initialLayout={INITIAL_LAYOUT}
            />
        )
    }

    parseNavigationState = () => {
        const {
            activeKey = '',
            routes = [],
        } = this.props
        const index = lodash.findIndex(routes, {key: activeKey})
        return {
            index,
            routes,
        }
    }

    parseRenderScene = () => {
        const ret = {}
        const {routes = []} = this.props
        for (let route of routes) {
            const key = lodash.get(route, 'key')
            const component = lodash.get(route, 'component') || null
            if (!key) {
                continue
            }
            ret[key] = component
        }

        return SceneMap(ret)
    }

    renderTabBar = props => {
        const {
            tabContainerBackgroundColor = DEFAULT_TAB_CONTAINER_COLOR,
            underlineBarStyle = {},
            tabStyle = {},
            activeColor = DEFAULT_ACTIVE_COLOR,
        } = this.props

        const tabContainerStyle = {
            backgroundColor: tabContainerBackgroundColor,
        }
        const activeBackgroundColorStyle = {
            backgroundColor: activeColor,
        }

        return (
            <TabBar
                {...props}
                scrollEnabled
                style={[tabContainerStyle]}
                indicatorStyle={[
                    styles.indicator,
                    activeBackgroundColorStyle,
                    underlineBarStyle,
                ]}
                tabStyle={[
                    styles.tab,
                    tabStyle,
                ]}
                renderBadge={this.renderBadge}
                renderLabel={this.renderLabel}
            />
        )
    }

    renderLabel = ({route}) => {
        const {
            activeKey = '',
            titleTextStyle = {},
            activeColor = DEFAULT_ACTIVE_COLOR,
        } = this.props
        const key = lodash.get(route, 'key')
        const title = lodash.get(route, 'title') || ''
        const labelStyle = [
            styles.label,
            titleTextStyle,
        ]

        const isSelect = key === activeKey
        if (isSelect) {
            labelStyle.push({color: activeColor})
        }

        return (
            <Text style={labelStyle}>{title}</Text>
        )
    }

    renderBadge = ({route = {}}) => {
        return this.props.renderBadge(route)
    }

    handleIndexChange = index => {
        const {
            routes = [],
        } = this.props
        const route = routes[index]
        const key = lodash.get(route, 'key')
        if (!key) {
            return
        }

        this.props.onChange(key, route)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: DEFAULT_ACTIVE_COLOR,
        marginBottom: 3,
        marginLeft: 40,
    },
    label: {
        margin: 0,
        padding: 0,
        color: '#333333',
        fontSize: 15,
    },
})

MyTabs.propTypes = {
    /**
     * The current actived key
     */
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /**
     * Tab info list need to render
     * key: The tab id
     * title: The tab title
     */
    routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        component: PropTypes.any.isRequired,
    })).isRequired,
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
     * Active color for tab title and indicator's background
     */
    activeColor: PropTypes.string,

    /**
     * A callback function to render a custom Badge node
     *
     * route: The current route data
     *
     * eg:
     * renderBadge: (route) => {
     *  return <Badge value={10} />
     * }
     */
    renderBadge: PropTypes.func,

    /**
     * Custom container style
     */
    containerStyle: PropTypes.object,
    /**
     * Custom tab container background color
     */
    tabContainerBackgroundColor: PropTypes.string,
    /**
     * Custom tab style
     */
    tabStyle: PropTypes.object,
    /**
     * Custom title text style
     */
    titleTextStyle: PropTypes.object,
    /**
     * Custom underline bar style
     */
    underlineBarStyle: PropTypes.object,
}

MyTabs.defaultProps = {
    activeKey: '',
    routes: [],
    onChange: lodash.noop,
    activeColor: DEFAULT_ACTIVE_COLOR,
    renderBadge: () => null,
    containerStyle: {},
    tabContainerBackgroundColor: DEFAULT_TAB_CONTAINER_COLOR,
    tabStyle: {},
    titleTextStyle: {},
    underlineBarStyle: {},
}

export default MyTabs
