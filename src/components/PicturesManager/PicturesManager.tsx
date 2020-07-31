import React from 'react';
import { AdminLayout } from '../shared/AdminLayout/AdminLayout';
import { useFirebasePicturesLoader } from '../../hooks/useFirebasePicturesLoader';
import { Link } from 'react-router-dom';
import { Routes } from '../../routes';
import { PictureEditor } from '../shared/PictureEditor/PictureEditor';
import { Picture } from '../../shared/types';
import { useDictionaryState } from '../../hooks/useDictionaryState';
import { PictureService } from '../../services/picture-service';
import { firebaseStorage } from '../../firebase';

export const PicturesManager = () => {
  const {
    addMany: addPictures,
    getArray: getPicturesArray,
    update,
    remove,
    isEmpty,
  } = useDictionaryState<Picture>();

  const { loading } = useFirebasePicturesLoader({ addPictures });

  const handlePictureSave = (picture: Picture) => {
    PictureService.edit(picture);
    update(picture);
  };

  const handlePictureDelete = (id: string, fileName: string) => {
    PictureService.delete(id);
    firebaseStorage.ref(`/photos/${fileName}`).delete(); // Delete from storage
    remove(id);
  };

  return (
    <AdminLayout title="Manage Pictures">
      {loading && <div className="loading loading-lg"></div>}
      {!loading && isEmpty() && (
        <div className="empty">
          <div className="empty-icon">
            <i className="icon icon-photo icon-3x"></i>
          </div>
          <h3 className="empty-title">You have no pictures to manage</h3>
          <p className="empty-subtitle">Click the button to import new photos.</p>
          <div className="empty-action">
            <Link to={Routes.AdminUpload} className="btn btn-primary">
              Upload Pictures
            </Link>
          </div>
        </div>
      )}
      {!loading &&
        !isEmpty() &&
        getPicturesArray().map((picture) => (
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
          />
        ))}
    </AdminLayout>
  );
};
