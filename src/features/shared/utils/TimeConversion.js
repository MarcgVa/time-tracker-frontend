const calculateTimeDifference = (startDate, endDate) => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const diffInMillis = endTime - startTime;

  const numMillisInASecond = 1000;
  const numMillisInAMinute = 60000;
  const numMillisInAHour = 3600000;


  const seconds = Math.floor((diffInMillis / numMillisInASecond)% 60);
  const minutes = Math.floor((diffInMillis / numMillisInAMinute) % 60);
  const hours = Math.floor((diffInMillis / numMillisInAHour) % 24);
  //const days = Math.floor(hours / 24);

  return {
    hours: `${hours}:${minutes}:${seconds}`
  };
}

export { calculateTimeDifference };
