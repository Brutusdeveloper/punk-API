
const initialState = {
    punkAPI: [],
  };
  
  function Reducer(state = initialState, action) {
    switch(action.type) {
      case 'PUNKAPI':
        console.log(action.payload)
        return { ...state, punkAPI: action.payload};
      default:
        return state;
    }
  }
  
  export default Reducer;
  