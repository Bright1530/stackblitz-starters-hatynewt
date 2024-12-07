import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">ScripturaQuest</Link>
          
          {user && (
            <div className="flex items-center space-x-6">
              <Link to="/" className="hover:text-blue-200">Accueil</Link>
              <Link to="/leaderboard" className="hover:text-blue-200">Classement</Link>
              <Link to="/statistics" className="hover:text-blue-200">Statistiques</Link>
              <div className="flex items-center space-x-4">
                <span>👤 {user.username}</span>
                <button
                  onClick={logout}
                  className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-400"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          )}
          
          {!user && (
            <Link to="/login" className="hover:text-blue-200">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
}