import React from 'react';
import { FlatList, Image, Text, TouchableHighlight, View } from 'react-native';

const ResultatsDeRecherche = ({ listing, navigation }) => {
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={(index, url) => navigation.navigate('Map', { url })}
    />
  );

  return (
    <FlatList
      data={listing}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default ResultatsDeRecherche;
