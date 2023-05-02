import React, { useState } from 'react';
import ScheduleLayout from './ScheduleLayout';

const  App=()=> {

    const [selectedLocation, setSelectedLocation] = useState(null);

    // Define the time slots
    const timeSlots = [
      { time: "08:00", location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} },
      { time: "09:00", location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} },
      { time: "10:00", location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} },
      { time: "11:00", location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} },
      { time: "12:00", location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} },
      { time: '13:00', location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} },
      { time: '14:00', location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} },
      { time: '15:00', location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} },
      { time: '16:00', location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} },
      { time: '17:00', location1:  {status: "", consecutive: false},location2: {status: "", consecutive: false}, location3: {status: "", consecutive: false} }
    ];

    

    // Callback function to check if a location is available for a time slot
    const isLocationAvailable = (location, startTime, endTime) => {
      // Find the time slot corresponding to the start time
      const startTimeIndex = timeSlots.findIndex((timeSlot) => timeSlot.time === startTime);

      // Find the time slot corresponding to the end time
      const endTimeIndex = timeSlots.findIndex((timeSlot) => timeSlot.time === endTime);
      
      // Check if the location is available for all the time slots between start and end time
      for (let i = startTimeIndex; i < endTimeIndex; i++) {
        if (timeSlots[i][location].status !== '') {
          return false;
        }
      }

      return true;
    };

    // Callback function to handle the onSave event in the BookingModal component
    const handleSave = (location, startTime, endTime) => {
      // Update the time slots to mark the selected location as booked
      const startTimeIndex = timeSlots.findIndex((timeSlot) => timeSlot.time === startTime);
      const endTimeIndex = timeSlots.findIndex((timeSlot) => timeSlot.time === endTime);
      for (let i = startTimeIndex; i <= endTimeIndex; i++) {
        timeSlots[i][location].status = 'Booked';
      }

      // Update the state with the selected location
      setSelectedLocation(location.status);
    };

    return (
      <div className="container mx-auto max-w-7xl">
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Booking / Scheduling App</h1>
          <ScheduleLayout timeSlots={timeSlots} isLocationAvailable={isLocationAvailable} onSave={handleSave} />
          {selectedLocation && <p className="text-lg mt-4">Selected location: {selectedLocation}</p>}
        </div>
      </div>
      </div>
    );
}

export default App;
