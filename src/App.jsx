import axios from "axios"
import { useEffect, useState } from "react";
import TableLayout from "./components/TableLayout";
import Form from "./components/Form";
import { useSnackbar } from "notistack";


export default function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    website: '',
  })

  // Fetches user data from the API
  const fetchUser = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUserData(response.data);
    } catch (error) {
      // Displays an error notification if the request fails
      enqueueSnackbar('Error occurs while fetching data', { variant: "error"});
      console.error('Error occurs while fetching data', error)
    }
  }

  // Sends a POST request to the API to create a new user with the provided userData
  const createUser = async (userData) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
      const createdUser = response.data;
      setUserData((prevUserData) => [...prevUserData, createdUser]);
    } catch (error) {
      enqueueSnackbar('Error occurs while creating new user', { variant: "error"});
      console.error('Error occurs while creating new user', error)
    }
  }

  // Sends a PUT request to the API to update the user with the specified id
  const updateUser = async (id, updatedUserData) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUserData);
      setUserData((prevUserData) => 
          prevUserData.map((user) => 
            user.id === id ? {...user, ...updatedUserData} : user 
      ));
    } catch (error) {
      enqueueSnackbar('Error updating User', { variant: "error"});
      console.error('Error updating User', error);
    }
  }

  // Sends a DELETE request to the API to remove the user with the specified id
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUserData((prevUserData) => prevUserData.filter((user) => user.id !== id))
    } catch (error) {
      enqueueSnackbar('Error deleting user', { variant: "error"});
      console.error('Error deleting user', error);
    }
  }

  const validateInput = (data) => {
    if(data.name === ""){
      enqueueSnackbar('Username is a required field', {variant : 'warning'});
      return false;
    }
    
    if(data.email === ""){
      enqueueSnackbar('Email is a required field', {variant : 'warning'});
      return false;
    }
    
    if(data.website === ""){
      enqueueSnackbar('Website is a required field', {variant : 'warning'});
      return false;
    }
    return true;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateInput(newUser) === true){
      if(isEditing){
        // If in editing mode, updates the user with the currentUserId using the newUser data
        updateUser(currentUserId, newUser);
        setIsEditing(false);
        setNewUser({
          name: '',
          email: '',
          website: '',
        })
        setIsFormVisible(false);
      }else{
      // If not in editing mode, creates a new user with the newUser data
        createUser(newUser);
        setNewUser({
          name: '',
          email: '',
          website: '',
        })
        setIsFormVisible(false);
      }
    }
    
  }

  const handleEditClick = (user) => {
    // Sets the form in editing mode with the selected user's data pre-filled
    setIsEditing(true);
    setCurrentUserId(user.id);
    setNewUser({ name: user.name, email: user.email, website: user.website });
    setIsFormVisible(true);
  };

  const handleDeleteClick = (id) => {
  // Deletes the user with the specified id
    deleteUser(id);
  };

  const toggleFormVisibility = () => {
  // Toggles the visibility of the form and resets the form fields if not editing
    setIsFormVisible(!isFormVisible);
    setIsEditing(false);
    setNewUser({ name: '', email: '', website: '' });
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className="min-h-screen min-w-full bg-gray-100 flex flex-col lg:flex-row items-center justify-around p-4">
      <section className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mb-6 lg:mb-0">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">User Table</h1>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6" onClick={toggleFormVisibility}>
                {isEditing ? 'Edit User' : 'Add New User'}
            </button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <TableLayout users={userData} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </div>
      </section>
      {isFormVisible && (
        <section className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <Form handleSubmit={handleSubmit} setNewUser={setNewUser} newUser={newUser} />
        </section>
      )}
    </div>
  )
}
