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
      <div className="flex flex-wrap items-center gap-4">
        <label htmlFor="images" className="group">
          <div>
            <div className="flex h-[140px] w-[140px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 text-3xl font-bold text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-muted/50 hover:text-primary">
              +
            </div>
          </div>
        </label>
        {selectedFileList?.map((image, index) => (
          <div key={index} className="group relative">
            <div className="absolute -right-3 -top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
              <IoIosCloseCircleOutline
                className="cursor-pointer rounded-full bg-background text-2xl text-red-600 shadow-lg transition-transform hover:scale-110"
                onClick={() => onImageRemove(image)}
              />
            </div>
            <img
              src={URL.createObjectURL(image)}
              className="h-[140px] w-[140px] rounded-2xl border border-border/50 object-cover shadow-sm"
              alt={`Selected ${index}`}
            />
          </div>
        ))}
        <input
          type="file"
          multiple={true}
          id="images"
          className="hidden opacity-0"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default UploadImages;
