import {Button, Card, Form, Input, message, Space, Typography} from "antd";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import SocialLogin from "@/components/SocialLogin";

import handleAPI from "@/apis/handleAPI";
import {useDispatch} from "react-redux";
import {addAuth} from "@/reduxs/reducers/authReducer";


const {Title, Paragraph, Text} = Typography;

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const handleLogin = async (values: {
        name: string;
        email: string;
        password: string;
    }) => {
        const api = '/auth/register'
        setIsLoading(true);
        try {
            const res: any = await handleAPI(api, values, 'post')
            console.log(res.data)
            if (res.data) {
                message.success(res.message);

                dispatch(addAuth(res.data))
                console.log(res.data)
            }
        } catch (error: any) {
            const status = error.response?.status;
            const errorMsg = error.response?.data?.message;


            if (status === 400) {
                if (errorMsg === "User already exists email") {
                    message.error("Email already exists. Please choose another email.");
                } else {
                    message.error(errorMsg || "An unexpected error occurred.");
                }
            } else {
                message.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div style={{width: "70%"}}>
            <Card>
                <div className="text-center">
                    <Title level={2}>Create an account</Title>
                    <Paragraph type="secondary">Start your 30-day free trial</Paragraph>
                </div>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleLogin}
                    disabled={isLoading}
                    size="large"
                >
                    <Form.Item
                        name={"name"}
                        label={"Name"}
                        rules={[
                            {
                                required: true,
                                message: "Enter your name",
                            },
                            {
                                validator: (_, value) => {
                                    if (value && value.trim().length === 0) {
                                        return Promise.reject((new Error("Name cannot be empty spaces.")))
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input
                            allowClear
                            placeholder="enter your name"
                            maxLength={50}
                            type="text"
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        name={"email"}
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!!!",
                            },
                            () => ({
                                validator: (_, value) => {
                                    if (value && value.trim().length === 0) {
                                        return Promise.reject(new Error("Email cannot be empty spaces."));
                                    }
                                    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                        return Promise.reject("Please enter a valid email");
                                    } else {
                                        return Promise.resolve(true);
                                    }
                                }
                            })
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
                        className="mb-0"
                        name={"password"}
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!!!",
                            },
                            () => ({
                                validator: (_, value) => {
                                    if (value && value.trim().length === 0) {
                                        return Promise.reject(new Error("Password cannot be empty spaces."));
                                    }
                                    if (!value || value.length < 8) {
                                        return Promise.reject(new Error("Password must be at least 8 characters!"));
                                    } else {
                                        return Promise.resolve()
                                    }
                                }
                            })
                        ]}
                    >
                        <Input.Password
                            placeholder="enter your password"
                            maxLength={100}
                            type="password"
                        />
                    </Form.Item>
                </Form>
                <div className="row">
                    <Text type="secondary">Must be at least 8 characters</Text>
                </div>
                <div className="mt-4 mb-3">
                    <Button
                        loading={isLoading}
                        type="primary"
                        style={{width: "100%"}}
                        size="large"
                        onClick={() => form.submit()}
                    >
                        Sign up
                    </Button>
                </div>
                <SocialLogin/>
                <div className="mt-3 text-center">
                    <Space>
                        <Text type="secondary">Already have an account?</Text>
                        <Link to={"/"}>Log in</Link>
                    </Space>
                </div>
            </Card>
        </div>
    );
}