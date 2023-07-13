import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from '../../Firebaseconfig';

const Upload = () => {

  const [videoPerc, setVideoPerc] = useState(0);
  const [input, setInputs] = useState('');
  console.log(input);
  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    const storage = getStorage(app);
    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe the upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoPerc((Math.round(progress)))
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      },
      () => {
        // Handle successful upload
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs(downloadURL)
        })
        console.log('Video uploaded successfully');
      }
    );
  };


  return (
    <div>


      <iframe width="560" height="315" src="https://firebasestorage.googleapis.com/v0/b/banglabook-92cb9.appspot.com/o/videos%2FMountains%20-%2059291.mp4?alt=media&token=c922635a-4feb-4d79-bced-86c074d11c69" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

      <iframe src="https://firebasestorage.googleapis.com/v0/b/banglabook-92cb9.appspot.com/o/videos%2F164360.mp4?alt=media&token=a6ce8a8b-9731-4021-9978-f452bf195792"  width="500" height="300" title="Example"  ></iframe>
      <iframe src="https://firebasestorage.googleapis.com/v0/b/banglabook-92cb9.appspot.com/o/videos%2F164360.mp4?alt=media&token=a6ce8a8b-9731-4021-9978-f452bf195792" width="500" height="300" title="Example" ></iframe>

      {videoPerc && <p className=' m-3 text-2xl font-bold'>  uploding... {videoPerc} </p>}
      <input className=' top-2 m-3 font-bold text-3xl p-2 ' type="file" onChange={handleVideoUpload} accept='vide' />

    </div>
  );
};

export default Upload;