import React from 'react';
import {Button, Form, Input, Modal} from "antd";

type PropsType = {
    visible: boolean,
    onClose: () => void,
    onAddNew: (val: any) => void,
    supplier?: any,
}

function ToggleSupplier(props: PropsType) {
    const {visible, onClose, onAddNew, supplier} = props;
    const [form] = Form.useForm();
    const addNewSupplier = async () => {
    }
    const handleClose = () => {
        form.resetFields();
        onClose();
    }
    return (
        <Modal
            width={750}
            open={visible}
            onClose={handleClose}
            onCancel={handleClose}
            title="add Supplier"
            okText={'add Supplier'}
            cancelText={'Discard'}
        >
            <Form onFinish={addNewSupplier} layout={'horizontal'} labelCol={{span: 6}} wrapperCol={{span: 18}} size={'large'} form={form}>
                <Form.Item name={'name'} label={'Supplier Name'}>
                    <Input placeholder={'EnterSupplier name'} allowClear/>
                </Form.Item>
                <Form.Item name={'product'} label={'Product'}>
                    <Input placeholder={'EnterSupplier name'} allowClear/>
                </Form.Item>
                <Form.Item name={'categories'} label={'Category'}>
                    <Input placeholder={'EnterSupplier name'} allowClear/>
                </Form.Item>
                <Form.Item name={'price'} label={'Buying Price'}>
                    <Input placeholder={'EnterSupplier name'} allowClear/>
                </Form.Item>
                <Form.Item name={'contact'} label={'Contact Number'}>
                    <Input placeholder={'EnterSupplier name'} allowClear/>
                </Form.Item>
                <Form.Item label={'Type'} className="d-flex flex-column align-items-center">
                    <Button>Not taking return</Button>
                    <Button>Taking return</Button>
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default ToggleSupplier;