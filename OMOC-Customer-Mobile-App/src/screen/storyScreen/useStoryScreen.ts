import { useEffect, useState } from "react";
import ApiService from "../../services/api.service";
import { Alert } from "react-native";

export const useStoryScreen = ({ route, navigation }) => {
  const { currentStoryIndex, storieUsers } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [userStories, setUserStories] = useState([]);
  const [stories, setStories] = useState([]);
  const [progresses, setProgresses] = useState(null);

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgresses((prevProgresses) => {
        // @ts-ignore
        const updatedProgresses = [...prevProgresses];
        updatedProgresses[currentIndex] = 0;
        updatedProgresses[currentIndex - 1] = 0;
        return updatedProgresses;
      });
    } else {
      if (!!currentStoryIndex) {
        navigation.replace("StoryScreen", {
          storieUsers,
          currentStoryIndex: currentStoryIndex - 1,
        });
      }
    }
  };

  const goForward = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgresses((prevProgresses) => {
        let updatedProgresses = [...prevProgresses];
        updatedProgresses[currentIndex] = 1;
        return updatedProgresses;
      });
    } else {
      if (storieUsers.length - 1 > currentStoryIndex) {
        navigation.replace("StoryScreen", {
          storieUsers,
          currentStoryIndex: currentStoryIndex + 1,
        });
      } else {
        navigation.navigate("Home");
      }
    }
  };

  const getStoriesList = async () => {
    try {
      const response = await ApiService.GetusersStoryById(
        storieUsers[currentStoryIndex]._id
      );
      setStories(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    const currentStory = stories[currentIndex];
    const currentUser = currentStory?.user;
    const userStories = stories.filter((story) => story.user === currentUser);
    const userStoryIndex = userStories.findIndex(
      (story) => story._id === currentStory._id
    );

    setUserStories(userStories);
    if (progresses === null) {
      setProgresses(userStories.map(() => 0));
    }

    const timer = setInterval(() => {
      setProgresses((prevProgresses) => {
        const updatedProgresses = [...prevProgresses];
        const newProgress = updatedProgresses[userStoryIndex] + 0.01;

        if (!isNaN(newProgress)) {
          updatedProgresses[userStoryIndex] = newProgress;

          if (updatedProgresses[userStoryIndex] >= 1) {
            clearInterval(timer);
          }
        }

        return updatedProgresses;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [currentIndex, stories]);

  useEffect(() => {
    getStoriesList();
  }, []);

  return {
    userStories,
    progresses,
    stories,
    currentIndex,
    goBack,
    goForward,
    setLiked,
    liked,
  };
};
