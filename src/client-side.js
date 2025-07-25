/**
 * @fileoverview Client-seitige Logik für die Verwaltung von Klausuren und Lösungen.
 * @author Sergiu Paculea
 */
/**
 * @namespace ClientSideFunctions
 * @description Enthält Funktionen zum Laden von Klausuren und Lösungen, Hochladen von Dateien und Initialisieren der Seite.
 */

// Authentifizierungs-Variablen
let isAuthenticated = false;
let currentUser = null;

/**
 * @async
 * @function checkAuthStatus
 * @memberof ClientSideFunctions
 * @description Überprüft den aktuellen Authentifizierungsstatus beim Server
 * @returns {Promise<void>}
 */
async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();

        isAuthenticated = data.authenticated;
        currentUser = data.username;

        updateUIForAuthStatus();
    } catch (error) {
        console.error('❌ Fehler beim Überprüfen des Auth-Status:', error);
    }
}

/**
 * @function updateUIForAuthStatus
 * @memberof ClientSideFunctions
 * @description Aktualisiert die UI basierend auf dem Authentifizierungsstatus
 */
function updateUIForAuthStatus() {
    const loginNavItem = document.getElementById('login-nav-item');
    const logoutNavItem = document.getElementById('logout-nav-item');
    const uploadSection = document.getElementById('upload-section');

    if (isAuthenticated) {
        loginNavItem.classList.add('d-none');
        logoutNavItem.classList.remove('d-none');
        uploadSection.classList.remove('d-none');

        // Logout-Button Text aktualisieren
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.innerHTML = `<i class="bi bi-box-arrow-right"></i> Logout (${currentUser})`;
    } else {
        loginNavItem.classList.remove('d-none');
        logoutNavItem.classList.add('d-none');
        uploadSection.classList.add('d-none');
    }
}

/**
 * @function setupLoginSystem
 * @memberof ClientSideFunctions
 * @description Initialisiert das Login-System mit Event-Listeners
 */
function setupLoginSystem() {
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

    // Login-Form Handler
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');
        const statusDiv = document.getElementById('login-status');

        try {
            statusDiv.innerHTML = '<div class="alert alert-info">Anmeldung läuft...</div>';

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                statusDiv.innerHTML = '<div class="alert alert-success">Login erfolgreich!</div>';

                // Modal schließen und UI aktualisieren
                setTimeout(() => {
                    loginModal.hide();
                    loginForm.reset();
                    statusDiv.innerHTML = '';
                    checkAuthStatus();
                }, 1000);
            } else {
                statusDiv.innerHTML = `<div class="alert alert-danger">Fehler: ${data.message}</div>`;
            }
        } catch (error) {
            console.error('Login-Fehler:', error);
            statusDiv.innerHTML = '<div class="alert alert-danger">Netzwerkfehler beim Login</div>';
        }
    });

    // Logout-Button Handler
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST'
            });

            if (response.ok) {
                checkAuthStatus();
            }
        } catch (error) {
            console.error('Logout-Fehler:', error);
        }
    });
}

/**
 * @async
 * @function loadExamsForSemester
 * @memberof ClientSideFunctions
 * @description Lädt die Klausuren für ein bestimmtes Semester.
 * @param {string} semester - Das Semester, für das die Klausuren geladen werden sollen.
 * @returns {Promise<void>} Die Funktion gibt ein Promise zurück, das aufgelöst wird, wenn die Klausuren geladen wurden.
 * @throws {Error} Gibt einen Fehler zurück, wenn die Abfrage fehlschlägt oder die Klausuren nicht geladen werden können.
 */
