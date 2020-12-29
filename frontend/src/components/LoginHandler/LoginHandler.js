import Axios from "axios";

async function LoginHandler(email, password) {
    const res = await Axios.post("/api/login", {email, password});
    const {data} = await res;
    if (data.error) {
        return data.error
    } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        return true
    }
}

// This needs some work. Research more into jwt for refreshing tokens.
async function isLoggedIn() {
    const token = localStorage.getItem("token")
    if (!token) {
        return false
    }
    try {
        const res = await Axios.post("/api/checkiftokenexpire", {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        const {data} = await res;
        return data.success
    } catch {
        console.log("Something went wrong.")
        const refresh_token = localStorage.getItem("refreshToken")
        if (!refresh_token) {
            console.log('Removing token.')
            localStorage.removeItem("token")
            console.log(' line 38 Returning false.')
            return false;
        }
        console.log('Refreshing token.')
        Axios.post("/api/refreshtoken", {}, {
            headers: {
                Authorization: `Bearer ${refresh_token}`
            },
            
        }).then(res => {
            console.log('New token put in localstorage.')
            localStorage.setItem("token", res.data.token)
        })
        console.log('Returning TRUE..')
        return true;
    }
}

function logout() {
    if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token")
        Axios.post("/api/logout/access", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                localStorage.removeItem("token")
            }
        })
    }
    if (localStorage.getItem("refreshToken")) {
        const refreshToken = localStorage.getItem("refreshToken")
        Axios.post("/api/logout/refresh", {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                localStorage.removeItem("refreshToken")
            }
        })
    }
    localStorage.clear();
    setTimeout(() => window.location = "/", 500)
}


export {LoginHandler, isLoggedIn, logout};