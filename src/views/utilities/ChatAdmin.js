import { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography, TextField, IconButton, ListItemAvatar, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { fetchAllChat, fetchChat, CallChats, handleGetUsers } from '../../service';
import { useRef } from 'react';

const socket = io('http://localhost:3001');

const Chat = () => {
    const RefScroll = useRef(null)
    const [messageText, setMessageText] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // User selection for admin
    const [userChats, setUserChats] = useState([])
    const [dataChats, setDataChats] = useState([])
    const [users, setUsers] = useState([]);
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
    const [id_Room, setId_Room] = useState('')
    useEffect(() => {
        const handleGetChats = async () => {
            const res = await fetchAllChat()
            setUserChats(res.Chat)
        }
        handleGetChats()
    }, [])
    useEffect(() => {
        if (RefScroll) {
            RefScroll.current?.scrollIntoView();  
        }
      }, [dataChats]);
    useEffect(() => {
        const funcHandle = async () => {
            const res = await handleGetUsers()
            setUsers(res.Users);
        }
        funcHandle()
    }, [])
    const handleSelectContact = async (senderId, id_Roomchat) => {
        try {
            setId_Room(id_Roomchat)
            setSelectedUser(senderId)
        } catch (error) {
            console.log(error)
        }
    };

    const toggleChatBox = () => {
        setIsChatBoxOpen(!isChatBoxOpen);
    };
    // Get AdminId from cookie
    const authCookie = Cookies.get('authAdmin');
    let isAdmin = false;
    let Role
    let Admin_Id
    if (authCookie) {
        try {
            var parsedAuth = JSON.parse(decodeURIComponent(authCookie));

            Admin_Id = parsedAuth._id;
            // console.log('Admin_Id', Admin_Id);
            Role = parsedAuth.role;
            isAdmin = parsedAuth._id === '67318dd0e23a808c2ecfbb43';
        } catch (error) {
            console.error('Error parsing auth cookie:', error);
        }
    }

    const handleSendMessage = () => {
        if (messageText.trim() && selectedUser) {
            const newMessage = {
                senderId: selectedUser,
                receiverId: Admin_Id,
                messages: [{
                    senderId: Admin_Id,
                    receiverId: selectedUser,
                    text: messageText,
                    time: new Date(),
                    role: Role
                }],
                time: new Date().toISOString(),
            };


            // Gửi tin nhắn qua socket
            socket.emit('sendMessage', newMessage, (response) => {
                console.log('newMessage', newMessage);
                if (response.status === 'success') {
                    callMessages()
                    // handleSelectContact()
                } else {
                    console.error('Error sending message:', response.error);
                }
            });
            // console.log('Dispatched action:', newMessage);
            setMessageText(''); // Xóa nội dung tin nhắn
            socket.on('receiveMessage', (message) => {
                console.log('Received message:', message);
            });
            return () => {
                socket.off('receiveMessage');  // Hủy lắng nghe khi component unmount
            };
        }
    };
    const callMessages = async () => {
        const res = await fetchChat(id_Room)
        setDataChats(res.chatById[0].messages)
    }
    useEffect(() => {
        callMessages()
    }, [id_Room])

    return (
        <>
            {/* Nút mở/đóng ChatBox */}
            <IconButton
                onClick={toggleChatBox}
                sx={{
                    position: 'fixed',
                    bottom: 50,
                    right: 20,
                    zIndex: 1000,
                    backgroundColor: '#B8E1FF',
                    boxShadow: 3,
                    color: 'white'
                }}
            >
                {isChatBoxOpen ? <CloseIcon /> : <ChatIcon />}
            </IconButton>

            {/* Giao diện ChatBox */}
            {isChatBoxOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 10, // Cách nút mở/đóng một khoảng nhỏ
                        right: 60,
                        width: 600,
                        height: 450,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        zIndex: 1
                    }}
                >
                    {/*Danh sách nhắn tin bên trái*/}
                    <>
                        <Box sx={{ width: '35%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
                            <List>
                                {userChats.map((userChat) => (
                                    <ListItem
                                        button
                                        key={userChat._id}
                                        style={id_Room === userChat._id ? {background : '#00BFFF',cursor : 'pointer'}: {color : 'black',cursor : 'pointer'}}
                                        onClick={() => handleSelectContact(userChat.senderId, userChat._id)}
                                    //   selected={selectedContact === user.id}
                                    >
                                        {users.filter(user => user._id === userChat.senderId).map(users => (
                                            <ListItemAvatar style={{ display: 'flex', gap: 5 }}>
                                                <Avatar src={users?.photoUrl || 'default-avatar-url'} alt={`User ${users?.photoUrl}`} />
                                                <ListItemText primary={`${users.Name}`} />
                                            </ListItemAvatar>
                                        ))}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        {/* Nhắn tin bên phải*/}
                        <Box sx={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
                            <>
                                <Typography variant="body1" sx={{ mt: 2, p: 1 }}>
                                    Vui lòng chọn một người nhắn để bắt đầu trò chuyện.
                                </Typography>
                                <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
                                    {/* {selectedContact.senderId} */}
                                </Typography>
                                <Divider />
                                {/* Khu vực hiển thị tin nhắn */}
                                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
                                    {dataChats?.map((message, index) => (
                                        <Box
                                            //   key={index}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: message.role === 'Admin' ? 'flex-end' : 'flex-start',
                                                mb: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    maxWidth: '70%',
                                                    p: 1,
                                                    borderRadius: 1,
                                                    backgroundColor: message.role !== 'Admin' ? '#f1f1f1' : '#d1f7c4',
                                                    color: 'black',
                                                }}
                                            >
                                                <div variant="body2">{message.text}</div>
                                                <div ref={RefScroll} />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Ô nhập tin nhắn */}
                                <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ccc' }}>
                                    <TextField
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        variant="outlined"
                                        placeholder="Nhập tin nhắn..."
                                        fullWidth
                                        size="small"
                                    />
                                    <IconButton color="primary">
                                        <SendIcon onClick={handleSendMessage} />
                                    </IconButton>
                                </Box>
                            </>
                        </Box>
                    </>
                </Box>
            )}
        </>
    );
};

export default Chat;
