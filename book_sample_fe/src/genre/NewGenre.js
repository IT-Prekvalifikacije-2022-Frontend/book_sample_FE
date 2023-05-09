import { useState } from 'react'
import './new_genres.css'
const NewGenre = () => {
    const [txt, setTxt] = useState("");

    const addNewGenre = async () => {
            let response = await fetch("http://localhost:8080/api/v1/genre", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: txt
                }),
            });
            if(response.ok){
                let d = await response.json();
                console.log(JSON.stringify(d, null, 4));
            }else{
                console.log("Neuspeh slanja!");
            }
    }
    return <div className='new-genre-container' >
        <div className='form-container'>
            <div className="input-container">            
                    <div className="search_button">Genre name</div> 
                    <input className='input-field' type="text" value={txt} onChange={(e) => {
                        setTxt(e.target.value);
                    }}/> 
            </div>
            <button className='save_btn' onClick={addNewGenre}>Save</button>
        </div>
    </div>
}

export default NewGenre;