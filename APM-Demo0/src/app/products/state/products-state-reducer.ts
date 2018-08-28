import { Product } from "../product";
import * as fromRoot from "../../state/app-state"
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromProductActions from './product-actions'

export interface AppState extends fromRoot.AppState {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean,
    products: Product[],
    selectedProductId: number | null,
    errorMessage: string
}

const initialState: ProductState = {
    showProductCode: true,
    products: [],
    selectedProductId: null,
    errorMessage: ''
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


export function ProductsStateReducer(state: ProductState = initialState, action: fromProductActions.ProductActions): ProductState {

    // console.log(`action : `, JSON.stringify(action));
    // console.log(`original state : `, JSON.stringify(state));




    switch (action.type) {

        case fromProductActions.ProductActionTypes.ToggleShowProductCode: {

            let newState = {
                ...state, //'spread the existing state object as set of properties' - effectively copies the state and treats it as set of individual propertiesr
                showProductCode: action.payload as boolean //if the showProductCode does not exist it will add it but if it's in the spread state it will update it
            }

            console.log(`new state : `, JSON.stringify(newState));

            return newState;

        }


        case fromProductActions.ProductActionTypes.SetCurrentProductId: {

            return {
                ...state,
                selectedProductId: action.payload as number
            };
        }

        //this is only to demo a scenario where the state is keeping
        //an actual instance of the currently selected product
        //the preffered way is to keep only the productId and the components to pass the id of the currently selected product that will be selected from the collection of the products that are stored in the state
        //that is not recommended since it's too easy to pass an object reference in the reducer istead of a deep copy
        case fromProductActions.ProductActionTypes.SetCurrentProduct: {
            return {
                ...state,

                //selectedProduct : { ...action.payload}    //again, this is not working as long as it's not stated explictly
                //  THE RIGHT WAY
                selectedProductId: (action.payload as Product).id
                //  WRONG WAY
                //selectedProduct : action.payload as Product //this would be passing an object reference instead of a deep copy which will cause changes of the instance in the component to be reflected in the state
            }
        }

        case fromProductActions.ProductActionTypes.ClearCurrentProduct: {
            return {
                ...state, selectedProductId: null
            }
        }

        case fromProductActions.ProductActionTypes.InitializeCurrentProduct: {
            return {
                ...state,
                selectedProductId: 0 // with setting the selectedProductId to zero, in the selectProductSelector the code checks if it's zero and in case that this is true it simply creates the new product
                // selectedProduct : {
                //     id:0,
                //     description : 'new product description',
                //     productCode : 'PK0000000',
                //     productName : 'new product name',
                //     starRating : 5
                // }
            }
        }

        case fromProductActions.ProductActionTypes.LoadProductsSuccess:
            {
                return {
                    ...state,
                    products: action.payload as Product[]
                }
            }

        case fromProductActions.ProductActionTypes.LoadProductsFailure:
            {
                return {
                    ...state,
                    products: [],
                    errorMessage: action.payload as string
                }
            }

        case fromProductActions.ProductActionTypes.UpdateProductSuccess: {

            let updatedProducts = state.products.map(p => p.id === (action.payload as Product).id ? (action.payload as Product) : p);

            return {
                ...state,
                products: updatedProducts,
                selectedProductId: (action.payload as Product).id,
                errorMessage : ''
            }
        }

        case fromProductActions.ProductActionTypes.AddProductFailure :
        case fromProductActions.ProductActionTypes.UpdateProductFailure : {
            return {
                ...state,
                products : [],
                errorMessage : (action.payload as string)
            }
        }

        case fromProductActions.ProductActionTypes.AddProductSuccess : {

            let productsWithNewItem = state.products.concat(action.payload);

            return {
                ...state,
                selectedProductId : (action.payload as Product).id,
                errorMessage : '',
                products : productsWithNewItem
            }
        }

        
        default:
            return state;
    }
}
