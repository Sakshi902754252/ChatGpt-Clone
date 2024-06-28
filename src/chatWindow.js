import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MenuIcon from '@mui/icons-material/Menu';
import { mockChatGPTResponse } from './mockData';

function ChatWindow({ currentChat, onSendMessage, onOpenSidebar, isMobile }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { role: 'user', content: input };
      onSendMessage(userMessage);
      setInput('');

      setTimeout(() => {
        const botResponse = mockChatGPTResponse(input);
        onSendMessage(botResponse);
      }, 1000);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#343541' }}>
      {isMobile && (
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onOpenSidebar}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ChatGPT
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {(!currentChat || currentChat.messages.length === 0) ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Examples, Capabilities, Limitations
            </Typography>
          </Box>
        ) : (
          currentChat.messages.map((message, index) => (
            <Box key={index} sx={{ display: 'flex', mb: 2, justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {message.role === 'assistant' && <SmartToyIcon sx={{ mr: 1, alignSelf: 'flex-start' }} />}
              <Paper elevation={0} sx={{ maxWidth: '70%', p: 2, bgcolor: message.role === 'assistant' ? '#444654' : 'transparent' }}>
                <Typography variant="body1">{message.content}</Typography>
              </Paper>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ p: 2, bgcolor: '#343541' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSend} edge="end">
                <SendIcon />
              </IconButton>
            ),
            sx: { borderRadius: 28, bgcolor: '#40414f' }
          }}
        />
      </Box>
    </Box>
  );
}

export default ChatWindow;