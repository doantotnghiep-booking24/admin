import axios from 'axios'
export const handleGetCategories = async () => {
    const Categories = await fetch('http://localhost:3001/V2/Category/getCategories')
        .then(res => res.json())
    return Categories.Categories
}
export const handleCreateCategories = async (data) => {
    const CreateCategories = await fetch('http://localhost:3001/V2/Category/CreateCategory',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NameCate: data })
        },
    )
    return CreateCategories
}
export const handleDeleteCategories = async (id) => {
    const DeleteCategories = await axios.post(`http://localhost:3001/V2/Category/DeleteCategory/${id}`,
        {
            withCredentials: "include"
        },
    )
    return DeleteCategories
}
export const handleUpdateCategories = async (id, data) => {
    const UpdateCategories = await fetch(`http://localhost:3001/V2/Category/UpdateCategory/${id}`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NameCate: data })
        },
    )
    return UpdateCategories
}
export const handleGetTickets = async () => {
    const res = await axios.get('http://localhost:3001/Ticket/GetAllTicket')
    return res.data
}
export const handleUpdate_StatusTickets = async (data) => {
    const res = await axios.post(`http://localhost:3001/Ticket/Update_StatusTickets`, data)
    return res.data
} 
export const handleCustommers = async () => {
    const res = await axios.get(`http://localhost:3001/Custommer/GetCustommers`)
    return res.data
} 
export const handleVouchers = async () => {
    const res = await axios.get(`http://localhost:3001/Vouchers/GetAllVoucher`)
    return res.data
}