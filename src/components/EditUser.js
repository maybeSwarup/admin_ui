import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: "50%",
    display: 'flex',
    flexDirection: 'column'
};

export default function EditUser({ open, handleClose, users, setUsers }) {
    const user = users.filter(user => user.id == open)[0]
    // console.log(user)

    const changeName = (e) => user.name = e.target.value
    const changeEmail = (e) => user.email = e.target.value
    const changeRole = (e) => user.role = e.target.value

    const handleSubmit = (e) => {
        users = users.map(thisUser => thisUser.id == user.id ? user : thisUser)
        setUsers(users)
        handleClose()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        sx={{ margin: '1rem auto' }}
                        fullWidth
                        onChange={changeName}
                    /><TextField
                        required
                        id="outlined-required"
                        label="Email"
                        sx={{ margin: '1rem auto' }}
                        fullWidth
                        onChange={changeEmail}
                    /><TextField
                        required
                        id="outlined-required"
                        label="Role"
                        sx={{ margin: '1rem auto' }}
                        fullWidth
                        onChange={changeRole}
                    />
                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                </Box>
            </Modal>
        </div>
    );
}
