import {Button, message} from "antd";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {auth} from "@/firebase/firebaseConfig";
import handleAPI from "@/apis/handleAPI";
import {addAuth} from "@/reduxs/reducers/authReducer";
import {localDataNames} from "@/constans/appInfos";

type propsType = {
    isRemember?: boolean,
}

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'trinhxuanha8862@gmail.com'
});
export default function SocialLogin({isRemember}: propsType) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const handleLoginGoogle = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, provider)
            if (result) {
                const user = result.user;
                if (user) {
                    const data = {
                        name: user.displayName,
                        email: user.email
                    }
                    const api = '/auth/google-login'
                    try {
                        const res: any = await handleAPI(api, data, 'post')
                        message.success(res.message);
                        dispatch(addAuth(res.data))
                        if (isRemember) {
                            localStorage.setItem(localDataNames.authData, JSON.stringify(res.data))
                        }
                    } catch (error: any) {
                        console.log(error);
                        message.error(error.response?.data?.message || error.message || 'An unknown error occurred');
                    } finally {
                        setIsLoading(false)
                    }
                }
            } else {
                console.log("Can not Login with Google");
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Button
            loading={isLoading}
            onClick={handleLoginGoogle}
            style={{
                width: "100%",
            }}
            icon={
                <img
                    width={24}
                    height={24}
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt="google-logo"
                />
            }
        >
            Google
        </Button>
    );
}