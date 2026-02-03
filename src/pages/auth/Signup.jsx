

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHotel } from "react-icons/fa";

// const API_URL = import.meta.env.VITE_API_URL;

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("authToken")) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!name || !email || !password || !acceptedTerms) {
//       setError("Veuillez remplir tous les champs et accepter les termes");
//       return;
//     }

//     if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
//       setError("L'email n'est pas valide");
//       return;
//     }

//     if (password.length < 8) {
//       setError("Le mot de passe doit comporter au moins 8 caractères");
//       return;
//     }

//     if (!API_URL) {
//       setError("VITE_API_URL est manquant");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           password_confirmation: password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Erreur lors de l'inscription");
//         return;
//       }

//       if (data.token) {
//         localStorage.setItem("authToken", data.token);
//       }
//       if (data.user) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//       }

//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setError("Erreur réseau, veuillez réessayer plus tard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen login flex justify-center items-center p-4">
//       <div className="w-[340px] -mt-[50px] h-auto">
        
//         {/* Logo */}
//         <div className="flex justify-center mb-8">
//           <div className="flex items-center gap-2">
//             <FaHotel size={26} className="text-white" />
//             <h1 className="text-2xl font-bold text-white tracking-wide">
//               RED Product
//             </h1>
//           </div>
//         </div>

//         {/* Card formulaire */}
//         <div className="bg-white rounded-md p-8 shadow-xl">
//           <h2 className="text-gray-800  mb-4 m-2">
//             Créer un compte
//           </h2>

//           {error && (
//             <p className="text-red-500 mb-2" aria-live="assertive">
//               {error}
//             </p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* Nom */}
//             <input
//               type="text"
//               placeholder="Votre nom complet"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full h-[58px] px-3 border-b-2 border-gray-300 
//               focus:border-gray-600 outline-none text-gray-800 shadow-sm"
//             />

//             {/* Email */}
//             <input
//               type="email"
//               placeholder="Votre email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full h-[58px] px-3 border-b-2 border-gray-300 
//               focus:border-gray-600 outline-none text-gray-800 shadow-sm"
//             />

//             {/* Mot de passe */}
//             <input
//               type="password"
//               placeholder="Votre mot de passe"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full h-[58px] px-3 border-b-2 border-gray-300 
//               focus:border-gray-600 outline-none text-gray-800 shadow-sm"
//             />

//             {/* Acceptation termes */}
//             <div className="flex items-center text-sm text-gray-600 p-2">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 className="mr-2"
//                 checked={acceptedTerms}
//                 onChange={(e) => setAcceptedTerms(e.target.checked)}
//               />
//               <label htmlFor="terms">
//                 Accepte les <span className="">termes et la politique</span>
//               </label>
//             </div>

//             {/* Bouton inscription */}
//             <button
//               type="submit"
//               className="w-full h-[48px] text-white rounded-lg 
//               hover:bg-gray-800 transition font-medium" style={{ backgroundColor: '#494C4F' }}
//               disabled={loading}
//             >
//               {loading ? "Chargement..." : "S’inscrire"}
//             </button>
//           </form>
//         </div>

//         {/* Liens */}
//         <div className="mt-5 text-center text-sm text-white space-y-1">
//           <p>
//             Vous avez déjà un compte ?{" "}
//             <a href="/login" className="text-yellow-400 hover:underline">
//               Se connecter
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !acceptedTerms) {
      setError("Veuillez remplir tous les champs et accepter les termes");
      return;
    }

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setError("L'email n'est pas valide");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit comporter au moins 8 caractères");
      return;
    }

    if (!API_URL) {
      setError("VITE_API_URL est manquant");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors de l'inscription");
        return;
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erreur réseau, veuillez réessayer plus tard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen login flex justify-center items-center p-4">
      <div className="w-[340px] -mt-[50px] h-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <FaHotel size={26} className="text-white" />
            <h1 className="text-2xl font-bold text-white tracking-wide">
              RED Product
            </h1>
          </div>
        </div>

        {/* Card formulaire */}
        <div className="bg-white rounded-md p-8 shadow-xl">
          <h2 className="text-gray-800  mb-4 m-2">Créer un compte</h2>

          {error && (
            <p className="text-red-500 mb-2" aria-live="assertive">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Votre nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[58px] px-3 border-b-2 border-gray-300 
              focus:border-gray-600 outline-none text-gray-800 shadow-sm"
            />
            <input
              type="email"
              autoComplete="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[58px] px-3 border-b-2 border-gray-300 
              focus:border-gray-600 outline-none text-gray-800 shadow-sm"
            />
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[58px] px-3 border-b-2 border-gray-300 
              focus:border-gray-600 outline-none text-gray-800 shadow-sm"
            />

            <div className="flex items-center text-sm text-gray-600 p-2">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                Accepte les <span className="">termes et la politique</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-[48px] text-white rounded-lg 
              hover:bg-gray-800 transition font-medium"
              style={{ backgroundColor: "#494C4F" }}
              disabled={loading}
            >
              {loading ? "Chargement..." : "S’inscrire"}
            </button>
          </form>
        </div>

        <div className="mt-5 text-center text-sm text-white space-y-1">
          <p>
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
