import axios from "axios";
import { toast } from "react-toastify";
import ValidateOtp from "../components/auth/verification/ValidateOtp.jsx";
import { store } from "./stores/store.js";
import { convertKeysToLowerCase } from "./utilities/commonUtility.js";
import { CookieManager } from "./utilities/cookieManager.js";

axios.defaults.baseURL = "http://localhost:4000/v1/";
// axios.defaults.withCredentials = true;

const responseBody = (response) => {
    return response.data
};

const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        // 'Authorization': `Bearer ${}`,
    };
    return config;
});

axios.interceptors.response.use(
    async (response) => {
        // sleep(2000)
        return response;
    },
    async (error) => {
        let { data, status } = error.response;

        switch (status) {
            case 400:
                if (typeof data.message === "string" && data.message !== 'Invalid refresh token') {
                    throw data;
                }

                if (data.errors) {
                    const modelStateErrors = Object.keys(data.errors).map(key => {
                        if (typeof data.errors[key] === 'string') {
                            return data.errors[key];
                        }

                        return data.errors[key][0];
                    });

                    if (modelStateErrors.find(error => 'The otpToken field is required.'.includes(error))) {
                        console.log('hello');

                        openOtpModal();
                    }

                    toast.error(modelStateErrors);
                    throw modelStateErrors.flat();
                }

                break;

            case 401:
                Redirect(401)
                break;
            case 403:
                // window.location.href = '/';
                break;
            case 404:
                // navigate.push('/not-found')
                break;

            case 500:
                // navigate.push('/serverError')
                break;

            default:
                break;
        }

        return Promise.reject(error); // Always reject the error for further handling
    }
);


export const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
};

const authentication = {
    login : (body)=> requests.post('auth/login' , body),
    register : (body)=>requests.post('auth/register' ,body)
}


const agent = {
    authentication
};

export default agent;