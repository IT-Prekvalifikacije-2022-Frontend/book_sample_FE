import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const EditBook = () => {
    const book = useLoaderData();
    console.log(book);
    const [title, setTitle] = useState(book.title);
    const [isbn, setIsbn] = useState(book.isbn);
    const [year, setYear] = useState(book.year);
    const [rating, setRating] = useState(book.rating);
    const [genre, setGenre] = useState(book.genre);
    const [author, setAuthor] = useState(book.authors[0]);

    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);


    useEffect(() => { //A
        let ignore = false; 
        const ff = async () => { //B
            let r = await fetch("http://localhost:8080/api/v1/genre");
            let rr = await r.json();
            if(!ignore){
                setGenres(rr);
            }
        };
        ff();
        return () => { //C
            ignore = true;
        };
    }, []);

    useEffect(() => { //A
        let ignore = false; 
        const ff = async () => { //B
            let r = await fetch("http://localhost:8080/api/v1/author");
            let rr = await r.json();
            if(!ignore){
                setAuthors(rr);
            }
        };
        ff();
        return () => { //C
            ignore = true;
        };
    }, []);

    const updateBook = async () => {
            let response = await fetch(`http://localhost:8080/api/v1/book/${book.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    isbn: isbn,
                    year: year,
                    rating: rating,
                    genre: genre,
                    authors: [author]
                }),
            });
            if(response.ok){
                let d = await response.json();
                console.log(JSON.stringify(d, null, 4));
            }else{
                console.log("Neuspeh slanja!");
            }
    }
    return <div className='new-book-container' >
        <div className='form-container'>
            <div className="input-container">            
                    <div className="search_button">Book title</div> 
                    <input className='input-field' type="text" value={title} onChange={(e) => {
                        setTitle(e.target.value);
                    }}/> 
            </div>
            <div className="input-container">  
                    <div className="search_button">ISBN</div> 
                    <input className='input-field' type="text" value={isbn} onChange={(e) => {
                        setIsbn(e.target.value);
                    }}/> 
            </div>
            <div className="input-container">  
                    <div className="search_button">Year</div> 
                    <input className='input-field' type="text" value={year} onChange={(e) => {
                        setYear(e.target.value);
                    }}/> 
            </div>
            <div className="input-container">  
                    <div className="search_button">Rating</div> 
                    <input className='input-field' type="text" value={rating} onChange={(e) => {
                        setRating(e.target.value);
                    }}/> 
            </div>
            <div className="input-container">  
                <select className='select_genre' value={genre} onChange={(e) => setGenre(e.target.value)}> 
                    {genres.map((g)=><option value={g.name}>{g.name}</option>)}
                </select>
            </div>
            <div className="input-container">  
                <select className='select_genre' value={author} onChange={(e) => setAuthor(e.target.value)}> 
                    
                    {authors.map((a)=><option value={a.name}>{a.name}{console.log(author)}</option>)}
                </select>
            </div>
            <button className='save_btn' onClick={updateBook}>Update</button>
        </div>
    </div>
}

export default EditBook;