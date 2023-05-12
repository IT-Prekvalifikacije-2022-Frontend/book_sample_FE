import { NavLink, useLoaderData, useNavigate } from 'react-router-dom';
import ShowBook from './ShowBook';
import './show_books.css'
import { useEffect, useState } from 'react';
const ShowBooks = () => { 
    const books = useLoaderData();
    const navigate = useNavigate();

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
        let filteredBooks =[];
        if(e.target.value === 'all'){
            filteredBooks = [...books];
        }else{
            filteredBooks = books.filter((b)=>{ return b.genre === e.target.value});
        }
        setFilteredBooks(filteredBooks)
    }

    /* Lifting the state up ili prosledjivanje podataka od detete ka roditelju */
    /* handleDelete funkcija se poziva onda kada se u ShowBook komponenti pozove onDelete funkcija koja ja prosledjena kao atribut*/
    const handleDelete = (bookId) => {
        const fB = filteredBooks.filter((b)=>{return b.id !== bookId});
        console.log(JSON.stringify(fB, null, 4));
        setFilteredBooks(fB);
    } 

    return <div className='books_container'> 
        {/* search part */}
            <header className="books_container_header">
                    <div class="book_input-container">
                        <input className='book_input-field' type="text" placeholder="Search..." />
                        <button className="book_search_button">Search</button>  
                    </div>
                    
                    <select className='book_select_genre' onChange={filterByGenre}> 
                        <option value="all">All</option>
                        {genres.map((g)=><option value={g.name}>{g.name}</option>)}
                     </select>
                    <button className='add_btn' onClick={()=>{navigate('add_new')}}>Add New Book</button>
            </header>
            <div className="container_show_books">
                {filteredBooks.map((b) => <ShowBook onDelete={handleDelete} book={b}/>)}
            </div>
         </div>
}

export default  ShowBooks;