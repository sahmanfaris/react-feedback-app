import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  const handleDeleteItem = id =>
    setFeedback(feedback.filter(item => item.id !== id))

  const handleAddFeedback = newFeedback => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  return (
    <>
      <Header />
      <div className='container'>
        <FeedbackForm addFeedback={handleAddFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList deleteItem={handleDeleteItem} feedback={feedback} />
      </div>
    </>
  )
}

export default App
