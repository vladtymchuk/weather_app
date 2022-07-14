import React from 'react';
import styles from './App.module.scss';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {Button} from "@mui/material";
import {addNewCityInfo, fetchCities} from "./store/reducers/ActionCreators";
import CityCard from "./components/CityCard";
import {ICityWeather} from "./models/ICityWeather";


function App() {
    const {cardList} = useAppSelector(state => state.cardListReducer)
    const dispatch = useAppDispatch()
    const [cityI, setCityI] = React.useState<string>("")

    const addCityHandler = () => {
        dispatch(addNewCityInfo(cityI.trim().toLowerCase()))
        setCityI("")
    }


    React.useEffect(() => {
        let cities: string[] | null = localStorage.getItem("cities") !== null && JSON.parse(localStorage.cities)
        dispatch(fetchCities(cities))
    }, [])


    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <label>Search City:</label>
                <input
                    type="text"
                    onChange={event => setCityI(event.target.value)}
                    value={cityI}
                    className={styles.input}
                    placeholder={"city name..."}
                />
                <Button variant="contained" color="success" onClick={addCityHandler}>
                    +
                </Button>
            </div>
            <div className={styles.cards}>
                {
                    cardList ?
                        cardList.map((city: ICityWeather) => <CityCard key={city.id} cityInfo={city}/>) : <h1>Add City, please</h1>
                }
            </div>
        </div>
    );
}


export default App;
