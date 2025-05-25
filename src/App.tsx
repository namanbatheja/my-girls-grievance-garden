import React, { useState, useEffect, useRef, useCallback } from 'react';
import { init, send } from '@emailjs/browser';
import './styles.css';

// Replace these with your EmailJS credentials from your dashboard
const EMAILJS_SERVICE_ID = 'service_2h8eiup';
const EMAILJS_TEMPLATE_ID = 'template_8fd8n4m';
const EMAILJS_PUBLIC_KEY = 'bvqBuQnH_ZKi3aoIC';

// Initialize EmailJS
init(EMAILJS_PUBLIC_KEY);

// Define TypeScript interfaces
interface MoodEntry {
  mood: string;
  timestamp: string;
}

// Import your girlfriend's photo
// @ts-ignore
import gfPhoto from './assets/gf-photo.jpg.PNG';

function App() {
  // State for grievance submission
  const [grievanceText, setGrievanceText] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedRemedy, setSelectedRemedy] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // State for mood logging
  const [currentMood, setCurrentMood] = useState<string>('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  // State for quick remedies
  const [remedySentMessage, setRemedySentMessage] = useState<string>('');

  // Array of possible immediate remedies for grievance
  const grievanceRemedies = [
    "A warm hug (virtual for now!)",
    "Your favorite tiramisu (or a promise of it!)",
    "Freshly picked flowers (a digital bouquet!)",
    "A cozy movie night (let's plan it!)",
    "Listening ears (always open for you)",
    "A silly dance party (just for us!)",
    "A quiet moment together",
    "Your favorite hot drink",
    "A heartfelt 'I love you'"
  ];

  // Array of quick remedies to send directly
  const quickRemedies = [
    { text: "A digital bouquet of pixel flowers", icon: "🌸" },
    { text: "A virtual slice of tiramisu", icon: "🍰" },
    { text: "A promise of a cozy movie night", icon: "🍿" },
    { text: "A warm, comforting thought", icon: "🤗" }
  ];

  // Emojis for mood logging
  const moodEmojis = [
    { emoji: '😊', description: 'Happy' },
    { emoji: '😌', description: 'Relaxed' },
    { emoji: '💡', description: 'Inspired' },
    { emoji: '🤔', description: 'Thoughtful' },
    { emoji: '😔', description: 'Sad' },
    { emoji: '😠', description: 'Annoyed' },
    { emoji: '😥', description: 'Anxious' },
    { emoji: '😴', description: 'Tired' },
    { emoji: '💖', description: 'Loved' },
    { emoji: '🌟', description: 'Great' }
  ];

  // Handle grievance text input change
  const handleGrievanceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGrievanceText(e.target.value);
  };

  // Handle grievance form submission
  const handleSubmitGrievance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (grievanceText.trim() === '') {
      setError("Please share your cloudy thought before planting the seed.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Send email using EmailJS
      await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          message: grievanceText,
          mood: currentMood,
          timestamp: new Date().toLocaleString()
        },
        EMAILJS_PUBLIC_KEY
      );

      const randomRemedy = grievanceRemedies[Math.floor(Math.random() * grievanceRemedies.length)];
      setSelectedRemedy(randomRemedy);
      setIsSubmitted(true);
    } catch (err: any) { // Catching 'any' for now, consider a more specific error type
      setError('Failed to send your message. Please try again.');
      console.error('Email sending failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "Plant another seed" button click
  const handleResetGrievance = () => {
    setIsSubmitted(false);
    setGrievanceText('');
    setSelectedRemedy('');
    setError('');
  };

  // Handle mood emoji selection
  const handleSelectMoodEmoji = (emoji: string) => {
    setCurrentMood(emoji);
  };

  // Handle mood log submission
  const handleLogMood = () => {
    if (currentMood.trim() === '') {
      setError("Please select an emoji before logging your mood.");
      return;
    }
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setMoodHistory(prev => [...prev, { mood: currentMood, timestamp }]);
    setCurrentMood('');
  };

  // Handle sending quick remedy
  const handleSendRemedy = (remedyText: string) => {
    setRemedySentMessage(`Sent: "${remedyText}"! Hope it brings a smile.`);
    setTimeout(() => setRemedySentMessage(''), 3000);
  };

  return (
    <div className="app-container">
      <div className="content-grid">
        {/* Left Column - Grievance Section */}
        <div className="panel">
          <h2 className="neon-title neon-flicker">Cloudy Thoughts</h2>
          {!isSubmitted ? (
            <form onSubmit={handleSubmitGrievance}>
              <label className="neon-text">
                What's on your heart today, my love?
              </label>
              <div className="textarea-container">
                <textarea
                  value={grievanceText}
                  onChange={handleGrievanceChange}
                  placeholder="Share a cloudy thought, a tiny worry, or something that's been on your mind..."
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="neon-button green"
              >
                {isLoading ? 'Planting...' : 'Plant the Seed'}
              </button>
            </form>
          ) : (
            <div className="success-container">
              <p className="neon-text">Thank you for sharing!</p>
              <div className="remedy-container">
                <p className="remedy-text">{selectedRemedy}</p>
              </div>
              <button
                onClick={handleResetGrievance}
                className="neon-button purple"
              >
                Plant Another Seed
              </button>
            </div>
          )}
          
          {/* Girlfriend's Photo */}
          <div className="photo-container">
            <div className="photo-frame">
              <img src={gfPhoto} alt="Your Love" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Mood Section */}
          <div className="panel">
            <h2 className="neon-title">Daily Bloom</h2>
            <p className="neon-text">How's your garden feeling today?</p>
            <div className="emoji-grid">
              {moodEmojis.map((item, index) => (
                <button
                  key={index}
                  className={`emoji-button ${currentMood === item.emoji ? 'selected' : ''}`}
                  onClick={() => handleSelectMoodEmoji(item.emoji)}
                  title={item.description}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
            <button onClick={handleLogMood} className="neon-button purple">
              Log Bloom
            </button>
            {moodHistory.length > 0 && (
              <div className="mood-history">
                <h3 className="neon-text">Bloom History:</h3>
                <ul>
                  {moodHistory.map((entry, index) => (
                    <li key={index}>
                      <span>{entry.timestamp}:</span> {entry.mood}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick Remedies Section */}
          <div className="panel">
            <h2 className="neon-title">Little Comforts</h2>
            <p className="neon-text">Send a quick pick-me-up:</p>
            <div className="comfort-grid">
              {quickRemedies.map((remedy, index) => (
                <button
                  key={index}
                  onClick={() => handleSendRemedy(remedy.text)}
                  className="comfort-button"
                >
                  <span className="comfort-icon">{remedy.icon}</span>
                  {remedy.text}
                </button>
              ))}
            </div>
            {remedySentMessage && (
              <div className="message-container">
                <p className="neon-text">{remedySentMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 