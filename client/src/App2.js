import React from 'react';
import History from './History';
import App from './App'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App2(){
    return(
        <Router>
            <div className="App2">
                <Switch>
                    <Route path="/" exact  component={App}></Route>
                    <Route path="/history" component={History}></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App2;