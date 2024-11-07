import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    message,
    Space,
    Typography,
} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import React, {useState} from "react";
import {Link} from "react-router-dom";

import SocialLogin from "@/components/SocialLogin";
import handleAPI from "@/apis/handleAPI";
import {useDispatch} from "react-redux";
import {addAuth} from "@/reduxs/reducers/authReducer";
import {localDataNames} from "@/constans/appInfos";

const {Title, Paragraph, Text} = Typography;
export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleLogin = async (values: { email: string; password: string }) => {
        setIsLoading(true);

        try {
            const res: any = await handleAPI("/auth/login", values, "post");
            message.success(res.message);
            res.data && dispatch(addAuth(res.data));

            if (isRemember) {
                localStorage.setItem(localDataNames.authData, JSON.stringify(res.data));
            }
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setIsLoading(false);

        }
    };
    return (
        <div style={{width: "70%"}}>
            <Card>
                <div className="text-center">
                    <img
                        className="mb-3"
                        style={{width: 100}}
                        src="https://firebasestorage.googleapis.com/v0/b/shoppingapp-b0de1.appspot.com/o/logo-moi-cua-starbucks.jpg%20(1).webp?alt=media&token=2025e8a2-096f-49b5-b64c-0ae0b1842bcc"
                        alt=""
                    />
                    <Title level={2}>Login in to your account</Title>
                    <Paragraph type="secondary">
                        Welcome back! Please enter your details
                    </Paragraph>
                </div>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleLogin}
                    disabled={isLoading}
                    size="large"
                >
                    <Form.Item
                        name={"email"}
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!!!",
                            },
                        ]}
                    >
                        <Input
                            allowClear
                            placeholder="enter your email"
                            maxLength={100}
                            type="email"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!!!",
                            },
                        ]}
                    >
                        <Input.Password
                            maxLength={100}
                            placeholder="enter your password"
                            type="password"
                        />
                    </Form.Item>
                </Form>
                <div className="row">
                    <div className="col">
                        <Checkbox
                            checked={isRemember}
                            onChange={(e: CheckboxChangeEvent) =>
                                setIsRemember(e.target.checked)
                            }
                        >
                            Remember for 30 days
                        </Checkbox>
                    </div>
                    <div className="col text-end">
                        <Link to={"/"}>Forgot password</Link>
                    </div>
                </div>
                <div className="mt-4 mb-3">
                    <Button
                        loading={isLoading}
                        type="primary"
                        style={{width: "100%"}}
                        size="large"
                        onClick={() => form.submit()}
                    >
                        Login
                    </Button>
                </div>
                <SocialLogin isRemember={isRemember}/>
                <div className="mt-3 text-center">
                    <Space>
                        <Text type="secondary">Dont't have an account?</Text>
                        <Link to={"/sign-up"}>sign-up</Link>
                    </Space>
                </div>
            </Card>
        </div>
    );
}