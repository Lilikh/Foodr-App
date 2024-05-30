import React from 'react'
const Popup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl font-bold">Food</h2>
                <p>Wait, where's the food?</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}
export default Popup