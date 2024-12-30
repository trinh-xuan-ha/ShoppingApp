import SupplierModel from "../models/SupplierModel";


const getSupplier = async (req: any, res: any) => {
    const {pageSize, page} = req.query; //lấy dữ liệu theo trang
    console.log(pageSize, page);
    try {
        const skip = (page - 1) * pageSize;
        const items = await SupplierModel.find({isDeleted: false})
            .skip(skip)
            .limit(pageSize)
        const total = await SupplierModel.countDocuments(items);
        console.log(total);
        res.status(200).json({
            message: "Supplier with items",
            data: {
                total,
                items
            },
        });
    } catch (error: any) {
        // console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
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
const updateSupplier = async (req: any, res: any) => {
    const body = req.body;
    const {id} = req.query;
    try {
        await SupplierModel.findByIdAndUpdate(id, body)
        // const item = await SupplierModel.findById(id)
        res.status(200).json({
            message: "Supplier updated!",
            data: [],
        });
    } catch (error: any) {
        // console.log(error);
        res.status(404).json({
            message: error.message,
        });
    }
};
const removeSupplier = async (req: any, res: any) => {

    const {id} = req.query;
    try {
        await SupplierModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Supplier remove!",
            data: [],
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};
export {addNewSupplier, getSupplier, updateSupplier, removeSupplier};