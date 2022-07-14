import React, {FC} from 'react';
import styles from './CityCard.module.scss'
import {ICityWeather} from "../../models/ICityWeather";
import {Box, Button, Card, CardActions, CardContent, Modal, Typography} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux";
import {cardListSlice} from "../../store/reducers/CardListSlice";
import {updateCityInfo} from "../../store/reducers/ActionCreators";
import {FullInfoModal} from "../Modal";


interface CityCardProps {
    cityInfo: ICityWeather
}

const CityCard: FC<CityCardProps> = ({cityInfo}) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateHandler = () => {
        dispatch(updateCityInfo(cityInfo.id))
    }

    const deleteHandler = () => {
        dispatch(cardListSlice.actions.deleteCard(cityInfo.id)) // delete from store
        localStorage.setItem("cities",
            JSON.stringify(
                JSON.parse(localStorage.cities)
                    .filter((city: string) => city.toLowerCase() !== cityInfo.name.toLowerCase()
                )
            )
        ) // delete city from localStorage
    }

    return (
        <>
            <Card sx={{minWidth: 345, borderRadius: 5, margin: 3, backgroundColor: "rgba(0,0,0,0.56)"}}
                className={styles.card}
                // onClick={handleOpen}
            >
                <CardContent>
                    <div className={styles.box}>
                        <Typography gutterBottom variant="h5" component="div" className={styles.city}>
                            {cityInfo?.name} <span>{
                            cityInfo?.main.temp && (cityInfo?.main.temp - 273.15).toFixed(0)
                        }°C</span>
                        </Typography>
                        <img
                            src={`http://openweathermap.org/img/wn/${cityInfo?.weather[0].icon}@2x.png`}
                            className={styles.img}
                            alt="weather-icon"
                        />
                    </div>
                    <Typography variant="body2" className={styles.main}>
                        {cityInfo?.weather[0].main}
                    </Typography>
                    <Typography variant="body2" className={styles.main}>
                        {cityInfo?.weather[0].description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="warning" onClick={updateHandler}>Update</Button>
                    <Button size="small" color="error" onClick={deleteHandler}>Delete</Button>
                    <Button size="small" color="info" onClick={handleOpen}>More...</Button>
                </CardActions>
            </Card>

            <FullInfoModal open={open} handleClose={handleClose} cityInfo={cityInfo}/>
        </>
    );
};

export default CityCard;



