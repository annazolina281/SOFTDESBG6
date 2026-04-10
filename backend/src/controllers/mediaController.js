const supabase = require('../config/supabase');

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const fileName = `webcam_${Date.now()}.png`;
        const fileBuffer = req.file.buffer;

        // 1. Upload to Supabase Storage Bucket 'captures'
        const { data, error: uploadError } = await supabase.storage
            .from('captures')
            .upload(fileName, fileBuffer, { contentType: 'image/png' });

        if (uploadError) throw uploadError;

        // 2. Get the Public URL so the frontend can display the image
        const { data: urlData } = supabase.storage
            .from('captures')
            .getPublicUrl(fileName);

        // 3. Log the entry in your 'media_logs' table
        const { error: dbError } = await supabase
            .from('media_logs')
            .insert([{ file_url: urlData.publicUrl, type: 'webcam' }]);

        if (dbError) throw dbError;

        res.status(200).json({ 
            message: 'Upload successful!', 
            url: urlData.publicUrl 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};