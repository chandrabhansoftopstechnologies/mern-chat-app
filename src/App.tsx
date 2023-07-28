import { Component } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import { withRouter } from "./HOC";
import Home from "./Pages/Home/Home";
import { AuthProtectedRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface State {}
type Props = {
  router: any;
};
export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      getToken: "",
    };
  }
  componentDidMount(): void {
    console.log(this.props.router.loggedIn);
  }
  render() {
    return (
      <div className="App">
        <ToastContainer autoClose={2000} />

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
              <ProtectedRoutes
                Component={<Home />}
                user={this.props.router.loggedIn}
              >
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
