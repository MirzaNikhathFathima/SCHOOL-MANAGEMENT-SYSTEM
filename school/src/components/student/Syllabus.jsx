import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './syllabus.css';  // Import the CSS file for styling

const syllabusData = {
  1: {
    Telugu: ['Alphabet', 'Simple Words', 'Reading Practice'],
    Hindi: ['Alphabet', 'Basic Words', 'Rhymes'],
    English: ['Alphabet', 'Basic Sentences', 'Picture Reading'],
    Maths: ['Counting (1 to 100)', 'Basic Shapes', 'Simple Addition/Subtraction'],
    EVS: ['My Family', 'My School', 'Plants and Animals'],
  },
  2: {
    Telugu: ['Sentences', 'Simple Stories', 'Reading Comprehension'],
    Hindi: ['Sentences', 'Basic Grammar', 'Short Poems'],
    English: ['Simple Sentences', 'Phonics', 'Basic Reading'],
    Maths: ['Number Patterns', 'Addition/Subtraction', 'Basic Geometry'],
    EVS: ['Neighborhood', 'Plants and Trees', 'Festivals'],
  },
  3: {
    Telugu: ['Reading and Writing Practice', 'Simple Grammar', 'Stories'],
    Hindi: ['Reading Practice', 'Grammar (Nouns)', 'Poems'],
    English: ['Grammar (Nouns and Verbs)', 'Reading Practice', 'Comprehension'],
    Maths: ['Multiplication', 'Division', 'Fractions'],
    Science: ['Living and Non-Living Things', 'Water Cycle', 'Our Earth'],
    Social: ['Local Government', 'India’s States', 'Landforms'],
  },
  4: {
    Telugu: ['Advanced Grammar', 'Prose and Poetry', 'Short Stories'],
    Hindi: ['Grammar (Tenses)', 'Comprehension', 'Stories'],
    English: ['Essay Writing', 'Grammar (Tenses and Adjectives)', 'Reading Skills'],
    Maths: ['Geometry', 'Factors and Multiples', 'Basic Measurements'],
    Science: ['Plants and Animals', 'Weather and Climate', 'Electricity'],
    Social: ['Indian Geography', 'Maps and Directions', 'Local History'],
  },
  5: { Telugu: ['Prose and Poems', 'Grammar', 'Reading and Writing Practice'], Hindi: ['Advanced Grammar', 'Prose and Poetry', 'Comprehension'], English: ['Grammar (Conjunctions)', 'Reading Comprehension', 'Essay Writing'], Maths: ['Decimals', 'Perimeter and Area', 'Geometry'], Science: ['Our Environment', 'Energy Resources', 'Basic Machines'], Social: ['History of India', 'Continents and Oceans', 'Indian Economy'] },
  6: { Telugu: ['Prose, Poetry', 'Comprehension', 'Writing Skills'], Hindi: ['Grammar (Verb Forms)', 'Poems and Short Stories', 'Reading Comprehension'], English: ['Reading Comprehension', 'Letter Writing', 'Grammar (Adverbs)'], Maths: ['Integers', 'Algebraic Expressions', 'Basic Statistics'], Science: ['Cells', 'Magnets and Electricity', 'Human Body'], Social: ['World Geography', 'Indian History', 'Political Science'] },
  7: { Telugu: ['Grammar', 'Prose and Poetry', 'Literature'], Hindi: ['Grammar', 'Reading and Writing Practice', 'Prose'], English: ['Essay Writing', 'Grammar (Prepositions)', 'Reading Skills'], Maths: ['Rational Numbers', 'Exponents', 'Geometry and Construction'], Science: ['Natural Resources', 'Sound and Light', 'Human Anatomy'], Social: ['Indian History', 'World Geography', 'Economics'] },
  8: { Telugu: ['Prose, Poetry', 'Advanced Grammar', 'Essay Writing'], Hindi: ['Grammar', 'Prose and Poetry', 'Reading Comprehension'], English: ['Comprehension', 'Grammar (Modals)', 'Creative Writing'], Maths: ['Linear Equations', 'Pythagoras Theorem', 'Mensuration'], Science: ['Chemical Reactions', 'Force and Pressure', 'Cell Division'], Social: ['Indian Independence', 'Global Geography', 'Political Systems'] },
  9: { Telugu: ['Prose and Poetry', 'Advanced Grammar', 'Essay Writing'], Hindi: ['Advanced Grammar', 'Literature', 'Creative Writing'], English: ['Grammar (Clauses)', 'Reading Comprehension', 'Writing Skills'], Maths: ['Polynomials', 'Circles and Constructions', 'Probability'], Science: ['Atoms and Molecules', 'Gravitation', 'Tissues and Organs'], Social: ['Indian History', 'World Geography', 'Civics'] },
  10: { Telugu: ['Advanced Grammar', 'Literature', 'Essay Writing'], Hindi: ['Advanced Grammar', 'Prose and Poetry', 'Literature'], English: ['Essay Writing', 'Shakespeare', 'Grammar (Clauses and Tenses)'], Maths: ['Algebra', 'Geometry', 'Trigonometry'], Science: ['Physics (Electricity)', 'Chemistry (Chemical Bonding)', 'Biology (Human Reproduction)'], Social: ['History (Indian Freedom Struggle)', 'Civics (Indian Constitution)', 'Geography (Climate Change)'] },
};


const Syllabus = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClassSelect = (classNumber) => {
    setSelectedClass(classNumber);
  };

  return (
    <div className="syllabus-page">
      {/* Background Bubbles */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      <div className="container d-flex flex-column align-items-center min-vh-100">
        <h2 className="text-primary mb-4 text-center">Select Class to View Syllabus</h2>

        <div className="d-flex flex-wrap justify-content-center mb-5">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((classNumber) => (
            <button
              key={classNumber}
              className="btn btn-lg m-2 btn-primary"
              onClick={() => handleClassSelect(classNumber)}
            >
              Class {classNumber}
            </button>
          ))}
        </div>

        {selectedClass && (
          <div className="syllabus-container p-4 rounded">
            <h3 className="text-center text-info mb-4">
              Syllabus for Class {selectedClass}
            </h3>
            <div className="d-flex flex-wrap justify-content-center">
              {Object.entries(syllabusData[selectedClass] || {}).map(
                ([subject, topics]) => (
                  <div key={subject} className="syllabus-card m-2">
                    <div className="syllabus-card-body">
                      <h4 className="syllabus-card-title">{subject}</h4>
                      <ul className="syllabus-list">
                        {topics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Syllabus;
