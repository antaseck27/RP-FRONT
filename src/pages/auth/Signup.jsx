

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHotel } from "react-icons/fa";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name && email && password && acceptedTerms) {
//       // Ici, tu peux appeler ton API pour l'inscription
//       console.log("Inscription réussie");
//       navigate("/dashboard"); // Redirection après succès
//     } else {
//       console.log("Veuillez remplir tous les champs et accepter les termes");
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
//             >
//               S’inscrire
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa";
import { auth, createUserWithEmailAndPassword } from "../../firebase-config"; // Assurez-vous que le chemin soit correct

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && acceptedTerms) {
      // Utilisation de Firebase pour créer un utilisateur
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Inscription réussie, redirection vers le dashboard
          const user = userCredential.user;
          console.log("Inscription réussie", user);
          navigate("/dashboard");
        })
        .catch((error) => {
          // Gérer les erreurs d'inscription
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`Erreur: ${errorCode}, Message: ${errorMessage}`);
        });
    } else {
      console.log("Veuillez remplir tous les champs et accepter les termes");
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
          <h2 className="text-gray-800  mb-4 m-2">
            Créer un compte
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nom */}
            <input
              type="text"
              placeholder="Votre nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[58px] px-3 border-b-2 border-gray-300 
              focus:border-gray-600 outline-none text-gray-800 shadow-sm"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[58px] px-3 border-b-2 border-gray-300 
              focus:border-gray-600 outline-none text-gray-800 shadow-sm"
            />

            {/* Mot de passe */}
            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[58px] px-3 border-b-2 border-gray-300 
              focus:border-gray-600 outline-none text-gray-800 shadow-sm"
            />

            {/* Acceptation termes */}
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

            {/* Bouton inscription */}
            <button
              type="submit"
              className="w-full h-[48px] text-white rounded-lg 
              hover:bg-gray-800 transition font-medium" style={{ backgroundColor: '#494C4F' }}
            >
              S’inscrire
            </button>
          </form>
        </div>

        {/* Liens */}
        <div className="mt-5 text-center text-sm text-white space-y-1">
          <p>
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-yellow-400 hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

