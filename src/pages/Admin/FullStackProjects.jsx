import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  rectIntersection,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  ExternalLink,
  Github,
  Trash2,
  Edit,
  Plus,
  X,
  Upload,
  Star,
  Calendar,
  Tag,
  Code,
  Lightbulb,
  Target,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-red-600">
          <h2>Something went wrong: {this.state.error?.message}</h2>
          <p>Please check the console for details and try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Enhanced Tooltip component
function Tooltip({ text, children, position = "top" }) {
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute ${positionClasses[position]} left-1/2 transform -translate-x-1/2 
        hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg px-3 py-2 
        whitespace-nowrap z-[100] shadow-lg border border-gray-700`}
      >
        {text}
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2
          border-4 border-transparent border-t-gray-900"
        ></div>
      </div>
    </div>
  );
}

// Enhanced Sortable Item
function SortableItem({ id, value, onChange, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <motion.span
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 
        text-gray-800 dark:text-white px-3 py-2 rounded-lg flex items-center gap-2 
        shadow-sm border border-blue-200 dark:border-gray-600 hover:shadow-md transition-all"
    >
      <GripVertical
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        size={16}
        {...listeners}
        {...attributes}
      />
      <input
        value={value}
        onChange={onChange}
        className="bg-transparent border-none text-sm flex-1 focus:outline-none 
          placeholder-gray-400 dark:placeholder-gray-500"
        placeholder="Enter value..."
      />
      <button
        type="button"
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 
          rounded-full p-1 transition-all"
      >
        <X size={14} />
      </button>
    </motion.span>
  );
}

// Enhanced Editable cell
function EditableCell({ value, onChange, placeholder = "Click to edit" }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || "");

  useEffect(() => {
    setVal(value || "");
  }, [value]);

  const handleBlur = () => {
    setEditing(false);
    onChange(val);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setVal(value || "");
      setEditing(false);
    }
  };

  return editing ? (
    <input
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
      className="border-2 border-blue-500 p-2 rounded-lg w-full dark:bg-gray-700 
        dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      placeholder={placeholder}
    />
  ) : (
    <div
      onClick={() => setEditing(true)}
      className="cursor-pointer p-2 rounded-lg hover:bg-gray-50 flex justify-between dark:hover:bg-gray-700 
        transition-all min-h-[2.5rem] items-center group"
    >
      <span className="text-gray-900 dark:text-white">
        {value || <span className="text-gray-400 italic">{placeholder}</span>}
      </span>
      <Edit size={16} className="ml-2 opacity-0 group-hover:opacity-50 transition-opacity" />
    </div>
  );
}

// Status Badge Component
function StatusBadge({ featured, createdAt }) {
  return (
    <div className="flex flex-col gap-1">
      {featured && (
        <span
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs 
          bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800 border border-amber-200"
        >
          <Star size={12} fill="currentColor" />
          Featured
        </span>
      )}
      {createdAt && createdAt.toDate && (
        <span
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs 
          bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          <Calendar size={12} />
          {new Date(createdAt.toDate()).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}

export default function FullStackProjects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [form, setForm] = useState({
    title: "FullStackProjects",
    description: "",
    category: "",
    tags: "",
    demoLink: "",
    codeLink: "",
    featured: false,
    features: [],
    technologies: [],
    challenges: "",
    outcome: "",
  });
  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const sensors = useSensors(useSensor(PointerSensor));

  // Get unique categories for filter
  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];

  // Check Cloudinary configuration
  useEffect(() => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      toast.error("Cloudinary configuration is missing. Please check environment variables.");
      console.error("Missing Cloudinary Config:", { CLOUD_NAME, UPLOAD_PRESET });
    }
  }, [CLOUD_NAME, UPLOAD_PRESET]);

  // Fetch projects from Firestore
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "projects"),
      (snap) => {
        const projectsData = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Filter only FullStackProjects
        const fullStackProjects = projectsData.filter(project => project.title === "FullStackProjects");
        setProjects(fullStackProjects);
        setFilteredProjects(fullStackProjects);
      },
      (error) => {
        console.error("Firestore listener error:", error);
        toast.error("Failed to fetch projects: " + error.message);
      }
    );
    return () => unsub();
  }, []);

  // Filter and search logic
  const filteredProjectsMemo = useMemo(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          (project.description?.toLowerCase()?.includes(searchTerm.toLowerCase()) || false) ||
          (project.category?.toLowerCase()?.includes(searchTerm.toLowerCase()) || false)
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((project) => project.category === filterCategory);
    }

    return filtered;
  }, [projects, searchTerm, filterCategory]);

  useEffect(() => {
    setFilteredProjects(filteredProjectsMemo);
  }, [filteredProjectsMemo]);

  const resetForm = () => {
    setForm({
      title: "FullStackProjects",
      description: "",
      category: "",
      tags: "",
      demoLink: "",
      codeLink: "",
      featured: false,
      features: [],
      technologies: [],
      challenges: "",
      outcome: "",
    });
    setFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setEditingProjectId(null);
    setFeatureInput("");
    setTechInput("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateField = async (id, field, value) => {
    try {
      await updateDoc(doc(db, "projects", id), { [field]: value });
      toast.success("Updated successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed: " + err.message, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#EF4444",
          color: "#fff",
        },
      });
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && f.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit", {
        icon: <AlertCircle size={16} />,
      });
      return;
    }
    setFile(f || null);
    if (f) setPreviewUrl(URL.createObjectURL(f));
    else setPreviewUrl(null);
  };

  const addFeature = () => {
    if (featureInput.trim() === "") return;
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()],
    }));
    setFeatureInput("");
  };

  const removeFeature = (idx) => {
    setForm((prev) => {
      const copy = [...prev.features];
      copy.splice(idx, 1);
      return { ...prev, features: copy };
    });
  };

  const addTechnology = () => {
    if (techInput.trim() === "") return;
    setForm((prev) => ({
      ...prev,
      technologies: [...prev.technologies, techInput.trim()],
    }));
    setTechInput("");
  };

  const removeTechnology = (idx) => {
    setForm((prev) => {
      const copy = [...prev.technologies];
      copy.splice(idx, 1);
      return { ...prev, technologies: copy };
    });
  };

  const handleDragEnd = (field) => (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setForm((prev) => {
      const items = [...prev[field]];
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      items.splice(oldIndex, 1);
      items.splice(newIndex, 0, active.id);
      return { ...prev, [field]: items };
    });
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (form.title !== "FullStackProjects") {
      toast.error("Only FullStackProjects is allowed", {
        icon: <AlertCircle size={16} />,
      });
      return;
    }
    if (!form.description) {
      toast.error("Description is required", {
        icon: <AlertCircle size={16} />,
      });
      return;
    }
    if (!file && !editingProjectId) {
      toast.error("Please select an image", {
        icon: <Upload size={16} />,
      });
      return;
    }
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      toast.error("Cloudinary configuration missing", {
        icon: <AlertCircle size={16} />,
      });
      return;
    }
    if (form.demoLink && !isValidUrl(form.demoLink)) {
      toast.error("Invalid Demo Link URL", {
        icon: <AlertCircle size={16} />,
      });
      return;
    }
    if (form.codeLink && !isValidUrl(form.codeLink)) {
      toast.error("Invalid Code Link URL", {
        icon: <AlertCircle size={16} />,
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    const toastId = toast.loading(editingProjectId ? "Updating project..." : "Creating project...", {
      style: {
        borderRadius: "10px",
      },
    });

    try {
      let imageUrl = form.imageUrl || "";
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        console.log("Uploading to Cloudinary with:", {
          cloudName: CLOUD_NAME,
          uploadPreset: UPLOAD_PRESET,
          file: file.name,
        });

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData,
          {
            onUploadProgress: (pe) => {
              if (pe.total) setUploadProgress(Math.round((pe.loaded * 100) / pe.total));
            },
          }
        );

        if (!res.data || (!res.data.secure_url && !res.data.url)) {
          throw new Error("Image upload failed: Invalid response from Cloudinary");
        }
        imageUrl = res.data.secure_url || res.data.url;
      }

      const projectData = {
        ...form,
        imageUrl,
        tags: Array.isArray(form.tags)
          ? form.tags
          : typeof form.tags === "string"
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      };

      if (editingProjectId) {
        await updateDoc(doc(db, "projects", editingProjectId), projectData);
        toast.success("Project updated successfully! 🎉", { id: toastId });
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
        toast.success("Project created successfully! 🚀", { id: toastId });
      }

      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error("Cloudinary Upload Error:", err.response?.data || err.message);
      toast.error(`Operation failed: ${err.response?.data?.error?.message || "Please try again."}`, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete the FullStackProjects? This action cannot be undone."))
      return;
    try {
      await deleteDoc(doc(db, "projects", id));
      toast.success("Project deleted successfully", {
        icon: "🗑️",
        style: {
          borderRadius: "10px",
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed: " + err.message);
    }
  };

  const handleEdit = (project) => {
    setForm({
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : project.tags || "",
    });
    setPreviewUrl(project.imageUrl);
    setEditingProjectId(project.id);
    setShowModal(true);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />

        <div className="container mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FullStackProjects
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your FullStackProjects</p>
            </div>

            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 
              hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl 
              shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus size={20} />
              {projects.length === 0 ? "Add FullStackProjects" : "Add More FullStackProjects"}
            </button>
          </div>

          {/* Search and Filter Section */}
          {projects.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search FullStackProjects details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    dark:bg-gray-700 dark:text-white transition-all"
                  />
                </div>

                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    dark:bg-gray-700 dark:text-white appearance-none transition-all"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Showing {filteredProjects.length} of 1 project</span>
              </div>
            </div>
          )}

          {/* Enhanced Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start overflow-auto z-[1000] p-4"
                onClick={() => setShowModal(false)}
              >
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 0, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-4xl mt-8 border border-gray-200 dark:border-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {editingProjectId ? "Edit FullStackProjects" : "Add FullStackProjects"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {editingProjectId ? "Update FullStackProjects details" : "Create the FullStackProjects"}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X size={24} className="text-gray-500" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <form onSubmit={handleAdd} className="mt-6 space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Tag size={16} />
                          Project Title *
                        </label>
                        <input
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          placeholder="FullStackProjects"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          dark:bg-gray-700 dark:text-white transition-all"
                          required
                          readOnly
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Tag size={16} />
                          Category
                        </label>
                        <input
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          placeholder="e.g., Web App, Mobile App, API"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <AlertCircle size={16} />
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the FullStackProjects in detail"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                        rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        dark:bg-gray-700 dark:text-white transition-all resize-none"
                        required
                      />
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <ExternalLink size={16} />
                          Demo Link
                        </label>
                        <input
                          name="demoLink"
                          value={form.demoLink}
                          onChange={handleChange}
                          placeholder="https://your-demo-link.com"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Github size={16} />
                          Code Link
                        </label>
                        <input
                          name="codeLink"
                          value={form.codeLink}
                          onChange={handleChange}
                          placeholder="https://github.com/username/repo"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          dark:bg-gray-700 dark:text-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Tag size={16} />
                        Tags
                      </label>
                      <input
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="React, Node.js, MongoDB (comma separated)"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                        rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        dark:bg-gray-700 dark:text-white transition-all"
                      />
                    </div>

                    {/* Features Section */}
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Lightbulb size={16} />
                        Key Features
                      </label>
                      <div className="flex gap-2">
                        <input
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          placeholder="Add a key feature"
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          dark:bg-gray-700 dark:text-white transition-all"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                        />
                        <button
                          type="button"
                          onClick={addFeature}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragEnd={handleDragEnd("features")}>
                        <SortableContext items={form.features} strategy={verticalListSortingStrategy}>
                          <div className="flex flex-wrap gap-2 min-h-[2rem]">
                            {form.features.map((f, idx) => (
                              <SortableItem
                                key={`${f}-${idx}`}
                                id={f}
                                value={f}
                                onChange={(e) => {
                                  const newVal = e.target.value;
                                  setForm((prev) => {
                                    const copy = [...prev.features];
                                    copy[idx] = newVal;
                                    return { ...prev, features: copy };
                                  });
                                }}
                                onRemove={() => removeFeature(idx)}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>

                    {/* Technologies Section */}
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Code size={16} />
                        Technologies Used
                      </label>
                      <div className="flex gap-2">
                        <input
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          placeholder="Add a technology"
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          dark:bg-gray-700 dark:text-white transition-all"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                        />
                        <button
                          type="button"
                          onClick={addTechnology}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragEnd={handleDragEnd("technologies")}>
                        <SortableContext items={form.technologies} strategy={verticalListSortingStrategy}>
                          <div className="flex flex-wrap gap-2 min-h-[2rem]">
                            {form.technologies.map((t, idx) => (
                              <SortableItem
                                key={`${t}-${idx}`}
                                id={t}
                                value={t}
                                onChange={(e) => {
                                  const newVal = e.target.value;
                                  setForm((prev) => {
                                    const copy = [...prev.technologies];
                                    copy[idx] = newVal;
                                    return { ...prev, technologies: copy };
                                  });
                                }}
                                onRemove={() => removeTechnology(idx)}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>

                    {/* Challenges and Outcome */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <AlertCircle size={16} />
                          Challenges Faced
                        </label>
                        <textarea
                          name="challenges"
                          value={form.challenges}
                          onChange={handleChange}
                          placeholder="Describe the main challenges you encountered"
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          dark:bg-gray-700 dark:text-white transition-all resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <Target size={16} />
                          Project Outcome
                        </label>
                        <textarea
                          name="outcome"
                          value={form.outcome}
                          onChange={handleChange}
                          placeholder="Describe the final outcome and results"
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          dark:bg-gray-700 dark:text-white transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Upload size={16} />
                        Project Image {!editingProjectId && "*"}
                      </label>
                      <div
                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 
                        rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                          disabled={isUploading}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                          {previewUrl ? (
                            <div className="relative">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full max-w-md h-48 object-cover rounded-lg shadow-lg"
                              />
                              <div
                                className="absolute inset-0 bg-black/20 rounded-lg flex items-center 
                                justify-center opacity-0 hover:opacity-100 transition-opacity"
                              >
                                <span className="text-white text-sm font-medium">Click to change</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Upload size={48} className="text-gray-400" />
                              <div>
                                <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                                <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
                              </div>
                            </>
                          )}
                        </label>
                      </div>

                      {isUploading && (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          />
                        </div>
                      )}
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={form.featured}
                        onChange={handleChange}
                        disabled={isUploading}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded 
                        focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                        focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="featured"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        <Star size={16} className={form.featured ? "text-yellow-500" : ""} />
                        Mark as Featured Project
                      </label>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        disabled={isUploading}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 
                        dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                        transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUploading}
                        className={`flex-1 px-6 py-3 rounded-lg text-white font-medium transition-all 
                        ${
                          isUploading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:scale-[1.02]"
                        }`}
                      >
                        {isUploading ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            {uploadProgress > 0 ? `Uploading ${uploadProgress}%` : "Processing..."}
                          </span>
                        ) : editingProjectId ? (
                          "Update Project"
                        ) : (
                          "Create Project"
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Projects Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              {filteredProjects.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Technologies
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Links
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredProjects.map((project, index) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {project.imageUrl && (
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            )}
                            <div>
                              <EditableCell
                                value={project.title}
                                onChange={(value) => handleUpdateField(project.id, "title", value)}
                                placeholder="FullStackProjects"
                              />
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <EditableCell
                            value={project.category}
                            onChange={(value) => handleUpdateField(project.id, "category", value)}
                            placeholder="Enter category"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge featured={project.featured} createdAt={project.createdAt} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {project.demoLink && (
                              <Tooltip text="View Demo">
                                <a
                                  href={project.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                  <ExternalLink size={20} className="text-blue-500" />
                                </a>
                              </Tooltip>
                            )}
                            {project.codeLink && (
                              <Tooltip text="View Code">
                                <a
                                  href={project.codeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                  <Github size={20} className="text-gray-600 dark:text-gray-300" />
                                </a>
                              </Tooltip>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Tooltip text="Edit Project">
                              <button
                                onClick={() => handleEdit(project)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <Edit size={20} className="text-blue-500" />
                              </button>
                            </Tooltip>
                            <Tooltip text="Delete Project">
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              >
                                <Trash2 size={20} className="text-red-500" />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-500">
                    <AlertCircle size={48} className="mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">FullStackProjects Not Found</h3>
                    <p className="text-sm">Coming soon! Add the FullStackProjects to get started.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}