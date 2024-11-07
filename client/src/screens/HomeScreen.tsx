import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    authSelector,
    refreshToken,
    removeAuth,
} from "@/reduxs/reducers/authReducer";
import handleAPI from "../apis/handleAPI";


export default function HomeScreen() {
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);
    console.log("🚀 ~ HomeScreen ~ auth:", auth);
    const login = () => {
        dispatch(removeAuth({}));
    };
    const getProducts = async () => {
        const api = "/storage/products";
        try {
            const res = await handleAPI(api);
            console.log(res);
        } catch (error: any) {
            console.log(error);
            if (error.error === "no access") {
                console.log("this is error");
                await handleRefreshToken();
            }
        }
    };
    const handleRefreshToken = async () => {
        const api = `auth/refresh-token?id=${auth._id}`;
        try {
            const res = await handleAPI(api);
            dispatch(refreshToken(res.data.token));
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Button className={""}>hello</Button>
            <Button onClick={getProducts}>get products</Button>
            <button onClick={login} className="btn btn-sm btn-danger">
                Logout
            </button>
        </div>
    );
}