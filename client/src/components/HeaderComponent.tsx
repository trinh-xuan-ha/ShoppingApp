import React from 'react';
import {Avatar, Button, Input, Space} from "antd";
import {Notification, SearchNormal} from "iconsax-react";
import {colors} from "@/constans/colors";

function HeaderComponent() {
    return (
        <div className={'p-2 row bg-white'}>
            <div className={'col'}>
                <Input size={'large'} style={{
                    borderRadius: 100,
                    width: '50%'
                }} placeholder={'Search product, supplier, order'} prefix={<SearchNormal className='text-muted' size={20}/>}/>
            </div>
            <div className="col " style={{textAlign: 'right'}}>
                <Space>
                    <Button type="text" icon={<Notification size={20} color={colors.grey600}/>}/>
                    <Avatar
                        src={'https://png.pngtree.com/png-clipart/20240321/original/pngtree-avatar-job-student-flat-portrait-of-man-png-image_14639683.png'}
                        size={35}/>
                </Space>
            </div>
        </div>
    );
}

export default HeaderComponent;