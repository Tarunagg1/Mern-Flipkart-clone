import './App.css';
import Homepage from './container/HomePage';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import ProductListpages from './container/ProductsListPage.js';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/:slug" component={ProductListpages} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
