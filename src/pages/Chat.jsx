import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../sever";

import "./chat.scss";

const Chat = () => {
  const { messageId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await request("messages/" + messageId);
      setData([res.data]);
      console.log([res.data]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {data.map((el) => (
        <>
          <div className="one-message">
            <div className="user-name">
              <img
                style={{ width: "50px" }}
                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                alt=""
              />
              <div className="user-info">
                <h4>{el.user}</h4>
                <p>last seen recently</p>
              </div>
            </div>
            <div className="chat-btn">
              <div>
                <p className="message">
                  {el.message}
                  <br />
                  <br />
                  <br />
                  <br />
                  <span>#{el.title}</span>
                </p>
              </div>
              <div className="answer-wrap">
                {/* <p className="answer">{el.answer}</p> */}
                <p className="answer">{el.answer ? el.answer : "No answer!"}</p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Chat;
