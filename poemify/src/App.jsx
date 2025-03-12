import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true, 
});

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [poem, setPoem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const generatePoem = async () => {
    if (!image) return alert("Please upload an image!");

    setLoading(true);
    setPoem("");

    try {
      const base64Image = await convertToBase64(image);

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Generate a Haiku (5-7-5 syllables) inspired by this image.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Describe this image in a Haiku format (5-7-5 syllables)." },
              { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } },
            ],
          },
        ],
        max_tokens: 30, // Limit response to Haiku length
      });

      setPoem(response.choices[0].message.content);
    } catch (error) {
      console.error("Error generating Haiku:", error);
      setPoem("Failed to generate a Haiku. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📸 ➝ ✍️ Picture to Haiku</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 w-full border p-2" />
        {preview && <img src={preview} alt="Uploaded" className="mb-4 rounded-lg w-full border" />}

        <button 
          onClick={generatePoem} 
          disabled={loading} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Generating..." : "Generate Haiku"}
        </button>

        {poem && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg text-gray-800 shadow">
            <h2 className="text-lg font-semibold">Generated Haiku:</h2>
            <p className="italic">{poem}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
