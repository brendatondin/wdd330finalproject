import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes as Switcher, Route} from "react-router-dom";
import {Home} from "../pages/Home/Home.jsx";
import {Login} from "../pages/Login/Login.jsx";
import {Header} from "../layout/Header.jsx";
import {Footer} from "../layout/Footer.jsx";
import {checkLogged} from "../utils/utils.js";
import {Favourites} from "../pages/Favourites/Favourites.jsx";

export const Routes = () => {
    const [logged, setLogged] = useState(false);
    const [favourites, setFavourites] = useState([]);

    const setLiked = (obj) => {
        setFavourites([...favourites, setFavourites]);
        localStorage.setItem('favourites', JSON.stringify([...favourites, obj]));
    }

    const deleteFavorite = (index) => {
        const newState = [...favourites];
        newState.splice(index, 1);
        setFavourites(newState);
        localStorage.setItem('favourites', JSON.stringify(newState));
    }

    const checkFavourites = () => {
        const savedFavourites = localStorage.getItem('favourites');
        if (savedFavourites) {
            setFavourites(JSON.parse(savedFavourites));
        }
    }

    useEffect(() => {
        if (checkLogged()) {
            setLogged(true)
        } else {
            setLogged(false)
        }
        checkFavourites()
    }, [logged]);

    return (
        <BrowserRouter basename="/">
            <Header loggedUser={logged} setLogged={setLogged} favourites={favourites}/>
            <Switcher>
                <Route path="/"
                       element={<Home loggedUser={logged} setLiked={setLiked} deleteFavorite={deleteFavorite} checkFavourites={checkFavourites}/>}/>
                <Route path="/login" element={<Login setLogged={setLogged}/>}/>
                <Route path="/favourites" element={<Favourites loggedUser={logged} deleteFavorite={deleteFavorite}
                                                               favourites={favourites} checkFavourites={checkFavourites}/>}/>
            </Switcher>
        </BrowserRouter>
    )
}
