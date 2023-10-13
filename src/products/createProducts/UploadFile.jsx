import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ProgressChecker from "../../utils/ProgressChecker";
import Button from "@mui/material/Button";
import { useState } from "react";
import { uploadFile } from "../../axios/ApiCalls";
import { useMutation } from "react-query";
import Stack from "@mui/material/Stack";

export default function UploadFile({
  disabled,
  setFileUrl,
  filename,
  setFilename,
}) {
  const [file, setFile] = useState();
  const [displayFile, setDisplayFile] = useState(false);
  const [progress, setProgress] = useState(() => (disabled ? 100 : 0));

  const mutation = useMutation({
    mutationFn: uploadFile,
  });

  const handleUpload = async () => {
    setDisplayFile(false);
    const res = await mutation.mutateAsync({
      file: file,
      setProgress: setProgress,
    });
    setFileUrl(res.data.location);
  };

  const handleCancel = () => {
    setDisplayFile(false);
    setFile(null);
    setFilename("");
  };

  const handleAddFile = (e) => {
    setProgress(0);
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setDisplayFile(true);
  };

  const resetFile = (e) => {
    e.target.value = null;
  };

  return (
    <>
      <Stack sx={{ mt: 4 }} spacing={2} direction="row">
        <Button
          component="label"
          variant="contained"
          sx={{ mt: 3, maxWidth: 200 }}
          startIcon={<CloudUploadIcon />}
          disabled={displayFile}
        >
          {progress == 100 && <>Change Image</>}
          {progress != 100 && <>Add Image</>}
          <input
            style={{ display: "none" }}
            type="file"
            onChange={handleAddFile}
            onClick={resetFile}
          />
        </Button>
        <Button
          sx={{ mt: 3, ml: 2, maxWidth: 200 }}
          color="success"
          onClick={handleUpload}
          disabled={!displayFile}
        >
          Upload
        </Button>
        <Button
          sx={{ mt: 3, ml: 2, maxWidth: 200 }}
          color="error"
          onClick={handleCancel}
          disabled={!displayFile}
        >
          Cancel
        </Button>
      </Stack>
      {displayFile && <Typography color="red">{filename}</Typography>}
      {progress == 100 && <Typography color="blue">{filename}</Typography>}
      {progress < 100 && progress > 0 && (
        <ProgressChecker progress={progress} />
      )}
    </>
  );
}
