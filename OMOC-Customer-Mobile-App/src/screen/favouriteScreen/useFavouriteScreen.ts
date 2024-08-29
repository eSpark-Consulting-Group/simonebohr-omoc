import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export const useFavouriteScreen = () => {
  const navigation = useNavigation();

  const generateRandomUsersAndStories = () => {
    const numberOfUsers = 10;
    const stories = [];
    for (let i = 0; i < numberOfUsers; i++) {
      const numberOfStoriesPerUser = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numberOfStoriesPerUser; j++) {
        stories.push({
          id: stories.length + 1,
          content: `https://picsum.photos/2000?random=${Math.floor(
            Math.random() * (1 - 1000 + 1) + 1
          )}`,
          userId: i,
        });
      }
    }
    return stories;
  };
  const [stories, setStories] = useState(generateRandomUsersAndStories());

  const openStory = (userIndex) => {
    const userStories = users[userIndex].stories;
    const firstUserStoryIndex = stories.findIndex(
      (story) => story.id === userStories[0].id
    );
    //@ts-ignore
    navigation.navigate("StoryScreen", {
      stories: stories,
      currentStoryIndex: firstUserStoryIndex,
    });
  };

  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.userId]) {
      acc[story.userId] = {
        user: story.user,
        stories: [],
      };
    }
    acc[story.userId].stories.push(story);
    return acc;
  }, {});

  const users = Object.values(groupedStories);

  return {
    users,
    openStory,
    stories,
    setStories,
    generateRandomUsersAndStories,
  };
};
