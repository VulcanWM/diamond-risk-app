import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity } from "../components/Themed";
import { useEffect, useState } from "react";



export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0)
  useEffect(() => {
    const fetchScoreData = async () => {
      const value = await AsyncStorage.getItem('score')
      if (value != null){
        setScore(parseInt(value))
      }
    }
    const fetchHighScoreData = async () => {
      const value = await AsyncStorage.getItem('highscore')
      if (value != null){
        setHighscore(parseInt(value))
      }
    }
    fetchScoreData()
    fetchHighScoreData()
  }, [])

  const saveScore = async (value) => {
    try {
      await AsyncStorage.setItem('score', value)
    } catch (e) {
      // saving error
    }
  }
  const saveHighScore = async (value) => {
    try {
      await AsyncStorage.setItem('highscore', value)
    } catch (e) {
      // saving error
    }
  }
  function increaseScore(num){
    var newScore = score + num
    setScore(newScore)
    saveScore(newScore.toString())
    if (newScore > highscore){
      setHighscore(newScore)
      saveHighScore(newScore.toString())
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diamond Risk</Text>
      <Text>{'\n'}</Text>
      <Text>Score: {score}</Text>
      <Text>{'\n'}</Text>
      <TouchableOpacity lightColor="black" darkColor="white" style={styles.button} onPress={() => increaseScore(10)}>
        <Text lightColor="white" darkColor="black" style={styles.text}>Add 10 to score</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  square: {
    height: '50%',
    backgroundColor: 'skyblue',
    aspectRatio: 1,
    borderRadius: '20%',
    alignItems: "center",
    justifyContent: "center",
  },
  diceNumber: {
    fontSize: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
