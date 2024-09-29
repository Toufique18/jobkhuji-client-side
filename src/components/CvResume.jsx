import React, { useContext, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { AuthContext } from '../provider/AuthProvider';

const firebaseConfig = {
  apiKey: 'AIzaSyAqvpLzaeg6MnOZv7Nr8Cl6YsvFzNCPhjE',
  authDomain: 'jobkhuji-4.firebaseapp.com',
  projectId: 'jobkhuji-4',
  storageBucket: 'jobkhuji-4.appspot.com',
  messagingSenderId: '1072234973132',
  appId: '1:1072234973132:web:cdf6db9f898fb7edc5ff69',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const CvResume = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const { user } = useContext(AuthContext); 
  const email = user ? user.email : '';

  // Fetch the current CV/Resume URL on component mount
  useEffect(() => {
    const fetchCvResume = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getCvResume?email=${email}`);
        const data = await response.json();
        if (response.ok && data.cvResume) {
          setPdfUrl(data.cvResume); // Set the current URL
        }
      } catch (error) {
        console.error('Error fetching CV/Resume:', error);
      }
    };

    if (email) {
      fetchCvResume(); // Fetch the CV/Resume if the user is logged in
    }
  }, [email]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!pdfFile) {
      alert('Please choose a file first!');
      return;
    }

    setIsUploading(true);

    const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, pdfFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress indication (optional)
      },
      (error) => {
        console.error('Error uploading file:', error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('Uploaded PDF URL:', downloadURL);
          setPdfUrl(downloadURL); // Update the state with the new PDF URL
          setIsUploading(false);

          // Save the PDF URL to the MongoDB using the email
          try {
            const response = await fetch('http://localhost:5000/api/saveCvResume', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, cvUrl: downloadURL }),
            });
            if (response.ok) {
              alert('CV/Resume URL saved successfully');
            } else {
              alert('Failed to save the CV/Resume URL');
            }
          } catch (error) {
            console.error('Error saving to database:', error);
          }
        });
      }
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your CV/Resume</h1>

      {/* Display current CV/Resume if available */}
      {pdfUrl && (
        <div className="mb-4">
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn">
            View Current CV/Resume
          </a>
        </div>
      )}

      <div className="mb-4">
        <input type="file" onChange={handleFileChange} />
      </div>

      <button className={`btn ${isUploading ? 'loading' : ''}`} onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload CV/Resume'}
      </button>
    </div>
  );
};

export default CvResume;
