const Books = require("../models/books");
const User = require("../models/user");

const { Op, fn, col } = require("sequelize");

exports.addBook = async (req, res, next) => {
  console.log(req.body);
  const { bookname } = req.body;

  try {
    const returnDate = new Date();
    returnDate.setMinutes(returnDate.getMinutes() + 1);

    const newBook = await Books.create({
      bookname,
      date: new Date(),
      return: returnDate,
      fine: 0,
      status: "borrowed",
    });
    return res.status(200).json(newBook);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const BookData = await Books.findAll();

    const afterUpdate = BookData.map((book) => {
      if (book.status === "borrowed") {
        const returnDate = new Date(book.return);
        const currentDate = new Date();
        const hourOverDue = Math.max(
          0,
          (currentDate - returnDate) / (100 * 60 * 60)
        );
        const lateFee = hourOverDue * 10;
        book.lateFee = lateFee;
      }
      return {
        id: book.id,
        date: book.date,
        bookname: book.bookname,
        return: book.return,
        lateFee: book.lateFee,
        status: book.status,
      };
    });

    res.status(200).json(afterUpdate);
  } catch (err) {
    console.log(err);
  }
};

exports.returnBook = async (req, res, next) => {
  console.log(req.body);
  const { bookId, fine } = req.body;
  console.log(fine)
  try {
    const bookData = await Books.findByPk(bookId);
    if (bookData) {
      bookData.return = new Date();
      bookData.lateFee = fine;
      bookData.status = "returned";

      await bookData.save();
      res.status(200).json({ message: "Book returned successfully", bookData });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
