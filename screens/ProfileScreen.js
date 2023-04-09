import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity } from "../components/Themed";
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';


export default function ProfileScreen() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0)
  const [weapon, setWeapon] = useState("fist")
  const [gun, setGun] = useState(0)
  const [vault, setVault] = useState(0)
  const [health, setHealth] = useState(50)
  const [name, setName] = useState("")

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
      setScore(value)
    }
  }
  const fetchHighScoreData = async () => {
    const value = await AsyncStorage.getItem('highscore')
    if (value != null){
      setHighscore(value)
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
      setGun(value)
    }
  }
  const fetchVaultData = async () => {
    const value = await AsyncStorage.getItem('vault')
    if (value != null){
      setVault(value)
    }
  }
  const fetchHealthData = async () => {
    const value = await AsyncStorage.getItem('health')
    if (value != null){
      setHealth(value)
    }
  }
  const fetchNameData = async () => {
    const value = await AsyncStorage.getItem('name')
    if (value != null && value != ""){
      setName(value)
    } else {
      var randomName = "Robber" + Math.floor(10000 + Math.random() * 90000).toString()
      saveData("name", randomName)
      setName(name)
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
  /*
  Text("Highscore of all games: " + String(highscore))
        Text("Diamonds in current game:" + String(diamonds))
        Text("Guns left:" + String(gun))
        Text("Vaults:" + String(vault))
        Text("Health:" + String(health))
        Text("Weapon:" + weapon) */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}'s Profile</Text>
      <Text>{'\n'}</Text>
      <Text>Current Score: {score}</Text>
      <Text>Current Health: {health}</Text>
      <Text>Weapon: {weapon}</Text>
      <Text>Guns left: {gun}</Text>
      <Text>Vaults: {vault}</Text>
      <Text>Highscore: {highscore}</Text>
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
    textAlign: "center",
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
