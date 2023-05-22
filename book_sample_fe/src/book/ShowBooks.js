import { NavLink, useLoaderData, useNavigate } from 'react-router-dom';
import ShowBook from './ShowBook';
import './show_books.css'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select, MenuItem, Container, Box, Grid } from '@mui/material';

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

    return <Container> 
            <Box sx={{display:"flex", justifyContent:"space-between", marginBottom:3}}>
                     <FormControl sx={{width:"30%"}} size="small">
                        <InputLabel id="filter">Filter</InputLabel>
                        <Select
                            labelId="filter"
                            id="filter"
                            label="Filter"
                            onChange={filterByGenre}
                        >
                            <MenuItem value="all">
                                <em>All</em>
                            </MenuItem>
                            {genres.map((g)=><MenuItem value={g.name}>{g.name}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <Button variant="outlined" onClick={()=>{navigate('add_new')}}>Add New Book</Button>
            </Box>
            <Grid container spacing={2}>
                {filteredBooks.map((b) => <ShowBook onDelete={handleDelete} book={b}/>)}
            </Grid>
         </Container>
}

export default  ShowBooks;