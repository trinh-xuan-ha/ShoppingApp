import jwt from "jsonwebtoken";

const verifyToken = (req: any, res: any, next: any) => {
    const headers = req.headers.authorization;
    const accessToken = headers ? headers.split(" ")[1] : "";
    console.log("Access Token:", accessToken);
    try {
        if (!accessToken) {
            res.status(401).json({error: 'no access'})
        }
        // console.log(accessToken);
        const verifiedToken: any = jwt.verify(
            accessToken,
            process.env.SECRET_KEY as string
        );
        if (!verifiedToken) {
            return res.status(401).json({error: "Invalid token"});
        }
        req._id = verifiedToken._id;
        // console.log(verfy);
        next();
    } catch (error: any) {
        console.log("Verification error:", error.message); // Kiểm tra lỗi chi tiết
        res.status(401).json({error: error.message});
    }
};
export {verifyToken};