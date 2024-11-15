# Assignment 1 - GEE TIAN LOK

(idk why its commiting using my personal account but thats me)

## Timetable Manager

This module allows you to create lectures with varying times and durations and add them to timetables.  
The timetable automatically calculates break times and has built-in collision prevention for lectures.

---

## Usage

### **CLEAR THE DUMMY DATA IN THE NODE MODULE THAT I HAVE ADDED FOR DEMO PURPOSES**

You can import this module like any other Node.js module.  
It is recommended that you run app.js after reading through it to study its output.

---

## Functions

1. [SetLecture](#1-setlecture)
2. [GetLecture](#2-getlecture)
3. [getAllLectures](#3-getalllectures)
4. [setTimetable](#4-settimetable)
5. [getTimetable](#5-gettimetable)
6. [printTimetable](#6-printtimetable)

---

**The Following Dummy Data Is Used For The Functions Below And They Are Used Sequentually:**

```js
Lectures: {
  L001: { name: "math", startTime: 9.5, duration: 2, lecturer: "Bob" },
  L002: { name: "english", startTime: 11, duration: 6, lecturer: "Josh" },
  L003: { name: "science", startTime: 13, duration: 2, lecturer: "Tim" },
},

TimeTables: {},
```

---

### 1. SetLecture

This function creates a lecture with the following parameters:  
`("Lecture ID", "Lecture Name", "Start Time (24-hour format)", "Duration in hours", "Lecturer Name")`

**Example usage:**

```javascript
timeTableModule.setLecture("L004", "Algebra", 16, 3, "Jerry");
```

---

### 2. GetLecture

This function retrieves a lecture by its lecture ID.

**Example usage:**

```javascript
var algebraClass = timeTableModule.getLecture("L004");
console.log(algebraClass);
```

**Expected output:**

```
{"name":"Chemistry","startTime":16,"duration":3,"lecturer":"Jerry"}
```

---

### 3. getAllLectures

This function retrieves a list of all lectures that have been added.

**Example usage:**

```javascript
console.table(timeTableModule.getAllLectures());
```

**Expected output:**

```
┌─────────┬─────────────┬───────────┬──────────┬──────────┐
│ (index) │ name        │ startTime │ duration │ lecturer │
├─────────┼─────────────┼───────────┼──────────┼──────────┤
│ L001    │ 'math'      │ 9.5       │ 2        │ 'Bob'    │
│ L002    │ 'english'   │ 11        │ 6        │ 'Josh'   │
│ L003    │ 'science'   │ 13        │ 2        │ 'Tim'    │
│ L004    │ 'Algebra'   │ 16        │ 3        │ 'Jerry'  │
└─────────┴─────────────┴───────────┴──────────┴──────────┘
```

---

### 4. setTimetable

This function creates a timetable by providing the timetable ID and an array of lecture IDs.

**Example usage:**

```javascript
timeTableModule.setTimetable("T001", ["L001", "L003", "L004"]);
```

**Expected output:**

```
Timetable added successfully.
```

**Example with collisions:**

```javascript
timeTableModule.setTimetable("T001", ["L001", "L002", "L003"]);
```

**Expected output:**

```
Collision detected between L002 and L001
Collision detected between L003 and L002
Timetable not added due to collision(s).
```

---

### 5. getTimetable

This function retrieves the timetable by its ID.

**Example usage:**

```javascript
console.log(timeTableModule.getTimetable("T001"));
```

**Expected output:**

```
[ 'L001', 'L003', 'L004' ]
```

---

### 6. printTimetable

This function displays the timetable in a formatted table and calculate the breaks.

**Example usage:**

```javascript
timeTableModule.printTimetable("T001");
```

**Expected output:**

```
Timetable: T001
┌─────────┬─────────────┬───────────┬─────────┬──────────┬──────────┐
│ (index) │ name        │ startTime │ endTime │ lecturer │ duration │
├─────────┼─────────────┼───────────┼─────────┼──────────┼──────────┤
│ 0       │ 'math'      │ '09:30'   │ '11:30' │ 'Bob'    │ '2h'     │
│ 1       │ 'break'     │ '11:30'   │ '13:00' │ 'None'   │ '1.5h'   │
│ 2       │ 'science'   │ '13:00'   │ '15:00' │ 'Tim'    │ '2h'     │
│ 3       │ 'break'     │ '15:00'   │ '16:00' │ 'None'   │ '1h'     │
│ 4       │ 'Algebra'   │ '16:00'   │ '19:00' │ 'Jerry'  │ '3h'     │
└─────────┴─────────────┴───────────┴─────────┴──────────┴──────────┘
```

# References

[The Tables Thing](https://developer.mozilla.org/en-US/docs/Web/API/console/table_static)
