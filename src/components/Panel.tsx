import { FontAwesome, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colors } from '../styles/colors'

type PanelProps = {
    reloadGame: () => void
    pauseGame: () => void
    children: JSX.Element
    isPaused: boolean
}

const Panel = ({
    children,
    reloadGame,
    pauseGame,
    isPaused
}: PanelProps): JSX.Element => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={reloadGame}>
                <Ionicons
                    color={Colors.tertiary}
                    name="reload-circle"
                    size={35}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={pauseGame}>
                <FontAwesome
                    color={Colors.tertiary}
                    name={isPaused ? "play-circle" : "pause-circle"}
                    size={35}
                />
            </TouchableOpacity>

            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderColor: Colors.primary,
        borderWidth: 12,
        borderRadius: 30,
        padding: 15,
        marginHorizontal: 10,
        backgroundColor: Colors.panel,
    }
})
export default Panel