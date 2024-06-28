import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, useMediaQuery } from '@mui/material';
import ChatWindow from './chatWindow';
import Sidebar from './Sidebar';
import { mockChats } from './mockData';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#343541',
      paper: '#202123',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function App() {
  const [chats, setChats] = useState(mockChats);
  const [currentChat, setCurrentChat] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));

  const handleNewChat = () => {
    const newChat = { id: Date.now(), messages: [] };
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
    if (isMobile) setIsMobileSidebarOpen(false);
  };

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
    if (isMobile) setIsMobileSidebarOpen(false);
  };

  const handleSendMessage = (message) => {
    const updatedChat = { ...currentChat, messages: [...currentChat.messages, message] };
    setCurrentChat(updatedChat);
    setChats(chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat));
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar 
          chats={chats} 
          onNewChat={handleNewChat} 
          onChatSelect={handleChatSelect}
          currentChatId={currentChat?.id}
          isMobile={isMobile}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
        <ChatWindow 
          currentChat={currentChat} 
          onSendMessage={handleSendMessage}
          onOpenSidebar={toggleMobileSidebar}
          isMobile={isMobile}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;