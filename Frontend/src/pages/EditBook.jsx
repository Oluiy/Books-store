import React, { useEffect, useState } from "react";
import { BackButton } from "../components/backButton";
import { Spinner } from "../components/spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const EditBook = () => {
  const [title, setTitle] = useState(" ");
  const [author, setAuthor] = useState(" ");
  const [publishYear, setPublishYear] = useState(" ");
  const [genre, setGenre] = useState(" ");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const {id} = useParams(); 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setGenre(res.data.genre);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(`An error occured please check the console`);
        console.log(error);
      });
  }, [])
  //data required to be entered;

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      genre,
    };
    setLoading(true);
    axios
      .patch(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
       navigate('/')
      })
      .catch((error) => {
        setLoading(false);
        alert("error occured!!!");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-8">Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-4xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={title}
            className="border-2 rounded-xl border-gray-500 w-full px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="text-4xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 rounded-xl border-gray-500 w-full px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="text-4xl mr-4 text-gray-500">Publishyear</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 rounded-xl border-gray-500 w-full px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="text-4xl mr-4 text-gray-500">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border-2 rounded-xl border-gray-500 w-full px-4 py-2"
          />
        </div>
        <button
          onClick={handleEditBook}
          className="p-2 bg-sky-300 m-8 rounded-2xl"
        >
          Edit Book
        </button>
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
