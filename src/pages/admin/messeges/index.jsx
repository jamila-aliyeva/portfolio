import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import request from "../../../sever";
import { Link } from "react-router-dom";

import "./messege.scss";
import { Spin, message } from "antd";

const Messeges = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  async function getAllMesseges() {
    try {
      setLoading(true);
      let res = await request.get(`messages?limit=${10}`);
      setData(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const maxPage = Math.ceil(totalPost / 10);

  const nextPageFunc = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPageFunc = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPage = (page) => {
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  // async function getNewMessage() {
  //   try {
  //     let res = await request.post("messages");
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    getAllMesseges();
    // getNewMessage();
  }, [currentPage]);

  return (
    <div className="messege-section">
      <div className="messege-top">
        <h1>Messeges</h1>
      </div>
      <Spin spinning={loading}>
        <div className="tabs-wrap">
          <Tabs className="tabs">
            <TabList>
              <Tab>All</Tab>
              <Tab>New</Tab>
              <Tab>Personal</Tab>
            </TabList>

            <TabPanel>
              {loading ? (
                <h3 className="enter-loading">Loading...</h3>
              ) : (
                data.map((elm, i) => (
                  <div key={i} className="msg-card-wrapper">
                    <img
                      style={{ width: "50px" }}
                      src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                      alt=""
                    />
                    <div className="info-user">
                      <Link to={`${elm._id}`}>
                        <h4>{elm.user}</h4>
                        <p>{elm.message}</p>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 3</h2>
            </TabPanel>
          </Tabs>
          <div className="select-msg">
            <p>Select a chat to start messaging</p>
          </div>
        </div>
      </Spin>

      {data.length ? (
        <div className="pagination-buttons">
          <button
            className={
              currentPage === 1
                ? "disabled pagination-button"
                : "pagination-button"
            }
            onClick={prevPageFunc}>
            {"<"}
          </button>
          {Array.from({ length: maxPage }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={
                currentPage === index + 1
                  ? "pagination-button active-page"
                  : "pagination-button"
              }>
              {index + 1}
            </button>
          ))}
          <button
            className={
              currentPage === maxPage
                ? "disabled pagination-button"
                : "pagination-button"
            }
            onClick={nextPageFunc}>
            {">"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Messeges;
