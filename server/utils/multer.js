const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage engine with dynamic folder based on route parameter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Get the folder name from the route (e.g., /chats/:id or /profile)
    let folderName = '';

    // Determine the folder based on the route
    if (req.originalUrl.includes('/chats')) {
      folderName = 'chats';
    } else if (req.originalUrl.includes('/user')) {
      folderName = 'users';
    } else {
      folderName = 'uploads'; // Default to 'uploads' if no match
    }

    // Ensure the folder exists, create it if necessary
    const folderPath = path.join(__dirname, '../uploads', folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Set the folder path where files will be saved
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    // Save files with a unique name (timestamp + original extension)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Optional: limit file size to 10MB
});

module.exports = upload;
