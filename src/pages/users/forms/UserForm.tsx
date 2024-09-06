import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import { Tenant } from "../../../types";

const UserForm = () => {
  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => {
      return getTenants().then((res) => res.data);
    },
  });

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical">
          <Card title="Basic Info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="First name" name="firstName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last name" name="lastName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Security Info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Password" name="password">
                  <Input type="password" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Role" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Role" name="role">
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select Role"
                    onChange={
                      (selectedItem) => console.log(selectedItem)
                      //   onFilterChange("roleFilter", selectedItem)
                    }
                  >
                    <Select.Option value="re">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                  </Select>{" "}
                </Form.Item>
              </Col>
              {/* </Row>
          </Card> */}

              {/* <Card title="Restaurant" bordered={false}> */}
              {/* <Row gutter={20}> */}
              <Col span={12}>
                <Form.Item label="Restaurant" name="tenantId">
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select Restaurant"
                    onChange={
                      (selectedItem) => console.log(selectedItem)
                      //   onFilterChange("roleFilter", selectedItem)
                    }
                  >
                    {console.log(tenants)}
                    {tenants?.map((tenant: Tenant) => (
                      <Select.Option value={tenant.id}>
                        {tenant.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default UserForm;
