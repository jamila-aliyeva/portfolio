import { Fragment, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";

import {
  useDeleteExperiencesMutation,
  useGetExperiencesQuery,
} from "../../../redux/queries/experience";

import { LIMIT } from "../../../constants";

const Experience = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const {
    data: { experiences, total } = { portfolios: [], total: 0 },
    isFetching,
    refetch,
  } = useGetExperiencesQuery({ page, search });

  // const [createExperience] = useCreateExperienceMutation();
  // const [getExperience] = useGetExperienceMutation();
  // const [updateExperience] = useUpdateExperiencesMutation();
  // const [deleteExperience] = useDeleteExperiencesMutation();

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
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
        await createExperience(values).unwrap();
      } else {
        await updateExperience({ id: selected, body: values }).unwrap();
      }
      refetch();
      setIsModalOpen(false);
      form.resetFields();
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id) => {
    await deleteExperience(id).unwrap();
    refetch();
    setPage(1);
  };

  const handleEdit = async (id) => {
    setSelected(id);
    setIsModalOpen(true);
    const { data } = await getExperience(id);
    form.setFieldsValue(data);
  };

  const columns = [
    {
      title: "WorkName",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "CompanyName",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
          <Button type="primary" danger onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" gap={36} align="center">
            <h1>Experiences ({total})</h1>
            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button onClick={showModal} type="dashed">
              Add experience
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={isFetching}
        dataSource={experiences}
        columns={columns}
      />

      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title="Category data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add experience" : "Save experience"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}>
        <Form
          name="category"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}>
          <Form.Item
            label="Work Name"
            name="workName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="company Name"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Experience;
