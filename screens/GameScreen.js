import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity } from "../components/Themed";
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';


export default function GameScreen() {
  const [msg, setMsg] = useState("")
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0)
  const [weapon, setWeapon] = useState("fist")
  const [gun, setGun] = useState(0)
  const [vault, setVault] = useState(0)
  const [health, setHealth] = useState(50)
  const [name, setName] = useState("")
  const [text, onChangeText] = useState(name);

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }
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
  const fetchWeaponData = async () => {
    const value = await AsyncStorage.getItem('weapon')
    if (value != null){
      setWeapon(value)
    }
  }
  const fetchGunData = async () => {
    const value = await AsyncStorage.getItem('gun')
    if (value != null){
      setGun(parseInt(value))
    }
  }
  const fetchVaultData = async () => {
    const value = await AsyncStorage.getItem('vault')
    if (value != null){
      setVault(parseInt(value))
    }
  }
  const fetchHealthData = async () => {
    const value = await AsyncStorage.getItem('health')
    if (value != null){
      setHealth(parseInt(value))
    }
  }
  const fetchNameData = async () => {
    const value = await AsyncStorage.getItem('name')
    if (value != null && value != ""){
      setName(value)
      onChangeText(value)
    } else {
      var randomName = "Robber" + Math.floor(10000 + Math.random() * 90000).toString()
      saveData("name", randomName)
      setName(randomName)
      onChangeText(randomName)
    }
  }
  const isFocused = useIsFocused();
  useEffect(() => { 
    fetchScoreData()
    fetchHighScoreData()
    fetchWeaponData()
    fetchGunData()
    fetchVaultData()
    fetchHealthData()
    fetchNameData()
  }, [isFocused])

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
    saveData("health", "50")
    setHealth(50)
    saveData("weapon", "fist")
    setWeapon("fist")
    saveData("gun", "0")
    setGun(0)
    saveData("vault", "0")
    setVault(0)
  }
  function shoot(){
    let shoot_num = Math.floor(Math.random() * 50) + 1;
    let new_health = health-shoot_num
    setHealth(new_health)
    saveData(new_health.toString())
    new_msg = "The police shot you and you lost " + shoot_num + " health!"
    if (new_health < 1){
      resetScore()
      new_msg += "\nYou lost all your health and died."
    }
    setMsg(new_msg)
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
    } else if (randomNumber == 2 | randomNumber == 3) {
      shoot()
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
    } else if (randomNumber == 2 | randomNumber == 3) {
      shoot()
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
    } else if (randomNumber == 2) {
      shoot()
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
    } else if (randomNumber == 2) {
      shoot()
    } else {
      increaseScore(20)
      setMsg("You successfully caught 20 diamonds!")
    }
  }
  function fiftyDiamonds(){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    if (randomNumber == 1 || randomNumber == 2){
      resetScore()
      setMsg("You got caught by the police!")
    } else if (randomNumber == 3) {
      shoot()
    } else {
      increaseScore(50)
      setMsg("You successfully caught 50 diamonds!")
    }
  }
  function sleep(){
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    if (randomNumber == 1){
      resetScore()
      setMsg("You got caught by the police while sleeping!")
    } else {
      let healthAddition = Math.floor(Math.random() * 20) + 1;
      let newHealth = health + healthAddition
      setHealth(newHealth)
      if (newHealth > 100){
        setHealth(100)
      }
      setMsg("You slept and got " + healthAddition + " health!")
    }
  }
  return (
    <View style={styles.container}>
      <Text>Welcome {name} to</Text>
      <Text style={styles.title}>Diamond Risk</Text>
      <Text>{'\n'}</Text>
      <Text>{msg}</Text>
      <Text>{'\n'}</Text>
      <Text>Score: {score}</Text>
      <Text>Health: {health}</Text>
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
      <TouchableOpacity lightColor="black" darkColor="white" style={styles.button} onPress={sleep}>
        <Text lightColor="white" darkColor="black" style={styles.text}>Sleep</Text>
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
