import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css';
import reportWebVitals from './reportWebVitals';

const Home = lazy(() => import('./App'));
const TicketView = lazy(() => import('./TicketView'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={() => <div className="empty"><h2>Loading...</h2></div>}>
        <Switch>
          <Route path="/" exact component={(props) => <Home {...props} />} />
          <Route path="/:id" exact component={(props) => <TicketView {...props} />} />
        </Switch>
      </Suspense>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
