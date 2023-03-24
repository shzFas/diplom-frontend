import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { Header } from "./components/Header";
import { Home, HomeAdmin, Registration, Login } from "./pages";
import {
  ClassList,
  PredmetForm,
  StudentList,
  StudentRegisterForm,
  TeacherList,
  TeacherRegisterForm,
} from "./components/Admin";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import PredmetTeacher from "./components/PredmetTeacher";
import PredmetClassList from "./components/PredmetClassList";
import KTP from "./components/KTP";
import KTPClass from "./components/KTPClass";
import KTPForm from "./components/KTPForm";
import UserMe from "./components/UserMe";
import Journal from "./components/Journal";
import ModalMark from "./components/ModalMark";
import ModalMarkDelete from "./components/ModalMarkDelete";
import TableKTP from "./components/TableKTP";
import JournalPeriod from "./components/JournalPeriod";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const isAdmin = userData?.fullName === "admin";

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      {isAuth ? (
        <>
          {isAdmin ? (
            <>
              <Container className="main-container" maxWidth="lg">
                <Header userData={userData} />
                <Routes>
                  <Route path="/" element={<HomeAdmin userData={userData} />}>
                    <Route path="student" element={<ClassList />} />
                    <Route path="student/:classId" element={<StudentList />}/>
                    <Route path="teacher" element={<TeacherList />} />
                    <Route path="predmet" element={<PredmetForm />} />
                    <Route
                      path="register/teacher"
                      element={<TeacherRegisterForm />}
                    />
                    <Route
                      path="register/student"
                      element={<StudentRegisterForm />}
                    />
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Container>
            </>
          ) : (
            <>
              <Container className="main-container" maxWidth="lg">
                <Header userData={userData} />
                <Routes>
                  <Route path="/" element={<Home userData={userData} />}>
                    <Route
                      path="journal"
                      element={<PredmetTeacher userData={userData} />}
                    />
                    <Route path="journal/:id" element={<PredmetClassList />} />
                    <Route
                      path="journal/:id/:classId"
                      element={<JournalPeriod />}
                    />
                    <Route
                      path="journal/:id/:classId/:period"
                      element={<Journal userData={userData} />}
                    >
                      <Route
                        path=":studentId/:teacherId/:ktpId/:type/:max"
                        element={<ModalMark />}
                      />
                      <Route
                        path="delete/:idStudent/:idKtp"
                        element={<ModalMarkDelete />}
                      />
                    </Route>
                    <Route path="ktp" element={<KTP userData={userData} />} />
                    <Route
                      path="ktp/:predmetId"
                      element={<KTPClass userData={userData} />}
                    />
                    <Route
                      path="ktp/:predmetId/:classId"
                      element={<KTPForm userData={userData} />}
                    >
                      <Route path="period/:period" element={<TableKTP />} />
                    </Route>
                    <Route path="me" element={<UserMe userData={userData} />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Container>
            </>
          )}
        </>
      ) : (
        <>
          <Container className="main-container" maxWidth="lg">
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Registration />} /> */} {/* Доступно !, только с админ панели :) */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Container>
        </>
      )}
    </>
  );
}

export default App;
