import { Product } from "../product";

export interface ProductState {
    showProductCode: boolean,
    selectedProduct: Product,
    products: Product[]
}

export function ProductsStateReducer(state, action) {

    console.log(`action : `, JSON.stringify(action));
    console.log(`original state : `, JSON.stringify(state));

    switch (action.type) {

        case 'TOGGLE_SHOW_PRODUCT_CODE':

            let newState = {
                ...state, //'spread the existing state object as set of properties' - effectively copies the state and treats it as set of individual propertiesr
                showProductCode: action.payload //if the showProductCode does not exist it will add it but if it's in the spread state it will update it
            }

            console.log(`new state : `, JSON.stringify(newState));

            return newState;

        default:
            return state;
    }
}
