import Demo from './pages/Demo';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Link to="/robin/page1">page1</Link> |
        <Link to="/robin/page2">page2</Link> |
        <Link to="/robin/page3">page3</Link> |<br />
        <Switch>
          <Route path="/robin">
            <Demo />
          </Route>
          <Route path="/demo-page1">
            <Link to="/robin/page1">go</Link>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
