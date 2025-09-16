import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackButton } from "../components/backButton";
import { Spinner } from "../components/spinner";
import { useParams } from "react-router-dom";
import { MdTitle, MdPerson, MdDateRange, MdCategory, MdSchedule, MdUpdate } from "react-icons/md";

export const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Book Details</h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-purple-500">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Main Book Info */}
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-2xl">
                  <div className="flex items-center mb-3">
                    <MdTitle className="text-2xl text-purple-600 mr-3" />
                    <span className="text-lg font-semibold text-gray-700">Title</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{book.title}</p>
                </div>

                <div className="bg-purple-100 p-6 rounded-2xl">
                  <div className="flex items-center mb-3">
                    <MdPerson className="text-2xl text-purple-400 mr-3" />
                    <span className="text-lg font-semibold text-gray-700">Author</span>
                  </div>
                  <p className="text-xl text-gray-800">{book.author}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                    <div className="flex items-center mb-2">
                      <MdDateRange className="text-xl text-purple-400 mr-2" />
                      <span className="font-semibold text-gray-700">Publish Year</span>
                    </div>
                    <p className="text-lg text-gray-800">{book.publishYear}</p>
                  </div>

                  <div className="bg-purple-100 p-4 rounded-xl border-l-4 border-purple-500">
                    <div className="flex items-center mb-2">
                      <MdCategory className="text-xl text-purple-600 mr-2" />
                      <span className="font-semibold text-gray-700">Genre</span>
                    </div>
                    <p className="text-lg text-gray-800">{book.genre}</p>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Database Information</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Book ID</span>
                      </div>
                      <p className="text-sm text-gray-700 font-mono bg-gray-100 p-2 rounded break-all">{book._id}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <MdSchedule className="text-lg text-purple-400 mr-2" />
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Created</span>
                      </div>
                      <p className="text-sm text-gray-700">{new Date(book.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center mb-2">
                        <MdUpdate className="text-lg text-purple-600 mr-2" />
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Last Updated</span>
                      </div>
                      <p className="text-sm text-gray-700">{new Date(book.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Download Button */}
            <div className="mt-8 flex justify-center">
              <a
                href={book.downloadUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-purple-800 transition text-lg"
                download
              >
                Download Book
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
