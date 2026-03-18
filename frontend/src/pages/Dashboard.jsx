import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Avatar, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import API from "../api";

const Dashboard = () => {
  const { userData, logout, loading } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 Fetch tasks with debug logging
  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks...");
      const res = await API.get("/tasks");
      console.log("Tasks API response:", res.data); // debug
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response || err);
      message.error("Failed to fetch tasks. Check console.");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
      message.success("Task added!");
    } catch (err) {
      console.error("Error adding task:", err.response || err);
      message.error("Failed to add task. Check console.");
    }
  };

  const markDone = async (id) => {
    try {
      await API.patch(`/tasks/${id}/done`);
      fetchTasks();
      message.success("Task marked as done!");
    } catch (err) {
      console.error("Error marking task done:", err.response || err);
      message.error("Failed to update task. Check console.");
    }
  };

  useEffect(() => {
    if (userData) fetchTasks(); // only fetch after userData is ready
  }, [userData]);

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return <Typography.Text>Loading...</Typography.Text>;
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Profile Section */}
      <Card style={{ flex: 1 }}>
        {userData ? (
          <div style={{ textAlign: "center" }}>
            <Avatar size={120} icon={<UserOutlined />} />
            <Typography.Title level={3}>{userData.name}</Typography.Title>
            <Typography.Text>{userData.email}</Typography.Text>
            <br />
            <Typography.Text>Role: {userData.role}</Typography.Text>
            <br />
            <br />
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Typography.Text type="danger">User data not available</Typography.Text>
        )}
      </Card>

      {/* Todo Section */}
      <Card title="My Tasks" style={{ flex: 2 }}>
        <form onSubmit={addTask} style={{ marginBottom: "15px" }}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </form>

        {tasks.length === 0 ? (
          <Typography.Text>No tasks found.</Typography.Text>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} style={{ marginBottom: "10px" }}>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <Button onClick={() => markDone(task.id)}>Done</Button>
            </Card>
          ))
        )}
      </Card>
    </div>
  );
};

export default Dashboard;