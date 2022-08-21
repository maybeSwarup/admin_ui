import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import { Box } from '@mui/system';
import config from '../config';
import './Users.css'
import { Stack } from '@mui/material';

export default function Users({ loading, users, checked, setChecked, editUser, deleteUser }) {
  if (loading) return <h2>Loading...</h2>

  const handleToggle = (value) => () => {
    if (value === 'all') {
      if (checked.length === users.length) {
        setChecked([])
      } else {
        const allUserIds = users.map(user => user.id)
        setChecked(allUserIds)
      }
      return null
    }

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    // console.log(checked.length, users.length, checked.length === users.length)
  };

  return (
    // List Header
    <List sx={{ width: '100%', height: "100%", bgcolor: 'background.paper' }}>
      <ListItem sx={{ borderBottom: '1px solid #666', display: 'flex', justifyContent: 'space-between', width: '100%' }} >
        <Checkbox
          disabled={!users.length}
          edge="start"
          checked={checked.length === users.length}
          onClick={handleToggle('all')}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': 'listHeader' }}
        />
        <ListItemText disableTypography sx={{ fontWeight: 'bold', display: { md: 'none' } }} primary="Details" />
        <ListItemText disableTypography sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'inline' } }} primary="Name" />
        <ListItemText disableTypography sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'inline' }, textAlign: 'center'  }} primary="Email" />
        <ListItemText disableTypography sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'inline' }, textAlign: 'right'  }} primary="Role" />
        <ListItemText disableTypography sx={{ fontWeight: 'bold', textAlign: 'right' }} primary="Action" />
      </ListItem>

      {/* Users List */}
      {users.map((user, i) => {
        const labelId = `checkbox-list-label-${user.id}`

        return (
          <ListItem
            key={user.id}
            secondaryAction={
              <>
                <Button aria-label="action1" onClick={() => editUser(user.id)}>
                  <Edit className='action-button' />
                </Button>
                <Button aria-label="action2" onClick={() => deleteUser(user.id)}>
                  <DeleteIcon className='action-button' />
                </Button>
              </>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(user.id)}
              dense
              divider
            >
              <Checkbox
                edge="start"
                checked={checked.indexOf(user.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-evenly' sx={{ width: '100%' }}>
                <ListItemText disableTypography id={labelId} primary={user.name} />
                <ListItemText disableTypography id={labelId} primary={user.email} />
                <ListItemText disableTypography id={labelId} primary={user.role} />
              </Stack>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  )
}