import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function SearchResultScreen({route}:any) {
    return (
        <View>
            <Text>Search Result lon:{route.params.lon} lat:{route.params.lat}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
