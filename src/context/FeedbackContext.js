import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    { id: 1, text: "This feedback item 1", rating: 10 },
    { id: 2, text: "This feedback item 2", rating: 9 },
    { id: 3, text: "This feedback item 3", rating: 8 },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    isEditing: false,
  });

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const updateFeedback = (id, updatedItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const editFeedback = (item) => {
    setFeedbackEdit({ item, isEditing: true });
  };

  const deleteFeedback = (id) =>
    setFeedback(feedback.filter((item) => item.id !== id));

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        addFeedback,
        updateFeedback,
        editFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
