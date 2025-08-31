import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Menu, BarChart2, PieChart, LineChart } from "lucide-react";
import {
  BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart as RePieChart, Pie, Cell,
  LineChart as ReLineChart, Line
} from "recharts";

export default function AdminDashboard() {
  const [projectsData, setProjectsData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch Projects from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const projSnap = await getDocs(collection(db, "projects"));
      const projList = projSnap.docs.map(doc => doc.data());
      setProjectsData(projList);

      const skillsSnap = await getDocs(collection(db, "skills"));
      setSkillsData(skillsSnap.docs.map(doc => doc.data()));

      const expSnap = await getDocs(collection(db, "experience"));
      setExperienceData(expSnap.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  // Prepare chart data
  const projectChartData = Object.values(
    projectsData.reduce((acc, proj) => {
      const year = proj.year || "Unknown";
      acc[year] = acc[year] || { year, count: 0 };
      acc[year].count++;
      return acc;
    }, {})
  );

  const skillChartData = skillsData.map(skill => ({
    name: skill.name,
    value: skill.level || 1
  }));

  const expChartData = experienceData.map(exp => ({
    year: exp.year,
    duration: exp.duration || 0
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 p-4 w-64 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Admin Menu</h2>
        <ul className="space-y-2">
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Dashboard</li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Projects</li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Skills</li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">Experience</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-4">
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="text-gray-900 dark:text-white" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Bar Chart - Projects */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><BarChart2 size={20}/> Projects by Year</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ReBarChart data={projectChartData}>
                <XAxis dataKey="year" stroke="#ccc" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Skills */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><PieChart size={20}/> Skills Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie data={skillChartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {skillChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart - Experience */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><LineChart size={20}/> Experience Timeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ReLineChart data={expChartData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
