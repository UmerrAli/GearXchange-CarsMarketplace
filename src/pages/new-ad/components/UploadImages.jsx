import { IoIosCloseCircleOutline } from "react-icons/io";

function UploadImages({ selectedFileList, setSelectedFileList }) {
  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFileList((prev) => [...prev, file]);
    }
  };
  function onImageRemove(image, index) {
    setSelectedFileList(selectedFileList.filter((file) => image !== file));
  }
  return (
    <div>
      <div className="flex items-center flex-wrap gap-3">
        <label htmlFor="images">
          <div>
            <div className="border rounded-xl px-3 py-1 font-bold border-solid border-primary bg-slate-200 text-xl text-center cursor-pointer hover:bg-slate-300 transition-all">
              +
            </div>
          </div>
        </label>
        {selectedFileList?.map((image, index) => (
          <div key={index} className="flex gap-3 flex-wrap">
            <IoIosCloseCircleOutline
              className="absolute text-xl text-red-600 cursor-pointer bg-white rounded-xl"
              onClick={() => onImageRemove(image, index)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[120px] object-cover"
            ></img>
          </div>
        ))}
        <input
          type="file"
          multiple={true}
          id="images"
          className="opacity-0 hidden"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default UploadImages;
