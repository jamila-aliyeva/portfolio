import { Link } from "react-router-dom";
import "./style.scss";

const HomePage = () => {
  return (
    <section className="home-page">
      <div className="container">
        <header>
          <nav>
            <div className="logo">
              <a href="/">
                {/* <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Portfolio.hu_full_logo.png"
                  alt=""
                /> */}
                <h1> PORFOLIO 🎈</h1>
              </a>
            </div>

            <div className="sections">
              <Link to="/">Home</Link>
              <Link to="/">About us</Link>
              <Link to="/contact-us">Contact us</Link>
            </div>
            <div className="home-btns">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </nav>
        </header>
        <main>
          <section className="hero-page">
            <div className="hero-aside">
              <h2>
                Create your perfect <span>porfolio</span> with us
              </h2>
            </div>
          </section>
        </main>
      </div>
    </section>
  );
};

export default HomePage;
