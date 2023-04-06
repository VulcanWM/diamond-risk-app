import { StyleSheet } from "react-native";

import { Text, View, TouchableOpacity } from "../components/Themed";

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diamond Risk</Text>
      <Text>{'\n'}</Text>
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
