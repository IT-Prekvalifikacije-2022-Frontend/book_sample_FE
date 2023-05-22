import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { Box, Button, Container, Table, TableBody, TableRow, TableCell, TableContainer,Paper, TableHead } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Modal from "./Modal";
import { useState } from "react";

const ShowGenres = () => {
    const genres = useLoaderData();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [genreId, setGenreId] = useState(null);
    console.log(genres);


    const handleDelete = async () => {
        let response = await fetch(`http://localhost:8080/api/v1/genre/${genreId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            navigate('/genres',{replace:true});
        }else{
            console.log("Neuspeh slanja!");
        }
    }

    const handleCloseModal = (deleteGenre) => {
        if(deleteGenre){
            handleDelete();
        }
        setShowModal(false);
    }

    return <Container> 
        {showModal && <Modal onCloseModal={handleCloseModal}/>}
        <Box sx={{display:"flex", justifyContent:"end", marginBottom:3}}>
            <Button variant="outlined" onClick={()=>navigate('add_new')}>Add New Genre</Button>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center"}}>
            <TableContainer component={Paper} sx={{width:'40%'}}>
            <Table aria-label="simple table">
                <TableBody>
                {genres.map((g) => (
                    <TableRow
                    key={g.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {g.name}
                        </TableCell>
                        <TableCell>
                            <EditIcon onClick={()=>navigate(`update/${g.id}`)} sx={{cursor:"pointer"}}/>
                        </TableCell>
                        <TableCell>
                            <DeleteIcon onClick={()=>{setShowModal(true); setGenreId(g.id)}} sx={{cursor:"pointer"}}/>
                        </TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer> 
        </Box>
     </Container>
}

export default ShowGenres;