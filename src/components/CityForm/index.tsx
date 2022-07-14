import React, {FC} from 'react';
import {useAppDispatch} from "../../hooks/redux";
import {cityCardSlice} from "../../store/reducers/CityCardSlice";

const CityForm: FC = () => {
    const [city, setCity] = React.useState<string>("")
    const dispatch = useAppDispatch()

    const addCityHandler = () => {
        if (localStorage.getItem("cities") === null) {
            localStorage.setItem('cities', JSON.stringify([city]))
        } else {
            let cities = JSON.parse(localStorage.cities)
            cities.push(city)
            // dispatch(cityCardSlice.actions.addCity(city))
            localStorage
                .setItem("cities",
                    JSON.stringify(cities)
                )
        }
    }

    return (
        <>
            <input
                type="text"
                onChange={event => setCity(event.target.value)}
                value={city}
            />
            <button onClick={addCityHandler}>+</button>
        </>
    );
};

export default CityForm;