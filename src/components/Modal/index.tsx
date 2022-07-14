import React, {FC} from 'react';
import {Box, Modal, Typography} from "@mui/material";
import {ICityWeather} from "../../models/ICityWeather";
import styles from './Modal.module.scss'
import axios from "axios";
import {ICityHourlyWeather, WeatherForHour} from '../../models/ICityHoutlyWeather'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import CallMadeIcon from '@mui/icons-material/CallMade';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';


interface FullInfoModalProps {
    open: boolean;
    handleClose: () => void;
    cityInfo: ICityWeather
}

export const FullInfoModal: FC<FullInfoModalProps> = ({open, handleClose, cityInfo}) => {
    const [hourInfo, setHourInfo] = React.useState<WeatherForHour[] | null>(null)
    
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'rgb(0, 0, 0, .9)',
        border: '2px solid #000',
        borderRadius: 5,
        p: 4,
    };

    React.useEffect(() => {
        if (open){
            (async () => {
                const res = await axios.get<ICityHourlyWeather>(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo.coord.lat}&lon=${cityInfo.coord.lon}&exclude=minutely,daily&appid=2010ac909e465fe6f065bb7d66338117`)
                setHourInfo(res.data.hourly.slice(0,11)) 
            })()
        }
    }, [open])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.title}>
                    <span> {cityInfo.name} {(cityInfo.main.temp - 273.15).toFixed(0)}°C</span>
                        <span><img src={`http://openweathermap.org/img/wn/${cityInfo?.weather[0].icon}@2x.png`} alt="weatherIcon" /></span>
                    </Typography>
                    <div className={styles.contentBox}>
                        <div className={styles.mainInfoBox}>
                            <div className={styles.leftSide}>
                                <div className={styles.info}>
                                    <WbSunnyIcon sx={{ color: "#c8ca50", fontSize: 40}} />   
                                    <p style={{fontSize: 24}}>{cityInfo.weather[0].main}, {cityInfo.weather[0].description}</p>
                                </div>
                                <div className={styles.info}>
                                    <AirIcon sx={{ color: "#888888", fontSize: 40}} />   
                                    <p style={{fontSize: 24}}> - {cityInfo.wind.speed}, </p>
                                    
                                    <CallMadeIcon sx={{ color: "#888888", fontSize: 40, marginLeft: 5}} /> 
                                    <p style={{fontSize: 24}}> - {cityInfo.wind.deg}</p>
                                </div>
                                <div className={styles.info}>
                                    <DeviceThermostatIcon sx={{ color: "#2f304a", fontSize: 40}} />   
                                    <p style={{fontSize: 24}}>{cityInfo.weather[0].main}, {cityInfo.weather[0].description}</p>
                                </div>
                            </div>
                            <div className={styles.temp}>
                            <DeviceThermostatIcon sx={{ color: "#ab2507", fontSize: 40}} />
                                <p>Max / Min:</p> 
                                <p>{(cityInfo.main.temp_min - 273.15).toFixed(0)}°C /
                                {(cityInfo.main.temp_max - 273.15).toFixed(0)}°C</p>
                            </div>
                        </div>
                        <div className={styles.hourlyTempBox}>
                            {
                                hourInfo ? hourInfo.map((listItem: WeatherForHour) => 
                                <div key={listItem.dt.toString()} className={styles.hourBox}>
                                    <p className={styles.hours}>{new Date(listItem.dt * 1000).getHours()}</p>
                                    <img src={`http://openweathermap.org/img/wn/${listItem?.weather[0].icon}@2x.png`} alt="weatherIcon" />
                                    <p className={styles.tempText}>{(listItem.temp - 273.15).toFixed(0)}°C</p>
                                </div>) : <p></p>
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};