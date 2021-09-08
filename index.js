
// imports
var moment = require('moment');
// array of objects
let schedule = [
  {
    day: "monday", // mon -> sunday
    startTime: "2021-09-07T11:30:00.000Z", // timestamp in utc
    endTime: "2021-09-07T12:30:00.000Z" // timestamp in utc
  },
  {
    day: "tuesday", // mon -> sunday
    startTime: "2021-09-08T11:30:00.000Z", // timestamp in utc
    endTime: "2021-09-08T12:30:00.000Z" // timestamp in utc
  },
  {
    day: "wednesday", // mon -> sunday
    startTime: "2021-09-09T11:30:00.000Z", // timestamp in utc
    endTime: "2021-09-09T12:30:00.000Z" // timestamp in utc
  },
  {
    day: "thursday", // mon -> sunday
    startTime: "2021-09-10T11:30:00.000Z", // timestamp in utc
    endTime: "2021-09-10T12:30:00.000Z" // timestamp in utc
  },
  {
    day: "friday", // mon -> sunday
    startTime: "2021-09-11T11:30:00.000Z", // timestamp in utc
    endTime: "2021-09-11T12:30:00.000Z" // timestamp in utc
  },
  {
    day: "saturday", // mon -> sunday
    startTime: "2021-09-12T11:30:00.000Z", // timestamp in utc
    endTime: "2021-09-12T12:30:00.000Z" // timestamp in utc
  }
];

//function to get a schedule in readable time
function getReadbleDate(startTimestamp, endTimestamp){
  let day = moment(startTimestamp).format('dddd'); // Monday
  let date = moment(startTimestamp).format('MMMM Do YYYY'); // February 14th 2010
  let timeStart = moment(startTimestamp).format('h:mm a'); // 3:25 pm
  let timeEnd = moment(endTimestamp).format('h:mm a') // 4:25 pm


  return `${day}, ${date}, ${timeStart} - ${timeEnd}`;
}

for(let sch of schedule){
  sch["startTimestamp"] = moment(sch.startTime).valueOf();
  sch["endTimestamp"] = moment(sch.endTime).valueOf();
}

let previousClasses = schedule.filter(x => x.startTimestamp < moment().format('x'));
let upcomingClasses = schedule.filter(x => x.startTimestamp > moment().format('x'));
let nextClass = upcomingClasses && upcomingClasses.length 
  ? (upcomingClasses.sort((a,b) => a.startTimestamp - b.startTimestamp))[0] 
  : null;

// remove the next class from upcoming clesses
upcomingClasses =  upcomingClasses.filter(x => x.startTimestamp !== nextClass.startTimestamp);



let calendar = {
  previousClasses : previousClasses && previousClasses.length
  ? previousClasses.map(x => getReadbleDate(x.startTimestamp, x.endTimestamp))
  : [],
  nextClass : nextClass ? [getReadbleDate(nextClass.startTimestamp, nextClass.endTimestamp)] : ['Not Avalable'],
  upcomingClasses : upcomingClasses && upcomingClasses.length 
    ? upcomingClasses.map(x => getReadbleDate(x.startTimestamp, x.endTimestamp)) 
    : []
}


console.log(`Previous Classes`);
console.table(calendar.previousClasses);

console.log(`Next Class`);
console.table(calendar.nextClass);

console.log(`Upcoming Classes`);
console.table(calendar.upcomingClasses);
