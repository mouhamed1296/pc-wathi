"use client";

import { useState, useEffect } from "react";
import fetchPCs from "../_helpers/fetchPCs";
import updatePc from "../_helpers/updatePc";

const ListPC = () => {
  const [pcs, setPcs] = useState<{
    user: string;
    serialNumber: string;
    pcModel: string;
    pcBrand: string;
    date_achat: string;
    date_received: string;
    date_returned: string;
    status: string;
    comment: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPC, setEditPC] = useState({
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
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchPCs().then((data) => {
      setPcs(data);
      setLoading(false);
    });
  }, []);

  const handleOpenEditModal = (pc: {
    user: string;
    serialNumber: string;
    pcModel: string;
    pcBrand: string;
    date_achat: string;
    date_received: string;
    date_returned: string;
    status: string;
    comment: string;
  }) => {
    setEditPC(pc);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditPC({
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
  };

  const handleEditSave =  async () => {
    await updatePc(editPC);
    // Logic to save the updated data to backend
    setEditModalOpen(false);
  };

  const listPc = pcs.length > 0 ? (
    pcs.map((pc) => (
      <div key={pc.serialNumber} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Utilisateur : {pc.user}</h2>
          <button
            onClick={() => handleOpenEditModal(pc)}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            ✏️
          </button>
        </div>
        <p className="text-gray-600"><span className="font-medium">Numéro de Série :</span> {pc.serialNumber}</p>
        <p className="text-gray-600"><span className="font-medium">Modèle :</span> {pc.pcModel}</p>
        <p className="text-gray-600"><span className="font-medium">Marque :</span> {pc.pcBrand}</p>
        <p className="text-gray-600"><span className="font-medium">Date de Réception :</span> {new Date(pc.date_received).toLocaleDateString()}</p>
        <p className="text-gray-600"><span className="font-medium">Date de Retour :</span> {new Date(pc.date_returned).toLocaleDateString()}</p>
        <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
          pc.status === "Returned"
            ? "bg-green-100 text-green-800"
            : pc.status === "In Use"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}>
          {pc.status === "In Use" ? "En cours d'utilisation" : pc.status === "Returned" ? "Retourné" : "En Maintenance"}
        </span>
        <p className="text-gray-600"><span className="font-medium">Commentaire :</span> {pc.comment}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center">Aucun PC trouvé.</p>
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="grid gap-6">
        {loading ? (
          <p className="text-gray-500 text-center">Chargement...</p>
        ) : listPc }
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={handleCloseEditModal}
            >
              ✖️
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Modifier PC</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="user" className="block font-medium text-gray-700">Utilisateur</label>
                <input id="user" type="text" defaultValue={editPC?.user} onChange={
                  (e) => setEditPC({ ...editPC, user: e.target.value })
                } className="mt-1 p-2 border rounded w-full" />
              </div>
              <div>
                <label htmlFor="serialNumber" className="block font-medium text-gray-700">Numéro de Série</label>
                <input id="serialNumber" type="text" defaultValue={editPC?.serialNumber} onChange={
                  (e) => setEditPC({ ...editPC, serialNumber: e.target.value })
                } disabled className="mt-1 p-2 border rounded w-full bg-gray-100" />
              </div>
              <div>
                <label htmlFor="pcModel" className="block font-medium text-gray-700">Modèle</label>
                <input id="pcModel" type="text" defaultValue={editPC?.pcModel} onChange={
                  (e) => setEditPC({ ...editPC, pcModel: e.target.value })
                } className="mt-1 p-2 border rounded w-full" />
              </div>
              <div>
                <label htmlFor="pcBrand" className="block font-medium text-gray-700">Marque</label>
                <input id="pcBrand" type="text" defaultValue={editPC?.pcBrand} onChange={
                  (e) => setEditPC({ ...editPC, pcBrand: e.target.value })
                } className="mt-1 p-2 border rounded w-full" />
              </div>
              <div>
                <label htmlFor="date_received" className="block font-medium text-gray-700">Date de Réception</label>
                <input id="date_received" type="date" defaultValue={editPC?.date_received} onChange={
                  (e) => setEditPC({ ...editPC, date_received: e.target.value })
                } className="mt-1 p-2 border rounded w-full" />
              </div>
              <div>
                <label htmlFor="date_returned" className="block font-medium text-gray-700">Date de Retour</label>
                <input id="date_returned" type="date" defaultValue={editPC?.date_returned} onChange={
                  (e) => setEditPC({ ...editPC, date_returned: e.target.value })
                } className="mt-1 p-2 border rounded w-full" />
              </div>
              <div>
                <label htmlFor="status" className="block font-medium text-gray-700">Statut</label>
                <select id="status" defaultValue={editPC?.status} onChange={
                  (e) => setEditPC({ ...editPC, status: e.target.value })
                } className="mt-1 p-2 border rounded w-full">
                  <option value="In Use">En cours d&apos;utilisation</option>
                  <option value="Returned">Retourné</option>
                  <option value="Maintenance">En Maintenance</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment" className="block font-medium text-gray-700">Commentaire</label>
                <textarea id="comment" defaultValue={editPC?.comment} onChange={
                  (e) => setEditPC({ ...editPC, comment: e.target.value })
                } className="mt-1 p-2 border rounded w-full"></textarea>
              </div>
            </form>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseEditModal}
                className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleEditSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPC;
