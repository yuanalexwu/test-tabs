/**
 * Copyright (c) 2018. Suzhou DHMS Information Technology Co.,Ltd.
 * Author: Wuyuan Created:2018/7/5
 */
import React from 'react'
import {
    ScrollView,
    View,
    Image,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native'
import avatar1 from '../../assets/avatar-1.png'
import avatar2 from '../../assets/avatar-2.png'

const MESSAGES = [
    'okay',
    'sudo make me a sandwich',
    'what? make it yourself',
    'make me a sandwich',
]

export default class Chat extends React.Component {
    render () {
        const items = this.renderItem()

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.inverted}
                    contentContainerStyle={styles.content}
                >
                    {items}
                </ScrollView>
                <TextInput
                    style={styles.input}
                    placeholder={'Write a message'}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        )
    }

    renderItem = () => {
        const ret = []
        for (let [i, text] of MESSAGES.entries()) {
            const isOdd = i % 2
            const wrapperStyle = [
                styles.inverted,
                isOdd ? styles.odd : styles.even,
            ]
            const avatarSource = isOdd ? avatar2 : avatar1
            const textWrapperStyle = [
                styles.bubble,
                isOdd ? styles.received : styles.sent,
            ]
            const textStyle = isOdd ? styles.receivedText : styles.sentText

            ret.push(
                <View
                    key={i}
                    style={wrapperStyle}
                >
                    <Image
                        style={styles.avatar}
                        source={avatarSource}
                    />
                    <View style={textWrapperStyle}>
                        <Text style={textStyle}>{text}</Text>
                    </View>
                </View>
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
        flex: 1,
        backgroundColor: '#eceff1',
    },
    inverted: {
        transform: [{scaleY: -1}],
    },
    content: {
        padding: 16,
    },
    even: {
        flexDirection: 'row',
    },
    odd: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        marginVertical: 8,
        marginHorizontal: 6,
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.16)',
        borderWidth: StyleSheet.hairlineWidth,
    },
    bubble: {
        marginVertical: 8,
        marginHorizontal: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    sent: {
        backgroundColor: '#cfd8dc',
    },
    received: {
        backgroundColor: '#2196f3',
    },
    sentText: {
        color: '#000000',
    },
    receivedText: {
        color: '#ffffff',
    },
    input: {
        height: 48,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#ffffff',
    },
})
