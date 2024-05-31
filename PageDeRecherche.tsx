import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { ChangementDeLaRecherche, ChangementDeLaTaille, changeChargementState, getResponce } from './redux/actions';
import { RootState } from './redux/store';
import { NavigationProp } from '@react-navigation/native';

type Props ={
  requeteDeRecherche: string;
  taille: string;
  estEnChargement: boolean;
  message: string;
  ChangementDeLaRecherche: (text: string) => void;
  ChangementDeLaTaille: (text: string) => void;
  changeChargementState: (state: boolean) => void;
  getResponce: (message: string) => void;
  navigation: NavigationProp<any>;
};

class PageDeRecherche extends Component<Props> {
  _auChangementDeLaRecherche = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
    this.props.ChangementDeLaRecherche(event.nativeEvent.text);
  }

  _auChangementDeLaTaille = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
      this.props.ChangementDeLaTaille(event.nativeEvent.text);
    }

  _auDemarrageDeLaRecherche=()=>{
      const requete =urlPourRequete(this.props.requeteDeRecherche);
      this._executeRequete(requete);
    }

  _auDemarrageDeLaRechercheParTaille=()=>{
        const requete ='https://restcountries.com/v3.1/all?fields=name,population';
        this._executeRequeteParTaille(requete);
      }

  _executeRequete = (requete: string) => {
    this.props.changeChargementState(true);
    axios.get(requete)
      .then((response) => {
        this._gererLaReponse(response.data);
      })
      .catch((error) => {
        this.props.changeChargementState(false);
        this.props.getResponce('Oups! Une erreur: ' + error.message);
      });
  };

  _executeRequeteParTaille = (requete: string)=>{
      this.props.changeChargementState(true);
      axios.get(requete)
      .then((response) => {
        this._gererLaReponseParTaille(response.data);
      })
      .catch((error) => {
        this.props.changeChargementState(false);
        this.props.getResponce('Oups! Une erreur: ' + error.message);
      });
    }

  _gererLaReponse = (reponse: any)=>{
    this.props.changeChargementState(false);
    this.props.navigation.navigate('Resultats',{listing:reponse})
  }

  _gererLaReponseParTaille = (reponse: any)=>{
      const filteredReponse = reponse.filter((element: any) => element.population <= this.props.taille);
      const requests = filteredReponse.map((item: any)=>{
        const req = urlPourRequete(item.name.common);
        return axios.get(req).then((rep) => rep.data);
      });
      Promise.all(requests)
       .then((results) => {
         const flattenedResults = results.flat();
         this.props.changeChargementState(false);
         this.props.navigation.navigate('Resultats', { listing: flattenedResults });
       })
       .catch((error) =>{
         this.props.changeChargementState(false);
         this.props.getResponce('Oups! Une erreur: ' + error)
       });
  }

  render(){
    const indicateurDeChangement=this.props.estEnChargement? <ActivityIndicator size='large' color='0000ff'/> : null;
    return (
      <View style={styles.conteneur}>
        <Text style={styles.description}>
          Rechercher des pays à explorer!
        </Text>
        <Text style={styles.description}>
          Rechercher par nom
        </Text>
        <View style={styles.fluxDroite}>
          <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.requeteEntree}
          value={this.props.requeteDeRecherche}
          onChange={this._auChangementDeLaRecherche}
          placeholder='Rechercher par nom de pays'/>
          <Button
          onPress={this._auDemarrageDeLaRecherche}
          color='#48AAEC'
          title='Démarrer'
          />
        </View>
        <Text style={styles.description2}>
          Rechercher par taille de la population
        </Text>
        <View style={styles.fluxDroite}>
          <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.requeteEntree}
          value={this.props.taille}
          onChange={this._auChangementDeLaTaille}
          placeholder='Rechercher par taille'/>
            <Button
              onPress={this._auDemarrageDeLaRechercheParTaille}
              color='#48AAEC'
              title='Démarrer'
              />
        </View>
        <Image source= {require('./Ressources/pays.png')} style={styles.image}/>
        {indicateurDeChangement}
        <Text style={styles.description}>{this.props.message}</Text>
      </View>
    );
  }
}

function urlPourRequete(valeur: string){
  return 'https://restcountries.com/v3.1/name/'+valeur+'?fields=name,flags,region,subregion,capital,population,maps';
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  description2: {
      marginBottom: 20,
      marginTop: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#656565',
    },
  conteneur: {
    padding:30,
    marginTop: 65,
    textAlign: 'center',
  },
  fluxDroite:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'stretch',
  },
  requeteEntree:{
    height:36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48AAEC',
    borderRadius: 8,
    color:'#48AAEC',
  },
  image:{
    width:220,
    height:140,
  },
});

const mapStateToProps = (state: RootState) => ({
  requeteDeRecherche: state.requeteDeRecherche,
  taille: state.taille,
  estEnChargement: state.estEnChargement,
  message: state.message,
});

const mapDispatchToProps = {
  ChangementDeLaRecherche,
  ChangementDeLaTaille,
  changeChargementState,
  getResponce,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDeRecherche);