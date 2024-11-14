"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import managePc from "../_helpers/managePc";

const PcForm = () => {
  const [form, setForm] = useState({
    user: "",
    serialNumber: "",
    pcModel: "",
    pcBrand: "",
    date_achat: "",
    date_received: "",
    date_returned: "",
    status: "",
    comment: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    managePc(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-700">Gestion Ordis - Attribution</h2>

      <div className="flex flex-col">
        <label htmlFor="user" className="text-gray-600 mb-2 font-medium">Utilisateur</label>
        <input
          id="user"
          title="Utilisateur"
          type="text"
          name="user"
          value={form.user}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="serialNumber" className="text-gray-600 mb-2 font-medium">Numéro de Série</label>
        <input
          id="serialNumber"
          title="Numéro de Série"
          type="text"
          name="serialNumber"
          value={form.serialNumber}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="pcModel" className="text-gray-600 mb-2 font-medium">Model PC</label>
        <input
          id="pcModel"
          title="Model PC"
          type="text"
          name="pcModel"
          value={form.pcModel}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="pcBrand" className="text-gray-600 mb-2 font-medium">Marque PC</label>
        <input
          id="pcBrand"
          title="Marque PC"
          type="text"
          name="pcBrand"
          value={form.pcBrand}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="date_achat" className="text-gray-600 mb-2 font-medium">Date Achat</label>
        <input
          id="date_achat"
          title="Date Achat"
          type="date"
          name="date_achat"
          value={form.date_achat}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="date_received" className="text-gray-600 mb-2 font-medium">Date Reception</label>
        <input
          id="date_received"
          title="Date Reception"
          type="date"
          name="date_received"
          value={form.date_received}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="date_returned" className="text-gray-600 mb-2 font-medium">Date de retour</label>
        <input
          id="date_returned"
          title="Date de retour"
          type="date"
          name="date_returned"
          value={form.date_returned}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="status" className="text-gray-600 mb-2 font-medium">Etat</label>
        <select
          id="status"
          title="Etat"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="">Selectionner Etat</option>
          <option value="Returned">Retourne</option>
          <option value="In Use">En utilisation</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="commment" className="text-gray-600 mb-2 font-medium">Commentaire</label>
        <textarea
          id="comment"
          title="Commentaire"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default PcForm;
