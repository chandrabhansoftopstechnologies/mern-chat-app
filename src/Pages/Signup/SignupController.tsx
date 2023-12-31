import { Component, RefObject, createRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/Firebase";
import axios from "axios";
import { toast } from "react-toastify";
interface States {
  showPassword: boolean;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pic: any;
  picName: string;
  error: string;
  uploadingImage: boolean;
  imageUploadsuccess: boolean;
  passwordMatch: boolean;
}
type Props = {
  router: any;
};
export class SignupController extends Component<Props, States> {
  myInputRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      showPassword: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      pic: "",
      error: "",
      uploadingImage: false,
      imageUploadsuccess: false,
      picName: "",
      passwordMatch: false,
    };
    this.myInputRef = createRef();
  }
  handleClipClick = () => {
    if (this.myInputRef.current) {
      this.myInputRef.current.click();
    }
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.setState({ pic: file, picName: file.name }, () => {
        this.getImageUrl();
      });
    }
  };
  getImageUrl = () => {
    this.setState({ uploadingImage: true });
    const image = this.state.pic;
    const username = this.state.name;
    if (username === "") {
      return alert("Please enter name");
    }

    //@ts-ignore
    const storageRef = ref(storage, `images/${username}`);
    //@ts-ignore
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        //TODO:Handle Error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log(downloadURL);
          this.setState({
            pic: downloadURL,
            uploadingImage: false,
            imageUploadsuccess: true,
          });
        });
      }
    );
  };

  handleRegister = async (e: any) => {
    e.preventDefault();
    if (
      !this.state.name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.pic ||
      !this.state.imageUploadsuccess
    ) {
      return toast.warning("All fields required");
    }
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      pic: this.state.pic,
    };
    await axios
      .post("http://localhost:5000/api/user/register", data)
      .then(async (res: any) => {
        // console.log(res);
        if (res.status === 201) {
          // await localStorage.setItem("userToken", res.data);
          await this.props.router.setLoggedIn(res.data);
          console.log(this.props.router.loggedIn);

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

export default SignupController;
