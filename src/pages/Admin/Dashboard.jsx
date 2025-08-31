// import React, { useEffect, useState } from "react";
// import StatCard from "../../admin/components/StatCard";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   BarChart, Bar, ResponsiveContainer
// } from "recharts";
// import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
// import { db } from "../../firebase";

// export default function Dashboard() {
//   const [projectsCount, setProjectsCount] = useState(0);
//   const [skillsCount, setSkillsCount] = useState(0);
//   const [expCount, setExpCount] = useState(0);
//   const [recentProjects, setRecentProjects] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   // realtime counts
//   useEffect(() => {
//     const unsubP = onSnapshot(collection(db, "projects"), (snap)=> setProjectsCount(snap.size));
//     const unsubS = onSnapshot(collection(db, "skills"), (snap)=> setSkillsCount(snap.size));
//     const unsubE = onSnapshot(collection(db, "experience"), (snap)=> setExpCount(snap.size));
//     return () => { unsubP(); unsubS(); unsubE(); };
//   }, []);

//   // recent projects + mock chart data built from createdAt
//   useEffect(() => {
//     const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
//     const unsub = onSnapshot(q, (snap) => {
//       const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//       setRecentProjects(docs.slice(0,6));
//       // build simple month aggregation for chart (client-side)
//       const months = {};
//       docs.forEach(d => {
//         const date = d.createdAt?.toDate ? d.createdAt.toDate() : d.createdAt ? new Date(d.createdAt) : new Date();
//         const key = date.toLocaleString("default", { month: "short", year: "numeric" });
//         months[key] = (months[key] || 0) + 1;
//       });
//       const data = Object.keys(months).slice(0,6).reverse().map(k => ({ name: k, projects: months[k], skills: Math.floor(Math.random()*5)+1 }));
//       setChartData(data.length ? data : [
//         { name: "Jan", projects: 2, skills: 5 },
//         { name: "Feb", projects: 3, skills: 6 },
//         { name: "Mar", projects: 4, skills: 7 },
//       ]);
//     });
//     return () => unsub();
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <StatCard title="Projects" value={projectsCount} />
//         <StatCard title="Skills" value={skillsCount} />
//         <StatCard title="Experience entries" value={expCount} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//           <h3 className="font-semibold mb-3">Projects Over Time</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="projects" stroke="#2563eb" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//           <h3 className="font-semibold mb-3">Skills Growth (sample)</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="skills" fill="#16a34a" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
//         <h3 className="font-semibold mb-3">Recent Projects</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//           {recentProjects.length ? recentProjects.map(p=>(
//             <div key={p.id} className="p-2 border rounded">
//               <div className="text-sm font-medium">{p.title}</div>
//               <div className="text-xs text-gray-500">{p.description?.slice(0,60)}</div>
//             </div>
//           )) : <div className="text-gray-500">No recent projects</div>}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   BarChart, Bar, ResponsiveContainer , RadialBarChart, RadialBar, LabelList
// } from "recharts";
// import { AlertCircle, RefreshCw, TrendingUp, Code, Briefcase } from "lucide-react";
// // Custom Alert component (replace with your actual Alert component)
// const Alert = ({ variant, children, className = "" }) => (
//   <div className={`rounded-lg border p-4 ${
//     variant === 'destructive'
//       ? 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-50'
//       : 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-50'
//   } ${className}`}>
//     <div className="flex items-start gap-2">
//       {children}
//     </div>
//   </div>
// );

// const AlertDescription = ({ children, className = "" }) => (
//   <div className={`text-sm ${className}`}>
//     {children}
//   </div>
// );

// // Mock StatCard component with shadcn styling
// const StatCard = ({ title, value, icon: Icon, isLoading, error }) => (
//   <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
//     <div className="flex items-center justify-between space-y-0 pb-2">
//       <h3 className="tracking-tight text-sm font-medium">{title}</h3>
//       {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
//     </div>
//     <div className="space-y-1">
//       {error ? (
//         <div className="text-2xl font-bold text-destructive">Error</div>
//       ) : isLoading ? (
//         <div className="text-2xl font-bold text-muted-foreground">...</div>
//       ) : (
//         <div className="text-2xl font-bold">{value}</div>
//       )}
//     </div>
//   </div>
// );

// // Error boundary component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error('Dashboard Error:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="p-6">
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>
//               Something went wrong loading the dashboard. Please refresh the page.
//               <button
//                 onClick={() => window.location.reload()}
//                 className="ml-2 underline hover:no-underline"
//               >
//                 Refresh
//               </button>
//             </AlertDescription>
//           </Alert>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// // Custom hook for error handling
// const useErrorHandler = () => {
//   const [errors, setErrors] = useState({});

//   const setError = (key, error) => {
//     console.error(`Error in ${key}:`, error);
//     setErrors(prev => ({ ...prev, [key]: error.message || 'An error occurred' }));
//   };

//   const clearError = (key) => {
//     setErrors(prev => {
//       const newErrors = { ...prev };
//       delete newErrors[key];
//       return newErrors;
//     });
//   };

//   const clearAllErrors = () => setErrors({});

//   return { errors, setError, clearError, clearAllErrors };
// };

// // Loading states hook
// const useLoadingStates = () => {
//   const [loading, setLoadingState] = useState({});

//   const setLoading = (key, isLoading) => {
//     setLoadingState(prev => ({ ...prev, [key]: isLoading }));
//   };

//   return { loading, setLoading };
// };

// export default function Dashboard() {
//   // State management
//   const [projectsCount, setProjectsCount] = useState(0);
//   const [skillsCount, setSkillsCount] = useState(0);
//   const [expCount, setExpCount] = useState(0);
//   const [recentProjects, setRecentProjects] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   // Error and loading management
//   const { errors, setError, clearError } = useErrorHandler();
//   const { loading, setLoading } = useLoadingStates();

//   // Mock Firebase functions (replace with your actual Firebase imports)
//   const mockOnSnapshot = (collectionRef, callback, errorCallback) => {
//     try {
//       setLoading(collectionRef.name, true);

//       // Simulate async operation
//       setTimeout(() => {
//         try {
//           // Mock data based on collection type
//           let mockData;
//           if (collectionRef.name === 'projects') {
//             mockData = {
//               size: 12,
//               docs: Array.from({ length: 6 }, (_, i) => ({
//                 id: `project-${i}`,
//                 data: () => ({
//                   title: `Project ${i + 1}`,
//                   description: `This is a sample description for project ${i + 1} that demonstrates the dashboard functionality.`,
//                   createdAt: { toDate: () => new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000) }
//                 })
//               }))
//             };
//           } else {
//             mockData = { size: Math.floor(Math.random() * 20) + 5 };
//           }

//           callback(mockData);
//           clearError(collectionRef.name);
//         } catch (error) {
//           if (errorCallback) errorCallback(error);
//           else setError(collectionRef.name, error);
//         } finally {
//           setLoading(collectionRef.name, false);
//         }
//       }, 1000 + Math.random() * 1000);

//       // Return unsubscribe function
//       return () => console.log(`Unsubscribed from ${collectionRef.name}`);
//     } catch (error) {
//       setError(collectionRef.name, error);
//       setLoading(collectionRef.name, false);
//       return () => {};
//     }
//   };

