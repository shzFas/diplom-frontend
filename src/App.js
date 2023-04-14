import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { Alert, Snackbar } from "@mui/material";
import {
  Header,
  Footer,
  SnackbarSuccess,
  SnackbarError,
} from "./components/Global";
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
  TeacherProfile,
  TeacherRegisterForm,
  UserAdmin,
} from "./components/Admin";
import {
  Journal,
  JournalPeriod,
  KTP,
  KTPClass,
  KTPForm,
  PredmetClassList,
  PredmetTeacher,
  TableKTP,
  UserMe,
} from "./components/Teacher";
import {
  HeaderStudent,
  ScoreBoard,
  ScoreBoardPeriod,
  StudentMain,
  UserMeStudent,
} from "./components/Student";
import {
  fetchAuthMe,
  fetchAuthStudentMe,
  selectIsAuth,
  selectIsAuthStudent,
} from "./redux/slices/auth";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isAuthStudent = useSelector(selectIsAuthStudent);
  const userData = useSelector(
    (state) => state.auth.data || state.authStudent.data
  );
  const isAdmin = userData?.fullName === "admin";
  const [openDeletePredmet, setOpenDeletePredmet] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setOpenSnackbarError(false);
  };

  const handleCloseSuccessPredmetDeleteError = () =>
    setOpenDeletePredmet(false);

  useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchAuthStudentMe());
  }, []);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      {isAuth || isAuthStudent ? (
        <>
          {isAdmin ? (
            <>
              <Container className="main-container" maxWidth="lg">
                <Header t={t} userData={userData} />
                <Routes>
                  <Route
                    path="/"
                    element={<HomeAdmin t={t} userData={userData} />}
                  >
                    <Route path="student" element={<ClassList t={t} />} />
                    <Route
                      path="student/:classId"
                      element={<StudentList t={t} />}
                    />
                    <Route path="teacher" element={<TeacherList t={t} />} />
                    <Route
                      path="predmet"
                      element={
                        <PredmetForm
                          setSnackBarMessage={setSnackBarMessage}
                          setOpenSnackbar={setOpenSnackbar}
                          setOpenSnackbarError={setOpenSnackbarError}
                          t={t}
                        />
                      }
                    />
                    <Route
                      path="register/teacher"
                      element={
                        <TeacherRegisterForm
                          setSnackBarMessage={setSnackBarMessage}
                          setOpenSnackbar={setOpenSnackbar}
                          setOpenSnackbarError={setOpenSnackbarError}
                          t={t}
                        />
                      }
                    />
                    <Route
                      path="register/student"
                      element={
                        <StudentRegisterForm
                          setSnackBarMessage={setSnackBarMessage}
                          setOpenSnackbar={setOpenSnackbar}
                          setOpenSnackbarError={setOpenSnackbarError}
                          t={t}
                        />
                      }
                    />
                    <Route
                      path="student/info/:studentId"
                      element={
                        <StudentProfile
                          t={t}
                          setSnackBarMessage={setSnackBarMessage}
                          setOpenSnackbar={setOpenSnackbar}
                          setOpenSnackbarError={setOpenSnackbarError}
                        />
                      }
                    />
                    <Route
                      path="teacher/info/:teacherId"
                      element={
                        <TeacherProfile
                          t={t}
                          setSnackBarMessage={setSnackBarMessage}
                          setOpenSnackbar={setOpenSnackbar}
                          setOpenSnackbarError={setOpenSnackbarError}
                          openSnackbar={openSnackbar}
                          openSnackbarError={openSnackbarError}
                        />
                      }
                    />
                    <Route
                      path="me"
                      element={
                        <UserAdmin
                          t={t}
                          setSnackBarMessage={setSnackBarMessage}
                          setOpenSnackbar={setOpenSnackbar}
                          setOpenSnackbarError={setOpenSnackbarError}
                          userData={userData}
                        />
                      }
                    />
                    <Route path="predmets" element={<PredmetList t={t} />} />
                    <Route
                      path="predmet/info/:predmetId"
                      element={
                        <PredmetPage
                          t={t}
                          setSnackBarMessage={setSnackBarMessage}
                          setOpenSnackbar={setOpenSnackbar}
                          setOpenSnackbarError={setOpenSnackbarError}
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
                    <HeaderStudent t={t} userData={userData} />
                    <Routes>
                      <Route
                        path="/"
                        element={<HomeStudent t={t} userData={userData} />}
                      >
                        <Route
                          path="/"
                          element={<StudentMain t={t} userData={userData} />}
                        />
                      </Route>
                      <Route
                        path="/score/:predmetId"
                        element={<ScoreBoardPeriod t={t} userData={userData} />}
                      >
                        <Route
                          path=":period"
                          element={<ScoreBoard t={t} userData={userData} />}
                        />
                      </Route>
                      <Route
                        path="me"
                        element={
                          <UserMeStudent
                            t={t}
                            setSnackBarMessage={setSnackBarMessage}
                            setOpenSnackbar={setOpenSnackbar}
                            setOpenSnackbarError={setOpenSnackbarError}
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
                    <Header t={t} userData={userData} />
                    <Routes>
                      <Route
                        path="/"
                        element={<Home t={t} userData={userData} />}
                      >
                        <Route
                          path="journal"
                          element={<PredmetTeacher t={t} userData={userData} />}
                        />
                        <Route
                          path="journal/:id"
                          element={<PredmetClassList t={t} />}
                        />
                        <Route
                          path="journal/:id/:classId"
                          element={<JournalPeriod t={t} />}
                        />
                        <Route
                          path="journal/:id/:classId/:period"
                          element={
                            <Journal
                              setSnackBarMessage={setSnackBarMessage}
                              setOpenSnackbar={setOpenSnackbar}
                              setOpenSnackbarError={setOpenSnackbarError}
                              t={t}
                              userData={userData}
                            />
                          }
                        />
                        <Route
                          path="ktp"
                          element={<KTP t={t} userData={userData} />}
                        />
                        <Route
                          path="ktp/:predmetId"
                          element={<KTPClass t={t} userData={userData} />}
                        />
                        <Route
                          path="ktp/:predmetId/:classId"
                          element={
                            <KTPForm
                              setSnackBarMessage={setSnackBarMessage}
                              setOpenSnackbar={setOpenSnackbar}
                              setOpenSnackbarError={setOpenSnackbarError}
                              openSnackbar={openSnackbar}
                              openSnackbarError={openSnackbarError}
                              t={t}
                              userData={userData}
                            />
                          }
                        >
                          <Route path="period/:period" element={<TableKTP />} />
                        </Route>
                        <Route
                          path="me"
                          element={
                            <UserMe
                              t={t}
                              setSnackBarMessage={setSnackBarMessage}
                              setOpenSnackbar={setOpenSnackbar}
                              setOpenSnackbarError={setOpenSnackbarError}
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
              <Route path="/login" element={<Login t={t} />} />
              <Route path="/loginStudent" element={<LoginStudent t={t} />} />
              {/* <Route path="/register" element={<Registration />} /> */}
              {/* Доступно !, только с админ панели :) */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Container>
        </>
      )}
      <Footer changeLanguage={changeLanguage} />
      <SnackbarSuccess
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        snackBarMessage={snackBarMessage}
      />
      <SnackbarError
        openSnackbarError={openSnackbarError}
        handleCloseSnackbar={handleCloseSnackbar}
        snackBarMessage={snackBarMessage}
      />
    </>
  );
}

export default App;
