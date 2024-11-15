import SupplierModel from "../models/SupplierModel";

const addNewSupplier = async (req: any, res: any) => {
    const body = req.body;
    try {
        const newSupplier = new SupplierModel(body);
        await newSupplier.save();
        res.status(200).json({
            message: "add new supplier successfully!",
            data: newSupplier,
        });
    } catch (error: any) {
        // console.log(error);
        res.status(404).json({
            message: error.message,
        });
    }
};
export {addNewSupplier};