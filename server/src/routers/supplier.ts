import {Router} from "express";
import {addNewSupplier} from "../controllers/supplier";

const router = Router();
router.get('/')
router.post('/add-new-supplier', addNewSupplier);

export default router;