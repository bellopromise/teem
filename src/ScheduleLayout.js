import React, { useState } from "react";
import BookingModal from "./BookingModal";
import validateTimeSlot from "./helper";

const ScheduleLayout =({ timeSlots, isLocationAvailable })=> {

    const [showModal, setShowModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');

    const handleBookClick = () => {
        setShowModal(true);
      };
  
    const handleLocationSelect = (location) => {
      setSelectedLocation(location);
      setShowModal(true);
    };


    const timeSlotValidation = (startTime, endTime) => validateTimeSlot(startTime, endTime, timeSlots);
    
  
    const handleSave = (location, startTime, endTime) => {

        const {startTimeIndex, endTimeIndex} = timeSlotValidation(startTime, endTime);
        if (isLocationAvailable(location, startTime, endTime, timeSlots)) {
            
            // Update the time slots with the selected location
            
            let rowspan  = 0
            for (let i = startTimeIndex; i < endTimeIndex; i++) {
                timeSlots[i][location]['consecutive'] = (i !== startTimeIndex);
                timeSlots[i][location].status = 'Booked';
                rowspan++;
            }
            timeSlots[startTimeIndex][location]['rowspan'] = rowspan;
    
            // Reset the selected location and time slots
            setSelectedLocation('');
            setSelectedStartTime('');
            setSelectedEndTime('');
            setShowModal(false);
                
            
        }

    };
  
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 relative">
        <h2 className="text-2xl font-bold mb-4">Schedule</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Time</th>
              <th className="text-left py-2">Location 1</th>
              <th className="text-left py-2">Location 2</th>
              <th className="text-left py-2">Location 3</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {
            timeSlots.map((timeSlot) => (
              <tr key={timeSlot.time}>
                <td className="border px-4 py-2">{timeSlot.time}</td>
                {(timeSlot.location1.consecutive && timeSlot.location1.status == 'Booked') ||<td
                  className={`border px-4 py-2 cursor-pointer ${
                    timeSlot.location1.status === 'Booked' ? 'bg-red-200 text-blue-700' : ''
                  }`}
                  onClick={() => handleLocationSelect("location1")}
                  rowSpan={(!timeSlot.location1.consecutive && timeSlot.location1.status !== 'Booked') 
                  ? '1' : timeSlot.location1.rowspan}
                >
                  {timeSlot.location1.status}
                </td>}
                {(timeSlot.location2.consecutive && timeSlot.location2.status == 'Booked') ||<td
                  className={`border px-4 py-2 cursor-pointer ${
                    timeSlot.location2.status === 'Booked' ? 'bg-red-200 text-blue-700' : ''
                  }`}
                  onClick={() => handleLocationSelect("location2")}
                  rowSpan={(!timeSlot.location2.consecutive && timeSlot.location2.status !== 'Booked') 
                  ? '1' : timeSlot.location2.rowspan}
                >
                  {timeSlot.location2.status}
                </td>}
                {(timeSlot.location3.consecutive && timeSlot.location3.status == 'Booked') ||<td
                  className={`border px-4 py-2 cursor-pointer ${
                    timeSlot.location3.status === 'Booked' ? 'bg-red-200 text-blue-700' : ''
                  }`}
                  onClick={() => handleLocationSelect("location3")}
                  rowSpan={(!timeSlot.location3.consecutive && timeSlot.location3.status !== 'Booked') 
                  ? '1' : timeSlot.location3.rowspan}
                >
                  {timeSlot.location3.status}
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
        <button
            onClick={handleBookClick}
            className="absolute top-6 right-6 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
            Book
        </button>
        {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <BookingModal
                location={selectedLocation}
                startTime={selectedStartTime}
                endTime={selectedEndTime}
                onSave={handleSave}
                onCancel={() => setShowModal(false)}
                isLocationAvailable={(location, startTime, endTime) => isLocationAvailable(location, startTime, endTime, timeSlots)}
                timeSlotValidation={(startTime, endTime) => timeSlotValidation( startTime, endTime)}
                
                />
            </div>
            </div>
        </div>
        )}
      </div>
    );
  }
  

export default ScheduleLayout;

