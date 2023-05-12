import { Navigate, useNavigate } from "react-router-dom";

const ShowBook = ({book, onDelete}) => {
    const navigation = useNavigate();

    const deleteBook = async () => {
        let response = await fetch(`http://localhost:8080/api/v1/book/${book.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            /*onDelete funkcija je prosledjena kao atribut komponenti ShowBook. Pozivom date funkcije poziva se handleDelete funkcija koja menja stanje komponente i samim tim ponovo renderuje i osvezava prikaz */
            onDelete(book.id);
        }else{
            console.log("Neuspeh slanja!");
        }
    }

    return  <div key={book.id} className="book_overviewcard">
                <div className="book_title_container"> <p className="book_title">{book.title} </p></div>
                <div className="book__info">
                    <div className="book_authors">{book.authors}</div>
                    <div className="book_year">Year: {book.year}</div>
                    <div className="book_isbn">ISBN: {book.isbn}</div>
                    <div className="book_genre">Genre: {book.genre}</div>
                    <div className="book_rating">Rating: {book.rating}</div>
                </div>
                <div>
                    {/*Obratiti paznju na url koji se generise u zavisnosti od toga da li se stavi book/${book.id} ili /book/${book.id}*/}
                    {/*U prvom primeru se kreira relativna putanja koja se samo doda na postojecu, dok se u drugom primeru definise apsolutna putanja*/}
                    <button className="add_btn" onClick={()=>navigation(`book/${book.id}`)}>Book details</button>
                    <button className="add_btn" onClick={deleteBook}>Delete book</button>
                    <button className="add_btn" onClick={()=>navigation(`update/${book.id}`)}>Edit book</button>
                </div>
            </div>  
}

export default ShowBook;