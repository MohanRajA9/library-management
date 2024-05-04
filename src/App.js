import "./App.css";
import { Link } from "react-router-dom";
import AddBooks from "./components/Books/AddBooks";
import AddAuthorDetails from "./components/Author/AddAuthorDetails";
import GetBooks from "./components/Books/GetBooks";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import GetAuthors from "./components/Author/GetAuthor";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="d-flex flex-start px-2">
          <h2> Library Management 📚</h2>
        </div>
        <div className="navbarHeading">
          <ul className="navbar-nav">
            <li className="nav-item px-2">
              <Link className="nav-link" to="/">
                <h4 style={{color:"#ffffff"}}>Home</h4>
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="/Books">
                <h4 style={{color:"#ffffff"}}>Books</h4>
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/Author">
                <h4 style={{color:"#ffffff"}}>Author</h4>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Books" element={<GetBooks />}></Route>
        <Route path="/Books/:id" element={<AddBooks />}></Route>
        <Route path="/Author" element={<GetAuthors />}></Route>
        <Route path="/Author/:id" element={<AddAuthorDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
