import React, {useEffect, useState} from 'react';
import {ColumnProps} from "antd/es/table";
import {Avatar, Button, message, Modal, Space, Table, Tooltip, Typography} from "antd";
import {Edit, Filter, UserRemove} from "iconsax-react";
import {colors} from "@/constans/colors";
import ToggleSupplier from "@/modals/ToggleSupplier";
import {SupplierModelType} from "@/models/SupplierModel";
import handleAPI from "@/apis/handleAPI";

const {Title, Text} = Typography
const {confirm} = Modal
const SupplierScreen = () => {
    const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false)
    const [suppliers, setSuppliers] = useState<SupplierModelType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [supplierSelected, setSupplierSelected] = useState<SupplierModelType>()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState<number>(10)
    const columns: ColumnProps<SupplierModelType>[] = [
        {
            title: '#',
            width: 100,
            dataIndex: '_id',
            fixed: 'left',
            render: (id: string) => {
                const index = suppliers.findIndex(element => element._id === id)
                return `${page > 1 ? (page - 1) * pageSize + index + 1 : index + 1}`
            }

        },
        {
            key: 'avatar',
            title: 'Avatar',
            dataIndex: 'photoUrl',
            render: (url) => <Avatar src={url}/>,
        },
        {
            key: 'product',
            title: 'Product',
            dataIndex: 'product',

        },
        {
            key: 'contact',
            title: 'Contact Number',
            dataIndex: 'contact',
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
        },
        {
            key: 'type',
            title: 'Type',
            dataIndex: 'isTaking',
            render: (isTaking: boolean) => <Text type={isTaking ? 'success' : 'danger'}>{isTaking ? 'Taking return' : 'Not Taking return'}</Text>
        },
        {
            key: 'onTheWay',
            title: 'On The Way',
            dataIndex: 'active',
            render: num => num ? num : '-'
        },
        {
            key: 'buttonContainer',
            title: '',
            dataIndex: '',
            render: (item: SupplierModelType) => <Space>
                <Tooltip title={'Edit'} placement="top">
                    <Button type={'text'} onClick={() => {
                        setSupplierSelected(item)
                        setIsVisibleModalAddNew(true)
                    }} icon={<Edit size={20} className={'text-info'}/>}/>

                </Tooltip>
                <Tooltip title={'Delete'} placement="top">
                    <Button type={'text'}
                            onClick={() =>
                                confirm({
                                    title: 'Delete',
                                    content: 'Are you sure delete?',
                                    onOk: () => removeSupplier(item._id)
                                })}
                            icon={<UserRemove size={20} className={'text-danger'}/>}/>

                </Tooltip>
            </Space>,
            fixed: 'right',
        }
    ]

    const handleVisibleModalAddNew = () => {
        setIsVisibleModalAddNew(true)
    }
    console.log(pageSize)
    const getSuppliers = async () => {
        const api = `/supplier?page=${page}&pageSize=${pageSize}`
        setIsLoading(true)
        try {
            const response = await handleAPI(api)
            response.data && setSuppliers(response.data.items)
            setTotal(response.data.total)
            console.log(response.data)

        } catch (error: any) {
            message.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getSuppliers()
    }, [pageSize, page])
    const removeSupplier = async (supplierId: string) => {
        try {
            //xoa mem
            // await handleAPI(`/supplier/update?id=${supplierId}`, {isDeleted: true}, 'put')
            //xoa
            await handleAPI(`supplier/remove?id=${supplierId}`, undefined, 'delete')
            getSuppliers()
        } catch (error: any) {
            console.log(error)

        }
    }
    return (
        <div>
            <Table loading={isLoading}
                   dataSource={suppliers.map((supplier) => ({
                       ...supplier,
                       key: supplier._id,
                   }))}
                   columns={columns}
                   pagination={{
                       showSizeChanger: true,
                       onShowSizeChange: (current, size) => {
                           setPageSize(size)
                       },
                       total: total,
                       onChange(page, pageSize) {
                           setPage(page)
                       }
                   }}
                   scroll={{
                       y: 'calc(100vh - 300px'
                   }}

                   title={() =>
                       <div className='row'>
                           <div className='col'>
                               <Title level={5}>Suppliers</Title>
                           </div>
                           <div className='col text-right'>
                               <Space>
                                   <Button type={'primary'}
                                           onClick={handleVisibleModalAddNew}>Add
                                       Product</Button>
                                   <Button icon={<Filter size={20}
                                                         color={colors.gray600}/>}>Filters</Button>
                                   <Button>Download all</Button>
                               </Space>
                           </div>
                       </div>}/>
            <ToggleSupplier
                visible={isVisibleModalAddNew}
                onClose={() => {
                    supplierSelected && getSuppliers()
                    setSupplierSelected(undefined)
                    setIsVisibleModalAddNew(false)
                }}
                onAddNew={(val) => setSuppliers((prevSuppliers) => [...prevSuppliers, val])}
                supplier={supplierSelected}

            />
        </div>
    );
};

export default SupplierScreen;