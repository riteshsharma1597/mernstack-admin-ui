import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  theme,
} from "antd";
import { Link, Navigate } from "react-router-dom";
import { createUser, getUsers } from "../../http/api";
import { CreatUserData, FieldData, TableParams, User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UserForm from "./forms/UserForm";
import { PER_PAGE } from "../../constants";
import { debounce } from "lodash";
import React from "react";

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
  {
    title: "Restaurants",
    dataIndex: "tenant",
    key: "tenant",
    render: (_text: string, record: User) => {
      return <div>{record.tenant?.name}</div>;
    },
  },
];

const Users = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const queryClient = useQueryClient();

  const [tableParams, setTableParams] = useState({
    currentPage: 1,
    perPage: PER_PAGE,
  });

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const {
    data: userData,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", tableParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(tableParams).filter((item) => !!item[1])
      );
      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();
      console.log(queryString);
      return getUsers(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const { user } = useAuthStore();

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: CreatUserData) =>
      createUser(data).then((res) => res.data),

    onSuccess: () => {
      console.log("User Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const handleClickSubmit = async () => {
    await form.validateFields();
    await userMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false);
    console.log("Form Values", form.getFieldsValue());
  };

  const debouncedQUpdate = React.useMemo(() => {
    return debounce((value: string | undefined) => {
      setTableParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
    }, 500);
  }, []);

  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => ({
        [item.name[0]]: item.value,
      }))
      .reduce((acc, item) => ({ ...acc, ...item }));

    if ("q" in changedFilterFields) {
      debouncedQUpdate(changedFilterFields.q);
    } else {
      setTableParams((prev) => ({
        ...prev,
        ...changedFilterFields,
        currentPage: 1,
      }));
    }
  };

  if (user?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <Flex justify="space-between">
        <Breadcrumb
          separator=">"
          items={[
            { title: <Link to="/">Dashboard</Link> },
            { title: <Link to="/users">Users</Link> },
          ]}
        />
        {isFetching && <Spin />}
        {isError && <h1>{error.message}</h1>}
      </Flex>
      <Form form={filterForm} onFieldsChange={onFilterChange}>
        <UsersFilter>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
          >
            Add User
          </Button>
        </UsersFilter>
      </Form>
      <Table
        style={{ paddingTop: "1rem" }}
        dataSource={userData?.data}
        columns={columns}
        rowKey={"id"}
        pagination={{
          total: userData?.total,
          pageSize: tableParams.perPage,
          current: tableParams.currentPage,
          onChange: (page) => {
            console.log(page);
            setTableParams((prev) => {
              return { ...prev, currentPage: page };
            });
          },
          showTotal: (total: number, range: number[]) => {
            console.log(total, range);
            return `Showing ${range[0]}-${range[1]} of ${total} items`;
          },
        }}
      />
      <Drawer
        title="Create User"
        width={720}
        destroyOnClose={true}
        styles={{ body: { backgroundColor: colorBgLayout } }}
        onClose={() => {
          setDrawerOpen(false);
          form.resetFields();
        }}
        open={drawerOpen}
        extra={
          <Space>
            <Button
              onClick={() => {
                form.resetFields();
                setDrawerOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={handleClickSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <UserForm />
        </Form>
      </Drawer>
    </>
  );
};

export default Users;
