export function ProductsStateReducer(state, action) {
    switch(action.type){

        case 'TOGLE_SHOW_PRODUCT_CODE':
            return {
                ...state, //'spread the existing state object as set of properties' - effectively copies the state and treats it as set of individual propertiesr
                showProductCode : action.payload //if the showProductCode does not exist it will add it but if it's in the spread state it will update it
            }
        default:
            return state;
    }
}
