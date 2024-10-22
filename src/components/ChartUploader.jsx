import React, { useState } from "react";
import { Button, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ChartUploader = () => {
  const [loading, setLoading] = useState(false);
  const [chartImage, setChartImage] = useState(null);
  const handleFileUpload = async (file) => {
    console.log("File selected for upload:", file.name);
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://c2m-python.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.statusText} - ${errorText}`);
      }

      const jsonResponse = await response.json();
      const base64Data = jsonResponse.image;
      setChartImage(`data:image/png;base64,${base64Data}`);
    } catch (error) {
      console.error("Error during file upload:", error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
    return false;
  };

  return (
    <div className="h-screen p-6">
      <h1 className="text-4xl font-bold">Chart Uploader 📊</h1>
      <p className="py-4 text-base font-medium text-zinc-500">
        Upload your data file, and we will generate a chart for you!
      </p>
      <Upload
        beforeUpload={handleFileUpload}
        showUploadList={false}
        accept=".csv,.xlsx"
        className="mb-4"
      >
        <Button icon={<UploadOutlined />} type="primary" loading={loading}>
          Upload File
        </Button>
      </Upload>
      {loading && (
        <div className="text-center">
          <Spin size="large" />
          <p>Generating chart...</p>
        </div>
      )}
      {chartImage && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold">Generated Chart:</h3>
          <img
            src={chartImage}
            alt="Generated Chart"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default ChartUploader;
