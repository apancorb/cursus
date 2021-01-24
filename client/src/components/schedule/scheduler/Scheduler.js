import React, { useState, useEffect } from "react";
import Scheduler, {
  Editing,
  Appointments,
  Resource,
} from "devextreme-react/scheduler";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.dark.css";

import "./Scheduler.css";

const colorData = [
  {
    id: 1,
    color: "#cb6bb2",
  },
  {
    id: 2,
    color: "#56ca85",
  },
  {
    id: 3,
    color: "#1e90ff",
  },
  {
    id: 4,
    color: "#ff9747",
  },
  {
    id: 5,
    color: "#f05797",
  },
  {
    id: 6,
    color: "#2a9010",
  },
  {
    id: 7,
    color: "#901010",
  },
  {
    id: 8,
    color: "#906c10",
  },
  {
    id: 9,
    color: "#ff6363",
  },
  {
    id: 10,
    color: "#ff8a63",
  },
  {
    id: 11,
    color: "#92ff63",
  },
  {
    id: 12,
    color: "#63fff5",
  },
  {
    id: 13,
    color: "#b463ff",
  },
  {
    id: 14,
    color: "#ff637d",
  },
  {
    id: 15,
    color: "#9aff63",
  },
  {
    id: 16,
    color: "#ffe063",
  },
];

const currentDate = new Date(2021, 2, 1);

function SchedulerComponent({ currentTerm, setCurrentTerm }) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const dateConversion = (day) => {
      if (day === "M") {
        return 1;
      } else if (day === "T") {
        return 2;
      } else if (day === "W") {
        return 3;
      } else if (day === "R") {
        return 4;
      } else if (day === "F") {
        return 5;
      }
    };

    const updateScheduler = () => {
      let data = [];
      currentTerm.courses.forEach((course) => {
        if (!course.show) {
          if (course.times.length !== 0) {
            course.times.forEach((t) => {
              t.days.forEach((d) => {
                data.push({
                  text: `${course.sectionID} ${course.classID}\n${t.location}`,
                  colorID: course.color,
                  startDate: new Date(
                    2021,
                    2,
                    dateConversion(d),
                    t.time[0][0],
                    t.time[0][1]
                  ),
                  endDate: new Date(
                    2021,
                    2,
                    dateConversion(d),
                    t.time[1][0],
                    t.time[1][1]
                  ),
                });
              });
            });
          }
        }
      });
      setDataSource(data);
    };
    updateScheduler();
  }, [currentTerm]);

  function renderDataCell(data, index, element) {
    return (
      <div style={{ width: "100%", height: 40, "font-family": "Arial" }}></div>
    );
  }

  function renderDateCell(data, index, element) {
    if (data.text === "Mon 1") {
      data.text = "Monday";
    } else if (data.text === "Tue 2") {
      data.text = "Tuesday";
    } else if (data.text === "Wed 3") {
      data.text = "Wednesday";
    } else if (data.text === "Thu 4") {
      data.text = "Thursday";
    } else if (data.text === "Fri 5") {
      data.text = "Friday";
    }
    return (
      <b style={{ color: "white", fontWeight: "bold" }}>{<p>{data.text}</p>}</b>
    );
  }

  return (
    <Scheduler
      dataSource={dataSource}
      defaultCurrentDate={currentDate}
      showAllDayPanel={false}
      showCurrentTimeIndicator={false}
      startDayHour={8} // make this the min one
      endDayHour={22} // make this be the max one
      dataCellRender={renderDataCell}
      dateCellRender={renderDateCell}
      defaultCurrentView="workWeek"
      currentView="workWeek"
    >
      <Resource
        dataSource={colorData}
        fieldExpr="colorID"
        useColorAsDefault={true}
      />
      <Editing
        allowAdding={false}
        allowDeleting={false}
        allowDragging={false}
        allowResizing={false}
        allowTimeZoneEditing={false}
        allowUpdating={false}
      />
    </Scheduler>
  );
}

export default SchedulerComponent;
