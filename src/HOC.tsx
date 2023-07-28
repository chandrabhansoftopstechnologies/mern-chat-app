import { useNavigate, useParams, useLocation } from "react-router-dom";
import AuthContext from "./Context/ChatContextProvider";
import { useContext } from "react";

export const withRouter = (Component: any) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();
    const params = useParams();
    let location = useLocation();
    const { loggedIn ,setLoggedIn} = useContext(AuthContext);
    return (
      <Component router={{ location, navigate, params, loggedIn,setLoggedIn }} {...props} />
    );
  };

  return Wrapper;
};
