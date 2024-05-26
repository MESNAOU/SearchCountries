export const ChangementDeLaRecherche = (requeteDeRecherche) => ({
  type: 'ChangementDeLaRecherche',
  payload: requeteDeRecherche,
});

export const ChangementDeLaTaille = (taille) => ({
  type: 'ChangementDeLaTaille',
  payload: taille,
});

export const changeChargementState = (state) => ({
  type: 'changeChargementState',
  payload: state,
});

export const getResponce = (message) => ({
  type: 'getResponce',
  payload: message,
});