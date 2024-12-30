import React from "react";
import HomeScreen from "@/screens/HomeScreen";
import {Affix, Layout} from "antd";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import InventoryScreen from "@/screens/InventoryScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import ManageStoreScreen from "@/screens/ManageStoreScreen";
import SupplierScreen from "@/screens/SupplierScreen";
import ReportScreen from "@/screens/ReportScreen";
import OrderScreen from "@/screens/OrderScreen";
import {HeaderComponent, SliderComponent} from "@/components";

export default function MainRouter() {
    const {Content, Footer, Header} = Layout
    return <BrowserRouter>
        <Layout>
            <Affix offsetTop={0}>
                <SliderComponent/>
            </Affix>
            <Layout>
                <Affix offsetTop={0}>
                    <HeaderComponent/>
                </Affix>
                <Content className={'mt-3 mb-2 bg-white container'}>
                    <Routes>
                        <Route path="/" element={<HomeScreen/>}/>
                        <Route path="/inventory" element={<InventoryScreen/>}/>
                        <Route path="/dashboard" element={<DashboardScreen/>}/>
                        <Route path="/manage-store" element={<ManageStoreScreen/>}/>
                        <Route path="/suppliers" element={<SupplierScreen/>}/>
                        <Route path="/report" element={<ReportScreen/>}/>
                        <Route path="/orders" element={<OrderScreen/>}/>
                    </Routes>
                </Content>
                <Footer/>
            </Layout>
        </Layout>
    </BrowserRouter>;
}