async function loadExamsForSemester(semester) {
    try {
        const response = await fetch(`/api/exams/${semester}`);
        const exams = await response.json();

        const container = document.getElementById(`semester${semester}`);
        const examCard = container.querySelector('.exam-card .card-body');

        // Clear existing content
        examCard.innerHTML = '';

        if (exams.length === 0) {
            examCard.innerHTML = '<p class="text-muted">Keine Klausuren verfügbar</p>';
            return;
        }

        // Group exams by subject (fach)
        const examsBySubject = {};
        exams.forEach(exam => {
            if (!examsBySubject[exam.fach]) {
                examsBySubject[exam.fach] = [];
            }
            examsBySubject[exam.fach].push(exam);
        });

        // Create HTML for each subject
        Object.keys(examsBySubject).forEach(subject => {
            const subjectSection = document.createElement('div');
            subjectSection.className = 'mb-3';
            subjectSection.innerHTML = `
                <h5 class="text-primary">${subject}</h5>
                <ul class="list-group list-group-flush">
                    ${examsBySubject[subject].map(exam =>
                `<li class="list-group-item">
                            <a href="/klausuren/${exam.id}/pdf" class="text-decoration-none">
                                <i class="bi bi-file-earmark-pdf"></i> ${exam.name}
                            </a>
                        </li>`
            ).join('')}
                </ul>
            `;
            examCard.appendChild(subjectSection);
        });

    } catch (error) {
        console.error(`Fehler beim Laden der Klausuren für Semester ${semester}:`, error);
        const container = document.getElementById(`semester${semester}`);
        const examCard = container.querySelector('.exam-card .card-body');
        examCard.innerHTML = '<p class="text-danger">Fehler beim Laden der Klausuren</p>';
    }
}

/**
 * @async
 * @function loadSolutionsForSemester
 * @memberof ClientSideFunctions
 * @description Lädt die Lösungen für ein bestimmtes Semester.
 * @param {string} semester - Das Semester, für das die Lösungen geladen werden sollen.
 * @returns {Promise<void>} Die Funktion gibt ein Promise zurück, das aufgelöst wird, wenn die Lösungen geladen wurden.
 * @throws {Error} Gibt einen Fehler zurück, wenn die Abfrage fehlschlä gt oder die Lösungen nicht geladen werden können.
 */
async function loadSolutionsForSemester(semester) {
    try {
        const response = await fetch(`/api/solutions/${semester}`);
        const solutions = await response.json();

        const container = document.getElementById(`semester${semester}`);
        const solutionCard = container.querySelector('.solution-card .card-body');

        // Clear existing content
        solutionCard.innerHTML = '';

        if (solutions.length === 0) {
            solutionCard.innerHTML = '<p class="text-muted">Keine Lösungen verfügbar</p>';
            return;
        }

        // Group solutions by subject (fach)
        const solutionsBySubject = {};
        solutions.forEach(solution => {
            if (!solutionsBySubject[solution.fach]) {
                solutionsBySubject[solution.fach] = [];
            }
            solutionsBySubject[solution.fach].push(solution);
        });

        // Create HTML for each subject
        Object.keys(solutionsBySubject).forEach(subject => {
            const subjectSection = document.createElement('div');
            subjectSection.className = 'mb-3';
            subjectSection.innerHTML = `
                <h5 class="text-success">${subject}</h5>
                <ul class="list-group list-group-flush">
                    ${solutionsBySubject[subject].map(solution =>
                `<li class="list-group-item">
                            <a href="/loesungen/${solution.id}/pdf" class="text-decoration-none">
                                <i class="bi bi-file-earmark-check"></i> ${solution.name}
                            </a>
                        </li>`
            ).join('')}
                </ul>
            `;
            solutionCard.appendChild(subjectSection);
        });

    } catch (error) {
        console.error(`Fehler beim Laden der Lösungen für Semester ${semester}:`, error);
        const container = document.getElementById(`semester${semester}`);
        const solutionCard = container.querySelector('.solution-card .card-body');
        solutionCard.innerHTML = '<p class="text-danger">Fehler beim Laden der Lösungen</p>';
    }
}

/**
 * @async
 * @function loadAllExams
 * @memberof ClientSideFunctions
 * @description Lädt alle Klausuren für alle Semester.
 * @returns {Promise<void>} Die Funktion gibt ein Promise zurück, das aufgelöst wird, wenn alle Klausuren geladen wurden.
 * @throws {Error} Gibt einen Fehler zurück, wenn die Abfrage fehlschlägt oder die Klausuren nicht geladen werden können.
 */
async function loadAllExams() {
    for (let semester = 1; semester <= 6; semester++) {
        await loadExamsForSemester(semester);
    }
}

