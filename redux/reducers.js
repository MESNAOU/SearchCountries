const initialState = {
  requeteDeRecherche: 'morocco',
  taille: '0',
  estEnChargement:false,
  message:'',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ChangementDeLaRecherche':
      return {
        ...state,
        requeteDeRecherche: action.payload,
      };
    case 'ChangementDeLaTaille':
      return {
        ...state,
        taille: action.payload,
      };
    case 'changeChargementState':
      return {
        ...state,
        estEnChargement: true,
      };
    case 'getResponce':
      return {
        ...state,
        estEnChargement: false,
        taille: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
