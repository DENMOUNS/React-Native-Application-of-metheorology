import React, {useEffect, useState, Fragment} from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'; 
import {format} from "date-fns";


export default function Weather({forecast}){
  const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`
  return(
    <View style={styles.container}>
      <Text>{forecast.heure}h</Text>
      <Image 
        source={{uri: getIcon(forecast.icon)}}
        style = {styles.icon}
      />
      <Image 
        source={{uri: getIcon(forecast?.icon)}}
        style = {styles.image}
      />
      <Text style={styles.temp}>{forecast.temp}°c</Text>
    </View>
  )
}

const COLOR = "#54565B"
const styles = StyleSheet.create({
  image: {
      width: '35%',
      height: '35%',
  },
  container: {
      backgroundColor: "white",
      width: 100,
      height: 180,
      paddingVertical: 6,
      justifyContent:"center",
      alignItems: "center",
      marginRight:10,
      borderRadius:50
  },
  temp: {
      fontSize: '18',
      fontWeight: 'bold',
      color: COLOR
  },
});