import React from 'react';
import { Button, Divider, Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const { Header, Content, Footer, Sider } = Layout;

const navigations = [
    { label: "选课", key: '/', target: "/" },
    { label: "已选的课", key: '/mine', target: "/mine" },
    { label: "课程管理", key: '/course', target: "/course" },
    { label: "学年管理", key: '/xn', target: "/xn" },
    { label: "用户管理", key: '/account', target: "/account" },
];

const MyLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const location = useLocation();
    const navigator = useNavigate();

    const user = useUser()

    const MenuClickHandle = (e: any) => {
        console.debug("打印", e)
        navigator(e.key);
    };

    return (
        <Layout style={{ minHeight: '100vh', background: colorBgContainer }}>
            <Sider
                style={{
                    backgroundColor: 'white'
                }}
            >
                <div className='flex flex-col h-full'>
                    <div className='p-4 border-gray border-solid font-bold'>
                        选课系统
                    </div>
                    <Menu
                        className='flex-1'
                        theme="light"
                        mode="inline"
                        style={{ backgroundColor: 'white' }}
                        items={navigations}
                        selectedKeys={[`${location.pathname}`]}
                        onClick={(e) => MenuClickHandle(e)} />
                </div>
            </Sider>
            <Layout>
                <div className='flex justify-end p-2 bg-white rounded-sm' style={{borderBottom: `1px solid #f5f5f5`}}>
                    <Button type="text">{user.user?.name}，欢迎</Button>
                </div>
                <Content>
                    <div
                        style={{
                            padding: 24,
                            minHeight: "100%",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    选课系统 Design ©{new Date().getFullYear()} Created by Xm
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MyLayout;