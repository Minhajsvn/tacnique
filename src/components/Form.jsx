
export default function Form({ newUser, setNewUser, handleSubmit }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ 
            ...newUser, 
            [name]: value,
        })
    }



    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className='mb-4'>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" 
                    name='name'
                    onChange={handleChange}
                    placeholder='Enter name' 
                    value={newUser.name} 
                    // required 
                />
            </div>
            <div className='mb-4'>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" 
                    name='email' 
                    onChange={handleChange}
                    placeholder='Enter email' 
                    value={newUser.email} 
                    // required 
                />
            </div>
            <div className='mb-4'>
                <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">Website</label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={handleChange} 
                    name='website' 
                    placeholder='Enter your website name' 
                    value={newUser.website} 
                    // required 
                />
            </div>
            <button 
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto'
                >Add User</button>
        </form>
    )
}
