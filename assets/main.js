require("normalize.css");
require("font-awesome.css");
require("./main.less");

// using an ES6 transpiler, like babel
import { Router, Route, IndexRoute, Redirect, Link, browserHistory } from 'react-router'
import ReactDom from 'react-dom'
import React from 'react'
import createBrowserHistory from 'createBrowserHistory'

import ArtBoard from './routes/ArtBoard'

class About extends React.Component {
  render() {
    return (
      <h2>About Page</h2>
    )
  }
}

class Inbox extends React.Component {
  render() {
    return (
      <div>
        <h2>Inbox Page</h2>
        <ul>
          <li><Link to="/messages/fasd">Message01</Link></li>
          <li><Link to="/messages/eeee">Message02</Link></li>
        </ul>
        {/* Render the child route component */}
        {this.props.children}
      </div>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <h2>Home Page</h2>
    )
  }
}

// Make a new component to render inside of Inbox
class Message extends React.Component {
  render() {
    return (
      <div>
        <h3>Message</h3>
        <p>content >> {this.props.params.id}</p>
      </div>
    )
  }
}

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
              <li className="item"><Link to="/">首页</Link> ／</li>
              <li className="item"><Link to="/inbox">我的H5</Link> ／</li>
              <li className="item"><Link to="/artboard">制作H5</Link></li>
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
    <Route path="/" component={App}>
      {/* Show the dashboard at / */}
      <IndexRoute component={Dashboard} />
      <Route path="artboard" component={ArtBoard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        {/* add some nested routes where we want the UI to nest */}
        {/* render the stats page when at `/inbox` */}
        {/*<IndexRoute component={InboxStats}/>*/}
        {/* render the message component at /inbox/messages/123 */}
        <Route path="/messages/:id" component={Message} />
        {/* Redirect /inbox/messages/:id to /messages/:id */}
        <Redirect from="messages/:id" to="/messages/:id" />
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
