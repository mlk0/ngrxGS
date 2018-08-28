import { Product } from "../product";
import * as fromRoot from "../../state/app-state"
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./products-state-reducer";

export interface AppState extends fromRoot.AppState {
    products: ProductState
}


const productStateSelector = createFeatureSelector<ProductState>('products'); //feature selector -
//    createFeatureSelector function is from the @ngrx/store.
//    It's specifying the type of the state slice and the string that represents the property witin the AppState

export const productsSelector = createSelector(
    productStateSelector,
    products => products.products
);
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

        console.log(`selectedProductSelector : ${selectedProductId}`)
        console.log(`products : `, JSON.stringify(products));


        if (selectedProductId === 0) {
            let newProduct: Product = {
                id: 0,
                description: 'new product description',
                productCode: 'PK-123-12',
                productName: 'New Product Name',
                starRating: 5.0
            }
            return newProduct;
        }

        // let selectedProduct = selectedProductId != null ? products.products.find(p => p.id === selectedProductId) : null;
        let selectedProduct = selectedProductId ? products.products.find(p => p.id === selectedProductId) : null;


        console.log(`selectedProductSelector - selectedProduct : ${JSON.stringify(selectedProduct)}`)

        return selectedProduct;
    }
);

// export const selectedProductSelectorAlternative = createSelector(
//     productStateSelector,
//     productSlice => productSlice.selectedProduct
// );


export const errorMessageSelector = createSelector(
    productStateSelector,
    products => products.errorMessage
);