//   // Realtime counts with error handling
//   useEffect(() => {
//     let unsubscribers = [];

//     try {
//       const unsubP = mockOnSnapshot(
//         { name: 'projects' },
//         (snap) => setProjectsCount(snap.size),
//         (error) => setError('projects-count', error)
//       );

//       const unsubS = mockOnSnapshot(
//         { name: 'skills' },
//         (snap) => setSkillsCount(snap.size),
//         (error) => setError('skills-count', error)
//       );

//       const unsubE = mockOnSnapshot(
//         { name: 'experience' },
//         (snap) => setExpCount(snap.size),
//         (error) => setError('experience-count', error)
//       );

//       unsubscribers = [unsubP, unsubS, unsubE];
//     } catch (error) {
//       setError('realtime-setup', error);
//     }

//     return () => {
//       unsubscribers.forEach(unsub => {
//         try {
//           unsub();
//         } catch (error) {
//           console.error('Error unsubscribing:', error);
//         }
//       });
//     };
//   }, []);

//   // Recent projects and chart data with error handling
//   useEffect(() => {
//     let unsub;

//     try {
//       setLoading('recent-projects', true);

//       unsub = mockOnSnapshot(
//         { name: 'projects' },
//         (snap) => {
//           try {
//             const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//             setRecentProjects(docs.slice(0, 6));

//             // Build chart data with error handling
//             const months = {};
//             docs.forEach(d => {
//               try {
//                 const date = d.createdAt?.toDate ? d.createdAt.toDate() :
//                            d.createdAt ? new Date(d.createdAt) : new Date();

//                 if (isNaN(date.getTime())) {
//                   console.warn('Invalid date found in project:', d.id);
//                   return;
//                 }

//                 const key = date.toLocaleString("default", {
//                   month: "short",
//                   year: "numeric"
//                 });
//                 months[key] = (months[key] || 0) + 1;
//               } catch (error) {
//                 console.warn('Error processing project date:', d.id, error);
//               }
//             });

//             const data = Object.keys(months)
//               .slice(0, 6)
//               .reverse()
//               .map(k => ({
//                 name: k,
//                 projects: months[k],
//                 skills: Math.floor(Math.random() * 5) + 1
//               }));

//             setChartData(data.length ? data : [
//               { name: "Jan 2024", projects: 2, skills: 5 },
//               { name: "Feb 2024", projects: 3, skills: 6 },
//               { name: "Mar 2024", projects: 4, skills: 7 },
//             ]);

//             clearError('recent-projects');
//           } catch (error) {
//             setError('recent-projects', error);
//           } finally {
//             setLoading('recent-projects', false);
//           }
//         },
//         (error) => {
//           setError('recent-projects', error);
//           setLoading('recent-projects', false);
//         }
//       );
//     } catch (error) {
//       setError('recent-projects', error);
//       setLoading('recent-projects', false);
//     }

//     return () => {
//       try {
//         if (unsub) unsub();
//       } catch (error) {
//         console.error('Error unsubscribing from projects:', error);
//       }
//     };
//   }, []);

//   // Retry function for failed operations
//   const retryOperation = (operation) => {
//     clearError(operation);
//     window.location.reload(); // In real app, you'd have more specific retry logic
//   };

//   return (
//     <ErrorBoundary>
//       <div className="space-y-6 p-6">
//         {/* Global error display */}
//         {Object.keys(errors).length > 0 && (
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription className="flex items-center justify-between">
//               <span>Some components failed to load. Check console for details.</span>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="flex items-center gap-1 text-sm underline hover:no-underline"
//               >
//                 <RefreshCw className="h-3 w-3" />
//                 Retry
//               </button>
//             </AlertDescription>
//           </Alert>
//         )}

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <StatCard
//             title="Projects"
//             value={projectsCount}
//             icon={Code}
//             isLoading={loading.projects}
//             error={errors['projects-count']}
//           />
//           <StatCard
//             title="Skills"
//             value={skillsCount}
//             icon={TrendingUp}
//             isLoading={loading.skills}
//             error={errors['skills-count']}
//           />
//           <StatCard
//             title="Experience entries"
//             value={expCount}
//             icon={Briefcase}
//             isLoading={loading.experience}
//             error={errors['experience-count']}
//           />
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="rounded-lg border bg-card p-6 shadow-sm">
//             <h3 className="font-semibold mb-4 flex items-center gap-2">
//               Projects Over Time
//               {loading['recent-projects'] && <RefreshCw className="h-4 w-4 animate-spin" />}
//             </h3>
//             {errors['recent-projects'] ? (
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>
//                   Failed to load chart data
//                   <button
//                     onClick={() => retryOperation('recent-projects')}
//                     className="ml-2 underline hover:no-underline"
//                   >
//                     Retry
//                   </button>
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="projects" stroke="#2563eb" strokeWidth={2} />
//                 </LineChart>
//               </ResponsiveContainer>
//             )}
//           </div>

//           <div className="rounded-lg border bg-card p-6 shadow-sm">
//             <h3 className="font-semibold mb-4">Skills Growth (sample)</h3>
//             {errors['recent-projects'] ? (
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>Failed to load chart data</AlertDescription>
//               </Alert>
//             ) : (
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="skills" fill="#16a34a" />
//                 </BarChart>
//               </ResponsiveContainer>
//             )}
//           </div>
//         </div>

//         {/* Recent Projects */}
//         <div className="rounded-lg border bg-card p-6 shadow-sm">
//           <h3 className="font-semibold mb-4 flex items-center gap-2">
//             Recent Projects
//             {loading['recent-projects'] && <RefreshCw className="h-4 w-4 animate-spin" />}
//           </h3>
//           {errors['recent-projects'] ? (
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription>Failed to load recent projects</AlertDescription>
//             </Alert>
//           ) : loading['recent-projects'] ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="p-3 border rounded-lg animate-pulse">
//                   <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                   <div className="h-3 bg-gray-100 rounded"></div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//               {recentProjects.length ? recentProjects.map(p => (
//                 <div key={p.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
//                   <div className="text-sm font-medium mb-1">{p.title}</div>
//                   <div className="text-xs text-muted-foreground">
//                     {p.description?.slice(0, 60)}...
//                   </div>
//                 </div>
//               )) : (
//                 <div className="col-span-full text-center text-muted-foreground py-8">
//                   No recent projects found
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </ErrorBoundary>
//   );
// }

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell,
//   AreaChart, Area, RadialBarChart, RadialBar, LabelList
// } from "recharts";
// import {
//   AlertCircle, RefreshCw, TrendingUp, Code, Briefcase,
//   Activity, Users, Calendar, BarChart3, MessageCircle,
//   ChevronRight, ExternalLink, Plus
// } from "lucide-react";

// // Enhanced Alert component with modern styling
// const Alert = ({ variant = "default", children, className = "" }) => {
//   const variants = {
//     default: "border-blue-200 bg-blue-50/50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-50",
//     destructive: "border-red-200 bg-red-50/50 text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-50",
//     success: "border-green-200 bg-green-50/50 text-green-900 dark:border-green-800 dark:bg-green-950/50 dark:text-green-50"
//   };

