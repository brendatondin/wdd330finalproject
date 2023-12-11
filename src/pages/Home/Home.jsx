import styles from './home.module.scss';
import {getNasaImgs} from "../../services/api.js";
import {useEffect, useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {Box, Button, Modal} from "@mui/material";
import variables from '../../styles/variables.module.scss';
import {styleModal} from "../../styles/styled-mui.jsx";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export const Home = ({loggedUser, setLiked, checkFavourites}) => {
    const [date, setDate] = useState(dayjs(Date()));
    const [media, setMedia] = useState();
    const [todaysMedia, setTodaysMedia] = useState();
    const [open, setOpen] = useState(false);
    const [todayOpen, setTodayOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleCloseToday = () => setTodayOpen(false);

    const nasaMedia = async (today) => {
        const response = await getNasaImgs(!today ? date.format('YYYY-MM-DD') : '');
        if (today) {
            setTodaysMedia(response.data);
        } else {
            setMedia(response.data);
        }
    }

    const renderMedia = (today) => {
        const obj = today ? todaysMedia : media;
        if (obj.media_type === 'image' || obj.media_type === 'gif') {
            return (
                <img src={obj.url} alt="" className="w-100 h-100 default-border-rad"/>
            )
        } else if (obj.media_type === 'video') {
            //11/07/2023
            return (
                <iframe style={{height: 600, width: '100%'}} src={obj.url}></iframe>
            )
        }
    }
    const changeDate = (newValue) => {
        setDate(newValue)
    }
    useEffect(() => {
        nasaMedia();
        checkFavourites()
    }, [date])
    return (
        <Box component="main" className="main-box">
            <section className="flex-center justify-content-center h-100 w-100">
                <form className={`d-flex flex-column gap-16 ${styles.form}`}>
                    <div className="flex-center-between gap-12">
                        <DatePicker disableFuture format="MM/DD/YYYY" defaultValue={date}
                                    onChange={changeDate} sx={{
                            backgroundColor: variables.baseColor,
                            borderRadius: variables.smallBorderRadius,
                            '& .MuiInputBase-input': {paddingTop: '9px', paddingBottom: '9px'}
                        }}/>
                        <Button className="default-button" variant="contained"
                                onClick={() => setOpen(true)}>Search</Button>
                    </div>
                    <div className="flex-center-between gap-16">
                        <Button className="default-button" onClick={() => {
                            nasaMedia(true);
                            setTodayOpen(true);
                        }} variant="contained">Today</Button>
                        {
                            loggedUser &&
                            <Button className="default-button" variant="contained" onClick={() => setLiked(media)}>
                                <ThumbUpIcon sx={{marginRight: 2, fontSize: '20px'}}></ThumbUpIcon>
                                Like</Button>
                        }

                    </div>
                </form>
            </section>
            <Modal open={open} onClose={handleClose}>
                <Box sx={styleModal} className="flex-center justify-content-center">
                    {media &&
                        renderMedia()
                    }
                </Box>
            </Modal>
            <Modal open={todayOpen} onClose={handleCloseToday}>
                <Box sx={styleModal} className="flex-center justify-content-center">
                    {todaysMedia &&
                        renderMedia(true)
                    }
                </Box>
            </Modal>
        </Box>
    )
}
