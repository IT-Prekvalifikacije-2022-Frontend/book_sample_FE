import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useState } from 'react';

const LoginModal = ({onCloseModal}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const userLogin = () => {
           // localStorage.setItem("token", "1234abcd");
            /*
            let response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "test",
                    password: "test"
                }),
            });

            if(response.ok){
                let token = await response.json();
                localStorage.setItem("token", token);
            }else{
                console.log("Neuspeh slanja!");
            }
    }

    */
        if(username === 'test' && password === 'test'){
            const nuser = {
              username: 'test',
              name: 'Test Test',
              token: 'abcd',
              role: 'admin'
            }

            localStorage.setItem("user", JSON.stringify(nuser));
        }else if(username === 'user' && password === 'user') {
            const nuser = {
              username: 'user',
              name: 'User User',
              token: '1234',
              role: 'user'
            }
          localStorage.setItem("user", JSON.stringify(nuser));
      }else{
        return null;
      }

      onCloseModal();
    }
    return (
        <div>
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Login"}
            </DialogTitle>
            <DialogContent sx={{display:"flex", flexDirection:"column"}}>
              <TextField label="Username" variant="outlined" required sx={{marginBottom:"10px"}} onChange={(e)=>{setUsername(e.target.value)}}/>
              <TextField label="Password" variant="outlined" required onChange={(e)=>{setPassword(e.target.value)}}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={userLogin}>Login</Button>
              <Button onClick={()=>{onCloseModal()}}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default LoginModal;