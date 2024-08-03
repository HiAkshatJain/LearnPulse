import React, { useEffect, useRef, useState } from "react";
import { useDropzone, DropzoneOptions, FileWithPath } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Card, CardBody, Divider } from "@nextui-org/react";

// Define the props for the component
interface UploadProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
  video?: boolean;
  viewData?: string;
  editData?: string;
}

// Define the functional component with TypeScript
const Upload: React.FC<UploadProps> = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string>(
    viewData || editData || ""
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Function to handle file drop
  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  // Configure react-dropzone
  const dropzoneOptions: DropzoneOptions = {
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  // Function to preview the file
  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewSource(reader.result as string);
      }
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <Card>
        <CardBody>
          <label className="text-sm text-gray-700" htmlFor={name}>
            {label} {!viewData && <sup className="text-pink-500">*</sup>}
          </label>
        </CardBody>
        <Divider />

        <CardBody>
          <div
            className={`${
              isDragActive ? "bg-gray-300" : "bg-gray-200"
            } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-gray-400`}
          >
            {previewSource ? (
              <div className="flex w-full flex-col p-6">
                {!video ? (
                  <img
                    src={previewSource}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <Player aspectRatio="16:9" playsInline src={previewSource} />
                )}

                {!viewData && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewSource("");
                      setSelectedFile(null);
                      setValue(name, null);
                    }}
                    className="mt-3 text-gray-600 underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ) : (
              <div
                className="flex w-full flex-col items-center p-6"
                {...getRootProps()}
              >
                <input {...getInputProps()} ref={inputRef} />
                <div className="grid aspect-square w-14 place-items-center rounded-full bg-gray-200">
                  <FiUploadCloud className="text-2xl text-gray-700" />
                </div>
                <p className="mt-2 max-w-[200px] text-center text-sm text-gray-600">
                  Drag and drop a {!video ? "image" : "video"}, or click to{" "}
                  <span className="font-semibold text-gray-800">Browse</span> a
                  file
                </p>
                <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-gray-600">
                  <li>Aspect ratio 16:9</li>
                  <li>Recommended size 1024x576</li>
                </ul>
              </div>
            )}
          </div>
        </CardBody>

        {errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-500">
            {label} is required
          </span>
        )}
      </Card>
    </div>
  );
};

export default Upload;
