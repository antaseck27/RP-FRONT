// // export default ForgotPassword;
 

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEnvelope } from "react-icons/fa";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState(""); // pour confirmation ou erreur
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email) {
//       setMessage("Veuillez saisir votre e-mail.");
//       return;
//     }

//     // Ici tu feras ton fetch POST vers l'API forget password
//     // Exemple:
//     // fetch("/api/forgot-password", { method: "POST", body: JSON.stringify({ email }) })

//     setMessage(
//       "Si cet e-mail existe dans notre base, nous vous avons envoyé un lien pour réinitialiser votre mot de passe."
//     );
//   };

//   return (
//     <div className="min-h-screen login flex justify-center items-center p-4">
//       <div className="w-[340px] -mt-50 h-auto">
//         {/* Logo */}
//         <div className="flex justify-center mb-8">
//           <h1 className="text-2xl font-bold text-white tracking-wide">
//             RED Product
//           </h1>
//         </div>

//         {/* Card */}
//         <div className="bg-white rounded-md p-8 shadow-xl">
//           <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
//             Mot de passe oublié ?
//           </h2>
//           <p className="text-gray-600 text-sm text-center mb-6">
//             Entrez votre e-mail ci-dessous et nous vous enverrons des instructions pour modifier votre mot de passe.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <input
//               type="email"
//               placeholder="Votre email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full h-[55px] px-3 border-b-2 border-gray-300 
//               focus:border-gray-600 outline-none text-gray-800 shadow-sm"
//             />

//             {/* Bouton */}
//             <button
//               type="submit"
//               className="w-full h-[48px] bg-gray-900 text-white rounded-lg 
//               hover:bg-gray-800 transition font-medium"
//             >
//               Envoyer les instructions
//             </button>
//           </form>

//           {/* Message de confirmation */}
//           {message && (
//             <p className="text-green-600 text-sm mt-4 text-center">
//               {message}
//             </p>
//           )}
//         </div>

//         {/* Lien retour */}
//         <div className="mt-5 text-center text-sm text-gray-400 space-y-1">
//           <p>
//             <a href="/login" className="text-yellow-400 hover:underline">
//               Retour à la connexion
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
  import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";  // Assure-toi que cette importation est correcte

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");  // Pour les messages d'erreur ou de succès
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Veuillez saisir votre e-mail.");
      return;
    }

    // Appel Firebase pour envoyer un lien de réinitialisation du mot de passe
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Un lien de réinitialisation a été envoyé à votre e-mail.");
      })
      .catch((error) => {
        setMessage("Une erreur est survenue. Veuillez réessayer.");
        console.error(error.message);
      });
  };

  return (
    <div className="min-h-screen login flex justify-center items-center p-4">
      <div className="w-[340px] -mt-50 h-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            RED Product
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-md p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
            Mot de passe oublié ?
          </h2>
          <p className="text-gray-600 text-sm text-center mb-6">
            Entrez votre e-mail ci-dessous et nous vous enverrons des instructions pour modifier votre mot de passe.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[55px] px-3 border-b-2 border-gray-300 
              focus:border-gray-600 outline-none text-gray-800 shadow-sm"
            />

            {/* Bouton */}
            <button
              type="submit"
              className="w-full h-[48px] bg-gray-900 text-white rounded-lg 
              hover:bg-gray-800 transition font-medium"
            >
              Envoyer les instructions
            </button>
          </form>

          {/* Message de confirmation */}
          {message && (
            <p className="text-green-600 text-sm mt-4 text-center">
              {message}
            </p>
          )}
        </div>

        {/* Lien retour */}
        <div className="mt-5 text-center text-sm text-gray-400 space-y-1">
          <p>
            <a href="/login" className="text-yellow-400 hover:underline">
              Retour à la connexion
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
