import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../styles/colors'
import { Coordinate } from '../types/type'

interface SnakeProps {
    snake: Coordinate[]
}

const Snake = ({ snake }: SnakeProps): JSX.Element => {
    return (
        <>
            {snake.map((segment: Coordinate, index: number) => {
                const segmentStyle = {
                    left: segment.x * 10,
                    top: segment.y * 10,
                }

                return (<View
                    key={index}
                    style={[styles.snake, segmentStyle]}
                />)
            })}
        </>
    )
}

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: Colors.primary,
        position: 'absolute'
    }
})

export default Snake