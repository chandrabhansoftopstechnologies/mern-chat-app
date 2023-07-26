import { Component } from "react";

import { Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import { withRouter } from "./HOC";
import Home from "./Pages/Home/Home";
import { AuthProtectedRoutes, ProtectedRoutes } from "./ProtectedRoutes";
interface State {}
export class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      getToken: "",
    };
  }
  componentDidMount(): void {
    let token = localStorage.getItem("userToken");
    // console.log(token);
    this.setState({ getToken: token });
  }
  render() {
    return (
      <div>
        <Routes>
          <Route
            path="/auth-user"
            element={
              <AuthProtectedRoutes Component={<Layout />}>
                <Home />
              </AuthProtectedRoutes>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoutes Component={<Home />}>
                <Home />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default withRouter(App);
