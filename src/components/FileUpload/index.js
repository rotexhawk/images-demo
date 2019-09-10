// Import React FilePond
import React, { useState } from 'react';
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
const FileUpload = ({ server }) => {
    let pond;
    const [files, setFiles] = useState([]);



  const handleInit = () => {
    console.log("FilePond instance has initialised", pond);
  }


    return (
      <div className="App">
        {/* Pass FilePond properties as attributes */}
        <FilePond
          ref={ref => (pond = ref)}
          files={files}
          allowMultiple={true}
          maxFiles={3}
          server={server}
          oninit={() => handleInit()}
          onupdatefiles={fileItems => {
            setFiles({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
        />
      </div>
    );

}

export default FileUpload;