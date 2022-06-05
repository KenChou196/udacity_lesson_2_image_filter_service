import fs from "fs";
import Jimp = require("jimp");
import { OUTPUT_PATH } from "./const";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const outpath = OUTPUT_PATH + Math.floor(Math.random() * 2000) + ".jpg";
      Jimp.read(inputURL)
      .then(photo => {
        photo.resize(256, 256)
        photo.quality(60)
        photo.greyscale()
        photo.write(__dirname + outpath, () => {
          // return path to delete when progress done
          resolve(__dirname + outpath);
        });
      })
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
    console.log('delete file complete')
  }
}
