// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";

// export const ProtectedRoutes = (props: any) => {
//   let { Component } = props;
//   //   const Navigate = useNavigate();
//   useEffect(() => {
//     let user = localStorage.getItem("userToken");
//     console.log(user);

//     if (!user) {
//       //   Navigate("/user-auth");
//       <Navigate to="/user-auth" replace />;
//     }
//   }, [Navigate]);
//   return (
//     <div>
//       <Component />
//     </div>
//   );
// };

import { Navigate } from "react-router-dom";
export const ProtectedRoutes = (props) => {
  const { Component, user } = props;
  console.log(user);
  // let user = localStorage.getItem("userToken");

  if (!user) {
    return <Navigate to="/auth-user" replace />;
  }
  return Component;
};
export const AuthProtectedRoutes = (props) => {
  const { Component } = props;
  let user = localStorage.getItem("userToken");

  if (user) {
    return <Navigate to="/" replace />;
  }
  return Component;
};
