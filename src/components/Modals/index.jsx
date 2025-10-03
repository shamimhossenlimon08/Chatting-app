import React, { useRef, useState } from "react";
import { CrossIcon } from "../../svg/CrossIcon";
import { GalleryIcon } from "../../svg/GalleryIcon";
import ImageCropper from "../ImageCropper";
import { getStorage, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../../features/Slices/LoginSlice";

const Modals = ({ setShow }) => {
  const user = useSelector((state) => state.login.loggedIn);

  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef();
  const fileRef = useRef(null);
  const storage = getStorage();
  const storageRef = ref(storage, user.uid);
  const auth = getAuth();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const imageData = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, imageData, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            dispatch(loggedInUser({ ...user, photoURL: downloadURL }));
            localStorage.setItem(
              "user",
              JSON.stringify({ ...user, photoURL: downloadURL })
            );
            setShow(false);
          });
        });
      });
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-[#2e2e2ef0] fixed top-0 left-0 flex items-center justify-center">
        <div className="w-[30%] bg-white rounded-md p-4 relative ">
          <div>
            <h3 className="font-roboto text-center">Upload photo</h3>
            <div
              className="absolute right-1 top-1 cursor-pointer"
              onClick={() => setShow(false)}
            >
              <CrossIcon />
            </div>
          </div>
          <div>
            <div className="w-full h-[300px] border border-slate-400 rounded-md mt-5 p-2 box-border">
              <div
                className="w-full h-full bg-slate-200 rounded-md flex items-center justify-center cursor-pointer"
                onClick={() => fileRef.current.click()}
              >
                <div>
                  <div className="flex justify-center ">
                    <GalleryIcon />
                  </div>
                  <h4>Upload your profile photo</h4>
                  <input
                    type="file"
                    ref={fileRef}
                    hidden
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {image && (
          <ImageCropper
            image={image}
            setImage={setImage}
            cropperRef={cropperRef}
            getCropData={getCropData}
          />
        )}
      </div>
    </>
  );
};

export default Modals;
