import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import About from './pages/About'
import AboutIconLink from './components/AboutIconLink'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  const handleDeleteItem = id =>
    setFeedback(feedback.filter(item => item.id !== id))

  const handleAddFeedback = newFeedback => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <FeedbackForm addFeedback={handleAddFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                  deleteItem={handleDeleteItem}
                  feedback={feedback}
                />
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <AboutIconLink />
      </div>
    </Router>
  )
}

export default App
