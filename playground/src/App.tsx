import Demo from './pages/Demo';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
  
function App() {
  return <Router>
    <Switch>
      <Route path="/robin">
        <Demo/>
      </Route>
    </Switch>
  </Router>;
}
  
export default App;
  