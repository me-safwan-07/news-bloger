import React from 'react'
import { dashboardSidebarData } from "../../data"
import { Link } from 'react-router-dom'

function DashboardSidebar() {
  return (
    <>
      <aside className='w-1/5 bg-gray-800 text-white h-screen flex flex-col'>
        <div className="flex flex-col justify-start items-start p-5 space-y-4">
          {dashboardSidebarData.map((data, index) => (
            <Link
              key={index}
              to={data.link}
              className="w-full py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
              {data.title}
            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}

export default DashboardSidebar
