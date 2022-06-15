import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { query, collection, db, where, getDocs } from "../../firebase";
import SideBarIcon from "./SideBarIcon";
import NoteBlock from "./NoteBlock";

const NoteChannel = ({ icon, text = "tooltip 💡", folderId }) => {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("folderId", "==", folderId));
    getDocs(q).then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setNotes(tempDoc);
    });
  }, [folderId]);

  const renderNotes = () => {
    if (notes) {
      return notes.map((note) => {
        return (
          <div key={note.id}>
            <Link
              className="hover:shadow-form rounded-md bg-white py-2 px-4 text-base font-semibold text-green-600 outline-none"
              to={`/edit-note/${note.id}`}
            >
              {note.title}
            </Link>
          </div>
        );
      });
    }
    return null;
  };

  return (
    <div>
      <div onClick={() => setExpanded(!expanded)}>
        <SideBarIcon icon={icon} link={"#"} text={text} />
      </div>
      {expanded && (
        <div className="fixed">
          <div className="channel-bar shadow-lg p-8 h-screen top-0">
            <NoteBlock folderId={folderId} />
            <div className="channel-container">
              <div>{renderNotes()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteChannel;
