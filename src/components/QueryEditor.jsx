import React, { useState } from "react";
import { Button, Input, Table, message } from "antd";

const QueryEditor = () => {
  const [query, setQuery] = useState(""); // Holds the user's query
  const [queryResult, setQueryResult] = useState(null); // Holds the query result
  const [loading, setLoading] = useState(false);

  const selectedContent = localStorage.getItem("selectedContent");

  // Handles query submission
  const handleRunQuery = async () => {
    if (!query) {
      message.error("Please enter a query.");
      return;
    }

    setLoading(true);

    try {
      let response;

      // Normalize the query input to handle SQL-like structure
      const normalizedQuery = query.trim().toLowerCase();

      // Handle count queries
      if (normalizedQuery.startsWith("select count(*)")) {
        response = await fetch(
          `https://c2m-backend.onrender.com/query/count/${selectedContent}`, // Count endpoint
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      // Handle select all queries with potential filters
      else if (normalizedQuery.startsWith("select *")) {
        // Extract filter if it exists
        const whereClause = normalizedQuery.match(/where (.+)/);
        const filter = whereClause ? whereClause[1].trim() : null;

        response = await fetch(
          `https://c2m-backend.onrender.com/query/${selectedContent}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filter,
            }),
          }
        );
      } else {
        message.error(
          "Invalid query. Please use 'SELECT *' or 'SELECT COUNT(*)' with optional filters."
        );
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to execute query: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.count !== undefined) {
        setQueryResult([{ count: result.count }]);
      } else {
        setQueryResult(result);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const columns =
    queryResult && queryResult.length > 0
      ? Object.keys(queryResult[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key,
        }))
      : [];

  return (
    <div className="h-screen p-6">
      <h1 className="text-4xl font-bold">Query Editor 🛠️</h1>
      <p className="py-4 text-base font-medium text-zinc-500">
        Run SQL-like queries against the content stored in the system. Selected
        content: <strong>{selectedContent}</strong>
      </p>

      <Input.TextArea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={6}
        placeholder="Enter your query here (e.g., SELECT * FROM users WHERE name = 'jayanth')"
        className="mb-4"
      />

      <Button
        type="primary"
        onClick={handleRunQuery}
        loading={loading}
        className="mb-4"
      >
        Run Query
      </Button>

      {queryResult && (
        <Table
          columns={columns}
          dataSource={queryResult}
          rowKey={(record, index) => index}
          pagination={false}
        />
      )}
    </div>
  );
};

export default QueryEditor;
