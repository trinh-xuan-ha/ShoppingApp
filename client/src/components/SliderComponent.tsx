import React from 'react';
import {Layout, Menu, MenuProps, Typography} from "antd";
import {Link} from "react-router-dom";
import {Box, Chart, Home2, ProfileCircle} from "iconsax-react";
import {CiViewList} from "react-icons/ci";
import {MdOutlineInventory} from "react-icons/md";
import {LogoInfo} from "@/constans/appInfos";
import {colors} from "@/constans/colors";

const {Sider} = Layout;
const {Text} = Typography;
const style = {textDecoration: 'none'}
type MenuItem = Required<MenuProps>['items'][number];
const SliderComponent = () => {
    const items: MenuItem[] = [
        {
            key: 'dashboard',
            label: <Link style={style} to={'/dashboard'}>Dashboard</Link>,
            icon: <Home2 size={20}/>
        },
        {
            key: 'inventory',
            label: <Link style={style} to={'/inventory'}>Inventory</Link>,
            icon: <MdOutlineInventory size={20}/>
        },
        {
            key: 'reports',
            label: <Link style={style} to={'/report'}>Reports</Link>,
            icon: <Chart size={20}/>

        },
        {
            key: 'suppliers',
            label: <Link style={style} to={'/suppliers'}>Suppliers</Link>,
            icon: <ProfileCircle size={20}/>

        },
        {
            key: 'orders',
            label: <Link style={style} to={'/orders'}>Orders</Link>,
            icon: <Box size={20}/>

        },
        {
            key: 'Manage store',
            label: <Link style={style} to={'/manage-store'}>ManageStore</Link>,
            icon: <CiViewList size={20}/>

        }
    ]
    return (
        <Sider theme={'light'}>
            <div className="p-2 d-flex align-items-center gap-2">
                <img
                    width={60}
                    alt={LogoInfo.title}
                    src={LogoInfo.src}
                />
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: colors.primary_500,
                }}>{LogoInfo.title}</Text>
            </div>
            <Menu items={items} theme={'light'}/>
            <p>this is slider component</p>
        </Sider>

    );
};

export default SliderComponent;