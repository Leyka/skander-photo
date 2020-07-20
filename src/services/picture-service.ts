import { capitalize } from 'lodash';
import { Picture } from './../shared/types';
import { firebaseDb } from './../firebase';

export class PictureService {
  static get pictures() {
    return firebaseDb.collection('pictures');
  }

  static async findBy(key: string, value: string) {
    return this.pictures.where(key, '==', value).get();
  }

  static async exists(fileName: string) {
    const picture = await this.findBy('fileName', fileName);
    return !picture.empty;
  }

  static async fetchAll() {
    const data = await this.pictures.get();
    return data.docs.map<Picture>(this.toPicture);
  }

  static async add(url: string, fileName: string, category: string) {
    const doc = await this.pictures.add({
      url,
      fileName,
      category,
      isVisible: true,
    });

    const pictureData = (await doc.get()).data();
    const picture = {
      id: doc.id,
      ...pictureData,
    } as Picture;
    return picture;
  }

  static edit(picture: Picture) {
    this.pictures.doc(picture.id).update({
      ...picture,
      category: capitalize(picture.category),
    });
  }

  static delete(id: string) {
    this.pictures.doc(id).delete();
  }

  private static toPicture(doc: firebase.firestore.DocumentData) {
    return { id: doc.id, ...doc.data() };
  }
}
