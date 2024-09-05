import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Table } from "antd";
import { Link } from "react-router-dom";
import { getUsers } from "../../http/api";
import { render } from "@testing-library/react";
import { User } from "../../types";

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
      <Table
        style={{ paddingTop: "1rem" }}
        dataSource={userData}
        columns={columns}
      />
      ;
    </>
  );
};

export default Users;
