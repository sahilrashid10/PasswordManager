import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const Manager = () => {
    const imgRef = useRef();
    const inputRef = useRef();

    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('passwords');
        if (stored) setPasswordArray(JSON.parse(stored));
    }, []);

    const showPassword = () => {
        const img = imgRef.current;
        const input = inputRef.current;
        if (img.src.includes('eye.png')) {
            img.src = '/icons/eyecross.png';
            input.type = 'text';
        } else {
            img.src = '/icons/eye.png';
            input.type = 'password';
        }
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length && form.password.length) {

            const newEntry = { ...form, id: uuidv4() };
            const updated = [...passwordArray, newEntry];
            setPasswordArray(updated);
            localStorage.setItem('passwords', JSON.stringify(updated));
            setForm({ site: '', username: '', password: '' });
            toast.success('Password saved!');
        }else   
            toast.error("Password not saved");
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = id => {
        const item = passwordArray.find(item => item.id === id);
        if (!item) return;
        setForm({ site: item.site, username: item.username, password: item.password });
        const updated = passwordArray.filter(item => item.id !== id);
        setPasswordArray(updated);
        localStorage.setItem('passwords', JSON.stringify(updated));
    };

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: '⚠️ This password will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                const updated = passwordArray.filter(item => item.id !== id);
                setPasswordArray(updated);
                localStorage.setItem('passwords', JSON.stringify(updated));
                Swal.fire('Deleted!', 'Your password has been removed.', 'success');
            }
        });
    };

    const copyText = text => {
        navigator.clipboard.writeText(text);
        toast.info('Copied to clipboard: ' + text);
    };

    return (
        <div className="mx-auto px-4 sm:px-8 lg:px-40 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                <span className="text-green-500">&lt;</span>SR<span className="text-green-500">7/&gt;</span>
            </h1>
            <p className="text-center mb-6">Your own password manager</p>
            <p className="text-xs text-center mb-6">Make sure to fill all fields with a minimum length of 3</p>

            {/* Site Input - Full width always */}
            <div className="mb-6">
                <input
                    name="site"
                    value={form.site}
                    onChange={handleChange}
                    placeholder="Enter website URL"
                    className="w-full rounded-full border px-4 py-2 text-black"
                    type="text"
                />
            </div>

            {/* Username, Password, Save Button */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 mb-6">
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    className="flex-1 rounded-full border px-4 py-2 text-black w-full"
                    type="text"
                />

                <div className="relative flex-1 w-full">
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        ref={inputRef}
                        placeholder="Enter Password"
                        className="w-full rounded-full border px-4 py-2 text-black"
                        type="password"
                    />
                    <span
                        onClick={showPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer"
                    >
                        <img ref={imgRef} src="/icons/eye.png" alt="toggle visibility" className="w-5" />
                    </span>
                </div>

                <button
                    onClick={savePassword}
                    className="flex items-center bg-emerald-900 hover:bg-emerald-800 text-white rounded-full px-3 py-3 self-start"
                >
                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#ffffff,secondary:#ffffff"
                        className="w-6 h-6 mr-2"
                    />
                    <span>Save Password</span>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                {passwordArray.length === 0 ? (
                    <div className="text-center py-8">No Passwords to show</div>
                ) : (
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-emerald-900 text-white">
                            <tr>
                                <th className="p-3">Site</th>
                                <th className="p-3">Username</th>
                                <th className="p-3">Password</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map(item => (
                                <tr key={item.id} className="odd:bg-gray-50 even:bg-white">
                                    <td className="p-2 text-center">
                                        <div className="flex justify-center items-center space-x-2">
                                            <span className="truncate max-w-xs">{item.site}</span>
                                            <img
                                                src="/icons/copy.svg"
                                                alt="Copy site"
                                                className="w-5 h-5 cursor-pointer"
                                                onClick={() => copyText(item.site)}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-2 text-center">
                                        <div className="flex justify-center items-center space-x-2">
                                            <span className="truncate max-w-xs">{item.username}</span>
                                            <img
                                                src="/icons/copy.svg"
                                                alt="Copy username"
                                                className="w-5 h-5 cursor-pointer"
                                                onClick={() => copyText(item.username)}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-2 text-center">
                                        <div className="flex justify-center items-center space-x-2">
                                            <span className="truncate max-w-xs">{item.password}</span>
                                            <img
                                                src="/icons/copy.svg"
                                                alt="Copy password"
                                                className="w-5 h-5 cursor-pointer"
                                                onClick={() => copyText(item.password)}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-2 text-center">
                                        <div className="flex justify-center items-center space-x-4">
                                            <img
                                                src="/icons/edit.svg"
                                                alt="Edit"
                                                className="w-6 h-6 cursor-pointer"
                                                onClick={() => handleEdit(item.id)}
                                            />
                                            <img
                                                src="/icons/delete.svg"
                                                alt="Delete"
                                                className="w-6 h-6 cursor-pointer"
                                                onClick={() => handleDelete(item.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
        </div>
    );
};

export default Manager;
