import { User } from "../user";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from '../../state/app-state';

export interface AppState extends fromRoot.AppState{
    //this one is not adding anything since the 'user' is already part of the user state 
    //BUT this export is more to ensure that the way that the component injection is being made, it
}

export interface UserState{
    maskUserName : boolean,
    currentUser : User
}

const initialState : UserState = {
    maskUserName : true,
    currentUser : null
}

const userStateFeatureSelector = createFeatureSelector<UserState>('user');
export const maskUserNameSelector = createSelector(
    userStateFeatureSelector,
    user=>user.maskUserName
);

export const userSelector = createSelector(
    userStateFeatureSelector,
    user=>user
);

export function UserStateReducer(state : UserState = initialState, action) : UserState {

    console.log(`UserStateReducer - responding to action : ${JSON.stringify(action)}`);
    console.log(`UserStateReducer - the original state : ${JSON.stringify(state)}`);

    switch (action.type) {
        case 'MASK_USER_NAME':
            let newState = {
                ...state,
                maskUserName : action.payload
            }

            console.log(`UserStateReducer - the newState state : ${JSON.stringify(newState)}`);

            return newState;
        default:
            return state;
    }
}
