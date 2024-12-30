import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Form, Input, message, Modal} from "antd";
import {User} from "iconsax-react";
import {colors} from "@/constans/colors";
import {uploadFile} from "@/utils/uploadFile";
import {replaceName} from "@/utils/replaceName";
import handleAPI from "@/apis/handleAPI";
import {SupplierModelType} from "@/models/SupplierModel";
import {set} from "@firebase/database";
import {demoData} from "@/datas/demoData";

type PropsType = {
    visible: boolean,
    onClose: () => void,
    onAddNew: (val: SupplierModelType) => void,
    supplier?: SupplierModelType,
}

function ToggleSupplier(props: PropsType) {
    const {visible, onClose, onAddNew, supplier} = props;
    const [isLoading, setIsLoading] = useState(false)
    const [isTaking, setIsTaking] = useState<boolean>()
    const [file, setFile] = useState<any>()
    const [form] = Form.useForm();
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        if (supplier) {
            form.setFieldsValue(supplier)
            setIsTaking(supplier.isTaking === 1)
        } else {
            form.resetFields()
        }
    }, [supplier])
    useEffect(() => {
        return () => {
            if (file) {
                URL.revokeObjectURL(URL.createObjectURL(file));
            }
        }
    }, [file]);
    const addNewSupplier = async (values: any) => {
        setIsLoading(true)
        const data: any = {}
        const api = `/supplier/${supplier ? `update?id=${supplier._id}` : 'add-new-supplier'}`
        for (const i in values) {
            data[i] = values[i] ?? ''
        }
        data.price = values.price ? parseInt(values.price) : 0
        data.isTaking = isTaking ? 1 : 0
        // console.log(data)
        if (file) {
            data.photoUrl = await uploadFile(file)
        }
        data.slug = replaceName(values.name)
        // console.log(data)
        try {
            const res: any = await handleAPI(api, data, supplier ? 'put' : 'post')
            message.success(res.message)
            !supplier && onAddNew(res.data)
            handleClose()
            // console.log(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    const handleClose = () => {
        form.resetFields();
        setFile(undefined)
        onClose();
    }
    return (
        <Modal
            width={650}
            open={visible}
            closable={!isLoading}
            onClose={handleClose}
            onCancel={handleClose}
            onOk={() => form.submit()}
            title={supplier ? `Update` : `Add Supplier`}
            okText={supplier ? 'Update' : 'Add Supplier'}
            cancelText={'Discard'}
            okButtonProps={{
                loading: isLoading,
            }}
        >

            <label htmlFor={'inpFile'} className='p-2 mb-3 d-flex align-items-center justify-content-center'>
                {file ? (
                    <Avatar size={100} src={URL.createObjectURL(file)}/>
                ) : supplier ? <Avatar size={100} src={supplier.photoUrl}/> : (
                    <Avatar
                        size={100}
                        style={{
                            backgroundColor: 'white',
                            border: '1px dashed #000',
                        }}>

                        <User size={100} color={colors.gray600}/>
                    </Avatar>)}
                <div className='p-2 ml-3 d-flex flex-column align-items-center'>
                    <p>Drag image here</p>
                    <p>or</p>
                    <Button onClick={() => inputRef.current?.click()} className={'text-primary'} type={'link'}>Browse image</Button>
                </div>
            </label>
            <Form disabled={isLoading} onFinish={addNewSupplier} layout={'horizontal'} labelCol={{span: 6}} wrapperCol={{span: 18}} size={'large'} form={form}>
                <Form.Item name={'name'} rules={[
                    {
                        required: true,
                        message: 'Please input name',
                    }
                ]} label={'Supplier Name'}>
                    <Input placeholder={'EnterSupplier name'} allowClear/>
                </Form.Item>
                <Form.Item name={'product'} label={'Product'}>
                    <Input placeholder={'EnterSupplier product'} allowClear/>
                </Form.Item>
                <Form.Item name={'email'} label={'Email'}>
                    <Input placeholder={'EnterSupplier email'} allowClear type='email'/>
                </Form.Item>
                <Form.Item name={'active'} label={'Active'}>
                    <Input placeholder={'EnterSupplier active'} allowClear type='number'/>
                </Form.Item>
                <Form.Item name={'categories'} label={'Category'}>
                    <Input placeholder={'EnterSupplier category'} allowClear/>
                </Form.Item>
                <Form.Item name={'price'} label={'Buying Price'}>
                    <Input placeholder={'EnterSupplier price'} allowClear type='number'/>
                </Form.Item>
                <Form.Item name={'contact'} label={'Contact Number'}>
                    <Input placeholder={'EnterSupplier number'} allowClear type='number'/>
                </Form.Item>
                <Form.Item label={'Type'}>
                    <div style={{display: 'inline-flex', flexDirection: 'column', gap: '10px'}}>
                        <Button
                            size='large'
                            onClick={() => setIsTaking(false)}
                            type={isTaking === false ? 'primary' : 'default'}
                        >
                            Not taking return</Button>
                        <Button
                            size='large'
                            onClick={() => setIsTaking(true)}
                            type={isTaking ? 'primary' : 'default'}
                        >
                            Taking return</Button>
                    </div>
                </Form.Item>

            </Form>
            <input ref={inputRef}
                   accept={'image/*'}
                   className={'d-none'}
                   type={'file'} name={''}
                   id={'inpFile'}
                   onChange={(e: any) => setFile(e.target.files[0])}/>
            {/*<Button onClick={() => form.submit()}>check</Button>*/}
        </Modal>
    );
}

export default ToggleSupplier;