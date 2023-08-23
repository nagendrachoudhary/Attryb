import { formatDistanceToNow, parseISO } from 'date-fns';
import { enIN, enUS } from 'date-fns/locale'; // You can replace 'enUS' with your desired locale
import React, { useState, useEffect } from 'react';

export function TimeAgo({ timestamp }) {
    const [createdDate, setCreatedDate] = useState(null);
    const [timeDifference, setTimeDifference] = useState({days:0,hours:0,minutes:0,sec:0});
  
    useEffect(() => {
        setCreatedDate(new Date(timestamp)); // Assuming 'createdDate' is in ISO format
    }, []);
  console.log(createdDate);
    useEffect(() => {
      // Calculate the time difference when 'createdDate' changes
      if (createdDate) {
        const currentDate = new Date();
        const timeDiff = currentDate - createdDate;
  
        // Convert the time difference to a readable format (e.g., days, hours, minutes)
        const daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24))||0;
        const hoursDifference = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))||0;
        const minutesDifference = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))||0;
        const secDifference = Math.floor((timeDiff % (1000 * 60 )) / (1000))||0;
  
        // Set the time difference in state
        setTimeDifference({ days: daysDifference, hours: hoursDifference, minutes: minutesDifference ,sec:secDifference});
      }
    }, [createdDate]);
   console.log(timeDifference)
    return (
      <div>
        {createdDate && (
          <p>
            {timeDifference.days>0&&`${timeDifference.days} days `} 
            {timeDifference.hours>0&&`${timeDifference.hours} hours `} 
            {timeDifference.minutes>0&&`${timeDifference.minutes} minutes `}
            {timeDifference.sec>0&&`${timeDifference.sec} sec Ago`}
          </p>
        )}
      </div>
    );
}
