import { Component } from "react";
interface State {
  showPassword: boolean;
  email: string;
  password: string;
  error: string;
}
type Props = {
  router: any;
};
export class SignInController extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showPassword: false,
      email: "",
      password: "",
      error: "",
    };
  }
  handleLogin = () => {};
}

export default SignInController;