/**
 * @async
 * @function loadAllSolutions
 * @memberof ClientSideFunctions
 * @description Lädt alle Lösungen für alle Semester.
 * @returns {Promise<void>} Die Funktion gibt ein Promise zurück, das aufgelöst wird, wenn alle Lösungen geladen wurden.
 * @throws {Error} Gibt einen Fehler zurück, wenn die Abfrage fehlschlägt oder die Lösungen nicht geladen werden können.
 */
async function loadAllSolutions() {
    for (let semester = 1; semester <= 6; semester++) {
        await loadSolutionsForSemester(semester);
    }
}

/**
 * @async
 * @function uploadExamAndSolution
 * @memberof ClientSideFunctions
 * @description Ermöglicht das Hochladen von Klausur- und Lösungspapieren.
 * @returns {Promise<void>} Die Funktion gibt ein Promise zurück, das aufgelöst wird, wenn der Upload abgeschlossen ist.
 * @throws {Error} Gibt einen Fehler zurück, wenn der Upload fehlschlägt oder die Antwort des Servers nicht erfolgreich ist.
 */
async function uploadExamAndSolution() {
    const form = document.getElementById('upload-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const uploadButton = document.querySelector('#upload-form button[type="submit"]');
        const statusDiv = document.getElementById('upload-status');

        try {
            // Disable button and show loading state
            uploadButton.disabled = true;
            uploadButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Uploading...';
            statusDiv.innerHTML = '<div class="alert alert-info">Uploading...</div>';

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed');
            }

            await response.json(); // Process the response without storing it
            statusDiv.innerHTML = '<div class="alert alert-success">Upload successful!</div>';

            // Reload the exams and solutions to show the new uploads
            await loadAllExams();
            await loadAllSolutions();

            // Reset the form
            form.reset();
        } catch (error) {
            console.error('Error uploading:', error);
            statusDiv.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
        } finally {
            uploadButton.disabled = false;
            uploadButton.innerHTML = 'Hochladen';
        }
    });
}

/**
 * @function setupDragAndDrop
 * @memberof ClientSideFunctions
 * @description Initialisiert die Drag-and-Drop-Funktionalität für Datei-Upload
 */
function setupDragAndDrop() {
    const klausurDropArea = document.getElementById('klausurDropArea');
    const loesungDropArea = document.getElementById('loesungDropArea');
    const klausurInput = document.getElementById('klausurInput');
    const loesungInput = document.getElementById('loesungInput');

    // Setup für Klausur Drop Area
    setupDropArea(klausurDropArea, klausurInput, 'klausurFileDisplay');

    // Setup für Lösung Drop Area
    setupDropArea(loesungDropArea, loesungInput, 'loesungFileDisplay');
}

/**
 * @function setupDropArea
 * @memberof ClientSideFunctions
 * @description Richtet eine Drop-Area für eine bestimmte Datei-Input ein
 * @param {HTMLElement} dropArea - Die Drop-Area
 * @param {HTMLInputElement} fileInput - Das zugehörige File-Input
 * @param {string} displayId - ID des Elements für die Datei-Anzeige
 */
function setupDropArea(dropArea, fileInput, displayId) {
    // Drag Events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight Drop Area
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => highlight(dropArea), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => unhighlight(dropArea), false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', (e) => handleDrop(e, fileInput, displayId), false);

    // Handle file input change
    fileInput.addEventListener('change', () => handleFileSelect(fileInput, displayId));

    // Click to select file
    dropArea.addEventListener('click', () => fileInput.click());
}

/**
 * @function preventDefaults
 * @memberof ClientSideFunctions
 * @description Verhindert Standard-Browser-Verhalten für Drag-Events
 * @param {Event} e - Das Event
 */
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * @function highlight
 * @memberof ClientSideFunctions
 * @description Hebt die Drop-Area hervor
 * @param {HTMLElement} dropArea - Die Drop-Area
 */
function highlight(dropArea) {
    dropArea.classList.add('drag-over');
}

/**
 * @function unhighlight
 * @memberof ClientSideFunctions
 * @description Entfernt die Hervorhebung der Drop-Area
 * @param {HTMLElement} dropArea - Die Drop-Area
 */
function unhighlight(dropArea) {
    dropArea.classList.remove('drag-over');
}

