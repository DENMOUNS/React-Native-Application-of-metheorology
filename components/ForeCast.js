import React, {useEffect, useState, Fragment} from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'; 
import {format} from "date-fns";

import Weather from './Weather';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`
export default function ForeCast({data}){
  const[forecast, setForecast] = useState([])
  useEffect(()=>{
    const forecastData = data.list.map(f =>{
      const dt = new Date(f.dt * 1000)
      return ({
        date: dt,
        heure: dt.getUTCHours(),
        temp: f.main.temp,
        icon: f.weather[0].icon,
        name: format(dt, "EEEE"),
      })
    })
    //logique pour grouper les éléments par journée - name
    //1.recuperer le nom des jours des prévisions dans un tableau
    //2.retirer tous les doublon des tableaux
    //3.contruire le tableau suivant [{day: name, data: [forecast, forecast]}, {}, {}]
    let newForcastData = forecastData.map(forecast => {
      return forecast.name
    }).filter((day, index, self) => {
      // filter garde tous les éléments lorsqu'elle retourn true
      return self.indexOf(day) === index
    }).map((day) => {
      return {
        day,
        data: forecastData.filter((forecast) => forecast.name === day)
      }
    })
    setForecast(newForcastData)
  }, [data])

//{day: name, data: [forecast, forecast]}
    return(
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollview}
          >
            {forecast.map(f=>
            <View>
              <Text style={styles.day}>{f.day.toUpperCase()}</Text>
              <View style={styles.container}>
                {f.data.map(w => <Weather forecast={w} />)}
              </View>
            </View>
            )
          }
          </ScrollView>
    )
}
const COLOR = "#54565B"
const styles = StyleSheet.create({
  scrollview: {
      width: '100%',
      height: '35%',
  },
  day: {
    fontSize: '16',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5
  },
  container: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5
  },
});