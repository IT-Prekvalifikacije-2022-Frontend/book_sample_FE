import { NavLink, useLoaderData } from "react-router-dom";
import ShowAuthor from "./ShowAuthor";
import './show_authors.css'
const ShowAuthors = () => {
    const authors = useLoaderData();
    console.log(authors);
    return <div className='authors_container'> 
    {/* search part */}
        <header className="authors_container_header">
            <div class="input-container">
                <input className='input-field' type="text" placeholder="Search..." />
                <button className="search_button">Search</button>  
            </div>
            <button className='add_btn'><NavLink to="add_new">Add New Author</NavLink></button>
        </header>
        <div className="container_show_authors">
                {authors.map((a) => <ShowAuthor author={a}/>)}
        </div>
     </div>
}

export default ShowAuthors;