import { Fragment, memo, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
} from "antd";

import { LIMIT } from "../../../constants";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/queries/users";

const UsersPage = () => {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("user");
  const [isModalLoading, setIsModalLoading] = useState(false);

  const {
    data: { users, total } = { users: [], total: 0 },
    isFetching,
    refetch,
  } = useGetUsersQuery({ page, search, limit: LIMIT, role });

  const [createUser] = useCreateUserMutation();
  const [getUser] = useGetUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const showModal = async () => {
    form.resetFields();
    setIsModalOpen(true);
    setSelected(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      setIsModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await createUser(values);
      } else {
        await updateUser({ id: selected, body: values });
      }
      refetch();
      setIsModalOpen(false);
      form.resetFields();
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setSelected(id);
    setIsModalOpen(true);
    const { data } = await getUser(id);
    form.setFieldsValue(data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    refetch();
    setPage(1);
  };

  const filterUsers = (value) => {
    setRole(value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (data) => (
        <p
          className={`tag ${data === "client" ? "client" : ""} ${
            data === "admin" ? "admin" : ""
          } ${data === "client" ? "client" : ""} `}>
          {data}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(id)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this user ?",
                onOk: () => handleDelete(id),
              })
            }>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <Table
        className="skills-table"
        scroll={{
          x: 1000,
        }}
        pagination={false}
        loading={isFetching}
        dataSource={users}
        columns={columns}
        title={() => (
          <Fragment>
            <Flex
              className="table-title"
              align="center"
              justify="space-between">
              <h1 className="skills-title">Users ({total})</h1>
              <Input
                className="search-input"
                value={search}
                onChange={handleSearch}
                style={{
                  width: "auto",
                  flexGrow: 1,
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
                placeholder="Searching..."
              />
              <Select
                defaultValue="user"
                onChange={filterUsers}
                style={{ width: 120, marginRight: "20px" }}
                options={[
                  {
                    value: "user",
                    label: "User",
                  },
                  { value: "admin", label: "Admin" },
                  {
                    value: "client",
                    label: "Client",
                  },
                ]}
              />
              <Button onClick={showModal}>Add user</Button>
            </Flex>
          </Fragment>
        )}
      />
      {total > LIMIT ? (
        <Pagination
          className="pagination"
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title="User info"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add user" : "Save user"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}>
        <Form
          name="portfolio"
          autoComplete="off"
          initialValues={{
            phoneNumber: "+998 ",
          }}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please include firstname!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please include your lastname",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please include your username",
              },
            ]}>
            <Input />
          </Form.Item>

          {selected === null ? (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please include your password",
                },
              ]}>
              <Input.Password />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </Fragment>
  );
};

const MemoUsersPage = memo(UsersPage);

export default MemoUsersPage;
