/* eslint-disable no-undef */
import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      uploadPdf(base64String)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    reader.readAsDataURL(selectedFile);
  };

  const uploadPdf = (base64String) => {
    return axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/files`,
      {
        pdf: base64String,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button
        className="rounded border bg-teal-600 py-2 px-4 text-sm text-white transition-all hover:bg-teal-700 focus:outline-none"
        type="submit"
      >
        Upload
      </button>
    </form>
  );
};

export default FileUpload;
