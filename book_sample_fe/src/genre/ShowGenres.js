import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { Box, Button, Container, Table, TableBody, TableRow, TableCell, TableContainer,Paper, TableHead } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { valid_login } from "../login_logic";

const ShowGenres = () => {
    const genres = useLoaderData();
    const navigate = useNavigate();
    console.log(genres);
     
    return <Container> 
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
                            {(valid_login(['admin'])) && <EditIcon onClick={()=>navigate(`update/${g.id}`)} sx={{cursor:"pointer"}}/>}
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