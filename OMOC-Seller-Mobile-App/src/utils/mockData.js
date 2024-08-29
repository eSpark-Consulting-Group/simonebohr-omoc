import { friend_image } from "./images";

export const ordersList = [
  { id: 1, type: "New Orders", quantity: 10 },
  { id: 2, type: "New Orders", quantity: 5 },
  { id: 3, type: "Ready to Delivery", quantity: 10 },
  { id: 4, type: "New Orders", quantity: 5 },
  { id: 5, type: "Customer Reviews", quantity: 10 },
  { id: 6, type: "Customer Reviews", quantity: 8 },
];

export const shopList = [
  { id: 1, name: "Red Plain Flanel", status: "Published" },
  { id: 2, name: "Red Plain Flanel", status: "Published" },
  { id: 3, name: "White Sneakers", status: "upcomming" },
  { id: 4, name: "Red Plain Flanel", status: "Published" },
  { id: 5, name: "White Sneakers", status: "upcomming" },
];

export const inboxData = [
  {
    id: 1,
    name: "Yeete West",
    image: friend_image,
    message: "Vorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    name: "Franklin Glob",
    image: friend_image,
    message: "Vorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    name: "Carl Jhonson",
    image: friend_image,
    message: "Vorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    name: "Kendl Jenner",
    image: friend_image,
    message: "Vorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    name: "Sweet Memories",
    image: friend_image,
    message: "Vorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 6,
    name: "Hanna Donin",
    image: friend_image,
    message: "Vorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const chatMessages = [
  {
    id: 1,
    name: "Yeete West",
    isSender: true,
    messageText: "Hi, I have issues with my shipping. Can you help out?",
  },
  {
    id: 2,
    name: "Yeete West",
    isSender: false,
    messageText: "Hi Momon, can i help you today?",
  },
];
