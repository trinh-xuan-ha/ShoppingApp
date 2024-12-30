import React from 'react';
import {Avatar, Button, Dropdown, Input, MenuProps, Space} from "antd";
import {Notification, SearchNormal} from "iconsax-react";
import {colors} from "@/constans/colors";
import {useDispatch, useSelector} from "react-redux";
import {authSelector, removeAuth} from "@/reduxs/reducers/authReducer";
import {auth} from "@/firebase/firebaseConfig";
import {useNavigate, useNavigation} from "react-router";
import {signOut} from "@firebase/auth";

type MenuItem = Required<MenuProps>['items'][number];

function HeaderComponent() {
    const user = useSelector(authSelector)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(user)
    const items: MenuProps['items'] = [
        {
            key: "logout",
            label: 'Logout',
            onClick: async () => {
                signOut(auth)
                dispatch(removeAuth({}))
                localStorage.clear()
                navigate('/')
            }
        }
    ]
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
                    <Button type="text" icon={<Notification size={20} color={colors.gray600}/>}/>
                    <Dropdown menu={{items}} placement="bottomLeft">
                        <Avatar
                            src={user.photoUrl}
                            size={35}/>
                    </Dropdown>
                </Space>
            </div>
        </div>
    );
}

export default HeaderComponent;