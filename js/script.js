import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMKE2pdx5Xm2IDMSzS_fg4fgZct5y1_co",
  authDomain: "workouts-8ee7d.firebaseapp.com",
  databaseURL: "https://workouts-8ee7d-default-rtdb.firebaseio.com",
  projectId: "workouts-8ee7d",
  storageBucket: "workouts-8ee7d.appspot.com",
  messagingSenderId: "751813852924",
  appId: "1:751813852924:web:f2932197313940442ca179"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


//get all the json data and populate the table
const htmlTable = document.getElementById("table");

const db = getDatabase();
const exercises = ref(db, 'workouts/');
onValue(exercises, (snapshot) => {
  const exerciseData = snapshot.val();
  for (let key in exerciseData) {
    let value = exerciseData[key];
    addRow(value);
    console.log("TESt: " + value[key])
    console.log(value.date);
    console.log(value.sets);
    console.log(value.reps);
    console.log(value.weight);
    console.log(key);
  }
});

const notes = ref(db, 'notes/');
onValue(notes, (snapshot) => {
  const noteData = snapshot.val();
  for (let key in noteData) {
    let value = noteData[key];
    console.log(value.date);
    console.log(value.note);
    console.log(key);
  }
});

function addRow(val) {
  // Insert a row at the end of the table
  let newRow, newCell, newText;
  let i = 0;
  newRow = htmlTable.insertRow(-1);
  for (const key in val) {
    console.log("KEY: " + key + " " + val[key]);
   
    // Insert a cell in the row at index i
    newCell = newRow.insertCell(i);

    // Append a text node to the cell
    newText = document.createTextNode(val[key]);
    newCell.appendChild(newText);
    i += 1;
  }
  
}