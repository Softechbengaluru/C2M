import React, { useState } from "react";

const CreateContent = () => {
  const [collectionName, setCollectionName] = useState("");
  const [fields, setFields] = useState([{ name: "", type: "String" }]);

  const handleCollectionNameChange = (e) => {
    setCollectionName(e.target.value);
  };

  const handleFieldChange = (index, e) => {
    const newFields = [...fields];
    newFields[index].name = e.target.value;
    setFields(newFields);
  };

  const addField = () => {
    setFields([...fields, { name: "", type: "String" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      collectionName,
      fields: fields.map((field) => ({
        name: field.name,
        type: field.type,
      })),
    };

    console.log("Payload to be sent:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(
        "https://c2m-backend.onrender.com/create-collection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Server response:", responseData);

      alert("Collection created successfully!");
      setCollectionName("");
      setFields([{ name: "", type: "String" }]);
    } catch (error) {
      console.error("Error creating collection:", error);
      alert("Failed to create collection.");
    }
  };

  return (
    <div className="h-screen p-6">
      <h1 className="text-4xl font-bold">Create Content 📄</h1>
      <p className="py-4 text-base font-medium text-zinc-500">
        Here you can create new content to share with the world. Fill out the
        form below to get started.
      </p>
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-sm">
        <label className="block mb-4">
          <span className="text-gray-700">Collection Name</span>
          <input
            type="text"
            value={collectionName}
            onChange={handleCollectionNameChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter your collection name"
            required
          />
        </label>

        <h2 className="text-lg font-semibold mb-2">Fields</h2>
        {fields.map((field, index) => (
          <div key={index} className="flex mb-4">
            <input
              type="text"
              value={field.name}
              onChange={(e) => handleFieldChange(index, e)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter field name"
              required
            />
            <select
              value={field.type}
              className="mt-1 ml-2 border border-gray-300 rounded-md shadow-sm p-2"
              onChange={(e) => {
                const newFields = [...fields];
                newFields[index].type = e.target.value;
                setFields(newFields);
              }}
            >
              <option value="String">String</option>
              <option value="Number">Number</option>
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 mb-4"
        >
          Add Field
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Create Collection
        </button>
      </form>
    </div>
  );
};

export default CreateContent;
