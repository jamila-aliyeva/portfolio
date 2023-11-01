import "./contact.scss";

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-wrpapper">
          <div>
            <div className="contact-top">
              <button className="top-btn">NEW</button>
              <p>Get your free portfolio Now ✌🏻</p>
            </div>
            <h2>Stay Connected With Your Loved Ones</h2>
            <p>
              With your app you'll get fast , simple, ecuremesseging and calling
              for free
            </p>
            <button className="btn">Get Start</button>
          </div>
          <div>
            <img
              style={{ width: "500px" }}
              src="https://media.istockphoto.com/id/1398693444/vector/designers-doing-presentation-working-on-new-project-web-designers-team-prototyping-new.jpg?s=612x612&w=0&k=20&c=AMS9To5rosofxhPiSUCXrt3SrvpdafWIHvzcuM9byQk="
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
