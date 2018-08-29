
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from '../../state/app-state';

import { UserState } from "./user-state-reducer";

export interface AppState extends fromRoot.AppState {
    //this one is not adding anything since the 'user' is already part of the user state 
    //BUT this export is more to ensure that the way that the component injection is being made, it
}



const userStateFeatureSelector = createFeatureSelector<UserState>('user');
export const maskUserNameSelector = createSelector(
    userStateFeatureSelector,
    user => user.maskUserName
);

export const userSelector = createSelector(
    userStateFeatureSelector,
    user => user
);
