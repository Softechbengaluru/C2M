import React, { useState } from "react";
import {
  BookImage,
  ChevronRight,
  Info,
  LayoutDashboard,
  Rocket,
  Search,
  Settings,
  SquareArrowOutUpRight,
} from "lucide-react";
import { BiBarChart } from "react-icons/bi";
import { FiTerminal } from "react-icons/fi";
import { Separator } from "./components/ui/separator";
import CustomModal from "./components/CustomModal";
import CreateCollectionModal from "./components/CreateCollectionModal";
import ShowContent from "./components/show-content";
import TableStructure from "./components/table";
import CreateContent from "./components/create-content";
import Data from "./components/data";
import DeleteContent from "./components/delete-content";
import QueryEditor from "./components/QueryEditor";
import Chart from "./components/chart";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const sortedExperiences = [
  {
    title: "🧠 Build the content structure",
    company: "Go to the content type builder",
  },
  {
    title: "⚡ What would you like to share with the world",
    company: "Create Content",
  },
  {
    title: "🚀 See the content in action",
    company: "Launch",
  },
];

const Content = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="p-6">
        <h1 className="text-4xl font-bold">Welcome 👋</h1>
        <p className="py-4 text-base font-medium text-zinc-500">
          Effortlessly convert your Cassandra databases to MongoDB with just a
          few clicks. Seamless database creation and migration directly from our
          intuitive UI. Empower your workflow with fast, hassle-free DB
          management between Cassandra and MongoDB.
        </p>
        <a href="#" className="text-blue-600 uppercase flex gap-2 py-2">
          SEE MORE ON THIS BLOG{" "}
          <span>
            <SquareArrowOutUpRight size={20} />
          </span>
        </a>

        {true && ( // You can replace 'true' with your condition to show experiences
          <div className="bg-white p-10 rounded-sm my-10">
            <h4 className="font-bold text-xl">3 simple steps</h4>
            <div className="space-y-2 relative md:ml-2 py-8">
              {sortedExperiences.map((experience, index) => (
                <div key={index} className="flex items-start gap-6 relative">
                  {index !== sortedExperiences.length - 1 && (
                    <span className="absolute left-[10px] top-0 h-[60px] my-10 border-l-2 border-gray-300 z-0"></span>
                  )}
                  <div className="bg-blue-800 p-1 w-6 h-6 flex justify-center items-center text-white rounded-full">
                    {index + 1}
                  </div>
                  <div className="pl-1 flex flex-col md:gap-1 gap-2 text-sm">
                    <h4 className="font-semibold text-lg text-gray-900">
                      {experience?.title ? <>{experience?.title ?? ""}</> : ""}
                    </h4>
                    <CustomModal
                      trigger={
                        <button className="bg-blue-700 text-white text-start w-fit px-4 py-1 rounded text-sm my-6">
                          {experience.company ? experience.company : ""}
                        </button>
                      }
                      title={"Share Project Details"}
                      titleStyles={"px-4 py-3 text-medium"}
                    >
                      <div className="flex h-full w-full border-t px-4 pt-4">
                        <label htmlFor="email" className="w-full">
                          <div className="mt-2">
                            <div className="relative">
                              <input
                                className="border border-black/30 w-full py-2 px-4 rounded-full outline-none"
                                placeholder="Search"
                              />
                              <span className="absolute top-2.5 right-2">
                                <Search size={20} className="text-gray-400" />
                              </span>
                            </div>
                            <div className="h-full overflow-y-auto custom-scroll mt-4 flex flex-col gap-4">
                              <div className="w-full flex items-center justify-between">
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="border border-black/30 bg-zinc-50 px-4 py-1 rounded-md"
                                  placeholder="name"
                                />
                              </div>
                              <div className="w-full flex items-center justify-between">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="border border-black/30 bg-zinc-50 px-4 py-1 rounded-md"
                                  placeholder="Email"
                                />
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="px-4 py-4 flex gap-2 justify-end">
                        <button className="bg-gray-100 text-black px-4 py-2 rounded-md hover:text-white hover:border-transparent border border-black/50 w-[100px] hover:bg-blue-600">
                          Cancel
                        </button>
                        <button className="bg-[#0D77D4] w-[100px] text-white px-4 py-2 rounded-md hover:bg-blue-600">
                          Submit
                        </button>
                      </div>
                    </CustomModal>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 shadow-xl border border-black/20 rounded-md"
                onClick={() => console.log("Skip clicked")} // Replace with your function
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// const CreateContent = () => {
//   return (
//     <div className="h-screen p-6">
//       <h1 className="text-4xl font-bold">Create Content 📄</h1>
//       <p className="py-4 text-base font-medium text-zinc-500">
//         Here you can create new content to share with the world. Fill out the
//         form below to get started.
//       </p>
//       <div className="bg-white p-10 rounded-sm">
//         <label className="block mb-4">
//           <span className="text-gray-700">Content Title</span>
//           <input
//             type="text"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             placeholder="Enter your content title"
//           />
//         </label>
//         <label className="block mb-4">
//           <span className="text-gray-700">Content Description</span>
//           <textarea
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             rows="4"
//             placeholder="Enter your content description"
//           />
//         </label>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//           Submit Content
//         </button>
//       </div>
//     </div>
//   );
// };

// const Data = () => {
//   return (
//     <div className="h-screen p-6">
//       <h1 className="text-4xl font-bold">Data ℹ️</h1>
//       <p className="py-4 text-base font-medium text-zinc-500">
//         This page contains Data about our services and how to use the
//         application effectively.
//       </p>
//     </div>
//   );
// };

const Setting = () => {
  return (
    <div className="h-screen p-6">
      <h1 className="text-4xl font-bold">Settings ⚙️</h1>
      <p className="py-4 text-base font-medium text-zinc-500">
        Here you can configure your application settings. Make sure to save any
        changes you make.
      </p>
      {/* You can add any additional settings here */}
    </div>
  );
};

// const TableStructure = () => {
//   return (
//     <div className="h-screen p-6">
//       <h1 className="text-4xl font-bold">Table Structure 📊</h1>
//       <p className="py-4 text-base font-medium text-zinc-500">
//         View the structure of your database tables.
//       </p>
//       <div className="bg-white p-6 rounded-md shadow-md">
//         <h2 className="text-xl font-semibold">Table Structure</h2>
//         <table className="mt-4 w-full border">
//           <thead>
//             <tr className="border-b">
//               <th className="py-2">Column Name</th>
//               <th className="py-2">Data Type</th>
//               <th className="py-2">Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-2">id</td>
//               <td className="py-2">UUID</td>
//               <td className="py-2">Unique identifier for each content</td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2">title</td>
//               <td className="py-2">String</td>
//               <td className="py-2">Title of the content</td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-2">description</td>
//               <td className="py-2">Text</td>
//               <td className="py-2">Description of the content</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const DeleteContent = () => {
//   const handleDelete = () => {
//     // Add delete functionality here
//     console.log("Content deleted!");
//   };

//   return (
//     <div className="h-screen p-6">
//       <h1 className="text-4xl font-bold">Delete Content 🗑️</h1>
//       <p className="py-4 text-base font-medium text-zinc-500">
//         Select the content you want to delete.
//       </p>
//       {/* Dummy content for deletion */}
//       <div className="bg-white p-6 rounded-md shadow-md">
//         <h2 className="text-xl font-semibold">Content List</h2>
//         <ul className="mt-4">
//           <li className="flex justify-between items-center border-b py-2">
//             Content Title 1
//             <button className="text-red-500" onClick={handleDelete}>
//               Delete
//             </button>
//           </li>
//           <li className="flex justify-between items-center border-b py-2">
//             Content Title 2
//             <button className="text-red-500" onClick={handleDelete}>
//               Delete
//             </button>
//           </li>
//           <li className="flex justify-between items-center border-b py-2">
//             Content Title 3
//             <button className="text-red-500" onClick={handleDelete}>
//               Delete
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreateCollectionModalOpen, setCreateCollectionModalOpen] =
    useState(false);

  return (
    <Router>
      <div className="bg-zinc-200/50 flex gap-4">
        <div
          className={`p-4 h-screen bg-white w-full relative duration-150 ease-linear ${
            sidebarOpen ? "max-w-[4.5rem]" : "max-w-52"
          }`}
        >
          <div className="absolute bottom-4 right-0 translate-x-4">
            <button
              className="bg-white rounded-md py-2 hover:bg-zinc-200 duration-200"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <ChevronRight
                className={`${sidebarOpen ? "rotate-0" : "rotate-180"}`}
              />
            </button>
          </div>
          <div className="flex flex-col h-full justify-between gap-3">
            <div className="flex gap-2 flex-col">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500 h-8 w-8 rounded flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/28LxQN9/Screenshot-2024-10-20-at-20-45-34.png"
                    alt="Your Image"
                    className="h-full w-full object-cover rounded"
                  />
                </div>
                {!sidebarOpen && <h2 className="font-bold text-2xl">C2M</h2>}
              </div>
              <Separator />
              <div className="flex gap-4 items-center">
                <Link
                  to="/dashboard"
                  className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                >
                  <Rocket size={18} />
                </Link>
                {!sidebarOpen && <p>Launch</p>}
              </div>
              <Separator />
              <div>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-4">
                    <Link
                      to="/dashboard"
                      className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                    >
                      <LayoutDashboard size={18} />
                    </Link>
                    {!sidebarOpen && <p>Dashboard</p>}
                  </li>
                  <li className="flex items-center gap-4">
                    <Link
                      to="/create-content"
                      className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                    >
                      <BookImage size={18} />
                    </Link>
                    {!sidebarOpen && (
                      <p onClick={() => setCreateCollectionModalOpen(true)}>
                        Create Content
                      </p>
                    )}
                  </li>
                  <li className="flex items-center gap-4">
                    <Link
                      to="/data"
                      className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                    >
                      <Info size={18} />
                    </Link>
                    {!sidebarOpen && <p>Data</p>}
                  </li>
                  <li className="flex items-center gap-4">
                    <Link
                      to="/settings"
                      className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                    >
                      <Settings size={18} />
                    </Link>
                    {!sidebarOpen && <p>Settings</p>}
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-4">
                    <Link
                      to="/show-content"
                      className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                    >
                      <BookImage size={18} />
                    </Link>
                    {!sidebarOpen && <p>Show Content</p>}
                  </li>
                  <li className="flex items-center gap-4">
                    <Link
                      to="/table-structure"
                      className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                    >
                      <LayoutDashboard size={18} />
                    </Link>
                    {!sidebarOpen && <p>Table Structure</p>}
                  </li>
                  <li className="flex items-center gap-4">
                    <Link
                      to="/delete-content"
                      className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                    >
                      <LayoutDashboard size={18} />
                    </Link>
                    {!sidebarOpen && <p>Delete Content</p>}
                  </li>
                  <li className="flex items-center gap-4">
                    <Link
                      to="/query"
                      className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                    >
                      <FiTerminal size={18} />
                    </Link>
                    {!sidebarOpen && <p>Query</p>}
                  </li>
                  <li className="flex items-center gap-4">
                    <Link
                      to="/chart"
                      className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded"
                    >
                      <BiBarChart size={18} />
                    </Link>
                    {!sidebarOpen && <p>Charts</p>}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/dashboard" element={<Content />} />
          <Route path="/create-content" element={<CreateContent />} />
          <Route path="/data" element={<Data />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/show-content" element={<ShowContent />} />
          <Route path="/table-structure" element={<TableStructure />} />
          <Route path="/delete-content" element={<DeleteContent />} />
          <Route path="/query" element={<QueryEditor />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </div>
      <CreateCollectionModal
        isOpen={isCreateCollectionModalOpen}
        onClose={() => setCreateCollectionModalOpen(false)}
      />
    </Router>
  );
};

export default App;
