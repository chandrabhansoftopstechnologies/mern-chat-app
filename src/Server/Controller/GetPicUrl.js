const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { storage } = require("../../Firebase/Firebase");

const GetPicUrl = (image) => {
  //@ts-ignore
  console.log(image);
  const storageRef = ref(storage, `images/${image.name}`);
  //@ts-ignore

  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      //TODO:Handle Error
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log(downloadURL);
        return downloadURL;
      });
    }
  );
};

module.exports = GetPicUrl;
