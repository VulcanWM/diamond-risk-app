import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity } from "../components/Themed";
import { useEffect, useState } from "react";



export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0)
  const [msg, setMsg] = useState("")
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
  function resetScore(){
    setScore(0)
    saveScore("0")
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
  function oneDiamond(){
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber == 1){
      resetScore()
      setMsg("You got caught by the police!")
    } else {
      increaseScore(1)
      setMsg("You successfully caught 1 diamond!")
    }
  }
  function fiveDiamonds(){
    let randomNumber = Math.floor(Math.random() * 20) + 1;
    if (randomNumber == 1){
      resetScore()
      setMsg("You got caught by the police!")
    } else {
      increaseScore(5)
      setMsg("You successfully caught 5 diamonds!")
    }
  }
  function tenDiamonds(){
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    if (randomNumber == 1){
      resetScore()
      setMsg("You got caught by the police!")
    } else {
      increaseScore(10)
      setMsg("You successfully caught 10 diamonds!")
    }
  }
  function twentyDiamonds(){
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    if (randomNumber == 1){
      resetScore()
      setMsg("You got caught by the police!")
    } else {
      increaseScore(20)
      setMsg("You successfully caught 20 diamonds!")
    }
  }
  function fiftyDiamonds(){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    if (randomNumber == 1){
      resetScore()
      setMsg("You got caught by the police!")
    } else {
      increaseScore(50)
      setMsg("You successfully caught 50 diamonds!")
    }
  }
  function hundredDiamonds(){
    let randomNumber = Math.floor(Math.random() * 2) + 1;
    if (randomNumber == 1){
      resetScore()
      setMsg("You got caught by the police!")
    } else {
      increaseScore(100)
      setMsg("You successfully caught 100 diamonds!")
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diamond Risk</Text>
      <Text>{'\n'}</Text>
      <Text>{msg}</Text>
      <Text>{'\n'}</Text>
      <Text>Score: {score}</Text>
      <Text>{'\n'}</Text>
      <TouchableOpacity lightColor="black" darkColor="white" style={styles.button} onPress={oneDiamond}>
        <Text lightColor="white" darkColor="black" style={styles.text}>Rob 1 Diamond</Text>
      </TouchableOpacity>
      <TouchableOpacity lightColor="black" darkColor="white" style={styles.button} onPress={fiveDiamonds}>
        <Text lightColor="white" darkColor="black" style={styles.text}>Rob 5 Diamonds</Text>
      </TouchableOpacity>
      <TouchableOpacity lightColor="black" darkColor="white" style={styles.button} onPress={tenDiamonds}>
        <Text lightColor="white" darkColor="black" style={styles.text}>Rob 10 Diamonds</Text>
      </TouchableOpacity>
      <TouchableOpacity lightColor="black" darkColor="white" style={styles.button} onPress={twentyDiamonds}>
        <Text lightColor="white" darkColor="black" style={styles.text}>Rob 20 Diamonds</Text>
      </TouchableOpacity>
      <TouchableOpacity lightColor="black" darkColor="white" style={styles.button} onPress={fiftyDiamonds}>
        <Text lightColor="white" darkColor="black" style={styles.text}>Rob 50 Diamonds</Text>
      </TouchableOpacity>
      <TouchableOpacity lightColor="black" darkColor="white" style={styles.button} onPress={hundredDiamonds}>
        <Text lightColor="white" darkColor="black" style={styles.text}>Rob 100 Diamonds</Text>
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
    margin: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});
