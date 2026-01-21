import React, { useState } from "react";
import "./CalendarView.css";

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // Sample tasks - can be replaced with real data
  const tasksData = {
    1: [
      { id: 1, type: "TimeIn", status: "completed", name: "Labour 1" },
      { id: 2, type: "WorkAllocation", status: "pending", name: "Labour 2" }
    ],
    5: [
      { id: 3, type: "Completion", status: "completed", name: "Labour 3" }
    ],
    10: [
      { id: 4, type: "TimeOut", status: "completed", name: "Labour 4" },
      { id: 5, type: "QC", status: "pending", name: "Labour 5" }
    ],
    15: [
      { id: 6, type: "TimeIn", status: "completed", name: "Labour 6" },
      { id: 7, type: "WorkAllocation", status: "completed", name: "Labour 7" },
      { id: 8, type: "QC", status: "pending", name: "Labour 8" }
    ],
    20: [
      { id: 9, type: "Completion", status: "completed", name: "Labour 9" }
    ]
  };

  const getTaskColor = (type) => {
    const colors = {
      TimeIn: "#10b981",
      WorkAllocation: "#3b82f6",
      Completion: "#06b6d4",
      TimeOut: "#f59e0b",
      QC: "#8b5cf6"
    };
    return colors[type] || "#6b7280";
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const today = new Date();
  const isCurrentMonth = 
    currentDate.getFullYear() === today.getFullYear() && 
    currentDate.getMonth() === today.getMonth();

  return (
    <div className="calendar-view">
      {/* Header */}
      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-btn">‹</button>
        <h2>{monthName} {year}</h2>
        <button onClick={nextMonth} className="nav-btn">›</button>
      </div>

      {/* Day Names */}
      <div className="calendar-weekdays">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
      </div>

      {/* Calendar Days */}
      <div className="calendar-days">
        {daysArray.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-day ${day ? "has-day" : "empty"} ${
              isCurrentMonth && day === today.getDate() ? "today" : ""
            }`}
          >
            {day && (
              <>
                <div className="day-number">{day}</div>
                <div className="day-tasks">
                  {tasksData[day] && tasksData[day].slice(0, 2).map((task) => (
                    <span
                      key={task.id}
                      className="task-dot"
                      style={{ backgroundColor: getTaskColor(task.type) }}
                      title={`${task.type}: ${task.name}`}
                    />
                  ))}
                  {tasksData[day] && tasksData[day].length > 2 && (
                    <span className="more-tasks">+{tasksData[day].length - 2}</span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="calendar-legend">
        <div className="legend-title">Task Types</div>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "#10b981" }} />
            <span>Time In</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "#3b82f6" }} />
            <span>Work Allocation</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "#06b6d4" }} />
            <span>Completion</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "#f59e0b" }} />
            <span>Time Out</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "#8b5cf6" }} />
            <span>QC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
