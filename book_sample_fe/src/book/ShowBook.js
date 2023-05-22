import { Card, CardContent, CardHeader, Typography, Button, Grid, Rating } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const ShowBook = ({book, onDelete}) => {
    const navigation = useNavigate();

    const deleteBook = async () => {
        let response = await fetch(`http://localhost:8080/api/v1/book/${book.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            /*onDelete funkcija je prosledjena kao atribut komponenti ShowBook. Pozivom date funkcije poziva se handleDelete funkcija koja menja stanje komponente i samim tim ponovo renderuje i osvezava prikaz */
            onDelete(book.id);
        }else{
            console.log("Neuspeh slanja!");
        }
    }

    return  <Grid item xs={4}>    
            <Card key={book.id} variant="outlined">
                <CardHeader subheader={book.title} sx={{border:"1px solid gray", borderRadius: "3px 3px 0px 0px", textAlign:"center"}}/> 
                <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center", flexWrap:"wrap"}}>
                    <Typography >{book.authors}</Typography>
                    <Typography >Year: {book.year}</Typography>
                    <Typography >ISBN: {book.isbn}</Typography>
                    <Typography >Genre: {book.genre}</Typography>
                    <Rating value={book.rating} readOnly precision={0.5}/>
                    <div>
                        {/*Obratiti paznju na url koji se generise u zavisnosti od toga da li se stavi book/${book.id} ili /book/${book.id}*/}
                        {/*U prvom primeru se kreira relativna putanja koja se samo doda na postojecu, dok se u drugom primeru definise apsolutna putanja*/}
                        <Button onClick={()=>navigation(`book/${book.id}`)}>Details</Button>
                        <Button onClick={deleteBook}>Delete</Button>
                        <Button onClick={()=>navigation(`update/${book.id}`)}>Edit</Button>
                    </div>
                </CardContent>
            </Card> 
            </Grid> 
}

export default ShowBook;