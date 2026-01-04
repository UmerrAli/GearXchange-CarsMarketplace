import { IoIosCloseCircleOutline } from "react-icons/io";

function UploadImages({ selectedFileList, setSelectedFileList }) {
  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFileList((prev) => [...prev, file]);
    }
  };
  function onImageRemove(image) {
    setSelectedFileList(selectedFileList.filter((file) => image !== file));
  }
  return (
    <div>
      <div className="flex items-center flex-wrap gap-4">
        <label htmlFor="images" className="group">
          <div>
            <div className="border-2 border-dashed rounded-2xl w-[140px] h-[140px] flex items-center justify-center font-bold border-muted-foreground/30 bg-muted/30 text-3xl text-muted-foreground cursor-pointer hover:bg-muted/50 hover:border-primary/50 hover:text-primary transition-all duration-300">
              +
            </div>
          </div>
        </label>
        {selectedFileList?.map((image, index) => (
          <div key={index} className="relative group">
            <div className="absolute -top-3 -right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <IoIosCloseCircleOutline
                className="text-2xl text-red-600 cursor-pointer bg-background rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() => onImageRemove(image)}
              />
            </div>
            <img
              src={URL.createObjectURL(image)}
              className="w-[140px] h-[140px] object-cover rounded-2xl border border-border/50 shadow-sm"
              alt={`Selected ${index}`}
            />
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
