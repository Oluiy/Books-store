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
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'list'

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

  // Filter books once for both views
  const filteredBooks = books.filter((book) => {
    const q = search.toLowerCase();
    const matchesSearch =
      book.title?.toLowerCase().includes(q) ||
      book.author?.toLowerCase().includes(q) ||
      book.genre?.toLowerCase().includes(q);
    const matchesGenre = genre === "all" || book.genre === genre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-purple-700 shadow-lg mb-3">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-3">
          <Link to="/" className="flex items-center space-x-2 mb-2 sm:mb-0">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-lg sm:text-2xl tracking-wider">
                MERN
              </span>
            </div>
            <span className="font-heading font-bold text-xl sm:text-3xl text-white drop-shadow-lg">
              MERNSTACK
            </span>
          </Link>
          <div className="flex flex-col items-center sm:items-end mb-2 sm:mb-0">
            <span className="text-white text-sm sm:text-lg font-medium">
              📚📖 Mini Library
            </span>
            <span className="text-white text-xs sm:text-sm text-center sm:text-right">
              MongoDB | Express | React | Node.js
            </span>
          </div>
          <Link to="/books/create" className="ml-0 sm:ml-4">
            <MdOutlineAddBox
              className="text-white text-3xl sm:text-5xl hover:text-purple-300 transition"
              title="Add Book"
            />
          </Link>
        </div>
      </header>

      <section className="w-full bg-purple-300 py-3 sm:py-4 mb-6 sm:mb-8 shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">
            Welcome to Your Mini Library
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your book collection with ease. Add, edit, view details, and
            delete books as you like.
          </p>
        </div>
      </section>
      {/* Filtering UI */}
      <section className="w-full flex flex-col items-center gap-3 px-3 sm:px-4 mb-6 sm:mb-8">
        <div className="w-full max-w-4xl space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3 sm:items-end">
          {/* Search Input */}
          <div className="flex-1 min-w-0 sm:min-w-[250px]">
            <label htmlFor="search" className="block text-sm font-medium text-purple-700 mb-1">
              Search Books
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search for any book..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-purple-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
          
          {/* Genre Filter */}
          <div className="sm:min-w-[140px]">
            <label htmlFor="genre" className="block text-sm font-medium text-purple-700 mb-1">
              Genre
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full border border-purple-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            >
              <option value="all">All Genres</option>
              {[
                ...new Set(books.map((book) => book.genre).filter(Boolean)),
              ].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          
          {/* View Mode */}
          <div className="sm:min-w-[120px]">
            <label htmlFor="viewMode" className="block text-sm font-medium text-purple-700 mb-1">
              View
            </label>
            <select
              id="viewMode"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="w-full border border-purple-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            >
              <option value="card">📱 Cards</option>
              <option value="list">📋 List</option>
            </select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="w-full max-w-4xl">
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            {loading ? 'Loading...' : `Showing ${filteredBooks.length} of ${books.length} books`}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-3 sm:px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-6xl mb-4">📚</div>
            <span className="text-lg sm:text-2xl text-gray-500 mb-2">No books found</span>
            <p className="text-sm text-gray-400 mb-4">
              {search || genre !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Start building your library!"}
            </p>
            <Link
              to="/books/create"
              className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition-colors"
            >
              Add your first book
            </Link>
          </div>
        ) : viewMode === "list" ? (
          <div className="overflow-hidden rounded-lg shadow-lg mb-6">
            {/* Mobile: Card-like list items */}
            <div className="block sm:hidden">
              {filteredBooks.map((book, index) => (
                <div key={book._id} className="bg-white border-b border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{book.title}</h3>
                      <p className="text-xs text-gray-600">{book.author}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{book.genre}</span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{book.publishYear}</span>
                      </div>
                    </div>
                    <span className="ml-2 text-xs font-bold text-purple-600 bg-purple-50 w-6 h-6 rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <Link
                      to={`/books/details/${book._id}`}
                      className="flex-1 text-center py-2 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/books/edit/${book._id}`}
                      className="flex-1 text-center py-2 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/books/delete/${book._id}`}
                      className="flex-1 text-center py-2 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    >
                      Delete
                    </Link>
                    <a
                      href={`books/download/${book._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                      download
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop: Table view */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">#</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Title</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Author</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Year</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Genre</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book, index) => (
                    <tr
                      key={book._id}
                      className="border-b border-gray-200 hover:bg-purple-50 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-purple-700">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{book.title}</td>
                      <td className="py-3 px-4 text-gray-700">{book.author}</td>
                      <td className="py-3 px-4 text-gray-700">{book.publishYear}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                          {book.genre}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/books/details/${book._id}`}
                            className="p-2 rounded bg-purple-100 hover:bg-purple-200 transition"
                            title="View Details"
                          >
                            <BsInfoCircle className="text-purple-700" />
                          </Link>
                          <Link
                            to={`/books/edit/${book._id}`}
                            className="p-2 rounded bg-blue-100 hover:bg-blue-200 transition"
                            title="Edit Book"
                          >
                            <AiOutlineEdit className="text-blue-700" />
                          </Link>
                          <Link
                            to={`/books/delete/${book._id}`}
                            className="p-2 rounded bg-red-100 hover:bg-red-200 transition"
                            title="Delete Book"
                          >
                            <MdOutlineDeleteSweep className="text-red-700" />
                          </Link>
                          <a
                            href={`books/download/${book._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                            title="Download Book"
                            download
                          >
                            Download
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-6">
            {filteredBooks.map((book, index) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col border border-gray-100 hover:border-purple-200 relative group"
              >
                {/* Book Number Badge */}
                <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold shadow-md text-xs sm:text-sm z-10">
                  {index + 1}
                </div>
                
                {/* Book Content */}
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                    {book.title}
                  </h2>
                  
                  <div className="space-y-1 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">Author:</span> {book.author}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">Year:</span> {book.publishYear}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">Genre:</span>
                      <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                        {book.genre}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-gray-100">
                  <Link
                    to={`/books/details/${book._id}`}
                    className="flex items-center justify-center py-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors group/btn"
                  >
                    <BsInfoCircle className="text-purple-600 group-hover/btn:scale-110 transition-transform" />
                    <span className="ml-1 text-xs font-medium text-purple-600">Details</span>
                  </Link>
                  
                  <Link
                    to={`/books/edit/${book._id}`}
                    className="flex items-center justify-center py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group/btn"
                  >
                    <AiOutlineEdit className="text-blue-600 group-hover/btn:scale-110 transition-transform" />
                    <span className="ml-1 text-xs font-medium text-blue-600">Edit</span>
                  </Link>
                  
                  <Link
                    to={`/books/delete/${book._id}`}
                    className="flex items-center justify-center py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors group/btn"
                  >
                    <MdOutlineDeleteSweep className="text-red-600 group-hover/btn:scale-110 transition-transform" />
                    <span className="ml-1 text-xs font-medium text-red-600">Delete</span>
                  </Link>
                  
                  <a
                    href={book.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors group/btn"
                    download
                  >
                    <span className="text-xs font-medium text-white">📥 Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-3 sm:py-4 bg-purple-700 text-white text-center shadow-inner mt-6 sm:mt-8">
        <div className="container mx-auto px-4">
          <p className="text-xs sm:text-base font-medium">
            © {new Date().getFullYear()} Israel Akinboyewa — Mini Library
          </p>
          <p className="text-xs sm:text-sm mt-1">
            Portfolio:{" "}
            <a 
              href="https://israel-portfolio-2b0a9e5b3341.herokuapp.com/" 
              className="underline hover:text-purple-200 transition-colors"
              style={{ textDecorationThickness: '2px' }} 
              target="_blank"
              rel="noopener noreferrer"
            >
              MyPortfolio
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
