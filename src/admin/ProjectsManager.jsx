import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addProject = async () => {
    if (!title) return;
    await addDoc(collection(db, "projects"), { title });
    setTitle("");
    fetchProjects();
  };

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  };

  return (
    <div>
      <h2>Projects</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
      />
      <button onClick={addProject}>Add</button>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.title} <button onClick={() => deleteProject(p.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
