import ShowBook from './ShowBook';
import './show_books.css'
const ShowBooks = () => {
    // samo za kreiranje css-a napravicu dummy podatke 
    const books = [
        {title: 'Na Drini Cuprija', isbn: '1213j34h5jhj6', authors:['Ivo Andric'], year: 1945, rating: 9, genre: 'roman'},
        {title: 'Rat i mir', isbn: '1213j34h5jhj6', authors:['Lav Tolstoj'], year: 1869, rating: 9, genre: 'roman'},
        {title: 'Od pasnjaka do naucenjaka', isbn: '1213j34h5jhj6', authors:['Mihailo Pupin'], year: 1923, rating: 9, genre: 'autobiografija'},
        {title: 'Sesir profesora Koste Vujica', isbn: '1213j34h5jhj6', authors:['Milovan Vitezovic'], year: 1978, rating: 9, genre: 'roman'},
        {title: 'Ana Karenjina', isbn: '1213j34h5jhj6', authors:['Lav Tolstoj'], year: 1877, rating: 9, genre: 'roman'},
        {title: 'Znakovi pored puta', isbn: '1213j34h5jhj6', authors:['Ivo Andric'], year: 1976, rating: 9, genre: 'roman'},
        {title: 'Most na Zepi', isbn: '1213j34h5jhj6', authors:['Ivo Andric'], year: 1925, rating: 9, genre: 'roman'}
    ]
    return <div className='books_container'> 
        {/* search part */}
            <header className="books_container_header">
                    <input className='search' type="text" placeholder="Search..." />
                    <select className='select_genre'> <option> Genre </option> </select>
                    <button className='add_btn'> Add new book</button>
            </header>
            <div className="container_show_books">
                {books.map((b) => <ShowBook book={b}/>)}
            </div>
         </div>
}

export default  ShowBooks;