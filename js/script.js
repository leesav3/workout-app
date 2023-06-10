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
    if (key != 'date') {
      console.log("KEY: " + key + " " + val[key]);
    
      // Insert a cell in the row at index i
      newCell = newRow.insertCell(i);

      // Append a text node to the cell
      newText = document.createTextNode(val[key]);
      newCell.appendChild(newText);
      i += 1;
    }
  }

  let date=new Date(); // creates a new date object with the current date and time
        let year=date.getFullYear(); // gets the current year
        let month=date.getMonth(); // gets the current month (index based, 0-11)
        
        const day=document.querySelector(".calendar-dates"); // selects the element with class "calendar-dates"
        const currdate=document.querySelector(".calendar-current-date"); // selects the element with class "calendar-current-date"
        const prenexIcons=document.querySelectorAll(".calendar-navigation span"); // selects all elements with class "calendar-navigation span"
        
        const months=[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"]; // array of month names
        
        // function to generate the calendar
        const manipulate=()=> {
            // get the first day of the month
            let dayone=new Date(year, month, 1).getDay();
        
            // get the last date of the month
            let lastdate=new Date(year, month + 1, 0).getDate();
        
            // get the day of the last date of the month
            let dayend=new Date(year, month, lastdate).getDay();
        
            // get the last date of the previous month
            let monthlastdate=new Date(year, month, 0).getDate();
        
            let lit=""; // variable to store the generated calendar HTML
        
            // loop to add the last dates of the previous month
            for (let i=dayone; i > 0; i--) {
        lit+=`<li class="inactive day">${monthlastdate - i + 1}</li>`;
            }
        
            // loop to add the dates of the current month
            for (let i=1; i <=lastdate; i++) {
        // check if the current date is today
        let isToday=i===date.getDate() && month===new Date().getMonth() && year===new Date().getFullYear() ? "active": "";
        lit+=`<li class="${isToday} day">${i}</li>`;
            }
        
            // loop to add the first dates of the next month
            for (let i=dayend; i < 6; i++) {
        lit+=`<li class="inactive day">${i - dayend + 1}</li>`
            }
        
            // update the text of the current date element with the formatted current month and year
            currdate.innerText=`${months[month]} ${year}`;
        
            // update the HTML of the dates element with the generated calendar
            day.innerHTML=lit;
        }
        
        manipulate();
        
        // Attach a click event listener to each icon
        prenexIcons.forEach(icon=> {
        
        // When an icon is clicked
        icon.addEventListener("click", ()=> {
                // Check if the icon is "calendar-prev" or "calendar-next"
                month=icon.id==="calendar-prev" ? month - 1 : month + 1;
        
                // Check if the month is out of range
                if (month < 0 || month > 11) {
                    // Set the date to the first day of the month with the new year
                    date=new Date(year, month, new Date().getDate());
                    // Set the year to the new year
                    year=date.getFullYear();
                    // Set the month to the new month
                    month=date.getMonth();
                }
        
                else {
                    // Set the date to the current date
                    date=new Date();
                }
        
                // Call the manipulate function to update the calendar display
                manipulate();
            });
            });
  
}

document.getElementById("calendar-dates").addEventListener("click", function(e) {
  
  //remove selected active day
  let days = document.getElementsByClassName("active");
  for(const day of days) {
    day.classList.toggle("active");
  }
  
  //add clicked day as active
  e.target.classList.add("active");
});