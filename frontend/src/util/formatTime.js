const formatTime = (time) => {
  // Hours part from the timestamp
  const hours = time.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + time.getMinutes();

  const end = hours >= 12 ? "pm" : "am";

  // Will display time in 10:30:23 format
  const formattedTime =
    (hours % 12).toString().padStart(2, "0") + ":" + minutes.substring(1).padStart(2, "0") + end;
  return formattedTime;
};

export default formatTime;
