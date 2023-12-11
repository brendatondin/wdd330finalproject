export const checkLogged = () => {
    const loggedUser = {
        login: localStorage.getItem('login'),
        password: localStorage.getItem('password')
    }
    return !!loggedUser.login
}

export const logout = () => {
    localStorage.clear();
}
