import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAqvpLzaeg6MnOZv7Nr8Cl6YsvFzNCPhjE",
  authDomain: "jobkhuji-4.firebaseapp.com",
  projectId: "jobkhuji-4",
  storageBucket: "jobkhuji-4.appspot.com",
  messagingSenderId: "1072234973132",
  appId: "1:1072234973132:web:cdf6db9f898fb7edc5ff69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const ApplicationForm = ({ jobId, posterEmail, applicantEmail, handleApplicationSubmit }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!pdfFile) {
      alert("Please choose a file first!");
      return;
    }

    setIsUploading(true);
    
    const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, pdfFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can add progress indication here if you want
      },
      (error) => {
        console.error("Error uploading file:", error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Uploaded PDF URL:", downloadURL);
          setPdfUrl(downloadURL);
          setIsUploading(false);
          handleApplicationSubmit({
            jobId,
            posterEmail,
            applicantEmail,
            coverLetter,
            pdfUrl: downloadURL
          });
        });
      }
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Submit Your Application</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Cover Letter</label>
          <textarea
            className="textarea textarea-bordered w-full"
            name="coverLetter"
            required
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Attach CV</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <button type="button" className="btn" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