//   return (
//     <div className={`rounded-xl border backdrop-blur-sm p-4 ${variants[variant]} ${className}`}>
//       <div className="flex items-start gap-3">
//         {children}
//       </div>
//     </div>
//   );
// };

// const AlertDescription = ({ children, className = "" }) => (
//   <div className={`text-sm leading-relaxed ${className}`}>
//     {children}
//   </div>
// );

// // Enhanced StatCard with gradient backgrounds and animations
// const StatCard = ({ title, value, icon: Icon, isLoading, error, trend, color = "blue" }) => {
//   const colorSchemes = {
//     blue: "from-blue-500/10 to-cyan-500/10 border-blue-200/50",
//     green: "from-green-500/10 to-emerald-500/10 border-green-200/50",
//     purple: "from-purple-500/10 to-pink-500/10 border-purple-200/50",
//     orange: "from-orange-500/10 to-amber-500/10 border-orange-200/50"
//   };

//   return (
//     <div className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${colorSchemes[color]} backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group`}>
//       <div className="flex items-center justify-between">
//         <div className="space-y-2">
//           <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
//           {error ? (
//             <div className="text-2xl font-bold text-red-500 flex items-center gap-2">
//               <AlertCircle className="h-5 w-5" />
//               Error
//             </div>
//           ) : isLoading ? (
//             <div className="text-2xl font-bold text-gray-400 animate-pulse">
//               <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
//             </div>
//           ) : (
//             <div className="space-y-1">
//               <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
//               {trend && (
//                 <div className="text-xs text-green-600 font-medium flex items-center gap-1">
//                   <TrendingUp className="h-3 w-3" />
//                   {trend}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         {Icon && (
//           <div className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 group-hover:scale-110 transition-transform duration-300">
//             <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Chat-style notification component
// const ChatNotification = ({ message, type = "info", onDismiss }) => {
//   const icons = {
//     info: <MessageCircle className="h-4 w-4" />,
//     success: <TrendingUp className="h-4 w-4" />,
//     error: <AlertCircle className="h-4 w-4" />
//   };

//   const colors = {
//     info: "bg-blue-500/10 border-blue-200 text-blue-700",
//     success: "bg-green-500/10 border-green-200 text-green-700",
//     error: "bg-red-500/10 border-red-200 text-red-700"
//   };

//   return (
//     <div className={`flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm ${colors[type]} transition-all duration-300`}>
//       {icons[type]}
//       <span className="text-sm font-medium flex-1">{message}</span>
//       {onDismiss && (
//         <button
//           onClick={onDismiss}
//           className="text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           ×
//         </button>
//       )}
//     </div>
//   );
// };

// // Enhanced project card with hover effects
// const ProjectCard = ({ project, index }) => (
//   <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm">
//     <div className="flex items-start justify-between mb-3">
//       <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-300">
//         <Code className="h-4 w-4 text-blue-600" />
//       </div>
//       <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
//         #{index + 1}
//       </span>
//     </div>

//     <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
//       {project.title}
//     </h4>

//     <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
//       {project.description}
//     </p>

//     <div className="flex items-center justify-between text-xs text-gray-500">
//       <span className="flex items-center gap-1">
//         <Calendar className="h-3 w-3" />
//         {new Date(project.createdAt?.toDate?.() || new Date()).toLocaleDateString()}
//       </span>
//       <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//     </div>
//   </div>
// );

// // Custom hooks remain the same but with improvements
// const useErrorHandler = () => {
//   const [errors, setErrors] = useState({});
//   const [notifications, setNotifications] = useState([]);

//   const setError = useCallback((key, error) => {
//     console.error(`Error in ${key}:`, error);
//     const errorMessage = error.message || 'An error occurred';
//     setErrors(prev => ({ ...prev, [key]: errorMessage }));

//     // Add notification
//     const notification = {
//       id: Date.now(),
//       message: `Failed to load ${key.replace('-', ' ')}`,
//       type: 'error'
//     };
//     setNotifications(prev => [...prev, notification]);

//     // Auto-dismiss after 5 seconds
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(n => n.id !== notification.id));
//     }, 5000);
//   }, []);

//   const clearError = useCallback((key) => {
//     setErrors(prev => {
//       const newErrors = { ...prev };
//       delete newErrors[key];
//       return newErrors;
//     });
//   }, []);

//   const clearAllErrors = useCallback(() => setErrors({}), []);

//   const dismissNotification = useCallback((id) => {
//     setNotifications(prev => prev.filter(n => n.id !== id));
//   }, []);

//   return { errors, setError, clearError, clearAllErrors, notifications, dismissNotification };
// };

// const useLoadingStates = () => {
//   const [loading, setLoadingState] = useState({});

//   const setLoading = useCallback((key, isLoading) => {
//     setLoadingState(prev => ({ ...prev, [key]: isLoading }));
//   }, []);

//   return { loading, setLoading };
// };

// // Enhanced Dashboard component
// export default function Dashboard() {
//   // State management
//   const [projectsCount, setProjectsCount] = useState(0);
//   const [skillsCount, setSkillsCount] = useState(0);
//   const [expCount, setExpCount] = useState(0);
//   const [recentProjects, setRecentProjects] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [skillsData, setSkillsData] = useState([]);

//   // Error and loading management
//   const { errors, setError, clearError, notifications, dismissNotification } = useErrorHandler();
//   const { loading, setLoading } = useLoadingStates();

//   // Enhanced mock Firebase functions
//   const mockOnSnapshot = useCallback((collectionRef, callback, errorCallback) => {
//     try {
//       setLoading(collectionRef.name, true);

//       setTimeout(() => {
//         try {
//           let mockData;
//           if (collectionRef.name === 'projects') {
//             mockData = {
//               size: 15,
//               docs: Array.from({ length: 8 }, (_, i) => ({
//                 id: `project-${i}`,
//                 data: () => ({
//                   title: `${['Portfolio Website', 'E-commerce App', 'Dashboard UI', 'Mobile App', 'API Service', 'Blog Platform', 'Chat Application', 'Analytics Tool'][i]}`,
//                   description: `A comprehensive ${['web', 'mobile', 'desktop', 'cloud'][Math.floor(Math.random() * 4)]} application built with modern technologies and best practices.`,
//                   createdAt: { toDate: () => new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000) },
//                   status: ['completed', 'in-progress', 'planning'][Math.floor(Math.random() * 3)]
//                 })
//               }))
//             };
//           } else if (collectionRef.name === 'skills') {
//             mockData = { size: 24 };
//           } else {
//             mockData = { size: 8 };
//           }

//           callback(mockData);
//           clearError(collectionRef.name);
//         } catch (error) {
//           if (errorCallback) errorCallback(error);
//           else setError(collectionRef.name, error);
//         } finally {
//           setLoading(collectionRef.name, false);
//         }
//       }, 1000 + Math.random() * 1000);

//       return () => console.log(`Unsubscribed from ${collectionRef.name}`);
//     } catch (error) {
//       setError(collectionRef.name, error);
//       setLoading(collectionRef.name, false);
//       return () => {};
//     }
//   }, [setLoading, setError, clearError]);

