const multer = require('multer');
const path = require('path');

// Temporary storage before sending to Supabase or processing
const storage = multer.memoryStorage(); 

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

module.exports = upload;