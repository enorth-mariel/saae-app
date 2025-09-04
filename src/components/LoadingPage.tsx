import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet} from 'react-native';

export default function LoadingPage() {
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color="#1A2980" /> */}
      {/* <Text style={styles.text}>Carregando...</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
