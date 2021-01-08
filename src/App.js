import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

const Home = () => {
  return (
    <div>
      <h1>You are at the home page</h1>
      <div>
        <Link to="/notHomePage">
          <button>Go To Not The Home Page</button>
        </Link>
      </div>
    </div>
  );
};

const NotHome = () => {
  return (
    <div>
      <h1>Not home page</h1>
      <div>
        <Link to="/">
          <button>Go To The Home Page</button>
        </Link>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router basename={`${process.env.REACT_APP_PUBLIC_PATH}`}>
        <Route exact path="/" component={Home} />
        <Route exact path="/notHomePage" component={NotHome} />
      </Router>
      <div>Because this is the internet, here is a cat picture;</div>
      <div>
        <img src="media/images/img1.jpg" alt="" style={{ maxWidth: "400px" }} />
      </div>
    </div>
  );
}

export default App;
