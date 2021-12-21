// eslint-disable-next-line
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Landing from './components/Landing';
// import Auth from './views/Auth';
// import Dashboard from './views/Dashboard';
import React from 'react';
import routers from './routers';


class App extends React.Component {
    render() {
        return (
            <Router>
                {/* <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
          <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch> */}
                { this.listRouter(routers)}
            </Router>
        );
    }
    listRouter = (routers) => {
        let result = null;
        result = routers.map((router, index) => {
            return (
                <Route
                    key={index}
                    path={router.path}
                    exact={router.exact}
                    render={router.render}
                    component={router.main}
                />
            );
        });
        return <Switch>{result}</Switch>;
    }
}

export default App;
