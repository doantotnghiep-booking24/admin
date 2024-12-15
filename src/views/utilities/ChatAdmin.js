import { useState, useEffect, useRef } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography, TextField, IconButton, ListItemAvatar, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Badge } from '@mui/material';
import { Tooltip } from '@mui/material';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { fetchAllChat, fetchChat, handleGetUsers } from '../../service';

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
    const [receive,setReceive] = useState('')
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }
    }, [dataChats]);
console.log(dataChats);

    useEffect(() => {
        const handleGetChats = async () => {
            const res = await fetchAllChat();

            const updatedChats = res.Chat.map(chat => {
                if (!Array.isArray(chat.messages)) {
                    return { ...chat, unansweredMessages: 0 };
                }

                let lastAdminIndex = -1;

                // Duyệt ngược để tìm tin nhắn cuối cùng của admin
                for (let i = chat.messages.length - 1; i >= 0; i--) {
                    if (chat.messages[i].senderId === Admin_Id) {
                        lastAdminIndex = i;
                        break;
                    }
                }

                // Đếm số tin nhắn từ người dùng sau lần cuối admin gửi
                const unansweredMessages = chat.messages
                    .slice(lastAdminIndex + 1)
                    .filter(msg => msg.senderId !== Admin_Id).length;

                return {
                    ...chat,
                    unansweredMessages, // Số tin nhắn chưa trả lời kể từ lần cuối admin rep
                };
            });

            setUserChats(updatedChats);
        };

        handleGetChats();
    }, []);

    useEffect(async () => {
        const res = await handleGetUsers()
        console.log(res);
        setUsers(res.Users)
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
                    role: Role,

                }],
                time: new Date().toISOString(),
            };


            // Gửi tin nhắn qua socket
            socket.emit('sendMessage', newMessage, (response) => {
                console.log('newMessage', newMessage);
                if (response.status === 'success') {

                    setUserChats((prevChats) =>
                        prevChats.map(chat =>
                            chat.senderId === selectedUser ? { ...chat, unansweredMessages: 0 } : chat
                        )
                    );
                    callMessages()

                    // handleSelectContact()
                } else {
                    console.error('Error sending message:', response.error);
                }
            });
            // console.log('Dispatched action:', newMessage);
            setMessageText(''); // Xóa nội dung tin nhắn
        }
    };
    useEffect(() => {
        // Lắng nghe sự kiện nhận tin nhắn mới
        socket.on('receiveMessage', (message) => {
            console.log('Tin nhắn mới:', message);
            setReceive(message)
            setUserChats((prevChats) => {
                // Tìm phòng chat liên quan
                const chatIndex = prevChats.findIndex(chat => chat._id === message.roomId);

                if (chatIndex !== -1) {
                    // Cập nhật tin nhắn mới vào danh sách
                    const updatedChats = [...prevChats];
                    const chat = updatedChats[chatIndex];

                    // Thêm tin nhắn mới
                    chat.messages.push(message);

                    // Tăng số tin nhắn chưa trả lời nếu người gửi không phải Admin
                    if (message.senderId !== Admin_Id) {
                        chat.unansweredMessages += 1;
                    }

                    return updatedChats;
                }

                // Nếu không tìm thấy, giữ nguyên danh sách chat
                return prevChats;
            });
        });

        // Cleanup khi component unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, [receive]);

    const callMessages = async () => {
        const res = await fetchChat(id_Room)
        setDataChats(res.chatById[0].messages)
    }
    useEffect(() => {
        callMessages()
    }, [id_Room,receive])

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
                    background: 'linear-gradient(135deg, #6EC1E4, #4183D7)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    color: 'white',
                    borderRadius: '50%',
                    transition: 'transform 0.2s ease, background 0.3s ease',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #5A9FCF, #367BB5)',
                        transform: 'scale(1.1)',
                    },
                    '&:active': {
                        transform: 'scale(1)',
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                {isChatBoxOpen ? <CloseIcon /> : <ChatIcon />}
            </IconButton>

            {/* Giao diện ChatBox */}
            {isChatBoxOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 20, // Cách nút mở/đóng một khoảng nhỏ
                        right: 70,
                        width: 500,
                        height: 500,
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
                        <Box sx={{
                            width: '37%',
                            borderRight: '1px solid #ccc',
                            borderTopLeftRadius: '10px',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '3px', // Đặt chiều rộng thanh cuộn nhỏ hơn
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888', // Màu của thanh cuộn
                                borderRadius: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1', // Màu nền của track thanh cuộn
                            }
                        }}>
                            <List>
                                {userChats
                                    .sort((a, b) => {
                                        const lastMessageA = a.messages?.[a.messages.length - 1]?.time || 0;
                                        const lastMessageB = b.messages?.[b.messages.length - 1]?.time || 0;
                                        return new Date(lastMessageB) - new Date(lastMessageA);
                                    })
                                    .map((userChat) => {
                                        const user = users.find((u) => u._id === userChat.senderId);

                                        return (
                                            <ListItem
                                                button
                                                key={userChat._id}
                                                style={id_Room === userChat._id ? {background : '#00BFFF',cursor : 'pointer'}: {color : 'black',cursor : 'pointer'}}
                                                onClick={() => handleSelectContact(userChat.senderId, userChat._id)}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={user?.photoUrl || ''}
                                                        alt="User Avatar"
                                                        style={{ backgroundColor: !user?.photoUrl ? '#3498D8' : 'transparent' }}
                                                    >
                                                        {!user?.photoUrl && user?.Name?.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                </ListItemAvatar>

                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            variant="body1"
                                                            noWrap
                                                            sx={{
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap',
                                                                width: '90%'
                                                            }}
                                                        >
                                                            {user?.Name || 'Unknown User'}
                                                        </Typography>
                                                    }
                                                />

                                                {/* Hiển thị badge số tin nhắn chưa trả lời */}
                                                {userChat.unansweredMessages > 0 && (
                                                    <Badge
                                                        badgeContent={userChat.unansweredMessages}
                                                        color="error"
                                                        sx={{
                                                            marginLeft: 'auto',
                                                            '& .MuiBadge-badge': {
                                                                backgroundColor: 'red',
                                                                color: 'white',
                                                                fontSize: '0.8rem',
                                                            },
                                                        }}
                                                    />
                                                )}

                                            </ListItem>
                                        );
                                    })}
                            </List>


                        </Box>
                        {/* Nhắn tin bên phải*/}
                        <Box sx={{ width: '63%', display: 'flex', flexDirection: 'column' }}>
                            <>
                                <Typography variant="body1" sx={{ mt: 2, p: 1 }} style={{ textAlign: 'center', display: 'flex' }}>
                                    {selectedUser ? (
                                        <>
                                            <Avatar
                                                src={users.find((u) => u._id === selectedUser)?.photoUrl || ''}
                                                alt="User Avatar"
                                                sx={{ width: 30, height: 30, mr: 1 }}
                                            />
                                            <span style={{ fontWeight: '700', fontSize: '1.2vw' }}>
                                                {users.find((u) => u._id === selectedUser)?.Name}
                                            </span>
                                        </>
                                    ) : (
                                        'Hãy trò chuyện với khách hàng'
                                    )}
                                </Typography>

                                <Divider />
                                {/* Khu vực hiển thị tin nhắn */}
                                <Box sx={{
                                    flexGrow: 1,
                                    overflowY: 'auto',
                                    p: 1,
                                    '&::-webkit-scrollbar-button': {
                                        display: 'none'
                                    },
                                    scrollbarWidth: 'none', // Nếu muốn ẩn toàn bộ thanh cuộn trên Firefox
                                }}>
                                    {dataChats?.map((message, index) => (
                                        <Box
                                            key={index}
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
                                                    backgroundColor: message.role !== 'Admin' ? '#f1f1f1' : '#d1e7ff',
                                                    color: 'black',
                                                    position: 'relative',
                                                }}
                                            >
                                                <Tooltip title={new Date(message.time).toLocaleTimeString()} arrow>
                                                    <Typography variant="body2" sx={{ cursor: 'pointer' }}>
                                                        {message.text}
                                                    </Typography>
                                                    <div ref={RefScroll} />
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    ))}
                                    <div ref={messagesEndRef} />
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
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') { // Kiểm tra nếu phím nhấn là 'Enter'
                                                e.preventDefault(); // Ngăn chặn hành động mặc định (ví dụ như tạo dòng mới trong ô nhập)
                                                handleSendMessage(); // Gọi hàm gửi tin nhắn
                                            }
                                        }}
                                    />
                                    <IconButton color="primary" onClick={handleSendMessage}>
                                        <SendIcon />
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
