
const setStoreContacts=(contacts)=>{
    return{
        type:"SET_CONTACTS",
        payload:contacts
    }
}

const setSelectedContact=(contact)=>{
    return{
        type:"SET_SELECTED_CONTACT",
        payload:contact
    }
}

const updateSelectedContact=(contact)=>{
    return{
        type:"UPDATE_SELECTED_CONTACT",
        payload:contact
    }
}

const removeSelectedContact=()=>{
    return{
        type:"REMOVE_SELECTED_CONTACT"
    }
}

export {setStoreContacts,setSelectedContact,removeSelectedContact,updateSelectedContact}