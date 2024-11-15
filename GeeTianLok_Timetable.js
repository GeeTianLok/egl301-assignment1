//tbh its kinda dumb to comment on every function espically if the name is self explanatory
module.exports = {
  //dummy data
  Lectures: {
    L001: { name: "math", startTime: 9.5, duration: 2, lecturer: "Bob" },
    L002: { name: "english", startTime: 11, duration: 6, lecturer: "Josh" },
    L003: { name: "science", startTime: 13, duration: 2, lecturer: "Tim" },
  },

  TimeTables: {},

  //Get set for lectures
  setLecture(id, name, startTime, duration, lecturer) {
    if (!id || !name || !startTime || !duration || !lecturer) {
      console.log("Missing arguments please recheck");
      return;
    }
    this.Lectures[id] = {
      name: name,
      startTime: startTime,
      duration: duration,
      lecturer: lecturer,
    };
  },

  //get a lecture by its ID
  getLecture(id) {
    return this.Lectures[id];
  },

  getAllLectures() {
    return this.Lectures;
  },

  //Find the end time of 2 lectures and check for conflict by seeing if a lecture starts before the other ends
  checkCollision(lecture1, lecture2) {
    var lecture1 = this.getLecture(lecture1);
    var lecture2 = this.getLecture(lecture2);
    var lecture1EndTime = lecture1.startTime + lecture1.duration;
    var lecture2EndTime = lecture2.startTime + lecture2.duration;
    return (
      (lecture1.startTime < lecture2EndTime &&
        lecture1EndTime > lecture2.startTime) ||
      (lecture2.startTime < lecture1EndTime &&
        lecture2EndTime > lecture1.startTime)
    );
  },

  //Get set for timetables
  setTimetable(id, lectures) {
    var allExist = true;
    var valid = [];

    //Ensure all inputted lecture is in the lecture table
    for (var [i, v] of lectures.entries()) {
      if (!this.Lectures[v]) {
        allExist = false;
        console.log(v + " is not a valid lecture");
      }
    }

    //Make sure theres no overlap between lectures
    if (allExist) {
      var collisionDetected = false;

      for (var [i, v] of lectures.entries()) {
        for (var [i2, v2] of valid.entries()) {
          if (this.checkCollision(v, v2)) {
            console.log("Collision detected between " + v + " and " + v2);
            collisionDetected = true;
            break;
          }
        }

        valid.push(v);
      }

      if (collisionDetected) {
        console.log("Timetable not added due to collision(s).");
      } else {
        this.TimeTables[id] = valid;
        console.log("Timetable added successfully.");
      }
    }
  },

  getTimetable(id) {
    return this.TimeTables[id];
  },

  //Provides better visualisation of created timetable for viewing
  printTimetable(id) {
    if (!this.getTimetable(id)) {
      console.log("No timetable found for ID: " + id);
      return;
    }

    //Container to make working with console.table easier
    var lects = [];

    var timetable = this.getTimetable(id);
    var prevEndTime = 0;

    console.log("Timetable: " + id);

    for (var v of timetable) {
      var lecture = this.getLecture(v);
      var startTime = lecture.startTime;
      var duration = lecture.duration;
      var lecturer = lecture.lecturer;

      var hours = Math.floor(startTime);
      var minutes = Math.round((startTime % 1) * 60);

      //Adds a 0 to the start of mins/hrs if its only 1 digit
      var formattedStartTime;
      if (hours < 10) {
        formattedStartTime = "0" + hours;
      } else {
        formattedStartTime = hours.toString();
      }
      formattedStartTime += ":";
      if (minutes < 10) {
        formattedStartTime += "0" + minutes;
      } else {
        formattedStartTime += minutes.toString();
      }

      var endTimeValue = startTime + duration;
      var endHours = Math.floor(endTimeValue);
      var endMinutes = Math.round((endTimeValue % 1) * 60);
      var formattedEndTime;

      //Adds a 0 to the start of mins/hrs if its only 1 digit
      if (endHours < 10) {
        formattedEndTime = "0" + endHours;
      } else {
        formattedEndTime = endHours.toString();
      }
      formattedEndTime += ":";
      if (endMinutes < 10) {
        formattedEndTime += "0" + endMinutes;
      } else {
        formattedEndTime += endMinutes.toString();
      }

      //Checking for periods where there are no lessons and assigning it as break time
      if (prevEndTime && startTime > prevEndTime) {
        var breakStartHours = Math.floor(prevEndTime);
        var breakStartMinutes = Math.round((prevEndTime % 1) * 60);
        var breakStartTime;
        if (breakStartHours < 10) {
          breakStartTime = "0" + breakStartHours;
        } else {
          breakStartTime = breakStartHours.toString();
        }
        breakStartTime += ":";
        if (breakStartMinutes < 10) {
          breakStartTime += "0" + breakStartMinutes;
        } else {
          breakStartTime += breakStartMinutes.toString();
        }

        var breakEndHours = hours;
        var breakEndMinutes = minutes;
        var breakEndTime;
        if (breakEndHours < 10) {
          breakEndTime = "0" + breakEndHours;
        } else {
          breakEndTime = breakEndHours.toString();
        }
        breakEndTime += ":";
        if (breakEndMinutes < 10) {
          breakEndTime += "0" + breakEndMinutes;
        } else {
          breakEndTime += breakEndMinutes.toString();
        }

        lects.push({
          name: "break",
          startTime: breakStartTime,
          endTime: breakEndTime,
          lecturer: "None",
          duration: (startTime - prevEndTime).toString() + "h",
        });
      }

      lects.push({
        name: lecture.name,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        lecturer: lecturer.toString(),
        duration: duration.toString() + "h",
      });

      prevEndTime = endTimeValue;
    }

    console.table(lects);
  },
};
