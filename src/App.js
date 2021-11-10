import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Alert from '../src/components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import { useState } from 'react/cjs/react.development';


function App() {
  const [alert, setalert] = useState(null)

  // Alerts the given message
  const alertShow = (message, type, time) => {
    setalert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setalert(null)
    }, time);
  }

  return (
    <>
      <NoteState>
          <Router>
            <Switch>
              <Route exact path="/">
                <Navbar navstatus="home" />
                <Alert alert={alert} />
                <Home alertShow={alertShow} />
              </Route>
              <Route exact path="/about">
                <Navbar navstatus="about" />
                <Alert alert={alert} />
                <About alertShow={alertShow} />
              </Route>
              <Route exact path="/login">
                <Navbar navstatus="home" />
                <Alert alert={alert} />
                <Login alertShow={alertShow} />
              </Route>
              <Route exact path="/signup">
                <Navbar navstatus="home" />
                <Alert alert={alert} />
                <Signup alertShow={alertShow} />
              </Route>
            </Switch>
          </Router>
        
      </NoteState>
    </>
  );
}

export default App;
