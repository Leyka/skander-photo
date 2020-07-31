import React, { useState, useRef } from 'react';
import { AdminLayout } from '../shared/AdminLayout/AdminLayout';
import { useFirebasePicturesUpload } from '../../hooks/useFirebasePicturesUpload';
import { Picture } from '../../shared/types';
import { PictureEditor } from '../shared/PictureEditor/PictureEditor';
import './PicturesUploader.scss';
import { PictureService } from '../../services/picture-service';
import { firebaseStorage } from '../../firebase';

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

  const removePictureFromStore = (pictureId: string) => {
    const newUploadedPictures = uploadedPictures.filter((p) => p.id !== pictureId);
    setUploadedPictures(newUploadedPictures);
  };

  const { handleFirebaseUpload } = useFirebasePicturesUpload({
    files,
    onUploadStart,
    onUploadEnd,
    addPictureToStore,
  });

  const handlePictureSave = (picture: Picture) => {
    PictureService.edit(picture);
    removePictureFromStore(picture.id);
  };

  const handlePictureDelete = (id: string, fileName: string) => {
    PictureService.delete(id);
    firebaseStorage.ref(`/photos/${fileName}`).delete(); // Delete from storage
    removePictureFromStore(id);
  };

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
        >
          Upload
        </button>
      </div>
      {uploadedPictures.length > 0 &&
        uploadedPictures.map((picture) => (
          <PictureEditor
            key={picture.id}
            id={picture.id}
            fileName={picture.fileName}
            url={picture.url}
            category={picture.category}
            isVisible={picture.isVisible}
            title={picture.title}
            onSaveClick={handlePictureSave}
            onDeleteClick={handlePictureDelete}
            isNewImport
          />
        ))}
    </AdminLayout>
  );
};
