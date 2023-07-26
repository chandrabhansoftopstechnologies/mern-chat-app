import { useNavigate, useParams, useLocation } from "react-router-dom";

export const withRouter = (Component:any) => {
  const Wrapper = (props:any) => {
    const navigate = useNavigate();
    const params = useParams();
    let location = useLocation();
    return <Component router={{ location, navigate, params }} {...props} />;
  };

  return Wrapper;
};