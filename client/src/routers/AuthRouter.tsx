import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Typography} from "antd";
import {Login, SignUp} from "@/screens";

const {Title} = Typography;
export default function AuthRouter() {
    return (
        <div className="container-fluid">
            <div className="row h-100">
                <div className="col d-none d-lg-block ">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/shoppingapp-b0de1.appspot.com/o/logo-moi-cua-starbucks.jpg%20(1).webp?alt=media&token=2025e8a2-096f-49b5-b64c-0ae0b1842bcc"
                            alt=""
                            style={{width: 500, objectFit: "cover"}}
                        />
                        <Title level={2}>Starbucks</Title>
                    </div>
                </div>
                <div className="col content-center">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login/>}/>
                            <Route path="/sign-up" element={<SignUp/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
}