let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes(filteredNotes = notes) {
    let container = document.getElementById("notesContainer");
    container.innerHTML = "";

    filteredNotes.forEach((note, index) => {
        let div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
            <p>${note}</p>
            <span class="delete-btn" onclick="deleteNote(${index})">🗑️</span>
            <span class="edit-btn" onclick="editNote(${index})">✏️</span>
        `;
        container.appendChild(div);
    });
}

function addNote() {
    let input = document.getElementById("noteInput");
    let text = input.value.trim();

    if (text === "") return;

    notes.push(text);
    localStorage.setItem("notes", JSON.stringify(notes));

    input.value = "";
    displayNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}


function editNote(index) {
    let newText = prompt("Edit your note:", notes[index]);

    if (newText !== null && newText.trim() !== "") {
        notes[index] = newText;
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    }
}


function searchNotes() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();

    let filtered = notes.filter(note =>
        note.toLowerCase().includes(searchValue)
    );

    displayNotes(filtered);
}


displayNotes();
