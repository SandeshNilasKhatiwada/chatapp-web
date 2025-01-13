const fs = require('fs');
exports.deleteFile = (filename) => {
  try {
    fs.unlink(`uploads/${filename}`, (error) => {
      if (error) {
        throw error;
      }
      console.log(`file deleted successfully: ${filename}`);
    });
  } catch (error) {
    console.log(error);
  }
};
