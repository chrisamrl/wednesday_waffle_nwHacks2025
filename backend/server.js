

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const cors = require('cors');



const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json({limit: '50mb'}))




const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('video'), (req, res) => {
  const file = req.file;

  console.log(file);
  if (!file) return res.status(400).send('No file uploaded.');

  const targetPath = path.join(__dirname, 'uploads', file.originalname);
  console.log(targetPath)
  fs.rename(file.path, targetPath, (err) => {
    if (err) return res.status(500).send('Error saving file.');
    res.send('File uploaded successfully!');
  });
});

app.get('/', (req, res) => {
  return res.json("HAHA")
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Replace with your IP
});




