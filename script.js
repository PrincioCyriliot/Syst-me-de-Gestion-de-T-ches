/**
 * PROJET JAVASCRIPT - 2ÈME ANNÉE ESIIA(Electronique Systemes Informatiques et Intelligence Artificielle)
 * Gestionnaire de données avec persistance LocalStorage
 */

// --- 1. SÉLECTION DES ÉLÉMENTS DU DOM  ---
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

// --- 2. ÉTAT DE L'APPLICATION (STATE) ---
// Récupération des données persistantes 
let tasks = JSON.parse(localStorage.getItem('MDI_Tasks')) || [];

// --- 3. FONCTIONS PRINCIPALES (CRUD) ---

// Affichage dynamique (Read) 
function render() {
    taskList.innerHTML = "";
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <div class="actions">
                <button onclick="editTask(${index})" class="edit-icon"><i class="fas fa-edit"></i></button>
                <button onclick="deleteTask(${index})" class="delete-icon"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(li);
    });

    // Mise à jour des compteurs et du stockage 
    taskCount.innerText = `${tasks.length} tâche(s) enregistrée(s)`;
    localStorage.setItem('MDI_Tasks', JSON.stringify(tasks));
}

// Ajouter une tâche (Create)
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    
    if (text !== "") {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        render();
    }
});

// Modifier une tâche (Update) 
window.editTask = (index) => {
    const newText = prompt("Modifier la tâche :", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        render();
    }
};

// Supprimer une tâche (Delete) 
window.deleteTask = (index) => {
    if (confirm("Supprimer cette donnée définitivement ?")) {
        tasks.splice(index, 1);
        render();
    }
};

// Inverser le statut (Bonus créativité) 
window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    render();
};

// Lancement initial
render();
