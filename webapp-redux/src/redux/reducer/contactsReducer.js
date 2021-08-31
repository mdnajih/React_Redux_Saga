const initialState = {
    contacts:[],
    contact:null,
};

const contactsReducer = (state=initialState,action) => {
    let temp;
  switch (action.type) {
      case "SET_CONTACTS":
          return {...state,contacts:action.payload};
      case "SET_SELECTED_CONTACT":
          return {...state,contact:action.payload};
      case "UPDATE_SELECTED_CONTACT":
          temp = state.contacts.map((contact) => {
              if (contact.id === action.payload.id) {
                  return action.payload
              }
              else {
                  return contact
              }
          });

          return {
              ...state,
              contacts: temp
          };

      case "REMOVE_SELECTED_CONTACT":
          return {...state,contact:null}
      default:
          return state;
  }
}

export {contactsReducer}