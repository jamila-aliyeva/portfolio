import { Fragment, useState } from "react";
import { Flex, Input, Pagination, Table } from "antd";

import {
  useGetNotClientQuery,
  // useUploadPhotoMutation,2
} from "../../../redux/queries/notClient";

import { LIMIT } from "../../../constants";
// import { getImage } from "../../../utils/images";

const NotClientUser = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: { users, total } = { users: [], total: 0 }, isFetching } =
    useGetNotClientQuery({ page, search });
  console.log(users);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const columns = [
    {
      title: "image",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Fullname",
      render: (_, row) =>
        `${row?.user?.firstName ?? ""} ${row?.user?.lastName ?? ""}`,
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
            <h1>Users ({total})</h1>
            <Input
              value={search}
              onChange={handleSearch}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
          </Flex>
        )}
        pagination={false}
        loading={isFetching}
        dataSource={users}
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
    </Fragment>
  );
};

export default NotClientUser;
