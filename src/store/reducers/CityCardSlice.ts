import {ICityWeather} from "../../models/ICityWeather";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CityCardState {
    cityWeather: ICityWeather;
    isLoading: boolean;
    error: string
}


const initialState: CityCardState = {
    cityWeather: {} as ICityWeather,
    isLoading: false,
    error: "",
}

export const cityCardSlice = createSlice({
    name: "cityCard",
    initialState,
    reducers: {
        weatherFetching(state){
            state.isLoading = true
        },
        weatherFetchingSuccess(state,  action: PayloadAction<ICityWeather>){
            state.isLoading = false
            state.cityWeather = action.payload
            state.error = ""
        },
        weatherFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default cityCardSlice.reducer