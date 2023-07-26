import SignupController from "./SignupController";
import "./Signup.css";
import EyeOpen from "../../Assets/icons8-eye-24.png";
import EyeClose from "../../Assets/icons8-hide-password-24.png";
import Clip from "../../Assets/icons8-clip-32.png";
import ImgLoad from "../../Assets/icons8-loader-48.png";
import ImageTick from "../../Assets/icons8-tick-48.png";
import { withRouter } from "../../HOC";

export class Signup extends SignupController {
  render() {
    return (
      <div className="signIn">
        <form className="singin-form" onSubmit={this.handleRegister}>
          <label htmlFor="name">Name:</label>
          <div className="input-container">
            <input
              required
              type="text"
              placeholder="Enter name"
              onChange={(e: any) => this.setState({ name: e.target.value })}
            />
          </div>

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
              onChange={(e: any) => this.setState({ password: e.target.value })}
              type={this.state.showPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <img
              src={this.state.showPassword ? EyeClose : EyeOpen}
              alt="eye"
              onClick={() =>
                this.setState({ showPassword: !this.state.showPassword })
              }
            />
          </div>

          <label htmlFor="confirm-password">Confirm Password:</label>
          <div className="input-container">
            <input
              required
              type="text"
              placeholder="Enter confirm password"
              onChange={(e: any) =>
                this.setState({ confirmPassword: e.target.value })
              }
              onFocus={() => this.setState({ passwordMatch: true })}
            />
          </div>
          {this.state.password !== this.state.confirmPassword &&
          this.state.passwordMatch ? (
            <p style={{ color: "red", margin: "0px" }}>
              {" "}
              Password does'nt matched
            </p>
          ) : (
            ""
          )}
          <label>Upload Profile Picture:</label>

          <div
            className="input-container input-file"
            onClick={this.handleClipClick}
          >
            <input
              name="pic"
              required
              type="file"
              onChange={this.handleFileChange}
              style={{ display: "none" }}
              ref={this.myInputRef}
            />
            <img onClick={this.handleClipClick} src={Clip} alt="" />
            {this.state.picName ? this.state.picName : ""}
            {this.state.uploadingImage ? (
              <img src={ImgLoad} className="loading-img" alt="load" />
            ) : this.state.imageUploadsuccess ? (
              <img src={ImageTick} alt="tick" />
            ) : (
              ""
            )}
          </div>
          <p className="error-message">
            {this.state.error === "" ? "Please upload an image" : ""}
          </p>

          <div className="submit-btn-container">
            <button className="submit-btn">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
