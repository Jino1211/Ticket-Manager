import "./styles/App.css";
import SearchArea from "./components/SearchArea";
import facbookeIcom from "./photos/facebook.jpg";
import gitHubIcon from "./photos/github.jpg";
import mailIcon from "./photos/email.jpg";

function App() {
  return (
    <div className="App">
      <h1>Ticket-Manager</h1>
      <SearchArea />
      <footer className="footer">
        <div className="footer-content-right">
          <a href="https://github.com/Jino1211" target="_blank">
            <img src={gitHubIcon} className="icon-style" alt="Github icon" />
          </a>
          <a
            href={"https://www.facebook.com/yehonatan.rozmarin"}
            target="_blank"
          >
            <img
              src={facbookeIcom}
              className="icon-style"
              alt="Facebook icon"
            />
          </a>
          <a href="mailto: yone543@gmail.com" target="_blank">
            <img src={mailIcon} className="icon-style" alt="Email icon" />
          </a>
          <p className="name">Yehonatan-Rozmarin</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
