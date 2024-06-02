import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageDeRecherche from './PageDeRecherche';
import ResultatsDeRecherche from './ResultatsDeRecherche';
import MapScreen from './MapScreen';
import store from './redux/store';

const Stack = createStackNavigator();

function App() {
  const screens = [
    { name: 'Accueil', component: PageDeRecherche },
    { name: 'Resultats', component: ResultatsDeRecherche },
    { name: 'Map', component: MapScreen },
  ];

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          {screens.map((screen) => (
            <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
          ))}
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
