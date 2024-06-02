import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type Props ={
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { listing: any[] } }, 'params'>;
};
export default class ResultatsDeRecherche extends Component<Props> {
  _extracteurClef=(item: any, index: number)=>index.toString();
  _rendreItem=({item,index}: { item: any, index: number })=>(
      <ListItem
      item={item}
      index={index}
      onPressItem={this._itemAppuye}
      />
    )
  _itemAppuye=(index: number, url: string)=>{
    console.log('Ligne appuyée: '+index)
    if(url) this.props.navigation.navigate('Map', { url: url });
  }

  render(){
    const { listing } = this.props.route.params;
    return (
      <FlatList
      data={listing}
      keyExtractor={this._extracteurClef}
      renderItem={this._rendreItem}/>
    );
  }
}

const styles = StyleSheet.create({
  conteneurTexte:{
    flex:1
  },
  sesparateur:{
    height:1,
    backgroundColor:'#eedded'
  },
  image: {
      width: 50,
      height: 50,
      borderRadius: 10,
      marginRight: 8,
    },
  nomOfficiel:{
    marginLeft: 5,
    fontSize:25,
    fontWeight:'bold',
    color:'#58BEEC'
  },
  autre:{
    fontSize:20,
    color:'#656565'
  },
  conteneurLigne:{
    flexDirection:'row',
    padding:10
  }
})

type ListItemProps = {
  item: any;
  index: number;
  onPressItem: (index: number, url: string) => void;
};

class ListItem extends React.PureComponent<ListItemProps>{
  _itemAppuye=()=>{
    this.props.onPressItem(this.props.index, this.props.item.maps.googleMaps)
  }
  render(){
    const item=this.props.item;
    return(
      <TouchableHighlight 
      onPress={this._itemAppuye}
      underlayColor='#eedddd'>
        <View>
        <Text style={styles.nomOfficiel}>{item.name.official}</Text>
          <View style={styles.conteneurLigne}>

            <Image style={styles.image} source={{ uri: item.flags.png }} />

            <View style={styles.conteneurTexte}>

              <Text style={styles.autre}>{item.region}</Text>
              <Text style={styles.autre}>{item.subregion}</Text>
              <Text style={styles.autre}>{item.capital}</Text>
              <Text style={styles.autre}>{item.population}</Text>
            </View>
          </View>
          <View style={styles.sesparateur}/>
        </View>
      </TouchableHighlight>
    )
  }
}
