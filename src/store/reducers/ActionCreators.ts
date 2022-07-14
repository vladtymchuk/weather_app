import {AppDispatch} from "../store";
import {cardListSlice} from "./CardListSlice";
import {ICityWeather} from "../../models/ICityWeather";
import axios from "axios";

export const fetchCities = (cities: string[] | null) => async (dispatch: AppDispatch) => {
    try {
        dispatch(cardListSlice.actions.setCardList())
        const urls = cities?.map((city: string) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2010ac909e465fe6f065bb7d66338117`)

        urls && Promise.all(urls.map(u=>fetch(u))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then((json : Awaited<ICityWeather>[]) => {
            let resultInfo: ICityWeather[] = json
            dispatch(cardListSlice.actions.setCardListSuccess(resultInfo))
        })
    } catch ({message}) {
        console.log(typeof message)
    }
}

export const addNewCityInfo = (name: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get<ICityWeather>(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2010ac909e465fe6f065bb7d66338117`)
        // dispatch(cardListSlice.actions.addCard(res.data))
        if (localStorage.getItem("cities") === null) {
            localStorage.setItem('cities', JSON.stringify([name]))
            dispatch(cardListSlice.actions.addCard(res.data))
        } else {
            let cities = JSON.parse(localStorage.cities)
            console.log(cities)
            if (!cities.includes(name)){    
                cities.push(name)
                localStorage
                    .setItem("cities",
                        JSON.stringify(cities)
                    )
                dispatch(cardListSlice.actions.addCard(res.data))
            }
        }
    } catch ({message}) {
        console.log(message)
    }
}

export const updateCityInfo = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get<ICityWeather>(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=2010ac909e465fe6f065bb7d66338117`)
        dispatch(cardListSlice.actions.updateCard(res.data))
    } catch ({message}) {
        console.log(message)
    }
}