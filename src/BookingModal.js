import React, { useState } from "react";

const BookingModal=({ onCancel, onSave, isLocationAvailable, timeSlotValidation})=> {
    
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const { isValid} = timeSlotValidation(startTime, endTime)
        const isAvailable = isLocationAvailable(location, startTime, endTime);
        if(!isValid)
            setErrorMessage("Invalid Time Slot.");
        else if (isAvailable) {
            onSave( location, startTime, endTime );
            onCancel();
        } else {
            setErrorMessage("The selected location is not available for the specified time slot.");
        }
    };

    return (
        <div className="modal  inset-0 overflow-y-auto">
            <div className="modal-overlay absolute  bg-gray-500 opacity-75"></div>
            <div className="modal-container mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
                    <label className="block font-bold mb-2">
                    Location:
                    <select className="bg-gray-200 rounded-lg p-2 ml-2" value={location} onChange={(e) => setLocation(e.target.value)} required>
                        <option value="">Select a location</option>
                        <option value="location1">Location 1</option>
                        <option value="location2">Location 2</option>
                        <option value="location3">Location 3</option>
                    </select>
                    </label>
                    <br />
                    <label className="block font-bold mb-2">
                    Start Time:
                    <input type="time" className="bg-gray-200 rounded-lg p-2 ml-2" value={startTime} onChange={(e) => setStartTime(e.target.value)}  required/>
                    </label>
                    <br />
                    <label className="block font-bold mb-2">
                    End Time:
                    <input type="time" className="bg-gray-200 rounded-lg p-2 ml-2" value={endTime} onChange={(e) => setEndTime(e.target.value)} required/>
                    </label>
                    <br />
                    <p className="error-message text-red-500">{errorMessage}</p>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
                    <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                </form>
                </div>
            </div>
            </div>

    );
}

export default BookingModal;
