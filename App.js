import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useState } from "react";

export default function App() {
  const [currentKitten, setCurrentKitten] = useState(null);
  const [kittenIndex, setKittenIndex] = useState(0);

  const fetchKitten = () => {
    let width = 200 + kittenIndex;
    let height = 300 + kittenIndex;
    let url = `http://placekitten.com/${width}/${height}`;
    fetch(url)
        .then(response => response.blob())
        .then(data => {
            let objectURL = URL.createObjectURL(data);
            setCurrentKitten(objectURL);
            setKittenIndex(kittenIndex + 1);
        })
        .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      {currentKitten && <Image source={{ uri: currentKitten }} style={styles.kitten} />}
      <Button title="Fetch Kitten" onPress={fetchKitten} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  kitten: {
    width: 200,
    height: 300
  }
});
