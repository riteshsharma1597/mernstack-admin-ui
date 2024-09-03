import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { Layout, Menu, theme } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const { Content, Footer, Header, Sider } = Layout;
const items = [
  { key: "/", icon: <HomeOutlined />, label: <NavLink to="/">Home</NavLink> },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <NavLink to="/users">Users</NavLink>,
  },
  {
    key: "/restaurants",
    icon: <UserOutlined />,
    label: <NavLink to="/restaurants">Restaurants</NavLink>,
  },
  {
    key: "/orders",
    icon: <UserOutlined />,
    label: <NavLink to="/orders">Orders</NavLink>,
  },
  {
    key: "/promos",
    icon: <UserOutlined />,
    label: <NavLink to="/promos">Promos</NavLink>,
  },
];

import { useState } from "react";
import Logo from "../components/icons/Logo";
const Dashboard = () => {
  const { user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log(user);
  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          theme="light"
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <Logo />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>Welcome @ 2025 </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
