export const productReducer = (state = {
  test: null,
  cartItem: 0
}, action) =>{
  switch (action.type){
    case "ADD_TO_CART":
      state = {
        ...state,
        cartItem: state.cartItem + 1
      }
      //console.log(state);
    break;

    case "TEST_PRODUCT":
      state = {
        ...state,
        test: "Hai saya upin"
      }
      //console.log(state);
    break;

    case "RESET_PRODUCT":
      state = {
        ...state,
        test: "Hai saya compare"
      }
      //console.log(state);
    break;
  }

  return state;
}
