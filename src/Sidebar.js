import React from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography, Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Sidebar({ chats, onNewChat, onChatSelect, currentChatId, isMobile, isOpen, onClose }) {
  const sidebarContent = (
    <>
      <Button 
        variant="outlined" 
        startIcon={<AddIcon />} 
        onClick={onNewChat}
        sx={{ m: 1, borderColor: '#4d4d4f', color: 'white' }}
      >
        New chat
      </Button>
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {chats.map((chat) => (
          <ListItem 
            button 
            key={chat.id} 
            onClick={() => onChatSelect(chat)} 
            sx={{ 
              py: 2, 
              bgcolor: chat.id === currentChatId ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            <ListItemText 
              primary={chat.messages[0]?.content || 'New Chat'}
              primaryTypographyProps={{ noWrap: true, fontSize: '0.9rem' }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: '1px solid #4d4d4f' }}>
        <Typography variant="body2">User Profile</Typography>
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: '260px',
            bgcolor: 'background.paper',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Box sx={{ 
      width: '260px', 
      bgcolor: 'background.paper', 
      borderRight: '1px solid #4d4d4f', 
      display: 'flex', 
      flexDirection: 'column',
      display: { xs: 'none', sm: 'flex' }
    }}>
      {sidebarContent}
    </Box>
  );
}

export default Sidebar;