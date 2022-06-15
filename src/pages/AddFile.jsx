import React, { useState } from "react";
import { collection, addDoc, db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../slicer/userSlice";

const AddFile = () => {
  const [fileName, setFileName] = useState("");
  const user = useSelector(selectUser);

  const addFolder = (e) => {
    e.preventDefault();

    addDoc(collection(db, "folders"), {
      name: fileName,
      uid: user.uid,
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div className="content-container">
      <div className="flex items-center justify-center p-4 pt-12 ml-14 lg:p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form action="">
            <div className="mb-5">
              <label
                htmlFor="folderName"
                className="mb-3 block text-base font-medium text-white"
              >
                Folder name
              </label>
              <input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                type="text"
                name="folderName"
                id="folderName"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <button
                onClick={addFolder}
                className="hover:shadow-form rounded-md bg-green-600 py-3 px-8 text-base font-semibold text-white outline-none"
              >
                Add Folder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFile;
