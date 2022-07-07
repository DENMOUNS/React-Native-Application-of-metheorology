import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';
import NowWeather from './components/NowWeather';

import ForeCast from './components/ForeCast';

const API_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=(weather id)&lang=fr&units=metric`;
export default function App() {
  // recupérer les coordonnées de l'utilisateur
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fonction asychrone pour remplacer l await dans le useEffect()
    const getCoordinates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      //si le status est granted alors on récupère la position de l'utilisateur
      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    };
    getCoordinates();
  }, []);

  // faire une requête serveur pour recupérer les données à afficher selon la position
  const getWeather = async (location) => {
    try {
      const response = await axios.get(
        API_URL(location.coords.latitude, location.coords.longitude)
      );
      setData(response.data);
      setLoading(false);
    } catch (e) {
      console.log('Erreur dans getWeather');
    }
  };
  // on aura à récupérer la ville, la météo du moment, les prévisions météorologiques du moment
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NowWeather data={data} />
      <ForeCast data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#E2E6E1',
    padding: 8,
  },
});
