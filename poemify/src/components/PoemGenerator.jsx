import { useState } from "react";
import OpenAI from "openai";
import convertToBase64 from "../utils/convertToBase.js";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true, 
});

const PoemGenerator = ({ image, setPoem }) => {
  const [loading, setLoading] = useState(false);

  const generatePoem = async () => {
    if (!image) return alert("Please upload an image!");
    setLoading(true);
    setPoem("");

    try {
      const base64Image = await convertToBase64(image);

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Generate a Haiku (5-7-5 syllables) inspired by this image." },
          { role: "user", content: [
              { type: "text", text: "Describe this image in a Haiku format (5-7-5 syllables)." },
              { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } }
          ]},
        ],
        max_tokens: 30,
      });

      setPoem(response.choices[0].message.content);
    } catch (error) {
      console.error("Error generating Haiku:", error);
      setPoem("Failed to generate a Haiku. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={generatePoem} 
      disabled={loading} 
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      {loading ? "Generating..." : "Generate Haiku"}
    </button>
  );
};

export default PoemGenerator;
