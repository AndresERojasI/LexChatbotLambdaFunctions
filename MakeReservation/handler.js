'use strict';
const axios = require('axios');

module.exports.makeReservation = async event => {
  console.log(event.currentIntent.slots)
  const {ReservationTime, GuestCount, GuestName, PhoneNumber} = event.currentIntent.slots;
  try {
    const response = await axios.post(
      'http://34.210.43.207:3000/api/v1/reservations',
      {
        "phoneNumber": PhoneNumber,
        "name": GuestName,
        "time": ReservationTime,
        "guestCount": Number(GuestCount),
        "drinks": [
        ],
        "appetizers": [
        ],
        "specials": [
        ]
      }
    );
    return {     
      "sessionAttributes": {
       },   
       "dialogAction": {     
           "type": "Close",
           "fulfillmentState": "Fulfilled",
           "message": {       
              "contentType": "PlainText",
              "content": `${GuestName}, your reservation at ${ReservationTime} for ${GuestCount} people has been placed. We will be confirming soon via phone at ${PhoneNumber}. Reservation ID ${response.data.refId}`
           },    
        } 
    }
  } catch (error) {
    console.error('A wild error appeared', error)
    return {     
      "sessionAttributes": {
       },   
       "dialogAction": {     
           "type": "Close",
           "fulfillmentState": "Fulfilled",
           "message": {       
              "contentType": "PlainText",
              "content": `A wilde error occured. Please try again later`
           },    
        } 
   }
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
