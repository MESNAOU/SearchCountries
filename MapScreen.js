import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const MapScreen = ({ route }) => {
  const { url } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} style={{ flex: 1 }}/>
    </View>
  );
};

export default MapScreen;
