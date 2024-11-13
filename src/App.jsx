import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import "./App.css";

function App() {
  const [name, setName] = useState("John");
  const [surname, setSurname] = useState("Doe");
  const [position, setPosition] = useState("Developer");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const employeeData = [
          {
            date: "2024-11-01",
            isLate: false,
            allTasksFinished: true,
            cameAt: "12:00",
            leftAt: "20:00",
            lateMinutes: 0,
          },
          {
            date: "2024-11-02",
            isLate: true,
            allTasksFinished: false,
            cameAt: "12:20",
            leftAt: "20:00",
            lateMinutes: 20,
          },
          {
            date: "2024-11-03",
            isLate: false,
            allTasksFinished: false,
            cameAt: "12:00",
            leftAt: "18:00",
            lateMinutes: 0,
          },
          {
            date: "2024-11-04",
            isLate: true,
            allTasksFinished: true,
            cameAt: "12:30",
            leftAt: "20:00",
            lateMinutes: 30,
          },
          {
            date: "2024-11-05",
            isLate: false,
            allTasksFinished: true,
            cameAt: "12:00",
            leftAt: "20:00",
            lateMinutes: 0,
          },
          {
            date: "2024-11-06",
            isLate: false,
            allTasksFinished: false,
            cameAt: "12:00",
            leftAt: "19:00",
            lateMinutes: 0,
          },
        ];
        setEmployeeData(employeeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const getDayColor = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const dayData = employeeData.find((item) => item.date === dateString);

    if (dayData) {
      if (dayData.isLate && !dayData.allTasksFinished) {
        return "red";
      } else if (!dayData.isLate && !dayData.allTasksFinished) {
        return "yellow";
      } else if (!dayData.isLate && dayData.allTasksFinished) {
        return "green";
      }
    }

    return "gray";
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  return (
    <div className="employee-component">
      <div className="profile">
        <div className="photo"></div>
        <div className="info">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
      </div>
      <div className="buttons">
        <button>Spisanie</button>
        <button>Smena</button>
      </div>
      <div className="calendar">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) => getDayColor(date)}
          onClickDay={handleDateClick}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="modal-content">
          <button
            className="close-button"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
          <h2>Store Name</h2>

          {selectedDate < new Date() ? (
            <div>
              <div className="plan">
                <p>Plan: 120 000/600 000 (20%)</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div className="smena">
                <h3>Smena</h3>
                <div className="work-hours">
                  <span>Work hours:</span>
                  <span className="hours">12:00 - 20:00</span>
                </div>
                {employeeData
                  .filter(
                    (item) =>
                      item.date === selectedDate.toISOString().split("T")[0]
                  )
                  .map((item) => (
                    <div className="times" key={item.date}>
                      <div></div>
                      <p>Came at: </p>
                      <span className="time">{formatTime(item.cameAt)}</span>
                      <p>Left at: </p>
                      <span className="time">{formatTime(item.leftAt)}</span>
                      {item.isLate && (
                        <span className="late">
                          Late for {item.lateMinutes} min
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div>
              <p>Plan: 600 000 тг</p>
              <p>Smena</p>
              <p>Work hours: 12:00 - 20:00</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;
