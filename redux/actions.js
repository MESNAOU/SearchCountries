export const ChangementDeLaRecherche = (requeteDeRecherche) => ({
  type: 'ChangementDeLaRecherche',
  payload: requeteDeRecherche,
});

export const ChangementDeLaTaille = (taille) => ({
  type: 'ChangementDeLaTaille',
  payload: taille,
});

export const changeChargementState = () => ({  //estEnChargement toujours true
  type: 'changeChargementState',
});

export const getResponce = (message) => ({  ///estEnChargement toujours false
  type: 'getResponce',
  payload: message,
});