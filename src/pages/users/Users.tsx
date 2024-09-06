import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { Link, Navigate } from "react-router-dom";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UserForm from "./forms/UserForm";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: User) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUsers().then((res) => res.data);
    },
  });

  const { user } = useAuthStore();

  if (user?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <Breadcrumb
        separator=">"
        items={[
          { title: <Link to="/">Dashboard</Link> },
          { title: <Link to="/users">Users</Link> },
        ]}
      />
      {isLoading && <h1>Loading....</h1>}
      {isError && <h1>{error.message}</h1>}
      <UsersFilter
        onFilterChange={(filterName: string, filterValue: string) => {
          console.log(filterName, filterValue);
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerOpen(true)}
        >
          Add User
        </Button>
      </UsersFilter>
      <Table
        style={{ paddingTop: "1rem" }}
        dataSource={userData}
        columns={columns}
        rowKey={"id"}
      />
      <Drawer
        title="Create User"
        width={720}
        destroyOnClose={true}
        styles={{ body: { backgroundColor: colorBgLayout } }}
        onClose={() => {
          setDrawerOpen(false);
        }}
        open={drawerOpen}
        extra={
          <Space>
            <Button>Cancel</Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <UserForm />
        </Form>
      </Drawer>
    </>
  );
};

export default Users;
