import {combineReducers, configureStore} from "@reduxjs/toolkit"
import cityCardReducer from './reducers/CityCardSlice'
import cardListReducer from "./reducers/CardListSlice";

const rootReducer = combineReducers({
    cityCardReducer,
    cardListReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]