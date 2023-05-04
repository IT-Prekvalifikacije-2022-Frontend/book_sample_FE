const ShowBook = ({book}) => {
    return  <div className="book_overviewcard">
                <div className="book_title_container"> <p className="book_title">{book.title} </p></div>
                <div className="book__info">
                    <div className="book_authors">{book.authors}</div>
                    <div className="book_year">Year: {book.year}</div>
                    <div className="book_isbn">ISBN: {book.isbn}</div>
                    <div className="book_genre">Genre: {book.genre}</div>
                    <div className="book_rating">Rating: {book.rating}</div>
                </div>
            </div>  
}

export default ShowBook;