import dotenv from "dotenv";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel";
import {getAccessToken} from "../utils/getAccessToken";
import {generatorRandomText} from "../utils/generatorRadomText";

dotenv.config();

const register = async (req: any, res: any) => {
    const body = req.body;
    const {email, password} = body;
    try {
        console.log(body);
        const user = await UserModel.findOne({email});
        if (user) {
            return res.status(400).json({message: `User already exists email`});
        }
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(password, salt);
        // console.log(hashedPassword)
        const newUser: any = new UserModel(body);
        await newUser.save();

        delete newUser._doc.password;
        res.status(200).json({
            message: "Register",
            data: {
                ...newUser._doc,
                token: await getAccessToken({
                    _id: newUser._id,
                    email: newUser.email,
                    rule: 1,
                }),
            },
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};
const login = async (req: any, res: any) => {
    const body = req.body;
    const {email} = body;
    try {
        console.log(body);
        const user: any = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({message: `Account does not exist`});
        }
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt)
        // console.log(hashedPassword)
        // body.password = hashedPassword;
        // const newUser: any = new UserModel(body)
        // await newUser.save();
        const isMatchPassword = await bcrypt.compare(body.password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({message: `Incorrect email or password`});
        }
        delete user._doc.password;
        res.status(200).json({
            message: "Login successfully!!!",
            data: {
                ...user._doc,
                token: await getAccessToken({
                    _id: user._id,
                    email: user.email,
                    rule: user.rule ?? 1,
                }),
            },
        });

    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};
const loginWithGoogle = async (req: any, res: any) => {
    const body = req.body;
    const {email} = body;
    try {
        console.log(body);
        const user: any = await UserModel.findOne({email});
        if (user) {
            delete user._doc.password;
            res.status(200).json({
                message: "Login successfully!!!",
                data: {
                    ...user._doc,
                    token: await getAccessToken({
                        _id: user._id,
                        email: user.email,
                        rule: user.rule ?? 1,
                    }),
                },
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(generatorRandomText(8), salt);
            const newUser: any = new UserModel(body);
            await newUser.save();

            delete newUser._doc.password;
            res.status(200).json({
                message: "Register",
                data: {
                    ...newUser._doc,
                    token: await getAccessToken({
                        _id: newUser._id,
                        email: newUser.email,
                        rule: 1,
                    }),
                },
            });
        }
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};
const refreshToken = async (req: any, res: any) => {
    const {id} = req.query;
    const user = await UserModel.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    const token = await getAccessToken({
        _id: id,
        email: user.email,
        rule: user.rule,
    });
    try {
        res.status(200).json({
            message: "refreshToken",
            data: token,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export {login, register, loginWithGoogle, refreshToken};