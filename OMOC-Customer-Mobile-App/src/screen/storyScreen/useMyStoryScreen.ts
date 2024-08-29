import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useMyStoryScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userStories, setUserStories] = useState([]);
  const [progresses, setProgresses] = useState(null);
  const stories = useSelector((state) => state.myStory.data);

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
      navigation.navigate("Home");
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

  return {
    userStories,
    progresses,
    stories,
    currentIndex,
    goBack,
    goForward,
  };
};
