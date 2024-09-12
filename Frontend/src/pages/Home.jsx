import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
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
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-500 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-[10px]"> No</th>
              <th className="border border-slate-600 rounded-[10px]"> Title</th>
              <th className="border border-slate-600 rounded-[10px] max-md:hidden">
                {" "}
                Author
              </th>
              <th className="border border-slate-600 rounded-[10px] max-md:hidden">
                {" "}
                Publish-Year
              </th>
              <th className="border border-slate-600 rounded-[10px] max-md:hidden">
                {" "}
                Genre
              </th>
              <th className="border border-slate-600 rounded-[10px]">
                {" "}
                operations
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.genre}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-yellow-600" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDeleteSweep className="text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <footer className="fixed bottom-[calc(20px+env(safe-area-inset-top))] left-[46.8%]">© Israel Akinboyewa</footer>
    </div>
  );
};
