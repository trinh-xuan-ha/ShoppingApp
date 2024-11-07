const getProducts = async (res: any) => {
    try {
        res.status(200).json({
            message: "Products",
            data: [],
        });
    } catch (error: any) {
        // console.log(error);
        res.status(404).json({
            message: error.message,
        });
    }
};
export {getProducts};