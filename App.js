import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image,StyleSheet, Text, View } from 'react-native';
import logo from './assets/favicon.png'; 

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Bonjour tour le monde!!!</Text>
      <Text>Allo!!</Text>
      <Image source={logo} style={{ width: 305, height: 159 }} /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
