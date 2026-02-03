// const StatCard = ({ icon, value, label, bg = "bg-gray-600" }) => {
//   return (
//     <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow">
//       <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${bg}`}>
//         {icon}
//       </div>
//       <div>
//         <div className="text-2xl font-bold text-gray-900">{value}</div>
//         <div className="text-sm text-gray-500">{label}</div>
//       </div>
//     </div>
//   );
// };

// export default StatCard;
const StatCard = ({ icon, value, label, bg = "bg-gray-600" }) => {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow">
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${bg}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
