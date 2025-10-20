import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const KaizenSuggestionTask: React.FC = () => {
  const { updateTaskCompletion } = useContext(AppContext);

  const handleOpenGoogleForm = () => {
    // Replace with the actual Google Form URL
    window.open('https://forms.office.com/r/vJ2dA7FUGW', '_blank');
  };

  const handleSubmit = () => {
    // Award 3 points for this task
    updateTaskCompletion('task5', 1, 3);
  };

  return (
    <div>
      <h2>Kaizen Suggestion</h2>
      <p>Share your ideas for continuous improvement (Kaizen).</p>
      <button onClick={handleOpenGoogleForm}>Open Google Form</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default KaizenSuggestionTask;