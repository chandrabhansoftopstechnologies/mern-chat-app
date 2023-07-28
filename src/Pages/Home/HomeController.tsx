import { Component } from "react";

interface States {
  userName: string;
  userEmail: string;
  userPic: any;
  openMenu: boolean;
  openProfile: boolean;
  searchInput: string;
}
type Props = {
  router: any;
};
export class HomeController extends Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      userName: "",
      userEmail: "",
      userPic: "",
      openMenu: false,
      openProfile: false,
      searchInput: "",
    };
  }
  componentDidMount(): void {
    let userData = this.props.router.loggedIn;
    this.setState({
      userName: userData.name,
      userEmail: userData.email,
      userPic: userData.pic,
    });
  }
}

export default HomeController;
