import firebase from './index';

export const uploadPhoto = async (id, file) => {
  const imgPath = `${id}/avatar.jpg`;
  const storageRef = await firebase.storage().ref(imgPath);
  const put = await storageRef.put(file);
  const downloadUrl = await put.ref.getDownloadURL().then((url) => url);
  return downloadUrl;
};

export const getUrlUserImage = async (id) => {
  const storage = await firebase.storage();
  const pathReference = await storage.ref(`${id}`);
  const url = await pathReference
    .child('avatar.jpg')
    .getDownloadURL()
    .then((response) => response)
    .catch(() => null);
  return url;
};

export const getImageUrl = () => {};
