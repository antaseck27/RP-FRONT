

import { useState } from "react";
import { FaStar, FaPlus, FaCamera } from "react-icons/fa";

const ListHotels = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
  <div className=" body flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 shadow-lg p-4 rounded-lg ">
  {/* Titre */}
  <div>
    <h2 className="text-2xl font-semibold text-gray-800">Liste des hôtels</h2>
    <p className="text-gray-500 text-sm">Gestion et consultation des hôtels</p>
  </div>

  {/* Bouton */}
  <button
    onClick={openModal}
    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition self-start md:self-auto"
  >
    <FaPlus /> Créer un nouvel hôtel
  </button>
</div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay léger */}
          <div
            className="absolute inset-0 bg-black opacity-20"
            onClick={closeModal}
          />

          <div className="relative bg-white rounded-lg w-full max-w-full md:max-w-5xl p-6 shadow-lg z-10 overflow-y-auto max-h-[95vh] mx-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-2xl font-semibold mb-6">Créer un nouvel hôtel</h3>

            <form className="space-y-6">
              {/* Row 1 : Nom + Adresse */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom de l'hôtel</label>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Nom complet de l'hôtel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Adresse</label>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Quartier, rue, ville..."
                  />
                </div>
              </div>

              {/* Row 2 : Email + Téléphone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">E-mail</label>
                  <input
                    type="email"
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                    placeholder="contact@hotel.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                  <input
                    type="tel"
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                    placeholder="+221 77 123 45 67"
                  />
                </div>
              </div>

              {/* Row 3 : Prix + Devise */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prix par nuit</label>
                  <input
                    type="number"
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Prix en XOF"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Devise</label>
                  <select
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="XOF">XOF</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              {/* Row 4 : Upload photo avec placeholder */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ajouter une photo
                </label>

                <div
                  className="w-full h-70 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  onClick={() => document.getElementById("hotelImageInput").click()}
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="object-cover w-full h-full rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <FaCamera size={40} />
                      <span>Ajouter photo</span>
                    </div>
                  )}
                  <input
                    type="file"
                    id="hotelImageInput"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {/* Button enregistrer */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition text-lg font-medium"
              >
                Enregistrer l'hôtel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListHotels;

