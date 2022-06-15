import React from "react";
import { Link } from "react-router-dom";

const ChannelBlock = ({ folderId }) => {
  return (
    <div className="channel-block">
      <Link
        to={`/add-note/${folderId}`}
        className="bg-gray-400 hover:bg-green-60 text-gray-800 hover:text-white dark:bg-green-600  font-bold py-2 px-4 rounded-full top-0 right-0"
      >
        Add Note
      </Link>
    </div>
  );
};

export default ChannelBlock;
