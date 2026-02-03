// src/pages/Dashboard.jsx
import { Mail, MessageCircle, Users, Building2, FileText } from "lucide-react";
import StatCard from "../../components/StatCard";

const Dashboard = () => {
  return (
    <div className=" ">
      <div className="fixed top-15 left-0 right-0 md:left-[322px] p-10 shadow-md p-6 bg-white  welcome-section">
        <h1 className="text-2xl font-bold ">Bienvenue sur RED Product</h1>
        <p className="text-gray-500 ">Vue globale de votre plateforme</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-30 mt-2">
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          value="125"
          label="Formulaires"
          bg="bg-purple-600"
        />

        <StatCard
          icon={<MessageCircle className="w-6 h-6" />}
          value="40"
          label="Messages"
          bg="bg-green-600"
        />

        <StatCard
          icon={<Users className="w-6 h-6" />}
          value="600"
          label="Utilisateurs"
          bg="bg-yellow-600"
        />

        <StatCard
          icon={<Mail className="w-6 h-6" />}
          value="25"
          label="E-mails"
          bg="bg-red-600"
        />

        <StatCard
          icon={<Building2 className="w-6 h-6" />}
          value="40"
          label="Hôtels"
          bg="bg-purple-500"
        />

        <StatCard
          icon={<Users className="w-6 h-6" />}
          value="02"
          label="Entités"
          bg="bg-blue-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;
