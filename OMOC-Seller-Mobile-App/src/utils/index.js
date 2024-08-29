import { Dimensions } from "react-native";

export const Width = Dimensions.get("window").width;
export const Height = Dimensions.get("window").height;

export const formattedDate = (dateString) => {
  const originalDate = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = originalDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const formattedTime = (dateString) => {
  const originalDate = new Date(dateString);
  
  // Extract hours and minutes
  let hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();
  
  // Determine AM/PM
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  
  // Convert hours to 12-hour format
  hours = hours % 12 || 12;
  
  // Pad single digit hours and minutes with leading zeros
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  
  // Construct the formatted time string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${meridiem}`;
  return formattedTime;
};

