import SignInController from "./SignInController";
import "./SignIn.css";
import EyeOpen from "../../Assets/icons8-eye-24.png";
import EyeClose from "../../Assets/icons8-hide-password-24.png";
import { withRouter } from "../../HOC";
export class SignIn extends SignInController {
  render() {
    return (
      <div className="signIn">
        <form className="singin-form" onSubmit={this.handleLogin}>
          <label htmlFor="email">Email:</label>
          <div className="input-container">
            <input
              required
              type="email"
              placeholder="Enter email"
              onChange={(e: any) => this.setState({ email: e.target.value })}
            />
          </div>

          <label htmlFor="password">Password:</label>
          <div className="input-container">
            <input
              required
              type={this.state.showPassword ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e: any) => this.setState({ password: e.target.value })}
            />
            <img
              src={this.state.showPassword ? EyeClose : EyeOpen}
              alt="eye"
              onClick={() =>
                this.setState({ showPassword: !this.state.showPassword })
              }
            />
          </div>
          <div className="submit-btn-container">
            <button
              // disabled={
              //   !this.state.email || !this.state.password ? true : false
              // }
              className="submit-btn"
              onClick={this.handleLogin}
            >
              Login
            </button>
          </div>
          <p className="error-message">{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
