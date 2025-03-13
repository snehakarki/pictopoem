const PoemDisplay = ({ poem }) => {
    if (!poem) return null;
  
    return (
      <div className="mt-4 p-4 bg-gray-200 rounded-lg text-gray-800 shadow">
        <h2 className="text-lg font-semibold">Generated Haiku:</h2>
        <p className="italic">{poem}</p>
      </div>
    );
  };
  
  export default PoemDisplay;
  