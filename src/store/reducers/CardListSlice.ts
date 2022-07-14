import {ICityWeather} from "../../models/ICityWeather";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CardListState {
    cardList: ICityWeather[];
    isLoading: boolean;
    error: string;
}

const initialState: CardListState = {
    cardList: [] as ICityWeather[],
    isLoading: false,
    error: ""
}

export const cardListSlice = createSlice({
    name: "cardList",
    initialState,
    reducers: {
        setCardList(state) {
            state.isLoading = true
        },
        setCardListSuccess(state, action: PayloadAction<ICityWeather[]>) {
            state.isLoading = false
            state.cardList = action.payload
        },
        setCardListError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        updateCard(state, action: PayloadAction<ICityWeather>) {
            const index = state.cardList.findIndex((card: ICityWeather) => card.id === action.payload.id)
            state.cardList[index] = action.payload
        },
        deleteCard(state, action: PayloadAction<number>) {
            state.cardList = state.cardList.filter(card => card.id !== action.payload)
        },
        addCard(state, action: PayloadAction<ICityWeather>){
            state.cardList.push(action.payload)
        }
    }
})

export default cardListSlice.reducer