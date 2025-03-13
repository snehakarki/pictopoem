import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import PoemGenerator from "../components/PoemGenerator";
import PoemDisplay from "../components/PoemDisplay";

const Home = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [poem, setPoem] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📸 ➝ ✍️ Picture to Haiku</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <ImageUpload setImage={setImage} setPreview={setPreview} />
        
        {preview && <img src={preview} alt="Uploaded" className="mb-4 rounded-lg w-full border" />}
        
        <PoemGenerator image={image} setPoem={setPoem} />
        
        <PoemDisplay poem={poem} />
      </div>
    </div>
  );
};

export default Home;
