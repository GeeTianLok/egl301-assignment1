# Assignment 1 GEE TIAN LOK

idk why its commiting with my personal account

# Timetable manager

This module allows you to create lectures with varying time and durations and allows you to add them to timetables

The timetable itself is able to automatically calculate break times and has a collision prevention built in for lectures.

# Usage

You may import it like any other node module
It is recommended that you run app.js after reading it to study it's output.

# Functions

1. [SetLecture](#SetLecture)
2. [GetLecture](#GetLecture)
3. [getAllLectures](#getAllLectures)
4. [getTimetable](#getTimetable)
5. [setTimetable](#setTimetable)
6. [printTimetable](#printTimetable)

## SetLecture

Create a lecture with the parameters ("Lecture ID", "Lecture name" , "Start time 24 hrs", "duration in hours")

```js
timeTableModule.setLecture("L004", "Algebra", 16, 3);
```

## GetLecture

Returns a lecture given its lecture ID.

```js
var algebraClass = timeTableModule.getLecture("L004");
```

# References

Provide the references that you have used to support your assignment.
