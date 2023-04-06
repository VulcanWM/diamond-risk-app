import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity } from "../components/Themed";
import { useEffect, useState } from "react";



export default function ProfileScreen() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0)
  useEffect(() => {
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
    fetchScoreData()
    fetchHighScoreData()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text>{'\n'}</Text>
      <Text>Current Score: {score}</Text>
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
  },
  circle: {
    height: '50%',
    backgroundColor: 'skyblue',
    aspectRatio: 1,
    borderRadius: '50%',
    alignItems: "center",
    justifyContent: "center",
  },
  coinText: {
    fontSize: 75,
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
