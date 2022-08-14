function Header() {
  return (
    <header>
      <nav className="nav">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          className="nav-logo"
        />
        <ul className="nav-items">
          <li>
            <a href="https://reactjs.org/docs/getting-started.html">Docs</a>
          </li>
          <li>
            <a href="https://reactjs.org/tutorial/tutorial.html">Tutorial</a>
          </li>
          <li>
            <a href="https://reactjs.org/blog/">Blog</a>
          </li>
          <li>
            <a href="https://reactjs.org/community/support.html">Community</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function MainContent() {
  return (
    <div>
      <div className="Hero">
        <h1>React</h1>
        <p>A JavaScript library for building user interfaces</p>
      </div>
      <div className="Main">
        <img src="react.svg" />
        <div className="Main-Text">
          <h1>Fun facts about React</h1>
          <ul>
            <li>Was first released in 2013</li>
            <li>Was originally created by Jordan Walke</li>
            <li>Has well over 100k stars on GitHub</li>
            <li>Is maintained by Facebook</li>
            <li>Powers thousands of enterprise apps, including mobile apps</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <small>Ⓒ 2022 KevinLiTian. All rights reserved.</small>
    </footer>
  );
}

function Page() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Page />);
