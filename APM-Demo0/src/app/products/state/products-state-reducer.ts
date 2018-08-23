import { Product } from "../product";
import * as fromRoot from "../../state/app-state"
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface AppState extends fromRoot.AppState {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean,    
    products: Product[],
    selectedProductId: number
}

const initialState: ProductState = {
    showProductCode: true,
    products: [],
    selectedProductId : 0
}

const productStateSelector = createFeatureSelector<ProductState>('products'); //feature selector - 
//    createFeatureSelector function is from the @ngrx/store. 
//    It's specifying the type of the state slice and the string that represents the property witin the AppState

export const showProductCodeSelector = createSelector(                        //selector for a specific property to which a component needs to be subscribed, showProductCode in this case
    productStateSelector,
    products => {
        return products.showProductCode;
    }
);


export const productList = createSelector(
    productStateSelector,
    products => products.products
);



export const selectedProductIdSelector = createSelector(
    productStateSelector,
    products => products.selectedProductId
);

//this one is an example of a selector composed of 2 other selectors
export const selectedProductSelector = createSelector(
    productStateSelector,
    selectedProductIdSelector,
    (products, selectedProductId) => {
        let selectedProduct = products.products.filter(p => p.id === selectedProductId);
        return selectedProduct;
    }
);





export function ProductsStateReducer(state: ProductState = initialState, action): ProductState {

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
