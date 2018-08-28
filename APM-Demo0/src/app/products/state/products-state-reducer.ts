import { Product } from "../product";
import * as fromProductActions from './product-actions'


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


export function ProductsStateReducer(state: ProductState = initialState, action: fromProductActions.ProductActions): ProductState {


    console.log(`ProductsStateReducer - responding to action : ${JSON.stringify(action)}`);
    console.log(`ProductsStateReducer - the original state : ${JSON.stringify(state)}`);



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

        case fromProductActions.ProductActionTypes.DeleteProductFailure : 
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

        
        case fromProductActions.ProductActionTypes.DeleteProductSuccess : {

            let productsWithoutTheDeletedItem = state.products.filter(item=>item.id != (action.payload as number) )

            return {
                ...state,
                selectedProductId : null,
                errorMessage : '',
                products : productsWithoutTheDeletedItem
            }
        }


        default:
            return state;
    }
}
