"use client";

import { useState } from "react";
import PcForm from './_components/PcForm';
import ListPC from './_components/ListPC';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Image src="/logo.webp" alt="Wathi" width={100} height={100} className="rounded-full mx-auto mb-5" />
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("form")}
          className={`px-4 py-2 rounded-t-lg font-semibold ${
            activeTab === "form" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          Formulaire
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 rounded-t-lg font-semibold ${
            activeTab === "list" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          Liste des PCs
        </button>
      </div>

      <div className="p-6 bg-white shadow-md rounded-b-lg">
        {activeTab === "form" ? <PcForm /> : <ListPC />}
      </div>
    </div>
  );
}