//   // Memoized chart data
//   const enhancedChartData = useMemo(() => {
//     if (!chartData.length) return [];
//     return chartData.map(item => ({
//       ...item,
//       completion: Math.floor(Math.random() * 30) + 70,
//       issues: Math.floor(Math.random() * 5)
//     }));
//   }, [chartData]);

//   const skillsChartData = useMemo(() => [
//     { name: 'React', value: 95, color: '#61dafb' },
//     { name: 'JavaScript', value: 90, color: '#f7df1e' },
//     { name: 'TypeScript', value: 85, color: '#3178c6' },
//     { name: 'Node.js', value: 88, color: '#339933' },
//     { name: 'Python', value: 82, color: '#3776ab' }
//   ], []);

//   // Area chart data for project progress over time
//   const areaChartData = useMemo(() => [
//     { month: 'Jan', completed: 4, inProgress: 2, planned: 3 },
//     { month: 'Feb', completed: 7, inProgress: 3, planned: 2 },
//     { month: 'Mar', completed: 12, inProgress: 4, planned: 4 },
//     { month: 'Apr', completed: 16, inProgress: 3, planned: 5 },
//     { month: 'May', completed: 22, inProgress: 5, planned: 3 },
//     { month: 'Jun', completed: 28, inProgress: 6, planned: 6 }
//   ], []);

//   // Radial chart data for skill proficiency
//   const radialChartData = useMemo(() => [
//     { name: 'Frontend', value: 92, fill: '#3b82f6' },
//     { name: 'Backend', value: 85, fill: '#10b981' },
//     { name: 'DevOps', value: 78, fill: '#f59e0b' },
//     { name: 'Mobile', value: 70, fill: '#8b5cf6' },
//     { name: 'Design', value: 65, fill: '#ef4444' }
//   ], []);

//   // Effects remain similar but with enhanced data
//   useEffect(() => {
//     let unsubscribers = [];

//     try {
//       const unsubP = mockOnSnapshot(
//         { name: 'projects' },
//         (snap) => setProjectsCount(snap.size),
//         (error) => setError('projects-count', error)
//       );

//       const unsubS = mockOnSnapshot(
//         { name: 'skills' },
//         (snap) => setSkillsCount(snap.size),
//         (error) => setError('skills-count', error)
//       );

//       const unsubE = mockOnSnapshot(
//         { name: 'experience' },
//         (snap) => setExpCount(snap.size),
//         (error) => setError('experience-count', error)
//       );

//       unsubscribers = [unsubP, unsubS, unsubE];
//     } catch (error) {
//       setError('realtime-setup', error);
//     }

//     return () => {
//       unsubscribers.forEach(unsub => {
//         try {
//           unsub();
//         } catch (error) {
//           console.error('Error unsubscribing:', error);
//         }
//       });
//     };
//   }, [mockOnSnapshot, setError]);

//   useEffect(() => {
//     let unsub;

//     try {
//       setLoading('recent-projects', true);

//       unsub = mockOnSnapshot(
//         { name: 'projects' },
//         (snap) => {
//           try {
//             const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
//             setRecentProjects(docs.slice(0, 6));

//             // Enhanced chart data
//             const months = {};
//             docs.forEach(d => {
//               try {
//                 const date = d.createdAt?.toDate ? d.createdAt.toDate() :
//                            d.createdAt ? new Date(d.createdAt) : new Date();

//                 if (isNaN(date.getTime())) return;

//                 const key = date.toLocaleString("default", {
//                   month: "short",
//                   year: "numeric"
//                 });
//                 months[key] = (months[key] || 0) + 1;
//               } catch (error) {
//                 console.warn('Error processing project date:', d.id, error);
//               }
//             });

//             const data = Object.keys(months)
//               .slice(-6)
//               .map(k => ({
//                 name: k,
//                 projects: months[k],
//                 skills: Math.floor(Math.random() * 5) + 1,
//                 completed: Math.floor(months[k] * 0.8),
//                 active: Math.floor(months[k] * 0.2)
//               }));

//             setChartData(data.length ? data : [
//               { name: "Aug 2024", projects: 3, skills: 6, completed: 2, active: 1 },
//               { name: "Sep 2024", projects: 5, skills: 8, completed: 4, active: 1 },
//               { name: "Oct 2024", projects: 4, skills: 7, completed: 3, active: 1 },
//               { name: "Nov 2024", projects: 6, skills: 9, completed: 5, active: 1 },
//               { name: "Dec 2024", projects: 4, skills: 6, completed: 3, active: 1 },
//               { name: "Jan 2025", projects: 7, skills: 10, completed: 5, active: 2 }
//             ]);

//             clearError('recent-projects');
//           } catch (error) {
//             setError('recent-projects', error);
//           } finally {
//             setLoading('recent-projects', false);
//           }
//         },
//         (error) => {
//           setError('recent-projects', error);
//           setLoading('recent-projects', false);
//         }
//       );
//     } catch (error) {
//       setError('recent-projects', error);
//       setLoading('recent-projects', false);
//     }

//     return () => {
//       try {
//         if (unsub) unsub();
//       } catch (error) {
//         console.error('Error unsubscribing from projects:', error);
//       }
//     };
//   }, [mockOnSnapshot, setLoading, setError, clearError]);

//   const retryOperation = (operation) => {
//     clearError(operation);
//     window.location.reload();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/20">
//       <div className="space-y-8 p-6 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center space-y-2">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Dashboard Overview
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Real-time insights into your projects and skills
//           </p>
//         </div>

//         {/* Notifications */}
//         {notifications.length > 0 && (
//           <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
//             {notifications.map(notification => (
//               <ChatNotification
//                 key={notification.id}
//                 message={notification.message}
//                 type={notification.type}
//                 onDismiss={() => dismissNotification(notification.id)}
//               />
//             ))}
//           </div>
//         )}

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatCard
//             title="Total Projects"
//             value={projectsCount}
//             icon={Code}
//             isLoading={loading.projects}
//             error={errors['projects-count']}
//             trend="+12% this month"
//             color="blue"
//           />
//           <StatCard
//             title="Skills Mastered"
//             value={skillsCount}
//             icon={TrendingUp}
//             isLoading={loading.skills}
//             error={errors['skills-count']}
//             trend="+3 new skills"
//             color="green"
//           />
//           <StatCard
//             title="Experience Entries"
//             value={expCount}
//             icon={Briefcase}
//             isLoading={loading.experience}
//             error={errors['experience-count']}
//             trend="+1 this week"
//             color="purple"
//           />
//           <StatCard
//             title="Active Projects"
//             value={Math.floor(projectsCount * 0.3)}
//             icon={Activity}
//             isLoading={loading.projects}
//             error={errors['projects-count']}
//             trend="3 in progress"
//             color="orange"
//           />
//         </div>

//         {/* Enhanced Charts */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//           {/* Projects Timeline */}
//           <div className="xl:col-span-2 rounded-2xl border border-gray-200/50 bg-white/50 backdrop-blur-sm p-6 shadow-lg">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//                   <BarChart3 className="h-5 w-5 text-blue-600" />
//                   Project Timeline
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                   Monthly project completion trends
//                 </p>
//               </div>
//               {loading['recent-projects'] && <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />}
//             </div>

