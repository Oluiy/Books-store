import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackButton } from "../components/backButton";
import { Spinner } from "../components/spinner";
import { useParams } from "react-router-dom";
import { MdTitle } from "react-icons/md";

export const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();


  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/Books/${id}`)
    .then((res) => {
      setBook(res.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }, [])

  return (
    <div>
      <BackButton />
      <h1 className="text-4xl my-4">Show book details</h1>
      {loading ? (
        <Spinner />
        ) : (
          <div className='flex flex-col border-2 border-sky-500 rounded-xl w-fit'>
            <div className='my-4'>
              <span className="text-xl mr-5 text-gray-400">Id</span>
              <span>{book._id}</span>
            </div>
          </div>
        )}
    </div>
  )


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/Books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[400px] p-4 ">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 ">Id:</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 ">Title: </span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 ">Author: </span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 ">Publish-Year: </span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 ">Genre: </span>
            <span>{book.genre}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 ">Create time: </span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-600 ">
              Last update time
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};
