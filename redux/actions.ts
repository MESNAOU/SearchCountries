export const ChangementDeLaRecherche = (requeteDeRecherche: string) => ({
  type: 'ChangementDeLaRecherche',
  payload: requeteDeRecherche,
});


export const ChangementDeLaTaille = (taille: string) => ({
  type: 'ChangementDeLaTaille',
  payload: taille,
});


export const changeChargementState = (state: boolean) => ({
  type: 'changeChargementState',
  payload: state,
});


export const getResponce = (message: string) => ({
  type: 'getResponce',
  payload: message,
});
