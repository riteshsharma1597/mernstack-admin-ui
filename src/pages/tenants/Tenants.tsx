import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { Link, Navigate } from "react-router-dom";
import { getTenants, getUsers } from "../../http/api";
import { useAuthStore } from "../../store";
import TenantsFilter from "./TenantsFilter";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Tenants = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: tenants,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getTenants().then((res) => res.data);
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
      <TenantsFilter
        onFilterChange={(filterName: string, filterValue: string) => {
          console.log(filterName, filterValue);
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerOpen(true)}
        >
          Add Restaurants
        </Button>
      </TenantsFilter>
      <Table
        style={{ paddingTop: "1rem" }}
        dataSource={tenants}
        columns={columns}
        rowKey={"id"}
      />
      <Drawer
        title="Add Restaurants"
        width={720}
        destroyOnClose={true}
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
      />
      ;
    </>
  );
};

export default Tenants;
