import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./slicer/userSlice";
import { auth, onAuthStateChanged } from "./firebase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import AddFile from "./pages/AddFile";
import EditNote from "./pages/EditNote";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    // console.log('page loaded');
  }, [dispatch]);

  return (
    <div>
      {!user ? (
        <BrowserRouter>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/add-note/:folderId" exact component={AddNote} />
            <Route path="/add-file" exact component={AddFile} />
            <Route path="/edit-note/:noteId" exact component={EditNote} />
          </div>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
