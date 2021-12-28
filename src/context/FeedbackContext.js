import { createContext, useEffect, useState } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    isEditing: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    const res = await fetch('/feedback?_sort=id&_order=desc')
    const data = await res.json()
    setFeedback(data)
    setIsLoading(false)
  }

  const addFeedback = async newFeedback => {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await res.json()

    setFeedback([data, ...feedback])
  }

  const updateFeedback = async (id, updatedItem) => {
    const res = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })

    const data = await res.json()

    setFeedback(
      feedback.map(item => (item.id === id ? { ...item, ...data } : item))
    )
  }

  const editFeedback = item => {
    setFeedbackEdit({ item, isEditing: true })
  }

  const deleteFeedback = async id => {
    await fetch(`/feedback/${id}`, {
      method: 'DELETE',
    })
    setFeedback(feedback.filter(item => item.id !== id))
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        updateFeedback,
        editFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
