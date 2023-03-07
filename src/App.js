import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { Header } from "./components/Header";
import { Home, Registration, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import PredmetTeacher from "./components/PredmetTeacher";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      {isAuth ? (
        <>
          <Container maxWidth="lg">
            <Header userData={userData} />
            <Routes>
              <Route path="/" element={<Home userData={userData} />}>
                <Route
                  path="journal"
                  element={<PredmetTeacher userData={userData} />}
                />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </>
      ) : (
        <>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Container>
        </>
      )}
    </>
  );
}

export default App;
