import { useState } from "react";
import './style.css'

function App() {
  const [input, setInput] = useState('');
  const [students, setStudents] = useState<string[]>([]);
  const [activeEditIndex, setActiveEditIndex] = useState<null | number>(null);
  const [activeEditInput, setActiveEditInput] = useState<null | string>(null);

  const handleInputChange = (event: any) => {
    setInput(event.target.value)
  }

  const handleAddStudent = () => {
    setStudents([...students, input]);
  }

  const handleStudentDelete = (index: number) => {
    const nextStudents = [...students]
    nextStudents.splice(index, 1);
    setStudents(nextStudents)
  }

  const handleTriggerEdit = (index: number) => {
    setActiveEditIndex(index);
    setActiveEditInput(students[index])
  }

  const handleEditInputChange =(event:any)=>{
    setActiveEditInput(event.target.value)
  }

  const handleConfirmEdit = (index: number) => {
    const nextStudents = [...students];
    nextStudents[index] = activeEditInput || '';
    setStudents(nextStudents)
    setActiveEditIndex(null);
    setActiveEditInput(null);
  }
 
  return (
    <div className="container">
      <h1>What is in the input?: {input}</h1>
      <div className="form-container"> 
        <input type="text" onChange={handleInputChange} value={input} />
        <button onClick={handleAddStudent}>Add student</button>
      </div>
      <div className="list-container">
        {
          students.map((student, i) => (
            <span className="student-item" key={i}>
              {
                activeEditIndex === i ? 
                <input onChange={handleEditInputChange} value={activeEditInput || ''} /> 
                : student 
              }
              {
                (activeEditIndex || activeEditIndex === 0) && activeEditInput ? (
                  <button onClick={() => handleConfirmEdit(i)}>confirm</button>
                ) : (
                  <button onClick={() => handleTriggerEdit(i)}>edit</button>
                )
              }
              <button onClick={() => handleStudentDelete(i)}>delete</button>
            </span>
          ))
        }
      </div>
    </div>
  );
}

export default App;
