import React, { useState } from "react";
import { Spinner } from "../components/spinner";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/backButton";
import axios from "axios";
import { MdTitle, MdPerson, MdDateRange, MdCategory, MdSave } from "react-icons/md";

export const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSaveBook = () => {
    if (!title || !author || !publishYear || !genre) {
      alert('Please fill in all fields');
      return;
    }

    const data = {
      title,
      author,
      publishYear,
      genre,
    };

    setLoading(true);
    axios
      .post("http://localhost:3000/books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert('Error occurred while creating book');
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-sky-100 p-6">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Book</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-sky-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">Add a new book to your library collection</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center mb-8">
            <Spinner />
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-gradient-to-r from-green-400 to-sky-400">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveBook(); }}>
            
            {/* Title Field */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                <MdTitle className="text-xl text-green-600 mr-2" />
                Book Title
              </label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the book title"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Author Field */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                <MdPerson className="text-xl text-sky-600 mr-2" />
                Author
              </label>
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter the author's name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Publish Year and Genre Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                  <MdDateRange className="text-xl text-yellow-600 mr-2" />
                  Publish Year
                </label>
                <input 
                  type="number"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  placeholder="e.g., 2023"
                  min="1000"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                  <MdCategory className="text-xl text-purple-600 mr-2" />
                  Genre
                </label>
                <input 
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="e.g., Fiction, Mystery, Romance"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-sky-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <MdSave className="text-2xl" />
                {loading ? 'Creating Book...' : 'Create Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
