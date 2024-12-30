import axios from "axios";
// import {localDataNames} from "../constans/appInfos";
import queryString from "query-string";
import {localDataNames} from "@/constans/appInfos";

const baseURL = process.env.REACT_APP_BASE_URL || `http://localhost:3001`;
const getAccessToken = () => {
    const res = localStorage.getItem(localDataNames.authData);
    return res ? JSON.parse(res).token : "";
};
const axiosClient = axios.create({
    baseURL,
    paramsSerializer: (params) => {
        return queryString.stringify(params);
    },
});
axiosClient.interceptors.request.use(
    async (config: any) => {
        const accessToken = getAccessToken();
        config.headers = {
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
            Accept: "application/json",
            ...config.headers,
        };
        console.log(config);
        return {...config, data: config.data ?? null};
    },
    (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
    (res) => {
        // console.log(res);
        if (res.data && res.status >= 200 && res.status < 300) {
            return res.data;
        } else {
            return Promise.reject(res.data);
        }
    },
    (error) => {
        const {response} = error;
        return Promise.reject(response ? response.data : error.message);
    }
);
export default axiosClient;