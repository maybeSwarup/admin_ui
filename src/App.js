import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config';
import Users from './components/Users';
import { Pagination, Stack, Button } from '@mui/material';
import EditUser from './components/EditUser';

function App() {
  const [data, setData] = useState()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [checked, setChecked] = useState([])
  const [currentUsers, setCurrentUsers] = useState([])

  const loadData = async () => {
    setLoading(true)
    const res = await axios.get(config.endpoint)
    setData(res.data)
    setUsers(res.data)
    // console.log(users)
    setLoading(false)
  }

  const loadCurrentUsers = () => {
    const lastIndex = currentPage * config.usersPerPage
    const firstIndex = lastIndex - config.usersPerPage
    setCurrentUsers(users.slice(firstIndex, lastIndex))
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setTotalPages(Math.ceil(users.length / config.usersPerPage))
    loadCurrentUsers()
  }, [users])

  useEffect(() => {
    loadCurrentUsers()
  }, [currentPage])

  const changePage = (e, pageNumber) => {
    setChecked([])
    setCurrentPage(pageNumber)
  }

  const deleteSelected = () => {
    const filteredUsers = users.filter(user => !checked.includes(user.id))
    setUsers(filteredUsers)
    setData(filteredUsers)
    setChecked([])
  }

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => setOpen(id);
  const handleClose = () => setOpen(0);
  const editUser = (id) => {
    console.log(id)
    handleOpen(id)
  }

  const deleteUser = (id) => {
    const filteredUsers = users.filter(user => user.id !== id)
    setUsers(filteredUsers)
    setData(filteredUsers)
  }

  const performSearch = (query) => {
    console.log(query)
    if (!query) {
      setUsers(data)
      loadCurrentUsers()
    }
    else {
      const regex = new RegExp(query + '*')

      const filteredUsers = data.filter(currentUser => (regex.test(currentUser.name) || regex.test(currentUser.email) || regex.test(currentUser.role)))
      setUsers(filteredUsers)
    }
  }

  const debounceSearch = (event, debounceTimeout) => {
    console.log(event.target.value, debounceTimeout)
    const timeoutId = setTimeout(() => { performSearch(event.target.value) }, debounceTimeout)
    // clearTimeout(timeoutId)
  };

  return (
    <div className="App">
      <input
        id='search-input'
        placeholder='Search by name, email or role'
        onChange={(e) => debounceSearch(e, 1000)}
      />

      <Users
        loading={loading}
        users={currentUsers}
        checked={checked}
        setChecked={setChecked}
        editUser={editUser}
        deleteUser={deleteUser}
      />
      <EditUser open={open} handleClose={handleClose} users={users} setUsers={setUsers} />

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-around"
        alignItems='center'
        sx={{ position: 'sticky', bottom: 0, background: 'white', padding: '0.75rem auto' }}
      >
        <Button variant='contained' sx={{ maxWidth: "400px", borderRadius: '2rem' }} onClick={deleteSelected}>Delete Selected</Button>
        <Pagination
          showFirstButton
          showLastButton
          count={totalPages}
          page={currentPage}
          onChange={changePage}
        />
      </Stack>
    </div>
  );
}

export default App;
