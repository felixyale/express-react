require("normalize.css");
require("font-awesome.css");
require("./app.less");

// using an ES6 transpiler, like babel
import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import ReactDom from 'react-dom'
import React from 'react'
import createBrowserHistory from 'createBrowserHistory'

import ArtBoard from './routes/ArtBoard'

class Dashboard extends React.Component {
  render() {
    return (
      <div>Welcome to the app!</div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        {/* change the <a>s to <Link>s */}
        <header className="header">
          <nav className="navbar">
            <ul className="nav">
              <li className="item"><Link to="/artboard">首页</Link> ／</li>
              <li className="item"><Link to="/artboard/my">我的H5</Link> ／</li>
              <li className="item"><Link to="/artboard/new">制作H5</Link></li>
            </ul>
          </nav>
        </header>
        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
}

ReactDom.render((
  <Router history={createBrowserHistory()}>
    <Route path="/artboard" component={App}>
      {/* Show the dashboard at / */}
      <IndexRoute component={Dashboard} />
      <Route path="new" component={ArtBoard} />
      <Route path="edit/:id" component={ArtBoard} />
      {/*
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="/messages/:id" component={Message} />
        <Redirect from="messages/:id" to="/messages/:id" />
      </Route>
      */}
    </Route>
  </Router>
), document.getElementById('app'))
