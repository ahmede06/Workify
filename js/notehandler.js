document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".add-notes-button");
    const noteContainer = document.querySelector(".note-container");
    const confirmButton = document.querySelector(".confirm-button");
    const noteInput = document.querySelector(".note-input");
    const notesList = document.querySelector(".notes-list");

    noteContainer.style.display = "none";

    const defaultNotes = [
        "Check if items are recyclable before disposing of them. ♻️",
        "Avoid plastic straws and cutlery."
    ];

    if (!localStorage.getItem("notes")) {
        localStorage.setItem("notes", JSON.stringify(defaultNotes));
    }

    button.addEventListener("click", function() {
        noteContainer.style.display = (noteContainer.style.display === "none") ? "block" : "none";
    });

    confirmButton.addEventListener('click', function() {
        const noteText = noteInput.value.trim();

        if (noteText) {
            const noteItem = document.createElement('li');
            noteItem.classList.add('note-item');

            const noteTextSpan = document.createElement('span');
            noteTextSpan.classList.add('note-text');
            noteTextSpan.textContent = noteText;

            const garbageBinSpan = document.createElement('span');
            garbageBinSpan.classList.add('garbage-bin');
            garbageBinSpan.innerHTML = '<i class="fas fa-trash-alt"></i>';
            garbageBinSpan.style.marginLeft = '5px';

            noteItem.appendChild(noteTextSpan);
            noteItem.appendChild(garbageBinSpan);

            notesList.appendChild(noteItem);
            saveNotes();

            noteInput.value = '';

            garbageBinSpan.addEventListener('click', function() {
                noteItem.remove();
                saveNotes();
            });
        }
    });

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesList.innerHTML = '';

        notes.forEach(note => {
            const newNote = document.createElement('li');
            newNote.classList.add('note-item');

            const noteTextSpan = document.createElement('span');
            noteTextSpan.classList.add('note-text');
            noteTextSpan.textContent = note;
            newNote.appendChild(noteTextSpan);

            const garbageBinSpan = document.createElement('span');
            garbageBinSpan.classList.add('garbage-bin');
            garbageBinSpan.innerHTML = '<i class="fas fa-trash-alt"></i>';
            garbageBinSpan.style.marginLeft = '5px';

            newNote.appendChild(garbageBinSpan);

            notesList.appendChild(newNote);

            garbageBinSpan.addEventListener('click', function() {
                newNote.remove();
                saveNotes();
            });
        });
    }

    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.notes-list li').forEach(note => {
            const noteTextSpan = note.querySelector('.note-text');
            if (noteTextSpan) {
                notes.push(noteTextSpan.textContent.trim());
            }
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    loadNotes();
});

