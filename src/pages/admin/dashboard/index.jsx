import MessageOutlined from "@ant-design/icons";

import "./style.scss";
import avatar from "../../../assets/images/avatar.jpeg";
import { getSkills, skillName } from "../../../redux/slice/skils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { total, loading } = useSelector((state) => state[skillName]);

  useEffect(() => {
    dispatch(getSkills({ total, loading }));
  }, [dispatch, total, loading]);
  return (
    <section>
      <div className="container">
        <div className="dashboard-top">
          <h3>Welcome back, Abdulaziz</h3>
          <div className="dashboard-top-bside">
            <div>
              <MessageOutlined />
            </div>
            <img src={avatar} alt="" />
            <div>
              <h4>Abdulaziz Toshpo'latov</h4>
            </div>
          </div>
        </div>
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-wrapper">
          <div>
            <h2>Skills: {total}</h2>
            <h2>Portfolio: {0}</h2>
            <h2>Education: {0}</h2>
            <h2>Experiences: {0}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
