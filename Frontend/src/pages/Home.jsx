
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDeleteSweep } from "react-icons/md";


export const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/books/all")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex flex-col">
      {/* Header */}
      {/* from-green-600 to-sky-500 py-6 from-green-600 to-sky-500 py-6 */}
  <header className="w-full bg-purple-700 shadow-lg mb-8">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-2xl tracking-widest">MERN</span>
            </div>
            <span className="font-heading font-bold text-3xl text-white drop-shadow-lg">MERNSTACK</span>
          </Link>
          <div className="flex flex-col items-end">
            <span className="text-white text-lg font-medium">📚📖 Mini Library</span>
            <span className="text-white text-sm">MongoDB | Express | React | Node.js</span>
          </div>
          <Link to="/books/create" className="ml-4">
            <MdOutlineAddBox className="text-white text-5xl hover:text-purple-300 transition" title="Add Book" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
  <main className="flex-1 container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <span className="text-2xl text-gray-500">No books found.</span>
            <Link to="/books/create" className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-700 transition">Add your first book</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-24">
            {books.map((book, index) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col justify-between border-t-4 border-purple-500 relative group"
              >
                <div className="absolute -top-4 -left-4 bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-md">
                  {index + 1}
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 truncate" title={book.title}>{book.title}</h2>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Author:</span> {book.author}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Year:</span> {book.publishYear}</p>
                <p className="text-gray-600 mb-4"><span className="font-semibold">Genre:</span> {book.genre}</p>
                <div className="flex flex-wrap justify-between mt-auto pt-2 border-t border-gray-100 gap-2">
                  <Link to={`/books/details/${book._id}`} className="flex-1 flex justify-center items-center py-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition group-hover:scale-105">
                    <BsInfoCircle className="text-xl text-purple-700" title="Details" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className="flex-1 flex justify-center items-center py-2 rounded-lg bg-purple-50 hover:bg-purple-200 transition group-hover:scale-105">
                    <AiOutlineEdit className="text-xl text-purple-500" title="Edit" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} className="flex-1 flex justify-center items-center py-2 rounded-lg bg-purple-50 hover:bg-purple-200 transition group-hover:scale-105">
                    <MdOutlineDeleteSweep className="text-xl text-purple-800" title="Delete" />
                  </Link>
                  <a
                    href={book.downloadUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-800 transition group-hover:scale-105 font-semibold text-sm"
                    download
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-purple-700 text-white text-center text-lg font-semibold shadow-inner mt-8">
        © {new Date().getFullYear()} Israel Akinboyewa &mdash; Mini Library
      </footer>
    </div>
  );
};
