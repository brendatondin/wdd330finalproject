import React from 'react'
import ReactDOM from 'react-dom/client'
import {Routes} from "./routes/Routes.jsx";
import './index.scss'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
            <Routes/>
        </LocalizationProvider>
    </React.StrictMode>
)
