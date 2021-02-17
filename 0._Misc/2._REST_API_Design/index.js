const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const Book = require('./book');
const book = require('./book');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

if (!fs.existsSync('books.json')) {
    fs.writeFileSync('books.json', "{}")
}

/**
 * Creates a book and writes to the file.
 * @param {Book} book 
 */
async function create(book) {
    const books = await read();
    const newId = books[Object.keys(books).length].id + 2;

    book.id = newId;
    books[newId] = book;
    
    await writeFile('books.json', JSON.stringify(books));

    return book;
}

/**
 * Fetches a book or books from the database.
 * @param {number} [id] - Id of the book to fetch
 * @returns Returns the fetched book or books. 
 */
async function read(id) {
    if (isNaN(id)) {
        const books = await readFile('books.json', 'utf8');
        return JSON.parse(books);
    } else {
        const book = (await read())[id];
        return book;
    }
}

/**
 * Updates a book given an ID
 * @param {number} id - Id of the book to update
 * @param {Partial<Book>} Book - Partial book data
 */
async function update(id, partialBook) {
    const books = await read();
    const book = books[id];

    const updated = {...book, ...partialBook}
    
    books[id] = updated;

    await writeFile("books.json", JSON.stringify(books));
    return updated;
}

/**
 * 
 */
async function _delete(id) {
    const books = await read();
    delete books[id];

    await writeFile("books.json", JSON.stringify(books));
    return;
}

app.get('/books', async (req, res) => {
    return res.status(200).json(await read());
})

app.get('/books/:id', async(req, res) => {
    const id = req.params.id;
    return res.status(200).json(await read(id));
})

app.post('/books', async (req, res) => {
    const {isbn, title, author} = req.body;
    const book = new Book(isbn, title, author)

    return res.status(201).json(await create(book))
})

app.put('/books/:id', async (req,res) => {
    const id = req.params.id;
    const {isbn, title, author} = req.body;
    const partialBook = {isbn, title, author};

    return res.status(200).json(await update(id, partialBook))
})

app.delete('/books/:id', async (req,res) => {
    const id = req.params.id;
    await _delete(id);
    return res.status(200).send();
})

app.listen(3000, () => {
    console.log("Listening...");
});