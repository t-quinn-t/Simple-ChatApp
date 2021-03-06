import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import LogInPage from './component/auth/LogIn.js'
import ChatRoom from "./component/ChatRoomComponent";
import {ProvideAuth, useAuth} from "./component/auth/auth";
import UserRegistrationForm from "./component/UserRegistrationFormComponent";
import CreateOrJoinRoomPage from "./component/CreateOrJoinRoomComponent";
import UserSettingsForm from "./component/UserSettingsComponent";

/**
 * Redirects to Login if user not logged in;
 * Inspired from https://reactrouter.com/web/example/auth-workflow
 * @author Quinn Tao
 * @date Aug 9, 2021
 */
function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return auth.status === true ? ( children) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
                }
            }
        />
    );
}

function App() {
  return (
      <ProvideAuth>
          <div className="App">
              <Router>
                  <Switch>
                      <Route path="/" component={() => <LogInPage/>} exact />
                      {/*Todo: Change the chatroom id to proper chatroom */}
                      <PrivateRoute path="/chatroom">
                          <ChatRoom roomId={1}/>
                      </PrivateRoute>
                      <PrivateRoute path="/create-or-join-room">
                          <CreateOrJoinRoomPage/>
                      </PrivateRoute>
                      <Route path="/register">
                          <UserRegistrationForm/>
                      </Route>
                      <PrivateRoute path="/settings">
                          <UserSettingsForm/>
                      </PrivateRoute>
                  </Switch>
              </Router>
          </div>
      </ProvideAuth>

  );
}

export default App;
