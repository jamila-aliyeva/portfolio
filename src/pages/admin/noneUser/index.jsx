import {
  Button,
  Flex,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  message,
} from "antd";
import { LIMIT } from "../../../constants";
import { Fragment, useState } from "react";
import {
  useGetUserMutation,
  useGetUsersQuery,
  useUpgradeUserMutation,
} from "../../../redux/queries/users";

const NotClientUser = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: { users, total } = { users: [], total: 0 },
    isFetching,
    refetch,
  } = useGetUsersQuery({ role: "user", page, search, limit: LIMIT });
  console.log(users);

  const [AddUser] = useUpgradeUserMutation();
  const [getUser] = useGetUserMutation();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const upgradeToClient = async (id) => {
    const values = await getUser(id);
    values.role = "client";
    await AddUser({ id, values });
    refetch();
    message.success("User is added to client");
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Fullname",
      render: (_, row) =>
        `${row?.user?.firstName ?? "FullName is empty"} ${
          row?.user?.lastName ?? ""
        }`,
    },
    {
      title: "Action",
      dataIndex: "birthday",
      key: "birthday",
      render: (id) => (
        <Space size="middle">
          <Button onClick={() => upgradeToClient(id)}>Add to Client</Button>
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
              <h1 className="skills-title">Non-Clients </h1>
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
    </Fragment>
  );
};

export default NotClientUser;
