import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { Alert, Snackbar } from "@mui/material";
import { Header, Footer } from "./components/Global";
import {
  Home,
  HomeAdmin,
  Registration,
  Login,
  LoginStudent,
  HomeStudent,
} from "./pages";
import {
  ClassList,
  PredmetForm,
  PredmetList,
  PredmetPage,
  StudentList,
  StudentProfile,
  StudentRegisterForm,
  TeacherList,
  TeacherRegisterForm,
  UserAdmin,
} from "./components/Admin";
import {
  Journal,
  JournalPeriod,
  KTP,
  KTPClass,
  KTPForm,
  ModalMark,
  ModalMarkDelete,
  PredmetClassList,
  PredmetTeacher,
  TableKTP,
  UserMe,
} from "./components/Teacher";
import { HeaderStudent, UserMeStudent } from "./components/Student";
import {
  fetchAuthMe,
  fetchAuthStudentMe,
  selectIsAuth,
  selectIsAuthStudent,
} from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isAuthStudent = useSelector(selectIsAuthStudent);
  const userData = useSelector(
    (state) => state.auth.data || state.authStudent.data
  );
  const isAdmin = userData?.fullName === "admin";
  const [openSuccessChangePassword, setOpenSuccessChangePassword] =
    useState(false);
  const [messagePassword, setMessagePassword] = useState("");
  const [openDeletePredmet, setOpenDeletePredmet] = useState(false);

  const handleCloseSuccessPredmetDeleteError = () =>
    setOpenDeletePredmet(false);

  useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchAuthStudentMe());
  }, []);

  const handleCloseSuccessPasswordChange = () =>
    setOpenSuccessChangePassword(false);

  return (
    <>
      {isAuth || isAuthStudent ? (
        <>
          {isAdmin ? (
            <>
              <Container className="main-container" maxWidth="lg">
                <Header userData={userData} />
                <Routes>
                  <Route path="/" element={<HomeAdmin userData={userData} />}>
                    <Route path="student" element={<ClassList />} />
                    <Route path="student/:classId" element={<StudentList />} />
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
                    <Route
                      path="student/info/:studentId"
                      element={<StudentProfile />}
                    />
                    <Route
                      path="me"
                      element={
                        <UserAdmin
                          setOpenSuccessChangePassword={
                            setOpenSuccessChangePassword
                          }
                          setMessagePassword={setMessagePassword}
                          userData={userData}
                        />
                      }
                    />
                    <Route
                      path="predmets"
                      element={
                        <PredmetList
                          openDeletePredmet={openDeletePredmet}
                          handleCloseSuccessPredmetDeleteError={
                            handleCloseSuccessPredmetDeleteError
                          }
                        />
                      }
                    />
                    <Route
                      path="predmet/info/:predmetId"
                      element={
                        <PredmetPage
                          setOpenDeletePredmet={setOpenDeletePredmet}
                        />
                      }
                    />
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Container>
            </>
          ) : (
            <>
              {isAuthStudent ? (
                <>
                  <Container className="main-container" maxWidth="lg">
                    <HeaderStudent userData={userData} />
                    <Routes>
                      <Route
                        path="/"
                        element={<HomeStudent userData={userData} />}
                      />
                      <Route
                        path="me"
                        element={
                          <UserMeStudent
                            setOpenSuccessChangePassword={
                              setOpenSuccessChangePassword
                            }
                            setMessagePassword={setMessagePassword}
                            userData={userData}
                          />
                        }
                      />
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
                        <Route
                          path="journal/:id"
                          element={<PredmetClassList />}
                        />
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
                        <Route
                          path="ktp"
                          element={<KTP userData={userData} />}
                        />
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
                        <Route
                          path="me"
                          element={
                            <UserMe
                              setOpenSuccessChangePassword={
                                setOpenSuccessChangePassword
                              }
                              setMessagePassword={setMessagePassword}
                              userData={userData}
                            />
                          }
                        />
                      </Route>
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </Container>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Container className="main-container" maxWidth="lg">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/loginStudent" element={<LoginStudent />} />
              {/* <Route path="/register" element={<Registration />} /> */}
              {/* Доступно !, только с админ панели :) */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Container>
        </>
      )}
      <Footer />
      <Snackbar
        open={openSuccessChangePassword}
        autoHideDuration={6000}
        onClose={handleCloseSuccessPasswordChange}
      >
        <Alert
          onClose={handleCloseSuccessPasswordChange}
          severity="success"
          sx={{ width: "100%" }}
        >
          {messagePassword}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
