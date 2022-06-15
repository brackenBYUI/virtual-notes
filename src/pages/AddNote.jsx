import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../slicer/userSlice";
import { collection, addDoc, db } from "../firebase";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const { folderId } = useParams();
  const user = useSelector(selectUser);

  const addNote = (e) => {
    e.preventDefault();

    addDoc(collection(db, "notes"), {
      title: title,
      note: note,
      folderId: folderId,
      uid: user.uid,
    }).catch((err) => {
      console.log(err);
      alert(err);
    });
  };

  return (
    <div className="content-container">
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[850px]">
          <form action="">
            <div className="mb-5 h-[70vh]">
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-white"
              >
                Note Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                id="title"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <label
                htmlFor="folderName"
                className="mb-3 block text-base font-medium text-white"
              >
                Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                type="textarea"
                name="note"
                id="note"
                className="h-4/5 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <button
                onClick={addNote}
                className="hover:shadow-form rounded-md bg-green-600 py-3 px-8 text-base font-semibold text-white outline-none"
              >
                Add Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