/**
 * @function handleDrop
 * @memberof ClientSideFunctions
 * @description Verarbeitet abgelegte Dateien
 * @param {DragEvent} e - Das Drop-Event
 * @param {HTMLInputElement} fileInput - Das zugehörige File-Input
 * @param {string} displayId - ID des Elements für die Datei-Anzeige
 */
function handleDrop(e, fileInput, displayId) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
        const file = files[0];

        // Datei-Validierung
        if (validateFile(file)) {
            // DataTransfer für das Input-Element erstellen
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;

            // Datei-Anzeige aktualisieren
            displayFile(file, displayId);
        }
    }
}

/**
 * @function handleFileSelect
 * @memberof ClientSideFunctions
 * @description Verarbeitet ausgewählte Dateien über Input-Element
 * @param {HTMLInputElement} fileInput - Das File-Input
 * @param {string} displayId - ID des Elements für die Datei-Anzeige
 */
function handleFileSelect(fileInput, displayId) {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        displayFile(file, displayId);
    }
}

/**
 * @function validateFile
 * @memberof ClientSideFunctions
 * @description Validiert eine Datei
 * @param {File} file - Die zu validierende Datei
 * @returns {boolean} - True wenn die Datei gültig ist
 */
function validateFile(file) {
    const allowedTypes = ['application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
        alert('Nur PDF-, DOC-, DOCX- und TXT-Dateien sind erlaubt.');
        return false;
    }

    if (file.size > maxSize) {
        alert('Die Datei ist zu groß. Maximale Größe: 10MB.');
        return false;
    }

    return true;
}

/**
 * @function displayFile
 * @memberof ClientSideFunctions
 * @description Zeigt die ausgewählte Datei an
 * @param {File} file - Die anzuzeigende Datei
 * @param {string} displayId - ID des Elements für die Datei-Anzeige
 */
function displayFile(file, displayId) {
    const displayElement = document.getElementById(displayId);
    const fileSize = formatFileSize(file.size);
    const fileName = file.name;
    const fileIcon = getFileIcon(file.type, fileName);

    displayElement.innerHTML = `
        <div class="file-display">
            <div class="file-info">
                <i class="${fileIcon}"></i>
                <span class="file-name">${fileName}</span>
                <span class="file-size">(${fileSize})</span>
            </div>
            <button type="button" class="remove-file" onclick="removeFile('${displayId}', '${displayId.replace('FileDisplay', 'Input')}')">
                <i class="bi bi-x-circle-fill"></i>
            </button>
        </div>
    `;
}

/**
 * @function getFileIcon
 * @memberof ClientSideFunctions
 * @description Gibt das passende Icon für den Dateityp zurück
 * @param {string} fileType - MIME-Type der Datei
 * @param {string} fileName - Name der Datei
 * @returns {string} - CSS-Klassen für das Icon
 */
function getFileIcon(fileType, fileName) {
    if (fileType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
        return 'bi bi-file-earmark-pdf-fill text-danger';
    } else if (fileType.includes('word') || fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx')) {
        return 'bi bi-file-earmark-word-fill text-primary';
    } else if (fileType === 'text/plain' || fileName.toLowerCase().endsWith('.txt')) {
        return 'bi bi-file-earmark-text-fill text-secondary';
    } else {
        return 'bi bi-file-earmark-fill text-info';
    }
}

/**
 * @function formatFileSize
 * @memberof ClientSideFunctions
 * @description Formatiert Dateigröße in lesbares Format
 * @param {number} bytes - Dateigröße in Bytes
 * @returns {string} - Formatierte Dateigröße
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * @function removeFile
 * @memberof ClientSideFunctions
 * @description Entfernt eine ausgewählte Datei
 * @param {string} displayId - ID des Display-Elements
 * @param {string} inputId - ID des Input-Elements
 */
function removeFile(displayId, inputId) {
    document.getElementById(displayId).innerHTML = '';
    document.getElementById(inputId).value = '';
}

// Event listener für DOMContentLoaded
// Lädt alle Klausuren und Lösungen, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', () => {
    loadAllExams();
    loadAllSolutions();
    uploadExamAndSolution();
    checkAuthStatus();
    setupLoginSystem();
    setupDragAndDrop();
});

// Globale Funktionen für HTML onclick
window.removeFile = removeFile;