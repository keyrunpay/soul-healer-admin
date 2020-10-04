import React from "react";
import Login from "./pages/Login/Login";
import DashboardWrapper from "./pages/DashboardWrapper/DashboardWrapper";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "redux-helper-np";
import jwtDecode from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.system);

  React.useEffect(() => {
    const adminData = localStorage.getItem("admin_data");
    if (adminData) {
      try {
        const data = JSON.parse(adminData);
        dispatch(
          updateState("system", {
            token: data.token,
            name: jwtDecode(data.token).name,
            accessibleRoutes: data.accessibleRoutes,
            operations: data.operations,
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {state.token && <DashboardWrapper />}
      {!state.token && <Login />}
    </div>
  );
}

export default App;
