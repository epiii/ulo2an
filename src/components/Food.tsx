import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Coordinate } from '../types/type'

const Food = ({ x, y }: Coordinate): JSX.Element => {
    return (
        <Text style={[{
            top: y * 10,
            left: x * 10
        }, styles.food]}>🍓</Text>
    )
}

const styles = StyleSheet.create({
    food: {
        borderRadius: 7,
        fontSize: 18,
        position: "absolute",
        height: 22,
        width: 22,
    }
})

export default Food