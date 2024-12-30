import {Router} from "express";
import {addNewSupplier, getSupplier, removeSupplier, updateSupplier} from "../controllers/supplier";

const router = Router();
router.get('/', getSupplier)
router.post('/add-new-supplier', addNewSupplier);
router.put('/update', updateSupplier);
router.delete('/remove', removeSupplier);

export default router;