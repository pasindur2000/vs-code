const express = require("express");
const multer = require("multer");
const THREE = require("three");
const { OBJLoader } = require("three-stdlib");
const path = require("path");

const app = express();
const port = 3000;

const upload = multer({ dest: "uploads/" });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post("/upload", upload.single("image"), (req, res) => {
  const objLoader = new OBJLoader();
  const modelPath = path.resolve(__dirname, "models/apple2.obj");
  objLoader.load(modelPath, (object) => {
    const texture = new THREE.TextureLoader().load(req.file.path);

    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
      }
    });

    // Export the model
    // This is a complex task that depends on your specific requirements
    // You might need to use a library or write custom code to export the model to a file or convert it to a format that can be sent in a HTTP response
  });

  res.send("Image received and applied to model.");
});
