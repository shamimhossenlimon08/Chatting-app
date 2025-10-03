import React from "react";
import { CrossIcon } from "../../svg/CrossIcon";
import { Cropper } from "react-cropper";

const ImageCropper = ({ image, setImage, cropperRef, getCropData }) => {
  const handleCropper = () => {
    if (cropperRef.current && cropperRef.current.Cropper) {
      cropperRef.current.Cropper.zoomTo(0.5);
    }
  };
  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
        <div className="w-[30%] bg-white rounded-md p-4 relative ">
          <div>
            <h3 className="font-roboto text-center">Upload photo</h3>
            <div
              className="absolute right-1 top-1 cursor-pointer"
              onClick={() => setImage()}
            >
              <CrossIcon />
            </div>
          </div>
          <div className="h-15 w-15 rounded-full  overflow-hidden mx-auto mt-4">
            <div
              className="img-preview"
              style={{ width: "100%", float: "left", height: "300px" }}
            />
          </div>
          <div className="mt-4 ">
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
              onInitialized={handleCropper}
            />
          </div>

          <button
            className="w-full bg-[#6CD0FB] py-2 rounded font-roboto font-bold text-white text-lg mt-3"
            onClick={getCropData}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
