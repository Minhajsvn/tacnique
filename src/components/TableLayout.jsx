


export default function TableLayout({ users, onEdit, onDelete }) {
    return (
        <table className='lg:min-w-full sm:max-w-full border'>
            <thead className=' bg-white border border-gray-200'>
                <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th className='py-3 px-6 text-left'>ID</th>
                    <th className='py-3 px-6 text-left'>Name</th>
                    <th className='py-3 px-6 text-left'>Email</th>
                    <th className='py-3 px-6 text-left'>Website</th>
                    <th className='py-3 px-6 text-left'>Action</th>
                </tr>
            </thead>
            <tbody className='text-gray-600 text-sm font-light'>
                {users.map((user) => (
                    <tr  className='border-b border-gray-200 hover:bg-gray-100' key={user.id}>
                        <td className='py-3 px-6 text-left whitespace-nowrap'>{user.id}</td>
                        <td className='py-3 px-6 text-left'>{user.name}</td>
                        <td className='py-3 px-6 text-left'>{user.email}</td>
                        <td className='py-3 px-6 text-left'>{user.website}</td>
                        <td className='py-3 px-6 text-left'>
                            <button 
                                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 mb-2 sm:mb-0"
                                onClick={() => onEdit(user)}
                            >
                                Edit
                            </button>
                            <button 
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => onDelete(user.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
