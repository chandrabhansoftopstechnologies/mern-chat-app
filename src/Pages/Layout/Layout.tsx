import { Component } from "react";
import "./Layout.css";
import SignIn from "../SignIn/SignIn";
import Signup from "../Signup/Signup";
interface States {
  tabActive: boolean;
}

export class Layout extends Component<{}, States> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tabActive: true,
    };
  }
  render() {
    return (
      <div className="layout">
        <div className="layout-main">
          <h1 className="layout-heading">Chatzz</h1>
          <div className="layout-tab-container">
            <button
              onClick={() =>
                this.setState({ tabActive: !this.state.tabActive })
              }
              className={
                this.state.tabActive
                  ? "layout-tab layout-tab-active"
                  : "layout-tab"
              }
            >
              Login
            </button>
            <button
              onClick={() =>
                this.setState({ tabActive: !this.state.tabActive })
              }
              className={
                this.state.tabActive
                  ? "layout-tab "
                  : "layout-tab layout-tab-active"
              }
            >
              Register
            </button>
          </div>
          <div className="layout-content">
            {this.state.tabActive ? <SignIn /> : <Signup />}
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
