import { useLoaderData, useNavigate } from "react-router-dom";
import ShowAuthor from "./ShowAuthor";
import { Container, Box, Button } from "@mui/material";
const ShowAuthors = () => {
    const authors = useLoaderData();
    const navigation = useNavigate();

    return <Container> 
        <Box sx={{display:"flex", justifyContent:"end", marginBottom:3}}>
            <Button variant="outlined" onClick={()=>{navigation('add_new')}}>Add New Author</Button>
        </Box>
        <Box>
                {authors.map((a) => <ShowAuthor author={a}/>)}
        </Box>
     </Container>
}

export default ShowAuthors;