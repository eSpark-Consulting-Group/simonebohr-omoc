import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const STATUS_BAR_HEIGHT = getStatusBarHeight();
export const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
export const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);

export const randomImage = `https://picsum.photos/2000?random=${Math.floor(
  Math.random() * (1 - 1000 + 1) + 1
)}`;

export function timeAgoPost(timestamp) {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + "d";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + "h";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

export const formattedDate = (dateString) => {
  const originalDate = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = originalDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const timestampToString = (create_at, suffix) => {
  let diffTime = (new Date().getTime() - (create_at || 0)) / 1000;
  if (diffTime < 60) diffTime = "Just now";
  else if (diffTime > 60 && diffTime < 3600) {
    diffTime =
      Math.floor(diffTime / 60) +
      (Math.floor(diffTime / 60) > 1
        ? suffix
          ? " minutes"
          : "m"
        : suffix
        ? " minute"
        : "m") +
      (suffix ? " ago" : "");
  } else if (diffTime > 3600 && diffTime / 3600 < 24) {
    diffTime =
      Math.floor(diffTime / 3600) +
      (Math.floor(diffTime / 3600) > 1
        ? suffix
          ? " hours"
          : "h"
        : suffix
        ? " hour"
        : "h") +
      (suffix ? " ago" : "");
  } else if (diffTime > 86400 && diffTime / 86400 < 30) {
    diffTime =
      Math.floor(diffTime / 86400) +
      (Math.floor(diffTime / 86400) > 1
        ? suffix
          ? " days"
          : "d"
        : suffix
        ? " day"
        : "d") +
      (suffix ? " ago" : "");
  } else {
    diffTime = new Date(create_at || 0).toDateString();
  }
  return diffTime;
};

export const Timestamp = () => {
  const curDate = new Date();
  const second = Math.floor(curDate.getTime() / 1000);
  const nanosecond = curDate.getTime() - second * 1000;
};

export const uploadSuperImages = (images) => {
  return images.map(async (img, index) => {
    let uid = new Date().getTime() + index;
    img.texts = img.texts.map((txt) => {
      delete txt.animRatio;
      delete txt.animX;
      delete txt.animY;
      return txt;
    });
    img.labels = img.labels.map((label) => {
      delete label.animRatio;
      delete label.animX;
      delete label.animY;
      return label;
    });

    // ref.collection('superimages').doc(`${uid}`).set({
    //     ...img,
    //     uri: downloadUri,
    //     uid,
    //     userId: myUsername
    // })
    return {
      sourceId: uid,
      hashtags: Array.from(
        new Set(
          img.labels.filter((x) => x.type === "hashtag").map((x) => x.text)
        )
      ),
      mention: Array.from(
        new Set(
          img.labels
            .filter((x) => x.type === "people")
            .map((x) => x.text.slice(1))
        )
      ),
      address: Array.from(
        new Set(
          img.labels
            .filter((x) => x.type === "address")
            .map((x) => ({
              place_name: x.text,
              id: x.address_id,
            }))
        )
      ),
    };
  });
};

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formattedTime = (dateString) => {
  const originalDate = new Date(dateString);

  // Extract hours and minutes
  let hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();

  // Determine AM/PM
  const meridiem = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Pad single digit hours and minutes with leading zeros
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // Construct the formatted time string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${meridiem}`;
  return formattedTime;
};

export const checkNullAndUndefined = (value) => {
  if (value === undefined || value === null) {
    return true;
  }
  return false;
};
