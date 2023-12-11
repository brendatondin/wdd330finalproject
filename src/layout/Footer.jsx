import {AppBar, Box, Paper} from "@mui/material";
import styles from "./headerAndFooter.module.scss";
import variables from '../styles/variables.module.scss';

export const Footer = () => {
    return (
        <Paper sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,

        }} component="footer">
            <Box className={`${styles.headerAndFooter} flex-center justify-content-center`}>
                {/*<img src="/images/expoKaizen.svg" width="234" alt=""/>*/}
                LOGO
            </Box>
        </Paper>
    )
}
