import React, { useState } from 'react'
import { processvideo, AskQuestion } from './api'

function App() {
  const [url, setUrl] = useState('')
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const handleProcess = async () => {
    if (!url) {
      alert('Enter Youtube URL')
      return
    }

    setLoading(true)
    try {
      await processvideo(url)
      alert('Video processed successfully!')
    } catch (err) {
      console.error(err)
      alert('Error processing video. Please try again.')
    }
    setLoading(false)
  }

  const handleAsk = async () => {
    if (!question) return
    setLoading(true)
    try {
      const res = await AskQuestion(question)
      setChatHistory(prev => [
        ...prev,
        { q: question, a: res?.data?.answer || res?.data?.error || 'No answer found.' }
      ])
      setQuestion('')
    } catch (err) {
      console.error(err)
      alert('Error getting answer. Try again.')
    }
    setLoading(false)
  }

  return (
    <div>
      <div>
        <h1>Youtube Rag chatbot</h1>
        <div>
          <input
            type="text"
            placeholder="Enter Youtube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleProcess} disabled={loading}>
            {loading ? 'Processing...' : 'Process Video'}
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Ask question about video"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleAsk} disabled={loading}>
            {loading ? 'Thinking...' : 'Ask Question'}
          </button>
        </div>

        <div>
          {chatHistory.map((msg, index) => (
            <div key={index}>
              <p><strong>Q:</strong> {msg.q}</p>
              <p><strong>A:</strong> {msg.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App