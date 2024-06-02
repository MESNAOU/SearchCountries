import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';

type MapScreenProps = {
  route: RouteProp<{ params: { url: string } }, 'params'>;
};

const MapScreen = ({ route }: MapScreenProps) => {
  const { url } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} style={{ flex: 1 }}/>
    </View>
  );
};

export default MapScreen;
