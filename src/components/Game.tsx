import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Colors } from '../styles/colors'
import { Coordinate, Direction } from '../types/type'
import { checkEatsFood } from '../utils/checkEatsFood'
import { checkGameOver } from '../utils/checkGameOver'
import randomFoodPosition from '../utils/randomFoodPosition'
import Food from './Food'
import Panel from './Panel'
import Snake from './Snake'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = {
    xMin: 0,
    xMax: 33,
    yMin: 0,
    yMax: 67
};
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10

const Game = (): JSX.Element => {
    const [direction, setDirection] = useState<Direction>(Direction.Right)
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION)
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)

    React.useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake()
            }, MOVE_INTERVAL)

            return () => clearInterval(intervalId)
        }
    }, [snake, isGameOver, isPaused])

    const moveSnake = () => {
        const snakeHead = snake[0]
        const newHead = { ...snakeHead }

        // game over
        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev)
            return
        }

        // direction
        switch (direction) {
            case Direction.Up:
                newHead.y -= 1
                break;

            case Direction.Down:
                newHead.y += 1
                break;

            case Direction.Left:
                newHead.x -= 1
                break;

            case Direction.Right:
                newHead.x += 1
                break;

            default:
                break;
        }

        // eat food 
        if (checkEatsFood(newHead, food, 2)) {
            setScore(score + SCORE_INCREMENT)
            setFood(randomFoodPosition(
                GAME_BOUNDS.xMax,
                GAME_BOUNDS.yMax
            ))
            // movement (incerement )
            setSnake([newHead, ...snake])
        } else { // just walking
            // movement (incerement )
            setSnake([newHead, ...snake.slice(0, -1)])
        }

    }

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent

        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(Direction.Right);
                // cl("kanan") 
            } else {
                setDirection(Direction.Left);
                // cl("kiri")
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.Down);
                // cl("turun")
            } else {
                setDirection(Direction.Up);
                // cl("naik")
            }
        }
    }

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION)
        setFood(FOOD_INITIAL_POSITION)
        setIsGameOver(false)
        setScore(0)
        setDirection(Direction.Right)
        setIsPaused(false)
    }

    const pauseGame = () => {
        setIsPaused(!isPaused)
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
                <Panel
                    isPaused={isPaused}
                    pauseGame={pauseGame}
                    reloadGame={reloadGame}
                >
                    <Text style={styles.score}>{score}</Text>
                </Panel>
            </SafeAreaView>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
    },
    boundaries: {
        backgroundColor: Colors.background,
        borderRadius: 30,
        borderColor: 'grey',
        borderWidth: 1,
        flex: 1,
        marginHorizontal: 20,
        marginTop: 30,
    },
    score: {
        fontSize: 22,
        fontWeight: 700,
        color: 'black',
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 2,
        padding: 3,
        borderRadius: 30
    }
})

export default Game