import {Box, Grid, IconButton, Modal} from "@mui/material";
import {useEffect, useState} from "react";
import {styleModal} from "../../styles/styled-mui.jsx";
import DeleteIcon from '@mui/icons-material/Delete';

export const Favourites = ({loggedUser, deleteFavorite, favourites, checkFavourites}) => {
    const [open, setOpen] = useState(false);
    const [media, setMedia] = useState({});
    const handleClose = () => setOpen(false);
    const renderMedia = (obj) => {
        if (obj.media_type === 'image' || obj.media_type === 'gif') {
            return (
                <img src={obj.hdurl} alt="" className="w-100 h-100 default-border-rad"/>
            )
        } else if (obj.media_type === 'video') {
            //11/07/2023
            return (
                <iframe style={{height: 600, width: 600}} src={obj.url}></iframe>
            )
        }
    }
    useEffect(() => {
        checkFavourites()
    }, [])
    return (
        <Box component="main" className="main-box">
            <Grid container spacing={3} sx={{marginTop: '0px'}}>
                {/* eslint-disable-next-line react/prop-types */}
                {favourites.length > 0 ?
                    // eslint-disable-next-line react/prop-types
                    favourites.map((item, index) => {
                            return (
                                <Grid key={index} item xs={12} md={6} lg={4} className="position-relative">
                                    <div style={{right: '-18px'}}
                                         className="position-absolute stroke-bg default-border-rad z-3 top-8">
                                        <IconButton color="error" onClick={()=>{deleteFavorite(index)}}>
                                            <DeleteIcon sx={{fontSize: 24}}/>
                                        </IconButton>
                                    </div>
                                    <a className="default-border-rad stroke-border p-16 d-flex flex-column  off-base-bg gap-8 "
                                       onClick={() => {
                                           setOpen(true);
                                           setMedia(item);
                                       }}>
                                        <h3 className="title-color font-18 font-weight-600 line-clamp-1"
                                            title={item?.title}>{item?.title}</h3>
                                        <p className="title-color font-14 font-weight-400 line-clamp-4"
                                           title={item?.explanation}>{item?.explanation}</p>
                                    </a>
                                </Grid>
                            )
                        }
                    )
                    :
                    <Grid item xs={12}>
                        <div className="default-border-rad stroke-border p-16 off-base-bg ">
                            <h3 className="title-color font-18 font-weight-600 text-center">You have no favorite media</h3>
                        </div>
                    </Grid>
                }
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={styleModal} className="flex-center justify-content-center">
                        <div className="h-100">
                            {renderMedia(media)}
                        </div>
                    </Box>
                </Modal>
            </Grid>
        </Box>
    )
}
