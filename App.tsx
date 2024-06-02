import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageDeRecherche from './PageDeRecherche'
import ResultatsDeRecherche from './ResultatsDeRecherche'
import MapScreen from './MapScreen'
import store from './redux/store'

const Pile = createStackNavigator();
  function MaPile(){
    return(
      <Pile.Navigator>
        <Pile.Screen name="Accueil" component={PageDeRecherche}/>
        <Pile.Screen name="Resultats" component={ResultatsDeRecherche}/>
        <Pile.Screen name="Map" component={MapScreen} />
      </Pile.Navigator>
    )
  }

export default class App extends Component{
  render(){
    return (
      <NavigationContainer>
      <Provider store={ store }>
        <MaPile/>
      </Provider>
      </NavigationContainer>
    )
  }
}