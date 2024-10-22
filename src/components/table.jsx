import React, { useEffect, useState } from "react";

const TableStructure = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const savedContent = localStorage.getItem("selectedContent");
    setSelectedContent(savedContent);

    if (!savedContent) {
      setError("Please select a content type.");
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://c2m-backend.onrender.com/items/${savedContent}`
        );

        if (!response.ok) {
          const data = await response.json();
          if (data.message) {
            setMessage(data.message);
          }
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.length === 0) {
          setMessage("No items found for this content type.");
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="h-screen p-6">
      <h1 className="text-4xl font-bold text-center">Table Structure 📊</h1>
      <p className="py-4 text-base font-medium text-zinc-500 text-center">
        View the structure of your database tables.
      </p>
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-center">Table Structure</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {message && !loading && (
          <p className="text-yellow-500 text-center">{message}</p>
        )}

        {!message && products.length > 0 && (
          <table className="mt-4 w-full border text-center">
            <thead>
              <tr className="border-b">
                {Object.keys(products[0]).map(
                  (key) =>
                    key !== "_id" &&
                    key !== "__v" && (
                      <th key={key} className="py-2 px-4">
                        {key}
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  {Object.entries(product).map(
                    ([key, value]) =>
                      key !== "_id" &&
                      key !== "__v" && (
                        <td key={key} className="py-2 px-4">
                          {value}
                        </td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableStructure;
