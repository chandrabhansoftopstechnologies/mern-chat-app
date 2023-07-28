import axios from "axios";
import { Component } from "react";
import { toast } from "react-toastify";
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
  handleLogin = async (e: any) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return toast.warning("All fields required");
    }
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    await axios
      .post(`http://localhost:5000/api/user/login`, data)
      .then(async (res: any) => {
        // console.log(res);
        if (res.status === 201) {
          await localStorage.setItem("userToken", res.data.token);
          toast.success("User registered");
          this.props.router.navigate("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err: any) => {
        // console.log(err.response.data);
        toast.warning(err.response.data.message);

        // const messageString =
        //   '{"message":"User already exist","success":false}';
        // const data = JSON.parse(messageString);
        // const message = data.message;
        // console.log(message);
        // toast.warning(message);
      });
  };
}

export default SignInController;
