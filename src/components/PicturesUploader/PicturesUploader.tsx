import React, { useState, useRef } from 'react';
import { AdminLayout } from '../shared/AdminLayout/AdminLayout';
import { useFirebasePicturesUpload } from '../../hooks/useFirebasePicturesUpload';
import './PicturesUploader.scss';
import { Picture } from '../../shared/types';

export const PicturesUploader = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadedPictures, setUploadedPictures] = useState<Picture[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onUploadStart = () => {
    setLoading(true);
  };

  const onUploadEnd = () => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    setFiles(null);
    setLoading(false);
  };

  const addPictureToStore = (picture: Picture) => {
    setUploadedPictures((pictures) => [...pictures, picture]);
  };

  const deletePictureFromStore = (id: string) => {};

  const { handleFirebaseUpload } = useFirebasePicturesUpload({
    files,
    onUploadStart,
    onUploadEnd,
    addPictureToStore,
  });

  return (
    <AdminLayout title="Upload Pictures">
      <div className="input-group">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="form-input"
          ref={inputFileRef}
        />
        <button
          onClick={handleFirebaseUpload}
          disabled={!files || files.length === 0}
          className={`btn-upload btn btn-primary input-group-btn ${
            loading ? 'loading' : ''
          }`}
          style={{ height: 'inherit' }}
        >
          Upload
        </button>
      </div>
    </AdminLayout>
  );
};
