import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../state/store";
import { useEffect, useState } from "react";
import { AuthActions } from "../../state/actions/authActions";

export const ProtectedPage = () => {
  const { setUserData, authenticated } = AuthActions();
  const [checkedAuthStatus, setCheckedAuthStatus] = useState(false);

  // 1. On App load attempt to setUserData
  // 2. While awaiting a response - set some sort of loading state.
  // Need to stop flashing of login redirect until I know whether or not the
  // jwt has expired in the cookie.
  // 3. After completing attempt, then do the return statement

  useEffect(() => {
    (async () => {
      await setUserData();
      setTimeout(() => setCheckedAuthStatus(true), 2000);
    })();
  }, []);

  if (checkedAuthStatus !== true) {
    return <div>Loading</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};
