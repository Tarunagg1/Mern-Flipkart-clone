import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signin from './containers/Signin'
import Signup from './containers/SignUp'
import Home from './containers/Home'


export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </Router>
    </div>
  )
}
