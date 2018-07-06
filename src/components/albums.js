/**
 * Copyright (c) 2018. Suzhou DHMS Information Technology Co.,Ltd.
 * Author: Wuyuan Created:2018/7/5
 */
import React from 'react'
import {
    ScrollView,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native'

const COVERS = [
    require('../../assets/album-art-1.jpg'),
    require('../../assets/album-art-2.jpg'),
    require('../../assets/album-art-3.jpg'),
    require('../../assets/album-art-4.jpg'),
    require('../../assets/album-art-5.jpg'),
    require('../../assets/album-art-6.jpg'),
    require('../../assets/album-art-7.jpg'),
    require('../../assets/album-art-8.jpg'),
    require('../../assets/album-art-1.jpg'),
    require('../../assets/album-art-2.jpg'),
    require('../../assets/album-art-3.jpg'),
    require('../../assets/album-art-4.jpg'),
    require('../../assets/album-art-5.jpg'),
    require('../../assets/album-art-6.jpg'),
    require('../../assets/album-art-7.jpg'),
    require('../../assets/album-art-8.jpg'),
]

export default class Albums extends React.Component {
    render () {
        const items = this.renderItems()
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
            >
                {items}
            </ScrollView>
        )
    }

    renderItems = () => {
        const ret = []
        for (let [index, source] of COVERS.entries()) {
            ret.push(
                <Image
                    key={index}
                    source={source}
                    style={styles.cover}
                />
            )
        }

        if (!ret.length) {
            return null
        }

        return ret
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#343c46',
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cover: {
        width: '50%',
        height: Dimensions.get('window').width / 2,
    },
})
