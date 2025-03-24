
document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".add-reminder-button");
    const reminderContainer = document.querySelector(".reminder-container");
    const confirmButton = document.querySelector(".confirm-button");
    const reminderInput = document.querySelector(".reminder-input");
    const reminderList = document.querySelector(".reminder-list");

    reminderContainer.style.display = "none";

    const defaultReminders = [
        "Take out the recycling tomorrow morning.",
        "Carpool with family and friends."
    ];

    if (!localStorage.getItem("reminders")) {
        localStorage.setItem("reminders", JSON.stringify(defaultReminders));
    }

    button.addEventListener("click", function() {
        reminderContainer.style.display = (reminderContainer.style.display === "none") ? "block" : "none";
    });

    confirmButton.addEventListener('click', function() {
        const reminderText = reminderInput.value.trim();

        if (reminderText) {
            const reminderItem = document.createElement('li');
            reminderItem.classList.add('reminder-item');

            const reminderTextSpan = document.createElement('span');
            reminderTextSpan.classList.add('reminder-text');
            reminderTextSpan.textContent = reminderText;

            const garbageBinSpan = document.createElement('span');
            garbageBinSpan.classList.add('garbage-bin');
            garbageBinSpan.innerHTML = '<i class="fas fa-trash-alt"></i>';
            garbageBinSpan.style.marginLeft = '5px';

            reminderItem.appendChild(reminderTextSpan);
            reminderItem.appendChild(garbageBinSpan);

            reminderList.appendChild(reminderItem);
            saveReminders();

            reminderInput.value = '';

            garbageBinSpan.addEventListener('click', function() {
                reminderItem.remove();
                saveReminders();
            });
        }
    });

    function loadReminders() {
        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        reminderList.innerHTML = '';

        reminders.forEach(reminder => {
            const newReminder = document.createElement('li');
            newReminder.classList.add('reminder-item');

            const reminderTextSpan = document.createElement('span');
            reminderTextSpan.classList.add('reminder-text');
            reminderTextSpan.textContent = reminder;
            newReminder.appendChild(reminderTextSpan);

            const garbageBinSpan = document.createElement('span');
            garbageBinSpan.classList.add('garbage-bin');
            garbageBinSpan.innerHTML = '<i class="fas fa-trash-alt"></i>';
            garbageBinSpan.style.marginLeft = '5px';

            newReminder.appendChild(garbageBinSpan);

            reminderList.appendChild(newReminder);

            garbageBinSpan.addEventListener('click', function() {
                newReminder.remove();
                saveReminders();
            });
        });
    }

    function saveReminders() {
        const reminders = [];
        document.querySelectorAll('.reminder-list li').forEach(reminder => {
            const reminderTextSpan = reminder.querySelector('.reminder-text');
            if (reminderTextSpan) {
                reminders.push(reminderTextSpan.textContent.trim());
            }
        });
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }

    loadReminders();
});
