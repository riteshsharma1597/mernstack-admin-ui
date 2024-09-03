import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Segmented,
  SegmentedProps,
  Space,
  theme,
} from "antd";
import { HomeOutlined, UserOutlined, BellFilled } from "@ant-design/icons";
import { useState } from "react";
import Logo from "../components/icons/Logo";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";

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

const Dashboard = () => {
  const { user, logout: logoutFromStore } = useAuthStore();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutFromStore();
      return;
    },
  });
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
          <Header
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              background: colorBgContainer,
            }}
          >
            <Flex gap="middle" align="start" justify="space-between">
              <Badge
                text={
                  user.role === "admin"
                    ? "You are an admin"
                    : user?.tenant?.name
                }
                status="success"
                color="#faad14"
              />
              <Space size={16}>
                <Badge dot={true}>
                  <BellFilled />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => logoutMutate(),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    U
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
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
