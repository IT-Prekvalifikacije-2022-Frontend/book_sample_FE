import { NavLink, useLoaderData } from 'react-router-dom';
import ShowBook from './ShowBook';
import './show_books.css'
import { useEffect, useState } from 'react';
const ShowBooks = () => { 
    const books = useLoaderData();
    const [genres, setGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(books);

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

    const filterByGenre = (e) => {
        console.log(e.target.value);
        const filteredBooks = books.filter((b)=>{ console.log(b); return b.genre === e.target.value});
        console.log(filteredBooks);
        setFilteredBooks(filteredBooks)
    }
    return <div className='books_container'> 
        {/* search part */}
            <header className="books_container_header">
                    <div class="input-container">
                        <input className='input-field' type="text" placeholder="Search..." />
                        <button className="search_button">Search</button>  
                    </div>
                    
                    <select className='select_genre' onChange={filterByGenre}> 
                    {console.log(genres)}
                        {genres.map((g)=><option value={g.name}>{g.name}</option>)}
                     </select>
                    <button className='add_btn'><NavLink to="add_new">Add New Book</NavLink></button>
            </header>
            <div className="container_show_books">
                {filteredBooks.map((b) => <ShowBook book={b}/>)}
            </div>
         </div>
}

export default  ShowBooks;