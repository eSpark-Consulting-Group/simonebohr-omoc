import {
  profile_pic,
  profile_pic1,
  profile_pic2,
  profile_pic3,
  profile_pic4,
  profile_pic5,
  profile_pic6,
  profile_pic7,
  profile_pic8,
  profile_pic9,
  story_Image,
} from "../utils/images";

export const helpFavourite = [
  { id: 1, icon: "", text: "Fashion", isSelected: false },
  { id: 2, icon: "", text: "Sport", isSelected: false },
  { id: 3, icon: "", text: "Art", isSelected: false },
  { id: 4, icon: "", text: "Animals", isSelected: false },
  { id: 5, icon: "", text: "technology", isSelected: false },
  { id: 6, icon: "", text: "Car", isSelected: false },
  { id: 7, icon: "", text: "Accessories", isSelected: false },
  { id: 8, icon: "", text: "Architecture", isSelected: false },
  { id: 9, icon: "", text: "Decoration", isSelected: false },
  { id: 10, icon: "", text: "Gaming", isSelected: false },
  { id: 11, icon: "", text: "Desain", isSelected: false },
  { id: 12, icon: "", text: "Gadget", isSelected: false },
];
export const storiesData = [
  {
    id: 1,
    image: story_Image,
  },
  {
    id: 2,
    image: story_Image,
  },
  {
    id: 3,
    image: story_Image,
  },
  {
    id: 4,
    image: story_Image,
  },
  {
    id: 5,
    image: story_Image,
  },
];
export const favouriteData = [
  {
    id: 1,
    title: "OmocOfficial",
    likes: [
      { name: "omoc" },
      { name: "omoc2" },
      { name: "omoc3" },
      { name: "omoc4" },
    ],
    liked: true,
  },
  {
    id: 2,
    title: "OmocOfficial2",
    likes: [
      { name: "omoc" },
      { name: "omoc2" },
      { name: "omoc3" },
      { name: "omoc4" },
    ],
    liked: true,
  },
  {
    id: 3,
    title: "OmocOfficial3",
    likes: [
      { name: "omoc" },
      { name: "omoc2" },
      { name: "omoc3" },
      { name: "omoc4" },
    ],
    liked: true,
  },
  {
    id: 4,
    title: "OmocOfficial4",
    likes: [
      { name: "omoc" },
      { name: "omoc2" },
      { name: "omoc3" },
      { name: "omoc4" },
    ],
    liked: true,
  },
];

export const storyViews = [
  {
    name: "Alice",
    image: profile_pic,
    liked: true,
    isAccountVerified: true,
  },
  {
    name: "Bob",
    image: profile_pic1,
    liked: false,
    isAccountVerified: false,
  },
  {
    name: "Charlie",
    image: profile_pic2,
    liked: true,
    isAccountVerified: true,
  },
  {
    name: "David",
    image: profile_pic3,
    liked: true,
    isAccountVerified: false,
  },
  {
    name: "Eve",
    image: profile_pic4,
    liked: false,
    isAccountVerified: true,
  },
  {
    name: "Frank",
    image: profile_pic5,
    liked: true,
    isAccountVerified: true,
  },
  {
    name: "Grace",
    image: profile_pic6,
    liked: false,
    isAccountVerified: false,
  },
  {
    name: "Hannah",
    image: profile_pic7,
    liked: true,
    isAccountVerified: true,
  },
  {
    name: "Ian",
    image: profile_pic8,
    liked: false,
    isAccountVerified: false,
  },
  {
    name: "Jessica",
    image: profile_pic9,
    liked: true,
    isAccountVerified: false,
  },
];

export const storyComments = [
  {
    comment_id: "001",
    user_id: "user_123",
    username: "commenter1",
    comment_text:
      "Lorem ipsum dolor sit amet conse. Sapien acasdasda sollicit egestas id eget pellentesque!",
    timestamp: "2023-10-31T10:15:00",
    replies: [
      {
        reply_id: "001-001",
        user_id: "user_456",
        username: "reply_user1",
        reply_text: "Thank you!",
        timestamp: "2023-10-31T10:30:00",
        liked: true,
      },
    ],
    liked: true,
    total_likes: 100,
  },
  {
    comment_id: "002",
    user_id: "user_456",
    username: "commenter2",
    comment_text: "Great content, keep it up!",
    timestamp: "2023-10-31T11:30:00",
    replies: [
      {
        reply_id: "002-001",
        user_id: "user_789",
        username: "reply_user2",
        reply_text: "I appreciate it!",
        timestamp: "2023-10-31T11:45:00",
        liked: false,
      },
      {
        reply_id: "002-002",
        user_id: "user_321",
        username: "reply_user3",
        reply_text: "Thank you so much!",
        timestamp: "2023-10-31T12:00:00",
        liked: true,
      },
    ],
    liked: false,
    total_likes: 100,
  },
  {
    comment_id: "003",
    user_id: "user_789",
    username: "commenter3",
    comment_text: "Love this! Thanks for sharing.",
    timestamp: "2023-10-31T12:45:00",
    replies: [],
    liked: true,
    total_likes: 100,
  },
  {
    comment_id: "004",
    user_id: "user_789",
    username: "batman",
    comment_text: "Love this! Thanks for sharing.",
    timestamp: "2023-10-31T12:45:00",
    replies: [],
    liked: true,
    total_likes: 100,
  },
  {
    comment_id: "004",
    user_id: "user_789",
    username: "Captain americ",
    comment_text: "Love this! Thanks for sharing.",
    timestamp: "2023-10-31T12:45:00",
    replies: [],
    liked: true,
    total_likes: 100,
  },
];
