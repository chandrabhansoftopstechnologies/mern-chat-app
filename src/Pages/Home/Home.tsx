import HomeController from "./HomeController";
import "./Home.css";
import { withRouter } from "../../HOC";
import MenuIcon from "../../Assets/icons8-menu-50 (1).png";
import CrossIcon from "../../Assets/icons8-cross-30.png";
export class Home extends HomeController {
  renderChatNavigation = () => {
    return (
      <div className="chatnavigation">
        <div className="chatnavigation-menu-container">
          {this.state.openMenu ? (
            <img
              src={CrossIcon}
              alt="cross-icon"
              className="chatnavigation-cross-icon"
              onClick={() => this.setState({ openMenu: !this.state.openMenu })}
            />
          ) : (
            <img
              src={MenuIcon}
              alt="menu-icon"
              className="chatnavigation-menu-icon"
              onClick={() => this.setState({ openMenu: !this.state.openMenu })}
            />
          )}
        </div>
        <div className="chatnavigation-profile-container">
          {this.state.openProfile ? (
            <div className="chatnavigation-profile-modal">
              <img
                src={this.state.userPic}
                alt="profile-pic"
                className="profile-pic"
              />
              <h2 className="user-profile-name">
                {this.state.userName.toUpperCase()}
              </h2>
              <h4 className="user-profile-email">{this.state.userEmail}</h4>
              <button className="userprofile-modal-logout-btn">Logout</button>
              <span
                className="profile-modal-cross-icon"
                onClick={() =>
                  this.setState({ openProfile: !this.state.openProfile })
                }
              >
                X
              </span>
            </div>
          ) : (
            <div className="profile-image-container">
              <img
                src={this.state.userPic}
                alt="profile-pic"
                className="profile-pic"
                onClick={() =>
                  this.setState({ openProfile: !this.state.openProfile })
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  renderSideDrawer = () => {
    return (
      <div className="sideDrawer">
        <div className="search-input-container">
          <input
            type="text"
            onChange={(e: any) =>
              this.setState({ searchInput: e.target.value })
            }
            className="search-input"
          />
          <img
            src={CrossIcon}
            alt="input-cross-icon"
            className="chatnavigation-cross-icon"
            onClick={() => this.setState({ openMenu: !this.state.openMenu })}
          />
        </div>
      </div>
    );
  };
  renderMyChat = () => {
    return <div className="MyChats">my chat</div>;
  };
  renderChatBox = () => {
    return <div className="chatBox">chat box</div>;
  };
  renderChatPage = () => {
    return (
      <div className="chatpage">
        {this.renderChatNavigation()}
        {this.state.openMenu && this.renderSideDrawer()}
        <div className="home-chat-container">
          {this.renderMyChat()}
          {this.renderChatBox()}
        </div>
      </div>
    );
  };
  render() {
    return <div>{this.renderChatPage()}</div>;
  }
}

export default withRouter(Home);
