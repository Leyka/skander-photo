import { useState, useEffect } from 'react';
import { Picture } from '../shared/types';
import { PictureService } from '../services/picture-service';

interface Props {
  addPictures(pictures: Picture[]): void;
}

export const useFirebasePicturesLoader = (props: Props) => {
  const { addPictures } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPictures = async () => {
      setLoading(true);
      const pictures = await PictureService.fetchAll();
      addPictures(pictures);
      setLoading(false);
    };
    loadPictures();
  }, []);

  return { loading };
};
