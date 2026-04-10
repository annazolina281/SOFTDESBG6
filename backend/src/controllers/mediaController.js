const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image provided" });

    // 1. Upload to Supabase (Your existing logic)
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const { data, error } = await supabase.storage
      .from('captures')
      .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

    if (error) throw error;

    // Get the Public URL
    const { data: urlData } = supabase.storage.from('captures').getPublicUrl(fileName);
    const imageUrl = urlData.publicUrl;

    // 2. AI ANALYSIS PHASE
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // We send the image buffer directly to the AI
    const prompt = "Analyze this construction worker. Is the person wearing a safety helmet? Respond with a JSON object: { 'helmet': true/false, 'status': 'Safe' or 'Danger' }";
    
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: req.file.buffer.toString("base64"), mimeType: req.file.mimetype } }
    ]);

    const aiResponse = JSON.parse(result.response.text());

    // 3. RETURN EVERYTHING TO FRONTEND
    res.status(200).json({
      message: "Analysis Complete",
      url: imageUrl,
      analysis: aiResponse // This tells Albano if it's Safe or Danger
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};