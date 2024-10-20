import {
  BookImage,
  ChevronRight,
  Circle,
  Info,
  LayoutDashboard,
  Plus,
  Puzzle,
  Rocket,
  Search,
  Settings,
  ShoppingCart,
  SquareArrowOutUpRight,
} from 'lucide-react';
import React, { useState } from 'react';
import { Separator } from './components/ui/separator';
import CustomModal from './components/CustomModal';

const sortedExperiences = [
  {
    title: '🧠 Build the content structure',
    company: 'Go to the content type builder',
  },
  {
    title: '⚡ What would you like to share with the world',
    company: 'Content',
  },
  {
    title: '🚀 See the content in action',
    company: 'Launch',
  },
];

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-zinc-200/50 flex gap-4">
      <div
        className={`p-4 h-screen bg-white w-full relative duration-150 ease-linear ${
          sidebarOpen ? 'max-w-[4.5rem]' : 'max-w-52'
        }`}
      >
        <div className="absolute bottom-4 right-0 translate-x-4">
          <button
            className="bg-white rounded-md py-2 hover:bg-zinc-200 duration-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronRight
              className={`${sidebarOpen ? 'rotate-0' : 'rotate-180'}`}
            />
          </button>
        </div>
        <div className="flex flex-col h-full justify-between gap-3">
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 h-8 w-8 rounded flex items-center justify-center text-white">
                S
              </div>
              {!sidebarOpen && <h2 className="font-bold text-2xl">Demo</h2>}
            </div>
            <Separator />
            <div className="flex gap-4 items-center">
              <div className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded">
                <Rocket size={18} />
              </div>
              {!sidebarOpen && <p>Launch</p>}
            </div>
            <Separator />
            <div>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-4">
                  <div className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded">
                    <LayoutDashboard size={18} />
                  </div>
                  {!sidebarOpen && <p>Dashboard</p>}
                </li>
                <li className="flex items-center gap-4">
                  <div className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded">
                    <BookImage size={18} />
                  </div>
                  {!sidebarOpen && <p>Gallery</p>}
                </li>
                <li className="flex items-center gap-4">
                  <div className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded">
                    <Info size={18} />
                  </div>
                  {!sidebarOpen && <p>Information</p>}
                </li>
              </ul>
            </div>
            <Separator size={18} />
            <div>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4">
                  <div className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded">
                    <Puzzle size={18} />
                  </div>
                  {!sidebarOpen && <p>Puzzle</p>}
                </li>
                <li className="flex items-center gap-4">
                  <div className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded">
                    <ShoppingCart size={18} />
                  </div>
                  {!sidebarOpen && <p>Cart</p>}
                </li>
                <li className="flex items-center gap-4">
                  <div className="hover:fill-blue-500 w-fit hover:text-white hover:bg-blue-500 p-2 rounded">
                    <Settings size={18} />
                  </div>
                  {!sidebarOpen && <p>Settings</p>}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-yellow-400 rounded-full"></div>
              {!sidebarOpen && <p>Account</p>}
            </div>
          </div>
        </div>
      </div>
      <main className="h-screen overflow-hidden">
        <div className="p-6">
          <h1 className="text-4xl font-bold">Welcome 👋</h1>
          <p className="py-4 text-base font-medium text-zinc-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
            autem eaque ad deserunt nam ab a voluptas! Ratione, officiis sequi
            excepturi sit est facilis veritatis magnam illum nulla tempore
            inventore fuga delectus quibusdam? Molestias cupiditate corporis ut.
            Assumenda, tenetur unde.
          </p>
          <a href="#" className="text-blue-600 uppercase flex gap-2 py-2">
            SEE MORE ON THIS BLOG{' '}
            <span>
              <SquareArrowOutUpRight size={20} />
            </span>
          </a>
          <div className="bg-white p-10 rounded-sm my-10">
            <h4 className="font-bold text-xl">3 simple steps</h4>
            <div className="space-y-2 relative md:ml-2 py-8">
              {sortedExperiences.map((experience, index) => (
                <div key={index} className="flex items-start gap-6 relative">
                  {/* Line */}
                  {index !== sortedExperiences.length - 1 && (
                    <span className="absolute left-[10px] top-0 h-[60px] my-10 border-l-2 border-gray-300 z-0"></span>
                  )}
                  <div className="bg-blue-800 p-1 w-6 h-6 flex justify-center items-center text-white rounded-full">
                    {index + 1}
                  </div>
                  {/* )} */}
                  {/* Text */}
                  <div className="pl-1 flex flex-col md:gap-1 gap-2 text-sm">
                    <h4 className="font-semibold text-lg text-gray-900">
                      {experience?.title ? <>{experience?.title ?? ''}</> : ''}
                    </h4>
                    <CustomModal
                      trigger={
                        <button className=" bg-blue-700 text-white text-start w-fit px-4 py-1 rounded text-sm my-6">
                          {experience.company ? experience.company : ''}
                        </button>
                      }
                      title={'Share Project Details'}
                      titleStyles={'px-4 py-3 text-medium'}
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
                                <label htmlFor="name">Email</label>
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
              <button className="px-4 py-2 shadow-xl border border-black/20 rounded-md">
                Skip
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
