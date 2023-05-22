import { useState } from 'react'
import { Container, Box, TextField, Button, Alert } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

const EditGenre = () => {
    const currentGenre = useLoaderData();
    const [newGenreName, setNewGenreName] = useState(currentGenre.name);
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    const editGenre = async () => {
        if(newGenreName === ""){
            setShowError(true);
            setHelperText("Polje ne moze biti prazno.");
            return;
        }
        let response = await fetch(`http://localhost:8080/api/v1/genre/${currentGenre.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newGenreName
            }),
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            setSeverity("success");
            setMessage("Uspesno izmenjen naziv.")
            setShowAlert(true);
        }else{
            console.log("Neuspeh slanja!");
            setSeverity("error");
            setMessage("Naziv zauzet.")
            setShowAlert(true);
        }
    }

    return <Container sx={{display:"flex", justifyContent:"center", alignContent:"center", flexWrap:"wrap", width:"40%"}}>
        <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"end"}}>       
        {showAlert && <Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}} severity={severity}>{message}</Alert>}
        <TextField sx={{width:"100%", marginBottom:4}} id="outlined-basic" label="Genre name" variant="outlined" value={newGenreName} 
        onChange={(e)=>{setNewGenreName(e.target.value)}}
        required
        error={showError}   
        helperText={helperText} 
        />
            <Button variant="outlined" onClick={editGenre}>Save</Button>
        </Box>
    </Container>
}

export default EditGenre;