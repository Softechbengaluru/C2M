import React, { useEffect, useState } from "react";
import { Table, Button, Input, Form, Space, Modal } from "antd";
import { FaEdit } from "react-icons/fa";

const Data = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({});
  const [fields, setFields] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const [form] = Form.useForm();

  const selectedContent = localStorage.getItem("selectedContent");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://c2m-backend.onrender.com/items/content/${selectedContent}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();
        setDataList(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedContent]);

  useEffect(() => {
    const fetchDynamicFields = async () => {
      try {
        const response = await fetch(
          `https://c2m-backend.onrender.com/fields/${selectedContent}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch fields: ${response.statusText}`);
        }

        const fieldsData = await response.json();

        const initialNewItem = {};
        fieldsData.forEach((field) => {
          initialNewItem[field.name] = "";
        });
        setNewItem(initialNewItem);
        setFields(fieldsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDynamicFields();
  }, [selectedContent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async (values) => {
    try {
      const response = await fetch(
        `https://c2m-backend.onrender.com/items/${selectedContent}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: [values] }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new item");
      }

      const updatedResponse = await fetch(
        `https://c2m-backend.onrender.com/items/content/${selectedContent}`
      );

      const updatedResult = await updatedResponse.json();
      setDataList(updatedResult);

      form.resetFields();
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item._id);
    setEditedItem(item);
    form.setFieldsValue(item);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `https://c2m-backend.onrender.com/items/${selectedContent}/${editingItem}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedItem),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedResponse = await fetch(
        `https://c2m-backend.onrender.com/items/content/${selectedContent}`
      );
      const updatedResult = await updatedResponse.json();
      setDataList(updatedResult);
      setEditingItem(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    ...fields.map((field) => ({
      title: field.name,
      dataIndex: field.name,
      key: field.name,
      render: (text, record) =>
        editingItem === record._id ? (
          <Input
            name={field.name}
            value={editedItem[field.name] || ""}
            onChange={handleEditInputChange}
          />
        ) : (
          text
        ),
    })),
    {
      title: "Actions",
      key: "actions",
      render: (text, record) =>
        editingItem === record._id ? (
          <Button type="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        ) : (
          <FaEdit
            className="cursor-pointer text-blue-600 hover:text-blue-700"
            onClick={() => handleEditClick(record)}
          />
        ),
    },
  ];

  return (
    <div className="h-screen p-6">
      <h1 className="text-4xl font-bold">Data ℹ️</h1>
      <p className="py-4 text-base font-medium text-zinc-500">
        This page contains Data about our services and how to use the
        application effectively.
      </p>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {dataList.length > 0 ? (
        <Table columns={columns} dataSource={dataList} rowKey="_id" />
      ) : (
        <p>No data available.</p>
      )}

      <Button onClick={() => setShowForm(true)} type="primary" className="mt-4">
        Add New Item
      </Button>

      <Modal
        title="Add New Item"
        visible={showForm}
        onCancel={() => setShowForm(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddItem}>
          {fields.map((field) => (
            <Form.Item
              key={field.name}
              label={field.name}
              name={field.name}
              rules={[
                { required: true, message: `Please input ${field.name}` },
              ]}
            >
              <Input
                name={field.name}
                value={newItem[field.name] || ""}
                onChange={handleInputChange}
              />
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Item
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Data;
