import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native'; 
import {isSameDay} from "date-fns";

export default function NowWeather({data}){
  const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`
  const[currentWeather, setCurrentWeather] = useState(null)
  useEffect(()=>{
    const currentW = data.list.filter(forecast =>{
      const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
      const forecastDate = new Date(forecast.dt * 1000)
      return isSameDay(today, forecastDate)
    })
    setCurrentWeather(currentW[0])
  }, [data])
    return(
      <>
        <Text style={styles.city}>{data?.city?.name}</Text>
        <Text style={styles.today}>Aujourd'hui</Text>
        <Image 
          source={{uri: getIcon(currentWeather?.weather[0]?.icon)}}
          style = {styles.image}
        />
        <Text style={styles.temperature}>{currentWeather?.main.temp}°c</Text>
        <Text style={styles.description}>{currentWeather?.weather[0]?.description}</Text>
      </>
    )
}

const COLOR = "#54565B"
const styles = StyleSheet.create({
  image: {
      width: '25%',
      height: '25%',
  },
  container: {
      marginTop: '60',
      alignItems: "center",
      height: '75%',
  },
  city: {
      fontSize: '30',
      fontWeight: '500',
      color: COLOR
  },
  today: {
      fontSize: '20',
      fontWeight: '300',
      color: COLOR
  },
  temperature: {
      fontSize: '25',
      fontWeight: 'bold',
      color: COLOR
  },
  description: {
      fontSize: '20',
      fontWeight: 'bold',
      marginTop: '5%',
      marginBottom: '5%',
      color: COLOR
  }
});