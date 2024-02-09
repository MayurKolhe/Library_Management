import React, { useEffect, useState } from "react";

const Book = () => {
  const [bookName, setBookName] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [selectedFineBook, setSelectedFineBook] = useState(null);

  const handleInputChange = (e) => {
    setBookName(e.target.value);
  };

  const handleBorrowBook = async () => {
    try {
      const response = await fetch("http://localhost:3000/addBook", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          bookname: bookName,
        }),
      });
      if (response.ok) {
        console.log("Book Added Successfully");
        getBookesUsrData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookesUsrData = async () => {
    try {
      const response = await fetch("http://localhost:3000/getBooks", {
        method: "GET",
        headers: {
          "content-type": "Application/json",
        },
      });
        const data = await response.json();
        console.log(data);
      if (data.length > 0) {
        setBorrowedBooks(data.filter((book) => book.status === "borrowed"));
        setReturnedBooks(data.filter((book) => book.status === "returned"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturnBook = (bookId) => {
    const selectedBook = borrowedBooks.find((book) => book.id === bookId);
    setSelectedFineBook(selectedBook);
  };

  const handlePayFine = async () => {
    try {
      const response = await fetch("http://localhost:3000/returnBook", {
        method: "POST",
        headers: {
          "content-type": "Application/json",
        },
        body: JSON.stringify({
          bookId: selectedFineBook.id,
          fine: selectedFineBook.lateFee,
        }),
      });
      if (response.ok) {
        await getBookesUsrData();
        setSelectedFineBook(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookesUsrData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Library Management App
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter book name"
          value={bookName}
          onChange={handleInputChange}
          className="border p-2 w-64 mr-2"
        />
        <button
          onClick={handleBorrowBook}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Borrow Book
        </button>
      </div>
      <div className="w-2/3 bg-gray-200 p-4 mr-4">
        <h2 className="text-xl font-bold mb-2">Borrowed Books</h2>
        {borrowedBooks.length === 0 ? (
          <h1>No Books Borrowed</h1>
        ) : (
          borrowedBooks.map((book) => (
            <div key={book.id} className="mb-2">
              <h2>Book Name: {book.bookname}</h2>
              <h5>Books Taken on: {book.date}</h5>
              <h5>Books Return Date: {book.return}</h5>
              <h5>
                <b>Current Fine: {book.lateFee} Rs</b>
              </h5>
              <button
                onClick={() => handleReturnBook(book.id)}
                className="ml-4 bg-green-500 text-white px-2 py-1"
              >
                Return
              </button>
            </div>
          ))
        )}
      </div>
      {selectedFineBook && (
        <div className="bg-gray-200 p-4">
          <h2 className="text-xl font-bold mb-2">Fine Details</h2>
          <p>Book Name: {selectedFineBook.bookname}</p>
          <p>Current Fine: {selectedFineBook.lateFee} Rs</p>
          <button
            onClick={handlePayFine}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Pay Fine
          </button>
        </div>
      )}
      <div className="w-1/3 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-2">Returned Books</h2>
        {returnedBooks.length === 0 ? (
          <h1>No Books Returned</h1>
              ) : (
          returnedBooks.map((book) => (
              <div key={book.id} className="mb-2">
              <h2>Book Name: {book.bookname}</h2>
              <h5>Books Taken on: {book.date}</h5>
              <h5>Books Return Date: {book.return}</h5>
              <h5>
                <b>Returned Fine: {book.lateFee} Rs</b>
              </h5>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Book;
