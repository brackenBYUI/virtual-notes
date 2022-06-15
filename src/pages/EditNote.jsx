import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, db, getDoc, setDoc } from "../firebase";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const { noteId } = useParams();

  useEffect(() => {
    const docRef = doc(db, "notes", noteId);
    getDoc(docRef).then((result) => {
      const data = result.data();
      setTitle(data.title);
      setNote(data.note);
    });
  }, [noteId]);

  const editNote = (e) => {
    e.preventDefault();
    const docRef = doc(db, "notes", noteId);

    setDoc(
      docRef,
      {
        title: title,
        note: note,
      },
      {
        merge: true,
      }
    ).then(() => console.log("Document updated"));
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[850px]">
        <form action="">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#07074D]"
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
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              type="textarea"
              name="note"
              id="note"
              className="h-full w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div>
            <button
              onClick={editNote}
              className="hover:shadow-form rounded-md bg-green-600 py-3 px-8 text-base font-semibold text-white outline-none"
            >
              Edit Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
