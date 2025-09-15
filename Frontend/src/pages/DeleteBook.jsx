import React, { useEffect, useState } from "react";
import { BackButton } from "../components/backButton";
import { Spinner } from "../components/spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdWarning, MdDelete, MdCancel } from "react-icons/md";

export const DeleteBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setInitialLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
        setInitialLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setInitialLoading(false);
        alert("Error loading book details");
      });
  }, [id]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Error occurred while deleting book!");
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
      <div className="max-w-2xl mx-auto">
        <BackButton />
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
              <MdWarning className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Delete Book</h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">This action cannot be undone</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center mb-8">
            <Spinner />
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-200">
          {/* Warning Section */}
          <div className="bg-purple-600 text-white p-6 rounded-t-3xl">
            <div className="flex items-center justify-center">
              <MdWarning className="text-3xl mr-3" />
              <h2 className="text-2xl font-bold">Confirmation Required</h2>
            </div>
          </div>

          {/* Book Details */}
          <div className="p-8">
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                You are about to delete the following book:
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-600">Title:</span>
                  <span className="text-gray-800 font-medium">{book.title}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-600">Author:</span>
                  <span className="text-gray-800">{book.author}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-600">Year:</span>
                  <span className="text-gray-800">{book.publishYear}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-gray-600">Genre:</span>
                  <span className="text-gray-800">{book.genre}</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <MdWarning className="text-purple-400 text-xl mr-3" />
                <p className="text-purple-700 font-medium">
                  Warning: This action is permanent and cannot be undone. The book will be completely removed from your library.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("/")}
                disabled={loading}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <MdCancel className="text-2xl" />
                Cancel
              </button>
              
              <button
                onClick={handleDeleteBook}
                disabled={loading}
                className="flex-1 bg-purple-700 hover:bg-purple-900 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <MdDelete className="text-2xl" />
                {loading ? "Deleting..." : "Delete Book"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
