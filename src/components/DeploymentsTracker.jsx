import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Table } from "../ui/Table";
import axios from "axios"; // Now fetch data from local server

export default function DeploymentsTracker() {
  const [formData, setFormData] = useState({
    ticketId: "",
    cafId: "",
    subject: "",
    project: "",
    date: "",
  });
  const [deployments, setDeployments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeployments();
  }, []);

  const fetchDeployments = async () => {
    setError(null);
    try {
      const response = await axios.get("http://localhost:5001/deployments");
      setDeployments(response.data);
    } catch (err) {
      setError("Failed to fetch deployments.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post("http://localhost:5000/deployments", formData);
      fetchDeployments();
      setFormData({ ticketId: "", cafId: "", subject: "", project: "", date: "" });
    } catch (err) {
      setError("Failed to save deployment.");
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Add Deployment</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <Input name="ticketId" value={formData.ticketId} onChange={handleChange} placeholder="Ticket ID" required />
            <Input name="cafId" value={formData.cafId} onChange={handleChange} placeholder="CAF ID" required />
            <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="Deployment Subject" required />
            <Input name="project" value={formData.project} onChange={handleChange} placeholder="Project" required />
            <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <Button type="submit" className="col-span-2">Save Deployment</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold my-4">Deployment History</h2>
      <Table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>CAF ID</th>
            <th>Subject</th>
            <th>Project</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {deployments.map((deploy, index) => (
            <tr key={index}>
              <td>{deploy.ticketId}</td>
              <td>{deploy.cafId}</td>
              <td>{deploy.subject}</td>
              <td>{deploy.project}</td>
              <td>{deploy.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
