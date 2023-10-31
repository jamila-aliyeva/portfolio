import { Table, message } from "antd";
import NonUserCard from "../../../components/cards/NonUserCard";
import {
  useGetNonClientUsersQuery,
  useGetUserMutation,
  useUpdateUserMutation,
} from "../../../redux/queries/users";

const NotClientUser = () => {
  const [updateUser] = useUpdateUserMutation();

  const {
    data: { users, total } = { users: [], total: 0 },
    refetch,
    isFetching,
  } = useGetNonClientUsersQuery({ page: 1, role: "user" });
  const [getUser] = useGetUserMutation();

  const changeRole = async (id) => {
    // const { data } = await getUser(id);
    await updateUser(id).unwrap();
    refetch();
  };

  return (
    <div>
      <h1>Not Client Users ({total})</h1>
      {users.map((user) => (
        <NonUserCard
          key={user._id}
          id={user._id}
          role={user.role}
          username={user.username}
          firstName={user.firstName}
          lastName={user.lastName}
          changeRole={changeRole}
          loading={isFetching}
        />
      ))}
    </div>
  );
};

export default NotClientUser;
