const findMaxTime = (timeSlots) =>
        timeSlots.reduce((maxTime, timeSlot) =>
            timeSlot.time > maxTime ? timeSlot.time : maxTime, ''
    );

const isOneHourLater = (value, timeSlots) =>
    new Date(`01/01/2000 ${value}`).getTime() ===
    new Date(`01/01/2000 ${findMaxTime(timeSlots)}`).getTime() + 3600000; 

const validateTimeSlot =(startTime, endTime, timeSlots) =>{
    let isValid = true;
    const startTimeIndex = timeSlots.findIndex((timeSlot) => timeSlot.time === startTime);

    const endTimeIndex = (isOneHourLater(endTime, timeSlots)) 
        ? timeSlots.findIndex((timeSlot) => timeSlot.time === findMaxTime(timeSlots)) + 1
        : timeSlots.findIndex((timeSlot) => timeSlot.time === endTime);

    if((startTimeIndex < 0|| endTimeIndex < 0) || (startTimeIndex > endTimeIndex)){
        isValid = false;
    }

    return {startTimeIndex, endTimeIndex, isValid}
}

export default validateTimeSlot;