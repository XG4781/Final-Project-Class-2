import { useState } from "react";
import {
  EnvelopeIcon,
  HeartIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import Menu from "./Menu";

interface Student {
  name: string;
  role: string;
}

function App() {
  const [input, setInput] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [activeEditIndex, setActiveEditIndex] = useState<null | number>(null);
  const [activeEditInput, setActiveEditInput] = useState<null | string>(null);

  const handleInputChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleAddStudent = () => {
    if (input) {
      setStudents([...students, { name: input, role: role || "Student" }]);
      setInput("");
      setRole(null);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleStudentDelete = async (index: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to proceed?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
    });
    if (result.isConfirmed) {
      const nextStudents = [...students];
      nextStudents.splice(index, 1);
      setStudents(nextStudents);
      Swal.fire({
        title: "Congrats!",
        text: "You successfully removed this mf",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }
  };

  const handleTriggerEdit = (index: number) => {
    setActiveEditIndex(index);
    setActiveEditInput(students[index].name);
  };

  const handleEditInputChange = (event: any) => {
    setActiveEditInput(event.target.value);
  };

  const handleConfirmEdit = (index: number) => {
    const nextStudents = [...students];
    nextStudents[index].name = activeEditInput || "";
    setStudents(nextStudents);
    setActiveEditIndex(null);
    setActiveEditInput(null);
  };

  const [role, setRole] = useState<null | string>(null);

  return (
    <div className="w-full h-screen">
      <div className="max-w-6xl pt-10 mx-auto">
        <div className="grid items-center grid-cols-3 space-x-4">
          <div className="px-3 py-2 border rounded-md shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 focus:ring-0 sm:text-sm"
              placeholder="Jane Smith"
              onChange={handleInputChange}
              value={input}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddStudent();
                }
              }}
            />
          </div>

          <Menu onSelect={(name) => setRole(name)} />

          <button
            onClick={handleAddStudent}
            className="px-6 py-3 text-base font-medium text-center text-white bg-indigo-600 border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
        <div className="mt-4">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((person, i) => (
              <li
                key={i}
                className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow"
              >
                <div className="flex items-center justify-between w-full p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      {activeEditIndex === i ? (
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full p-1 text-gray-900 placeholder-gray-500 rounded-md border-1 focus:ring-0 sm:text-sm"
                          placeholder="Jane Smith"
                          onChange={handleEditInputChange}
                          value={activeEditInput || ""}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleConfirmEdit(i);
                            }
                          }}
                        />
                      ) : (
                        <h3
                          onClick={() => handleTriggerEdit(i)}
                          className="text-sm font-medium text-gray-900 truncate"
                        >
                          {person.name}
                        </h3>
                      )}
                      <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        {person.role}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 truncate">
                      Level 1
                    </p>
                  </div>
                  <img
                    className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
                    src={
                      "https://pyxis.nymag.com/v1/imgs/b86/82a/24563f9fa5c1472bcd6932279776b271fa-06-jackiechan.rsquare.w330.jpg"
                    }
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex -mt-px divide-x divide-gray-200">
                    <div className="flex flex-1 w-0">
                      <button
                        onClick={() => handleTriggerEdit(i)}
                        className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        <PencilIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Edit</span>
                      </button>
                    </div>
                    <div className="flex flex-1 w-0 -ml-px">
                      <button
                        onClick={() => handleStudentDelete(i)}
                        className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
                      >
                        <TrashIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* {
          students.map((student, i) => (
            <span className="student-item" key={i}>
            {
              activeEditIndex === i ? 
              <input 
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleConfirmEdit(i)
                }
              }} 
              onChange={handleEditInputChange} 
              value={activeEditInput || ''} 
              /> 
              : student 
            }
            {
              (activeEditIndex || activeEditIndex === 0) && activeEditInput ? (
                null
                ) : (
                  <button onClick={() => handleTriggerEdit(i)}>edit</button>
                  )
                }
                <button onClick={() => handleStudentDelete(i)}>delete</button>
                </span>
                ))
              } */}
        </div>
      </div>
    </div>
  );
}

export default App;
