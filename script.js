


document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    const studentTable = document.querySelector("#studentTable tbody");

    // Load students from LocalStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    function displayStudents() {
        studentTable.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentID}</td>
                <td>${student.className}</td>
                <td>${student.rollNo}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    }

    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const studentID = document.getElementById("studentID").value.trim();
        const className = document.getElementById("email").value.trim();
        const rollNo = document.getElementById("contact").value.trim();

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert("Name should contain only letters.");
            return;
        }
        if (!/^\d{3}$/.test(studentID)) {
            alert("Student ID must be exactly 3 digits (e.g., 002, 004).");
            return;
        }
        if (!className) {
            alert("Class is required.");
            return;
        }
        if (!rollNo) {
            alert("Roll No is required.");
            return;
        }

        students.push({ name, studentID, className, rollNo });
        saveToLocalStorage();
        displayStudents();

        studentForm.reset();
    });

    window.deleteStudent = function (index) {
        students.splice(index, 1);
        saveToLocalStorage();
        displayStudents();
    };

    window.editStudent = function (index) {
        const student = students[index];
        document.getElementById("name").value = student.name;
        document.getElementById("studentID").value = student.studentID;
        document.getElementById("email").value = student.className;
        document.getElementById("contact").value = student.rollNo;

        students.splice(index, 1);
        saveToLocalStorage();
        displayStudents();
    };

    displayStudents();
});