//             {errors['recent-projects'] ? (
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>
//                   Failed to load timeline data
//                   <button
//                     onClick={() => retryOperation('recent-projects')}
//                     className="ml-2 underline hover:no-underline font-medium"
//                   >
//                     Retry
//                   </button>
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <ResponsiveContainer width="100%" height={320}>
//                 <LineChart data={enhancedChartData}>
//                   <defs>
//                     <linearGradient id="projectGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="name" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: 'rgba(255, 255, 255, 0.95)',
//                       borderRadius: '12px',
//                       border: '1px solid #e5e7eb',
//                       backdropFilter: 'blur(8px)'
//                     }}
//                   />
//                   <Legend />
//                   <Line
//                     type="monotone"
//                     dataKey="projects"
//                     stroke="#3b82f6"
//                     strokeWidth={3}
//                     fill="url(#projectGradient)"
//                     dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="completed"
//                     stroke="#10b981"
//                     strokeWidth={2}
//                     strokeDasharray="5 5"
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             )}
//           </div>

//           {/* Skills Distribution */}
//           <div className="rounded-2xl border border-gray-200/50 bg-white/50 backdrop-blur-sm p-6 shadow-lg">
//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
//               <TrendingUp className="h-5 w-5 text-green-600" />
//               Top Skills
//             </h3>
//             <ResponsiveContainer width="100%" height={280}>
//               <PieChart>
//                 <Pie
//                   data={skillsChartData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={100}
//                   paddingAngle={5}
//                   dataKey="value"
//                 >
//                   {skillsChartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//                     borderRadius: '12px',
//                     border: '1px solid #e5e7eb'
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="mt-4 space-y-2">
//               {skillsChartData.map((skill, index) => (
//                 <div key={index} className="flex items-center justify-between text-sm">
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }}></div>
//                     <span className="font-medium">{skill.name}</span>
//                   </div>
//                   <span className="text-gray-600">{skill.value}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Recent Projects Grid */}
//         <div className="rounded-2xl border border-gray-200/50 bg-white/50 backdrop-blur-sm p-6 shadow-lg">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//                 <Code className="h-5 w-5 text-purple-600" />
//                 Recent Projects
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                 Your latest work and achievements
//               </p>
//             </div>
//             <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-medium">
//               <Plus className="h-4 w-4" />
//               New Project
//             </button>
//           </div>

//           {errors['recent-projects'] ? (
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription>Failed to load recent projects</AlertDescription>
//             </Alert>
//           ) : loading['recent-projects'] ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="p-4 border border-gray-200 rounded-xl animate-pulse bg-gray-50">
//                   <div className="h-4 bg-gray-200 rounded mb-3"></div>
//                   <div className="h-3 bg-gray-100 rounded mb-2"></div>
//                   <div className="h-3 bg-gray-100 rounded w-2/3"></div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {recentProjects.length ? recentProjects.map((project, index) => (
//                 <ProjectCard key={project.id} project={project} index={index} />
//               )) : (
//                 <div className="col-span-full text-center py-12">
//                   <Code className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                   <h4 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h4>
//                   <p className="text-gray-600 mb-4">Start building something amazing!</p>
//                   <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300">
//                     Create First Project
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  RadialBar,
  RadialBarChart,
  LabelList,
  Pie,
  PieChart,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  Area,
  AreaChart,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  RefreshCw,
  TrendingUp,
  Code,
  Briefcase,
  GitCommitVertical,
} from "lucide-react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Custom Alert component
const Alert = ({ variant, children, className = "" }) => (
  <div
    className={`rounded-lg border p-4 ${
      variant === "destructive"
        ? "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-50"
        : "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-50"
    } ${className}`}
  >
    <div className="flex items-start gap-2">{children}</div>
  </div>
);

const AlertDescription = ({ children, className = "" }) => (
  <div className={`text-sm ${className}`}>{children}</div>
);

// StatCard component
const StatCard = ({ title, value, icon: Icon, isLoading, error }) => (
  <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
    <div className="flex items-center justify-between space-y-0 pb-2">
      <h3 className="tracking-tight text-sm font-medium">{title}</h3>
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
    </div>
    <div className="space-y-1">
      {error ? (
        <div className="text-2xl font-bold text-destructive">Error</div>
      ) : isLoading ? (
        <div className="text-2xl font-bold text-muted-foreground">...</div>
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </div>
  </div>
);

// ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Dashboard Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Something went wrong loading the dashboard. Please refresh the
              page.
              <button
                onClick={() => window.location.reload()}
                className="ml-2 underline hover:no-underline"
              >
                Refresh
              </button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }
    return this.props.children;
  }
}

// Custom hooks
const useErrorHandler = () => {
  const [errors, setErrors] = useState({});

  const setError = (key, error) => {
    console.error(`Error in ${key}:`, error);
    setErrors((prev) => ({
      ...prev,
      [key]: error.message || "An error occurred",
    }));
  };

  const clearError = (key) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const clearAllErrors = () => setErrors({});

  return { errors, setError, clearError, clearAllErrors };
};

const useLoadingStates = () => {
  const [loading, setLoadingState] = useState({});

  const setLoading = (key, isLoading) => {
    setLoadingState((prev) => ({ ...prev, [key]: isLoading }));
  };

  return { loading, setLoading };
};

