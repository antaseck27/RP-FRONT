import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaCamera } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;
const STORAGE_URL = API_URL ? API_URL.replace(/\/api\/?$/, "") : "";

const ListHotels = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [editingHotelId, setEditingHotelId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    price_per_night: "",
    currency: "XOF",
  });

  const openModal = (hotel = null) => {
    if (hotel) {
      setEditingHotelId(hotel.id);
      setFormData({
        name: hotel.name || "",
        address: hotel.address || "",
        email: hotel.email || "",
        phone: hotel.phone || "",
        price_per_night: hotel.price_per_night || "",
        currency: hotel.currency || "XOF",
      });
      if (hotel.image && STORAGE_URL) {
        setSelectedImage(`${STORAGE_URL}/storage/${hotel.image}`);
      } else {
        setSelectedImage(null);
      }
      setImageFile(null);
    } else {
      setEditingHotelId(null);
      setFormData({
        name: "",
        address: "",
        email: "",
        phone: "",
        price_per_night: "",
        currency: "XOF",
      });
      setSelectedImage(null);
      setImageFile(null);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    if (!API_URL) {
      console.error("VITE_API_URL est manquant");
      return;
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/hotels`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (res.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      const data = await res.json();
      const nextHotels = Array.isArray(data) ? data : data?.data || [];
      setHotels(nextHotels);
    } catch (err) {
      console.error("FETCH HOTELS ERROR 👉", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (!API_URL) {
      console.error("VITE_API_URL est manquant");
      setSubmitting(false);
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      setSubmitting(false);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (imageFile) data.append("image", imageFile);

    try {
      const isEditing = Boolean(editingHotelId);
      const url = isEditing
        ? `${API_URL}/hotels/${editingHotelId}`
        : `${API_URL}/hotels`;

      if (isEditing) {
        data.append("_method", "PUT");
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: data,
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        const err = await res.text();
        console.error("BACKEND ERROR 👉", err);
        alert("Erreur serveur lors de l'ajout");
        setSubmitting(false);
        return;
      }

      setFormData({
        name: "",
        address: "",
        email: "",
        phone: "",
        price_per_night: "",
        currency: "XOF",
      });
      setSelectedImage(null);
      setImageFile(null);
      setEditingHotelId(null);
      closeModal();
      fetchHotels();
    } catch (err) {
      console.error("NETWORK ERROR 👉", err);
      alert("Erreur réseau : backend injoignable");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="fixed top-15 left-0 right-0 md:left-[322px] p-6  p-10 shadow-md bg-white flex justify-between items-center rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">
          Hôtels ({Array.isArray(hotels) ? hotels.length : 0})
        </h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          <FaPlus /> Créer un nouvel hôtel
        </button>
      </div>

      {/* Liste des hôtels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-28">
        {(Array.isArray(hotels) ? hotels : []).map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-lg shadow p-2 flex flex-col gap-2"
          >
            {hotel.image ? (
              <img
                src={
                  STORAGE_URL
                    ? `${STORAGE_URL}/storage/${hotel.image}`
                    : ""
                }
                className="h-60 w-full object-cover rounded-lg"
                alt={hotel.name}
              />
            ) : (
              <div className="h-60 w-full bg-gray-200 flex items-center justify-center rounded-lg">
                Pas d'image
              </div>
            )}
            <p className="text-sm text-yellow-900">{hotel.address}</p>
            <h3 className="font-semibold text-lg">{hotel.name}</h3>
            <p className="text-sm py-2">
              {hotel.price_per_night} {hotel.currency} / nuit
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => openModal(hotel)}
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Modifier
              </button>
              <button
                onClick={async () => {
                  if (!API_URL) {
                    console.error("VITE_API_URL est manquant");
                    return;
                  }
                  if (!window.confirm("Supprimer cet hôtel ?")) return;
                  try {
                    const token = localStorage.getItem("authToken");
                    if (!token) {
                      navigate("/login");
                      return;
                    }
                    const res = await fetch(
                      `${API_URL}/hotels/${hotel.id}`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          Accept: "application/json",
                        },
                      }
                    );
                    if (!res.ok) {
                      if (res.status === 401) {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("user");
                        navigate("/login");
                        return;
                      }
                      const err = await res.text();
                      console.error("DELETE ERROR 👉", err);
                      alert("Erreur serveur lors de la suppression");
                      return;
                    }
                    fetchHotels();
                  } catch (err) {
                    console.error("NETWORK ERROR 👉", err);
                    alert("Erreur réseau : backend injoignable");
                  }
                }}
                className="text-sm text-red-600 hover:text-red-700 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-20"
            onClick={closeModal}
          />
          <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 shadow-lg z-10 overflow-y-auto max-h-[95vh] mx-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-2xl font-semibold mb-6">
              {editingHotelId ? "Modifier l'hôtel" : "Créer un nouvel hôtel"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Nom complet de l'hôtel"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Quartier, rue, ville..."
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>

              {/* More inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                  placeholder="contact@hotel.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <input
                  type="tel"
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                  placeholder="+221 77 123 45 67"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Prix en XOF"
                  value={formData.price_per_night}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price_per_night: e.target.value,
                    })
                  }
                  required
                />
                <select
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                >
                  <option value="XOF">XOF</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>

              {/* Image upload */}
              <div>
                <div
                  className="w-full h-72 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    document.getElementById("hotelImageInput").click()
                  }
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

              {/* Submit button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition text-lg font-medium ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={submitting}
              >
                {submitting ? "Enregistrement..." : "Enregistrer l'hôtel"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListHotels;
