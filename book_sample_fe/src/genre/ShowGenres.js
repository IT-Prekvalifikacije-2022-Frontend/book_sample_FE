import { NavLink, useLoaderData } from "react-router-dom";
import './show_genres.css'
const ShowGenres = () => {
    const genres = useLoaderData();
    console.log(genres);

    return <div className='books_container'> 
    {/* search part */}
        <header className="books_container_header">
            <div class="input-container">
                <input className='input-field' type="text" placeholder="Search..." />
                <button className="search_button">Search</button>  
            </div>
            <button className='add_btn'><NavLink to="add_new">Add New Genre</NavLink></button>
        </header>
        <div className="container_show_genres">
            <ul className="genres_overviewcard">
            {genres.map((g) => <li className="genre_item">{g.name}</li>)}
            </ul>
                
        </div>
     </div>
}

export default ShowGenres;