export default function Dashboard() {
  const [projectsCount, setProjectsCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);
  const [expCount, setExpCount] = useState(0);
  const [recentProjects, setRecentProjects] = useState([]);
  const [projectTypesData, setProjectTypesData] = useState([]);
  const [skillGrowthData, setSkillGrowthData] = useState([]);
  const [projectsOverTimeData, setProjectsOverTimeData] = useState([]);
  const [visitorsData, setVisitorsData] = useState([]);

  const { errors, setError, clearError } = useErrorHandler();
  const { loading, setLoading } = useLoadingStates();

  useEffect(() => {
    let unsubscribers = [];

    try {
      const unsubP = onSnapshot(
        collection(db, "projects"),
        (snap) => {
          setProjectsCount(snap.size);

          const typesCount = {
            Frontend: 1,
            Backend: 4,
            FullStack: 6,
            AppFrontend: 1,
            AppBackend: 3,
            AppFullStack: 4,
          };
          const months = {};
          const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          docs.forEach((d) => {
            const category = d.category || "Unknown";
            if (typesCount.hasOwnProperty(category)) typesCount[category]++;

            const date = d.createdAt?.toDate()
              ? d.createdAt.toDate()
              : new Date();
            if (!isNaN(date.getTime())) {
              const key = date.toLocaleString("default", {
                month: "short",
                year: "numeric",
              });
              months[key] = (months[key] || 0) + 1;
            }
          });

          setProjectTypesData([
            {
              browser: "Frontend",  
              visitors: typesCount.Frontend,
              fill: "#2563eb",
            },
            {
              browser: "Backend",
              visitors: typesCount.Backend,
              fill: "#16a34a",
            },
            {
              browser: "FullStack",
              visitors: typesCount.FullStack,
              fill: "#f59e0b",
            },
            {
              browser: "AppFrontend",
              visitors: typesCount.AppFrontend,
              fill: "#dc2626",
            },
            {
              browser: "AppBackend",
              visitors: typesCount.AppBackend,
              fill: "#9333ea",
            },
            {
              browser: "AppFullStack",
              visitors: typesCount.AppFullStack,
              fill: "#10b981",
            },
          ]);

          setRecentProjects(docs.slice(0, 6));

          const data = Object.keys(months)
            .slice(0, 6)
            .reverse()
            .map((k) => ({
              month: k,
              projects: months[k],
            }));
          setProjectsOverTimeData(
            data.length
              ? data
              : [
                  { month: "Jan 2024", projects: 2 },
                  { month: "Feb 2024", projects: 3 },
                  { month: "Mar 2024", projects: 4 },
                ]
          );

          clearError("projects");
        },
        (error) => setError("projects", error)
      );

      const unsubS = onSnapshot(
        collection(db, "skills"),
        (snap) => {
          setSkillsCount(snap.size);

          const skillData = snap.docs.map((d) => d.data());
          const aggregatedSkills = skillData.reduce((acc, skill) => {
            const month = skill.month || "Unknown";
            if (!acc[month]) acc[month] = 0;
            acc[month] += skill.desktop || 0;
            return acc;
          }, {});
          const formattedSkills = Object.keys(aggregatedSkills).map(
            (month, index) => ({
              month,
              desktop: aggregatedSkills[month],
              fill:
                ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"][
                  index % 5
                ] || "#10b981",
            })
          );
          setSkillGrowthData(
            formattedSkills.length
              ? formattedSkills
              : [
                  { month: "january", desktop: 186, fill: "#2563eb" },
                  { month: "february", desktop: 305, fill: "#16a34a" },
                  { month: "march", desktop: 237, fill: "#f59e0b" },
                  { month: "april", desktop: 73, fill: "#dc2626" },
                  { month: "may", desktop: 209, fill: "#9333ea" },
                ]
          );

          clearError("skills");
        },
        (error) => setError("skills", error)
      );

      const unsubE = onSnapshot(
        collection(db, "experience"),
        (snap) => {
          setExpCount(snap.size);
          clearError("experience");
        },
        (error) => setError("experience", error)
      );

      const unsubV = onSnapshot(
        collection(db, "visitors"),
        (snap) => {
          const visitorData = snap.docs.map((d) => d.data());
          const formattedVisitors = visitorData.map((v) => ({
            month: v.month || "Unknown",
            desktop: v.desktop || 0,
            mobile: v.mobile || 0,
          }));
          setVisitorsData(
            formattedVisitors.length
              ? formattedVisitors
              : [
                  { month: "January", desktop: 186, mobile: 80 },
                  { month: "February", desktop: 305, mobile: 200 },
                  { month: "March", desktop: 237, mobile: 120 },
                  { month: "April", desktop: 73, mobile: 190 },
                  { month: "May", desktop: 209, mobile: 130 },
                  { month: "June", desktop: 214, mobile: 140 },
                ]
          );

          clearError("visitors");
        },
        (error) => setError("visitors", error)
      );

      unsubscribers = [unsubP, unsubS, unsubE, unsubV];
    } catch (error) {
      setError("realtime-setup", error);
    }

    return () => {
      unsubscribers.forEach((unsub) => {
        try {
          unsub();
        } catch (error) {
          console.error("Error unsubscribing:", error);
        }
      });
    };
  }, []);

  const retryOperation = (operation) => {
    clearError(operation);
    window.location.reload();
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6 p-6">
          {/* {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span className="text-sm bg-amber-500 text-white rounded px-2 py-1">
                  Some components failed to load. Check console for details.
                </span>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-1 text-sm underline hover:no-underline"
                >
                  <RefreshCw className="h-3 w-3" />
                  Retry
                </button>
              </AlertDescription>
            </Alert>
          )} */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Projects"
            value={projectsCount}
            icon={Code}
            isLoading={loading.projects}
            error={errors["projects"]}
          />
          <StatCard
            title="Skills"
            value={skillsCount}
            icon={TrendingUp}
            isLoading={loading.skills}
            error={errors["skills"]}
          />
          <StatCard
            title="Experience entries"
            value={expCount}
            icon={Briefcase}
            isLoading={loading.experience}
            error={errors["experience"]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="items-center pb-0">
              <CardTitle>Project Types</CardTitle>
              <CardDescription>August 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 h-[250px]">
              <RadialBarChart className="mx-auto"
                width={350}
                height={350}
                data={projectTypesData}
                startAngle={-90}
                endAngle={380}
                innerRadius={50}
                outerRadius={150}
              >
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <RadialBar dataKey="visitors" background >
                  <LabelList
                    position="insideStart"  
                    dataKey="browser"
                    className="fill-white capitalize mix-blend-luminosity"
                    fontSize={11}
                  />
                </RadialBar>  
              </RadialBarChart>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Showing total projects by type
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="items-center pb-0">
              <CardTitle>Skill Growth</CardTitle>
              <CardDescription>January - May 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 h-[250px]">
              <PieChart width={250} height={250}>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={skillGrowthData}
                  dataKey="desktop"
                  outerRadius={60}
                  fill="#8884d8"
                />
              </PieChart>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Showing skill growth over months
              </div>
            </CardFooter>
          </Card>
        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects Over Time</CardTitle>
              <CardDescription>August 2024 - August 2025</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <LineChart
                width={500}
                height={300}
                accessibilityLayer
                data={projectsOverTimeData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={true}
                  axisLine={true}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Line
                  dataKey="projects"
                  type="natural"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={({ cx, cy, payload }) => {
                    const r = 24;
                    return (
                      <GitCommitVertical
                        key={payload.month}
                        x={cx - r / 2}
                        y={cy - r / 2}
                        width={r}
                        height={r}
                        fill="hsl(var(--background))"
                        stroke="#2563eb"
                      />
                    );
                  }}
                />
              </LineChart>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Showing projects created over time
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visitors</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <AreaChart
                width={500}
                height={300}
                accessibilityLayer
                data={visitorsData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="url(#fillMobile)"
                  fillOpacity={0.4}
                  stroke="#16a34a"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  fillOpacity={0.4}
                  stroke="#2563eb"
                  stackId="a"
                />
              </AreaChart>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 leading-none">
                    January - June 2024
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            Recent Projects
            {loading.projects && <RefreshCw className="h-4 w-4 animate-spin" />}
          </h3>
          {errors.projects ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load recent projects
              </AlertDescription>
            </Alert>
          ) : loading.projects ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-3 border rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {recentProjects.length ? (
                recentProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="text-sm font-medium mb-1">{p.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {p.description?.slice(0, 60)}...
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-8">
                  No recent projects found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

// Custom Tooltip Component

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{`Category: ${
          payload[0].payload.browser || payload[0].name || label
        }`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// import React, { useEffect, useState } from "react";
// import {
//   RadialBar,
//   RadialBarChart,
//   LabelList,
//   Pie,
//   PieChart,
//   Line,
//   Cell,
//   LineChart,
//   CartesianGrid,
//   XAxis,
//   Area,
//   AreaChart,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   AlertCircle,
//   RefreshCw,
//   TrendingUp,
//   Code,
//   Briefcase,
//   GitCommitVertical,
// } from "lucide-react";
// import { db } from "../../firebase";
// import { collection, onSnapshot } from "firebase/firestore";

// // Custom Alert component
// const Alert = ({ variant, children, className = "" }) => (
//   <div
//     className={`rounded-lg border p-4 ${
//       variant === "destructive"
//         ? "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-50"
//         : "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-50"
//     } ${className}`}
//   >
//     <div className="flex items-start gap-2">{children}</div>
//   </div>
// );

// const AlertDescription = ({ children, className = "" }) => (
//   <div className={`text-sm ${className}`}>{children}</div>
// );

// // StatCard component
// const StatCard = ({ title, value, icon: Icon, isLoading, error }) => (
//   <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
//     <div className="flex items-center justify-between space-y-0 pb-2">
//       <h3 className="tracking-tight text-sm font-medium">{title}</h3>
//       {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
//     </div>
//     <div className="space-y-1">
//       {error ? (
//         <div className="text-2xl font-bold text-destructive">Error</div>
//       ) : isLoading ? (
//         <div className="text-2xl font-bold text-muted-foreground">...</div>
//       ) : (
//         <div className="text-2xl font-bold">{value}</div>
//       )}
//     </div>
//   </div>
// );

// // ErrorBoundary component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Dashboard Error:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="p-6">
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>
//               Something went wrong loading the dashboard. Please refresh the page.
//               <button
//                 onClick={() => window.location.reload()}
//                 className="ml-2 underline hover:no-underline"
//               >
//                 Refresh
//               </button>
//             </AlertDescription>
//           </Alert>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// // Custom hooks
// const useErrorHandler = () => {
//   const [errors, setErrors] = useState({});

//   const setError = (key, error) => {
//     console.error(`Error in ${key}:`, error);
//     setErrors((prev) => ({ ...prev, [key]: error.message || "An error occurred" }));
//   };

//   const clearError = (key) => {
//     setErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors[key];
//       return newErrors;
//     });
//   };

//   const clearAllErrors = () => setErrors({});

//   return { errors, setError, clearError, clearAllErrors };
// };

// const useLoadingStates = () => {
//   const [loading, setLoadingState] = useState({});

//   const setLoading = (key, isLoading) => {
//     setLoadingState((prev) => ({ ...prev, [key]: isLoading }));
//   };

//   return { loading, setLoading };
// };

// export default function Dashboard() {
//   const [projectsCount, setProjectsCount] = useState(0);
//   const [skillsCount, setSkillsCount] = useState(0);
//   const [expCount, setExpCount] = useState(0);
//   const [recentProjects, setRecentProjects] = useState([]);
//   const [projectTypesData, setProjectTypesData] = useState([]);
//   const [skillGrowthData, setSkillGrowthData] = useState([]);
//   const [projectsOverTimeData, setProjectsOverTimeData] = useState([]);
//   const [visitorsData, setVisitorsData] = useState([]);

//   const { errors, setError, clearError } = useErrorHandler();
//   const { loading, setLoading } = useLoadingStates();

//   useEffect(() => {
//     let unsubscribers = [];

//     try {
//       const unsubP = onSnapshot(
//         collection(db, "projects"),
//         (snap) => {
//           setProjectsCount(snap.size);

//           const typesCount = {
//             Frontend: 0,
//             Backend: 0,
//             FullStack: 0,
//             AppFrontend: 0,
//             AppBackend: 0,
//             AppFullStack: 0,
//           };
//           const months = {};
//           const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//           docs.forEach((d) => {
//             const category = d.category || "Unknown";
//             if (typesCount.hasOwnProperty(category)) typesCount[category]++;

//             const date = d.createdAt?.toDate() ? d.createdAt.toDate() : new Date();
//             if (!isNaN(date.getTime())) {
//               const key = date.toLocaleString("default", { month: "short", year: "numeric" });
//               months[key] = (months[key] || 0) + 1;
//             }
//           });

//           setProjectTypesData([
//             { browser: "Frontend", visitors: typesCount.Frontend, fill: "#2563eb" },
//             { browser: "Backend", visitors: typesCount.Backend, fill: "#16a34a" },
//             { browser: "FullStack", visitors: typesCount.FullStack, fill: "#f59e0b" },
//             { browser: "AppFrontend", visitors: typesCount.AppFrontend, fill: "#dc2626" },
//             { browser: "AppBackend", visitors: typesCount.AppBackend, fill: "#9333ea" },
//             { browser: "AppFullStack", visitors: typesCount.AppFullStack, fill: "#10b981" },
//           ]);

//           setRecentProjects(docs.slice(0, 6));

//           const data = Object.keys(months)
//             .slice(0, 6)
//             .reverse()
//             .map((k) => ({
//               month: k,
//               projects: months[k],
//             }));
//           setProjectsOverTimeData(data.length ? data : [
//             { month: "Jan 2024", projects: 2 },
//             { month: "Feb 2024", projects: 3 },
//             { month: "Mar 2024", projects: 4 },
//           ]);

//           clearError("projects");
//         },
//         (error) => setError("projects", error)
//       );

//       const unsubS = onSnapshot(
//         collection(db, "skills"),
//         (snap) => {
//           setSkillsCount(snap.size);

//           const skillData = snap.docs.map((d) => d.data());
//           const aggregatedSkills = skillData.reduce((acc, skill) => {
//             const month = skill.month || "Unknown";
//             if (!acc[month]) acc[month] = 0;
//             acc[month] += skill.desktop || 0;
//             return acc;
//           }, {});
//           const formattedSkills = Object.keys(aggregatedSkills).map((month, index) => ({
//             month,
//             desktop: aggregatedSkills[month],
//             fill: ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"][index % 5] || "#10b981",
//           }));
//           setSkillGrowthData(formattedSkills.length ? formattedSkills : [
//             { month: "january", desktop: 186, fill: "#2563eb" },
//             { month: "february", desktop: 305, fill: "#16a34a" },
//             { month: "march", desktop: 237, fill: "#f59e0b" },
//             { month: "april", desktop: 73, fill: "#dc2626" },
//             { month: "may", desktop: 209, fill: "#9333ea" },
//           ]);

//           clearError("skills");
//         },
//         (error) => setError("skills", error)
//       );

//       const unsubE = onSnapshot(
//         collection(db, "experience"),
//         (snap) => {
//           setExpCount(snap.size);
//           clearError("experience");
//         },
//         (error) => setError("experience", error)
//       );

//       const unsubV = onSnapshot(
//         collection(db, "visitors"),
//         (snap) => {
//           const visitorData = snap.docs.map((d) => d.data());
//           const formattedVisitors = visitorData.map((v) => ({
//             month: v.month || "Unknown",
//             desktop: v.desktop || 0,
//             mobile: v.mobile || 0,
//           }));
//           setVisitorsData(formattedVisitors.length ? formattedVisitors : [
//             { month: "January", desktop: 186, mobile: 80 },
//             { month: "February", desktop: 305, mobile: 200 },
//             { month: "March", desktop: 237, mobile: 120 },
//             { month: "April", desktop: 73, mobile: 190 },
//             { month: "May", desktop: 209, mobile: 130 },
//             { month: "June", desktop: 214, mobile: 140 },
//           ]);

//           clearError("visitors");
//         },
//         (error) => setError("visitors", error)
//       );

//       unsubscribers = [unsubP, unsubS, unsubE, unsubV];
//     } catch (error) {
//       setError("realtime-setup", error);
//     }

//     return () => {
//       unsubscribers.forEach((unsub) => {
//         try {
//           unsub();
//         } catch (error) {
//           console.error("Error unsubscribing:", error);
//         }
//       });
//     };
//   }, []);

//   const retryOperation = (operation) => {
//     clearError(operation);
//     window.location.reload();
//   };

//   return (
//     <ErrorBoundary>
//       <div className="space-y-6 p-6">
//         {Object.keys(errors).length > 0 && (
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription className="flex items-center justify-between">
//               <span>Some components failed to load. Check console for details.</span>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="flex items-center gap-1 text-sm underline hover:no-underline"
//               >
//                 <RefreshCw className="h-3 w-3" />
//                 Retry
//               </button>
//             </AlertDescription>
//           </Alert>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <StatCard
//             title="Projects"
//             value={projectsCount}
//             icon={Code}
//             isLoading={loading.projects}
//             error={errors["projects"]}
//           />
//           <StatCard
//             title="Skills"
//             value={skillsCount}
//             icon={TrendingUp}
//             isLoading={loading.skills}
//             error={errors["skills"]}
//           />
//           <StatCard
//             title="Experience entries"
//             value={expCount}
//             icon={Briefcase}
//             isLoading={loading.experience}
//             error={errors["experience"]}
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <Card className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
//             <CardHeader className="items-center pb-0">
//               <CardTitle>Project Types</CardTitle>
//               <CardDescription>August 2025</CardDescription>
//             </CardHeader>
//             <CardContent className="flex-1 pb-0 h-[250px]">
//               <ResponsiveContainer>
//                 <RadialBarChart
//                   cx="50%" // Center horizontally
//                   cy="50%" // Center vertically
//                   innerRadius="20%"
//                   outerRadius="80%"
//                   data={projectTypesData}
//                   startAngle={-90}
//                   endAngle={360}
//                 >
//                   <Tooltip content={<CustomTooltip />} />
//                   <RadialBar
//                     dataKey="visitors"
//                     background={{ fill: "#eee" }}
//                     animationBegin={0}
//                     animationDuration={1500}
//                     isAnimationActive={true}
//                   >
//                     <LabelList
//                       position="insideStart"
//                       dataKey="browser"
//                       fill="#fff"
//                       className="capitalize"
//                       fontSize={11}
//                     />
//                   </RadialBar>
//                 </RadialBarChart>
//               </ResponsiveContainer>
//             </CardContent>
//             <CardFooter className="flex-col gap-2 text-sm">
//               <div className="flex items-center gap-2 leading-none font-medium">
//                 Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//               </div>
//               <div className="text-muted-foreground leading-none">
//                 Showing total projects by type
//               </div>
//             </CardFooter>
//           </Card>

//           <Card className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
//             <CardHeader className="items-center pb-0">
//               <CardTitle>Skill Growth</CardTitle>
//               <CardDescription>January - May 2024</CardDescription>
//             </CardHeader>
//             <CardContent className="flex-1 pb-0 h-[250px]">
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Tooltip content={<CustomTooltip />} />
//                   <Pie
//                     data={skillGrowthData}
//                     dataKey="desktop"
//                     nameKey="month"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="#8884d8"
//                     label
//                     animationBegin={0}
//                     animationDuration={1500}
//                     isAnimationActive={true}
//                   >
//                     {skillGrowthData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.fill} />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//             </CardContent>
//             <CardFooter className="flex-col gap-2 text-sm">
//               <div className="flex items-center gap-2 leading-none font-medium">
//                 Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//               </div>
//               <div className="text-muted-foreground leading-none">
//                 Showing skill growth over months
//               </div>
//             </CardFooter>
//           </Card>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <Card className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
//             <CardHeader>
//               <CardTitle>Projects Over Time</CardTitle>
//               <CardDescription>August 2024 - August 2025</CardDescription>
//             </CardHeader>
//             <CardContent className="h-[300px]">
//               <ResponsiveContainer>
//                 <LineChart
//                   data={projectsOverTimeData}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Line
//                     type="monotone"
//                     dataKey="projects"
//                     stroke="#2563eb"
//                     activeDot={{ r: 8 }}
//                     animationBegin={0}
//                     animationDuration={1500}
//                     isAnimationActive={true}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//             <CardFooter className="flex-col items-start gap-2 text-sm">
//               <div className="flex gap-2 leading-none font-medium">
//                 Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//               </div>
//               <div className="text-muted-foreground leading-none">
//                 Showing projects created over time
//               </div>
//             </CardFooter>
//           </Card>

//           <Card className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
//             <CardHeader>
//               <CardTitle>Visitors</CardTitle>
//               <CardDescription>January - June 2024</CardDescription>
//             </CardHeader>
//             <CardContent className="h-[300px]">
//               <ResponsiveContainer>
//                 <AreaChart
//                   data={visitorsData}
//                   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Area
//                     type="monotone"
//                     dataKey="mobile"
//                     stackId="1"
//                     stroke="#16a34a"
//                     fill="#16a34a"
//                     animationBegin={0}
//                     animationDuration={1500}
//                     isAnimationActive={true}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="desktop"
//                     stackId="1"
//                     stroke="#2563eb"
//                     fill="#2563eb"
//                     animationBegin={0}
//                     animationDuration={1500}
//                     isAnimationActive={true}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </CardContent>
//             <CardFooter>
//               <div className="flex w-full items-start gap-2 text-sm">
//                 <div className="grid gap-2">
//                   <div className="flex items-center gap-2 leading-none font-medium">
//                     Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//                   </div>
//                   <div className="text-muted-foreground flex items-center gap-2 leading-none">
//                     January - June 2024
//                   </div>
//                 </div>
//               </div>
//             </CardFooter>
//           </Card>
//         </div>

//         <div className="rounded-lg border bg-gray-100 dark:bg-gray-800 p-6 shadow-sm border-gray-300 dark:border-gray-700">
//           <h3 className="font-semibold mb-4 flex items-center gap-2">
//             Recent Projects
//             {loading.projects && <RefreshCw className="h-4 w-4 animate-spin" />}
//           </h3>
//           {errors.projects ? (
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription>Failed to load recent projects</AlertDescription>
//             </Alert>
//           ) : loading.projects ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="p-3 border rounded-lg animate-pulse">
//                   <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                   <div className="h-3 bg-gray-100 rounded"></div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//               {recentProjects.length ? (
//                 recentProjects.map((p) => (
//                   <div key={p.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
//                     <div className="text-sm font-medium mb-1">{p.title}</div>
//                     <div className="text-xs text-muted-foreground">
//                       {p.description?.slice(0, 60)}...
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="col-span-full text-center text-muted-foreground py-8">
//                   No recent projects found
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </ErrorBoundary>
//   );
// }

// // Custom Tooltip Component
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
//         <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{`Category: ${payload[0].payload.browser || payload[0].name || label}`}</p>
//         {payload.map((entry, index) => (
//           <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
//             {`${entry.name}: ${entry.value}`}
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };
