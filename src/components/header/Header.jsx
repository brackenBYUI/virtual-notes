import React, { useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  auth,
  signOut,
  query,
  collection,
  db,
  where,
  getDocs,
} from "../../firebase";
import { useHistory } from "react-router-dom";
import { logout, selectUser } from "../../slicer/userSlice";
import { folder, selectFolders } from "../../slicer/folderSlice";
import SideBarIcon from "./SideBarIcon";
import NoteChannel from "./NoteChannel";
import Divider from "../Divider";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const folders = useSelector(selectFolders);
  const history = useHistory();

  useEffect(() => {
    const q = query(collection(db, "folders"), where("uid", "==", user.uid));
    getDocs(q).then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      dispatch(folder(tempDoc));
    });
  }, [user.uid, dispatch]);

  const logOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        dispatch(logout());
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderFolders = () => {
    if (folders) {
      return folders.map((folder) => {
        return (
          <NoteChannel
            key={folder.id}
            icon={folder.name.charAt(0)}
            text={folder.name}
            folderId={folder.id}
          />
        );
      });
    }
    return null;
  };

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 shadow-lg">
        <SideBarIcon
          link="/add-file"
          icon={<BsPlus size="32" />}
          text="Add File"
        />
        <Divider />
        {renderFolders()}
        <Divider />
        <button className="sidebar-icon group leading-4" onClick={logOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
