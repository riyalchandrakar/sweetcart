const ImageUpload = ({ value, onChange }) => {
  return (
    <input
      placeholder="Image URL"
      className="border p-2 w-full rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};

export default ImageUpload;
