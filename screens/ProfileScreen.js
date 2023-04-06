import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity, Alert } from "../components/Themed";
import { useEffect, useState } from "react";



export default function ProfileScreen() {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('score')
      if (value != null){
        setScore(value)
      }
    }
    fetchData()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text>{'\n'}</Text>
      <Text>Score: {score}</Text>
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
