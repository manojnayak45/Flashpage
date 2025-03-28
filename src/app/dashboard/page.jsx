"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalQuickPages: 0,
    activeQuickPages: 0,
    totalPublished: 0,
    totalDrafts: 0,
    lastMonthCompanies: 0,
    thisMonthCompanies: 0,
    companyGrowth: 0,
    avgSessionDuration: "0m 0s",
    topVisited: [],
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        console.log("📊 Dashboard Data:", data);
        setStats(data);
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-100 ">
      {/* Overall Views */}
      <div className="bg-gradient-to-r from-purple-700 to-orange-500 p-6 rounded-xl text-white shadow-lg">
        <h2 className="text-xl font-bold">Overall Views</h2>
        <p className="text-sm">This is all over platform views</p>
        <div className="grid grid-cols-4 gap-6 mt-4">
          {[
            { title: "Total Quick Page Created", value: stats.totalQuickPages },
            { title: "Active Quick Pages", value: stats.activeQuickPages },
            { title: "Total Published", value: stats.totalPublished },
            { title: "Total Drafts", value: stats.totalDrafts },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-opacity-40 bg-black p-4 rounded-lg text-center"
            >
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Published Companies & Growth */}
      <div className="grid grid-cols-3 gap-10">
        {/* Published Company Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
          <h2 className="text-lg font-bold">Current Published Company</h2>
          
          <p className="text-3xl font-bold mt-6">{stats.thisMonthCompanies} company</p>

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm text-gray-500">Recently added company</p>
              <p className="font-semibold mt-4">
                {stats.lastMonthCompanies} company -{" "}
                <span className="text-orange-500">February</span>
              </p>
              <p className="text-sm text-green-600 mt-4">
                ⬆ {stats.companyGrowth.toFixed(1)}% vs last Month
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Avg Used Session Duration</p>
              <p className="font-semibold">{stats.avgSessionDuration}</p>
              <p className="text-sm text-red-600">⬇ 25% vs last week</p>
              
            </div>
          </div>

          {/* Growth Indicator */}
          <div className="flex mt-4">
            {/* Last Month */}
            <div className="w-1/2">
              <p className="text-xs text-gray-500">Last Month</p>
              <div className="bg-gray-300 h-[100px] w-64 rounded-md relative">
                <div
                  className="bg-orange-500 h-[100px] rounded-md"
                  style={{ width: `${stats.companyGrowth}%` }}
                ></div>
              </div>
            </div>

            {/* Last Week */}
            <div className="w-1/2 ml-4">
              <p className="text-xs text-gray-500">Last Week</p>
              <div className="bg-gray-300 h-[100px] w-64 rounded-md relative">
                <div
                  className="bg-orange-300 h-[100px] rounded-md"
                  style={{ width: "25%" }} // Static value, replace with real calculation
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Visited Companies */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Top Visited</h2>
          <ul className="mt-4 space-y-3">
            {stats.topVisited.map((company, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span className="text-gray-700">{company._id}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
