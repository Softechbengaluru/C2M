import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const ShowContent = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://c2m-backend.onrender.com/collections"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContentList(data);

        console.log("Fetched content list:", data); // Debugging: Log fetched data

        // Check local storage for previously selected content
        const savedContent = localStorage.getItem("selectedContent");
        console.log("Saved content from localStorage:", savedContent); // Debugging: Log saved content from localStorage

        if (savedContent) {
          setSelectedContent(savedContent);
        } else if (data.length > 0) {
          // If no content is selected, set the first one as default
          const firstContent = data[0];
          console.log("Setting first content as selected:", firstContent); // Debugging: Log first content
          setSelectedContent(firstContent);
          localStorage.setItem("selectedContent", firstContent);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleCheckboxChange = (content) => {
    // Debugging: Log current selected content and new content being selected
    console.log("Current selected content:", selectedContent);
    console.log("Content being selected:", content);

    // Only change selected content if the checkbox is checked
    if (selectedContent === content) {
      return; // Prevent deselecting if it's already selected
    }

    setSelectedContent(content);
    console.log("New selected content saved to state:", content); // Debugging: Log content before saving to localStorage

    localStorage.setItem("selectedContent", content);
    console.log(
      "Content saved to localStorage:",
      localStorage.getItem("selectedContent")
    ); // Debugging: Verify saved content in localStorage
  };

  return (
    <div className="h-screen p-6">
      <h1 className="text-4xl font-bold">Show Content 📜</h1>
      <p className="py-4 text-base font-medium text-zinc-500">
        Here you can see all your created content.
      </p>
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold">Content List</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="mt-4">
          {contentList.length > 0 ? (
            contentList.map((content, index) => (
              <li key={index} className="border-b py-2 flex items-center">
                <FontAwesomeIcon icon={faTable} className="mr-2" />
                {content}
                <input
                  type="checkbox"
                  checked={selectedContent === content}
                  onChange={() => handleCheckboxChange(content)}
                  className="ml-2"
                />
              </li>
            ))
          ) : (
            <li className="py-2">No content available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ShowContent;
