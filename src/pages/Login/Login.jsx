import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {InputDefault} from "../../styles/styled-mui.jsx";
import {useState} from "react";

export const Login = ({setLogged}) => {
    const navigate = useNavigate();
    const [invalidUserMsg, setInvalidUserMsg] = useState(false);
    const [form, setForm] = useState({
        login: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (target, key) => {
        const value = target.value;
        setForm({...form, [key]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (form.login === 'user' && form.password === 'password') {
            localStorage.setItem('login', form.login);
            localStorage.setItem('password', form.password);
            setInvalidUserMsg(false);
            setLogged(true);
            navigate('/');
        } else {
            setInvalidUserMsg(true);
        }
    }

    return (
        <Box component="main" className="main-box">
            <section className="flex-center justify-content-center">
                <form className="stroke-border default-border-rad off-base-bg flex-center flex-column gap-16 p-24"
                      onSubmit={handleSubmit}>
                    <FormControl variant="standard" className="mb-16" fullWidth>
                        <InputLabel shrink className="default-label">
                            User
                        </InputLabel>
                        <InputDefault value={form.login}
                                      onChange={({target}) => handleChange(target, "login")}/>
                    </FormControl>
                    <FormControl variant="standard" className="mb-16" fullWidth>
                        <InputLabel shrink className="default-label">
                            Password
                        </InputLabel>
                        <InputDefault type={showPassword ? 'text' : 'password'} value={form.password}
                                      onChange={({target}) => handleChange(target, "password")} endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={(e) => e.preventDefault}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }/>
                    </FormControl>
                    {invalidUserMsg &&
                        <p className="my-16 text-center warning-color font-14 font-weight-600">Invalid User</p>
                    }
                    <Button className="default-button w-100" type="submit">
                        Login
                    </Button>
                </form>
            </section>
        </Box>
    )
}
