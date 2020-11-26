import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image,StyleSheet, Text, View } from 'react-native';
import logo from './assets/favicon.png'; 
import ListeUtilisateurs from './Components/ListeUtilisateurs'

export default function App() {
  return (
    <ListeUtilisateurs/>
  );
}

