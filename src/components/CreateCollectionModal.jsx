import React, { useState } from "react";
import CustomModal from "./CustomModal";

const CreateCollectionModal = ({ isOpen, onClose }) => {
  const [collectionName, setCollectionName] = useState("");
  const [fields, setFields] = useState([{ name: "", type: "String" }]);

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "String" }]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleSubmit = async () => {
    const payload = {
      collectionName,
      fields: fields.map((field) => ({ name: field.name, type: field.type })),
    };

    try {
      const response = await fetch("http://localhost:3000/create-collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      onClose();
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  return (
    <CustomModal
      trigger={<button></button>}
      title="Create Collection"
      titleStyles="px-4 py-3 text-medium"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-4">
        <div>
          <label>Collection Name:</label>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Enter collection name"
          />
        </div>
        {fields.map((field, index) => (
          <div key={index} className="flex items-center mt-2">
            <input
              type="text"
              value={field.name}
              onChange={(e) => handleFieldChange(index, "name", e.target.value)}
              className="border border-gray-300 p-2 rounded w-1/2"
              placeholder="Field Name"
            />
            <select
              value={field.type}
              onChange={(e) => handleFieldChange(index, "type", e.target.value)}
              className="border border-gray-300 p-2 rounded w-1/2 ml-2"
            >
              <option value="String">String</option>
              <option value="Number">Number</option>
            </select>
          </div>
        ))}
        <button
          onClick={handleAddField}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Add Field
        </button>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateCollectionModal;
