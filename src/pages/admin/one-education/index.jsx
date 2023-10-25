import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../../sever";

const OneEducation = () => {
  const { OneEducationId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await request("education/" + OneEducationId);
      setData([res.data]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="post-card">
      <div className="container">
        {loading ? (
          <div className="enter-loading">LOADING...</div>
        ) : (
          data.map((el) => (
            <>
              <div className="education">
                <h3>{el.name}</h3>
                <p>{el.description}</p>
                <h4>{el.user.firstName.lastName}</h4>
                <p>{el.user.info}</p>
              </div>
            </>
          ))
        )}
      </div>
    </section>
  );
};

export default OneEducation;
