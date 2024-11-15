const timeTableModule = require("./GeeTianLok_Timetable.js");

//Get set and data retrival
console.log("Manipulation of lecture data");
console.log("==================================");

timeTableModule.setLecture("L004", "Algebra", 16, 3);
var algebraClass = timeTableModule.getLecture("L004");
console.log("Retriving lecture data: " + JSON.stringify(algebraClass));

timeTableModule.setLecture("L004", "Chemistry", 16, 3, "Jerry");
var Chemistry = timeTableModule.getLecture("L004");
console.log("Retriving lecture data: " + JSON.stringify(Chemistry));
console.log("all lectures:");
console.log(console.table(timeTableModule.getAllLectures()));

console.log("Manipulation of timetable data");
console.log("==================================");

timeTableModule.setTimetable("T001", ["L001", "L003", "L004"]);
console.log(timeTableModule.getTimetable("T001"));

timeTableModule.printTimetable("T001");
