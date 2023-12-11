import {AppBar, Button} from "@mui/material";
import styles from './headerAndFooter.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../utils/utils.js";

export const Header = ({loggedUser, setLogged, favourites}) => {

    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        setLogged(false);
        navigate('/login');
    }

    return (
        <AppBar position="fixed"
                className={`${styles.headerAndFooter} flex-center bg-transparent flex-column flex-sm-row w-100 justify-content-between p-sm-32`}>
            {/*<img className={styles.apps} src="/images/expoApps.svg" alt=""/>*/}
            <Link className="title-color" to="/">
                <img src="/logo.png" alt="" width="100px"/>
            </Link>
            {!loggedUser ?
                <div className="d-flex gap-16">
                    <Link to="/">
                        <Button variant="contained" className="default-button">Home</Button>
                    </Link>
                    <Link to={'/login'}>
                        <Button variant="contained" className="default-button">Login</Button>
                    </Link>
                </div>
                :
                (loggedUser &&
                    <div className="d-flex gap-16">
                        <Link to="/">
                            <Button variant="contained" className="default-button">Home</Button>
                        </Link>
                        <Link to="/favourites">
                            <Button variant="contained" className="default-button">Favourites
                                {favourites.length > 0 &&
                                    <span
                                        className="ms-8 stroke-bg p-4 rounded flex-center justify-content-center title-color base-bg font-weight-600"
                                        style={{height: '24px', width: '24px'}}>{favourites.length}</span>
                                }
                            </Button>
                        </Link>
                        <Button onClick={logoutUser} variant="contained" className="default-button">Logout</Button>
                    </div>
                )

            }
        </AppBar>
    )
}
