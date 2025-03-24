document.addEventListener("DOMContentLoaded", function() {
    const calendarButtons = document.querySelectorAll(".calendar-button");
    const dayDetailsFrame = document.getElementById("dayDetailsFrame");
    const closeFrameButton = document.getElementById("closeFrameButton");
    const selectedDayTitle = document.getElementById("selectedDayTitle");
    const notesList = document.getElementById("notesList");
    const remindersList = document.getElementById("remindersList");
    const addNoteButton = document.getElementById("addNoteButton");
    const addReminderButton = document.getElementById("addReminderButton");

    
    calendarButtons.forEach(button => {
        button.addEventListener("click", function() {
            const selectedDay = button.getAttribute("data-day");
            selectedDayTitle.textContent = `Day ${selectedDay}`;

            
            loadDayDetails(selectedDay);

          
            dayDetailsFrame.style.display = "block";
        });
    });

    
    closeFrameButton.addEventListener("click", function() {
        dayDetailsFrame.style.display = "none";
    });

   
    function loadDayDetails(day) {
        
        const notes = JSON.parse(localStorage.getItem(`notes_day_${day}`)) || [];
        const reminders = JSON.parse(localStorage.getItem(`reminders_day_${day}`)) || [];

       
        notesList.innerHTML = '';
        remindersList.innerHTML = '';

      
        notes.forEach(note => {
            const noteItem = document.createElement('li');
            noteItem.textContent = note;
            notesList.appendChild(noteItem);
        });

       
        reminders.forEach(reminder => {
            const reminderItem = document.createElement('li');
            reminderItem.textContent = reminder;
            remindersList.appendChild(reminderItem);
        });
    }

    
    addNoteButton.addEventListener("click", function() {
        const newNote = prompt("Enter your note:");
        if (newNote) {
            const selectedDay = selectedDayTitle.textContent.split(" ")[1];
            const notes = JSON.parse(localStorage.getItem(`notes_day_${selectedDay}`)) || [];
            notes.push(newNote);
            localStorage.setItem(`notes_day_${selectedDay}`, JSON.stringify(notes));

            loadDayDetails(selectedDay); 
        }
    });

   
    addReminderButton.addEventListener("click", function() {
        const newReminder = prompt("Enter your reminder:");
        if (newReminder) {
            const selectedDay = selectedDayTitle.textContent.split(" ")[1];
            const reminders = JSON.parse(localStorage.getItem(`reminders_day_${selectedDay}`)) || [];
            reminders.push(newReminder);
            localStorage.setItem(`reminders_day_${selectedDay}`, JSON.stringify(reminders));

            loadDayDetails(selectedDay); 
        }
    });
});
