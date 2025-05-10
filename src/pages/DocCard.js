import React from 'react';

const DocumentCard = ({ title, icon, description, color, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`${color} rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-center`}
    >
      <div className="p-4 bg-white rounded-full shadow-md mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white text-opacity-90 text-sm">{description}</p>
    </div>
  );
};

export default DocumentCard;
