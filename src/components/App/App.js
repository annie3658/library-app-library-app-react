import React, {Component} from 'react';
import Home from '../Home/Home'
import BooksList from '../Book/BooksList'
import BookAddComponent from "../Book/BookAddComponent";
import BookEditComponent from '../Book/BookEditComponent'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
              <Route path='/books' exact={true} component={BooksList}/>
              <Route path='/books/:id' component={BookEditComponent} />
              <Route path='/new' component={BookAddComponent} />
          </Switch>
        </Router>
    )
  }
}

export default App;
