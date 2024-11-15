import React, {useState} from 'react';
import {ColumnProps} from "antd/es/table";
import {Button, Space, Table, Typography} from "antd";
import {Filter} from "iconsax-react";
import {colors} from "@/constans/colors";
import ToggleSupplier from "@/modals/ToggleSupplier";

const {Title} = Typography

const SupplierScreen = () => {
    const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false)
    const columns: ColumnProps<any>[] = []
    const handleVisibleModalAddNew = () => {
        setIsVisibleModalAddNew(true)
    }
    return (
        <div>
            <Table dataSource={[]} columns={columns} title={() =>
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
                                                  color={colors.grey600}/>}>Filters</Button>
                            <Button>Download all</Button>
                        </Space>
                    </div>
                </div>}/>
            <ToggleSupplier
                visible={isVisibleModalAddNew}
                onClose={() => setIsVisibleModalAddNew(false)}
                onAddNew={(val) => console.log(val)}/>
        </div>
    );
};

export default SupplierScreen;