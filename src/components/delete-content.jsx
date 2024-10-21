import React, { useEffect, useState } from "react";

const DeleteContent = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch collections from the server
  const fetchContent = async () => {
    try {
      const response = await fetch("http://localhost:3000/collections");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched collections:", data); // Log the fetched data
      setContentList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleDelete = async (content) => {
    try {
      const trimmedContent = content.trim(); // Trim whitespace
      const response = await fetch(
        `http://localhost:3000/collections/${trimmedContent}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Fetch JSON error details
        console.error("Error details:", errorData); // Log error details
        throw new Error(errorData.error || "Failed to delete content");
      }

      const successData = await response.json(); // Expect success JSON response
      console.log(successData.message); // Log success message

      // Refetch the content list after deletion
      fetchContent();
      console.log("Content deleted!");
    } catch (err) {
      setError(err.message); // Handle error
    }
  };

  return (
    <div className="h-screen p-6">
      <h1 className="text-4xl font-bold">Delete Content 🗑️</h1>
      <p className="py-4 text-base font-medium text-zinc-500">
        Select the content you want to delete.
      </p>
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold">Content List</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="mt-4">
          {contentList.map((content, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              {content}
              <button
                className="text-red-500 hover:text-red-700 transition duration-200"
                onClick={() => handleDelete(content)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeleteContent;
