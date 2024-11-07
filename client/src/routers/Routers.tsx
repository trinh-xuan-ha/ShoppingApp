import {useEffect, useState} from "react";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import {useDispatch, useSelector} from "react-redux";
import {
    addAuth,
    authSelector,
    AuthStateType,
} from "@/reduxs/reducers/authReducer";
import {localDataNames} from "@/constans/appInfos";
import {Spin} from "antd";

export default function Routers() {
    const [isLoading, setIsLoading] = useState(false);
    const auth: AuthStateType = useSelector(authSelector);
    const dispatch = useDispatch();
    // console.log(auth)
    const getData = async () => {

        const res = localStorage.getItem(localDataNames.authData);
        res && dispatch(addAuth(JSON.parse(res)));

    };
    useEffect(() => {
        const fetchData = async () => {
            await getData();
        }
        fetchData().catch((error) => {
            console.error('error fetching data', error);
        })
    }, []);


    return isLoading ? <Spin/> : !auth.token ? <AuthRouter/> : <MainRouter/>;
}