import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom'

import Home from './components/Home.js'
import Login from './components/Login'

function App() {

  const PrivateRoute = ({component,path,...rest}) =>{
    if(localStorage.getItem('token')){
      return <Route component={component} path={path} {...rest}></Route>
    }else{
      return <Redirect to="/" {...rest}></Redirect>
    }
  }
  return (
    <>
    <header className="container-fluid text-center">
        <p className="text-info fw-bolder" id="reto">RETO REACT - ALKEMY</p>
    </header>
    <Router>
      <Switch>
        <PrivateRoute component={Home} path="/home" exact={true}></PrivateRoute>
        <Route component={Login} path="/" exact={true}></Route>
      </Switch>
    </Router>


  </>
  );
}

export default App;
