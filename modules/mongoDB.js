var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/books")
  .then(() => console.log('connect to MongoDB'))
  .catch(err => console.log("error", err));
let mySchema = new mongoose.Schema({
    title: { type: String, required: true },
    isbn: String,
    pageCount: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("page count must be greater than 0");
            }
        }
    },
    publishedDate: Date,
    thumbnailUrl: String,
    status: String,
    authors: [String],
    categories: [String]
});


const Book = mongoose.model("books", mySchema);

module.exports = Book;











