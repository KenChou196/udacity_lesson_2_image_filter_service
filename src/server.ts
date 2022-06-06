import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
import { PATH } from "./util/const";
interface Query {
  image_url: string;
}
(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get(PATH.HOME, async (req, res) => {
    try {
      res.send("try GET /filteredimage?image_url={{your_image_url}}");
    } catch (error) {
      res.status(400).send({
        message: "oops something went wrong",
      });
    }
  });

  // router filteredimage
  app.get(PATH.FILTER_IMAGE, async (req: Request, res: Response) => {
    try {
      const { image_url } = req.query as unknown as Query;
      // 1. validate the image_url query
      if (!image_url || typeof image_url !== "string") {
        res.status(400).send({
          message: "image url not valid",
        });
      }
      // 2. call filterImageFromURL(image_url) to filter the image
      const file_path = await filterImageFromURL(image_url);
      // 3. send the resulting file in the response
      res.sendFile(file_path, function (error) {
        if (error) {
          return res.status(401).end();
        } else {
          // 4. deletes any files on the server on finish of the response
          deleteLocalFiles([file_path]);
          return res.status(200).end();
        }
      });
    } catch (error) {
      res.status(400).send({
        message: "oops something went wrong",
      });
    }
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
