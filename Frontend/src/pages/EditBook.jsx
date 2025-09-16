import React, { useEffect, useState } from "react";
import { BackButton } from "../components/backButton";
import { Spinner } from "../components/spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdTitle, MdPerson, MdDateRange, MdCategory, MdEdit } from "react-icons/md";

export const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate(); 
  const {id} = useParams(); 

  useEffect(() => {
    setInitialLoading(true);
    axios
      .get(`/books/${id}`)
      .then((res) => {
        const b = res.data?.data || {};
        setAuthor(b.author || "");
        setGenre(b.genre || "");
        setPublishYear(b.publishYear || "");
        setTitle(b.title || "");
        setInitialLoading(false);
      })
      .catch((error) => {
        setInitialLoading(false);
        alert(`An error occurred while loading book data. Please check the console.`);
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
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
      .patch(`/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert("Error occurred while updating book!");
        console.log(error);
      });
  };

  if (initialLoading) {
    return (
  <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Book</h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">Update the book information below</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center mb-8">
            <Spinner />
          </div>
        )}

  <div className="bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-purple-500">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleEditBook(); }}>
            
            {/* Title Field */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                <MdTitle className="text-xl text-purple-600 mr-2" />
                Book Title
              </label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the book title"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                required
              />
            </div>


            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                <MdPerson className="text-xl text-purple-400 mr-2" />
                Author
              </label>
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter the author's name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                  <MdDateRange className="text-xl text-purple-400 mr-2" />
                  Publish Year
                </label>
                <input 
                  type="number"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  placeholder="e.g., 2023"
                  min="1000"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
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
                className="w-full bg-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <MdEdit className="text-2xl" />
                {loading ? 'Updating Book...' : 'Update Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// setLoading(true);
// axios
//   .patch(`http://localhost:3000/books/${id}`, data)
//   .then(() => {
//     setLoading(false);
//     navigate("/");
//   })
//   .catch((error) => {
//     setLoading(false);
//     alert("error occured");
//     console.log(error);
//   });
