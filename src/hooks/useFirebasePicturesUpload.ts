import { useState } from 'react';
import { noop } from 'lodash';
import { getCategoryFromFileName } from './../shared/utils';
import { firebaseStorage, firebaseTaskEvent } from './../firebase';
import { PictureService } from './../services/picture-service';
import { Picture } from './../shared/types';
import { filterAsync } from '../shared/utils';

interface Props {
  files: FileList | null;
  onUploadStart(): void;
  onUploadEnd(): void;
  addPictureToStore(picture: Picture): void;
}

export const useFirebasePicturesUpload = (props: Props) => {
  const { files, onUploadStart, onUploadEnd, addPictureToStore } = props;
  let completedUploaded;

  const handleFirebaseUpload = async () => {
    if (!files || files.length === 0) return;

    onUploadStart();

    // We upload only new files
    const newFiles = await filterAsync(Object.values(files), filterNewFile);
    if (newFiles.length === 0) {
      onUploadEnd();
      return;
    }

    completedUploaded = 0;
    newFiles.forEach((file) => uploadToFirebase(file, newFiles.length));
  };

  const filterNewFile = async (file: File) => {
    const exists = await PictureService.exists(file.name);
    return !exists;
  };

  const uploadToFirebase = async (file: File, totalNewFiles: number) => {
    const uploadTask = firebaseStorage.ref(`/photos/${file.name}`).put(file);
    uploadTask.on(firebaseTaskEvent.STATE_CHANGED, {
      complete: async () => {
        const url = await firebaseStorage.ref('photos').child(file.name).getDownloadURL();
        // New entry in database and store
        const category = getCategoryFromFileName(file.name);
        const picture = await PictureService.add(url, file.name, category);
        addPictureToStore(picture);
        // Was it our last picture to upload?
        completedUploaded++;
        if (completedUploaded === totalNewFiles) {
          onUploadEnd();
        }
      },
      error: (err) => console.log(err), // TODO: Better error handling
      next: noop,
    });
  };

  return { handleFirebaseUpload };
};
