 const students = [];

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const gradeInput = document.getElementById("grade");
const tableBody = document.querySelector("#studentTable tbody");
const averageValue = document.getElementById("averageValue");

// Mensajes de validación en español
nameInput.addEventListener("invalid", e => {
  e.target.setCustomValidity("Por favor, complete el campo 'Nombre'.");
});
nameInput.addEventListener("input", e => e.target.setCustomValidity(""));

lastNameInput.addEventListener("invalid", e => {
  e.target.setCustomValidity("Por favor, complete el campo 'Apellido'.");
});
lastNameInput.addEventListener("input", e => e.target.setCustomValidity(""));

gradeInput.addEventListener("invalid", e => {
  e.target.setCustomValidity("Por favor, ingrese una nota entre 1.0 y 7.0.");
});
gradeInput.addEventListener("input", e => e.target.setCustomValidity(""));

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validación HTML5
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = nameInput.value.trim();
  const lastname = lastNameInput.value.trim();
  const grade = parseFloat(gradeInput.value);

  // Ya cubierto por HTML5, pero queda de respaldo
  if (!name || !lastname || isNaN(grade) || grade < 1 || grade > 7) {
    alert("Error al ingresar los datos");
    return;
  }

  const student = { name, lastname, grade };
  students.push(student);

  addStudentToTable(student);
  calcularPromedio();

  form.reset();
});

function addStudentToTable(student) {
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${student.name}</td>
  <td>${student.lastname}</td>
  <td>${student.grade.toFixed(1)}</td>
  <td>
    <button class="edit">Editar</button>
    <button class="delete">Eliminar</button>
  </td>
`;

  row.querySelector(".delete").addEventListener("click", function () {
  deleteEstudiante(student, row);
});

  row.querySelector(".edit").addEventListener("click", function () {
  editarEstudiante(student, row);
});

  tableBody.appendChild(row);
}

function calcularPromedio() {
  if (students.length === 0) {
    averageValue.textContent = "No Disponible";
    return;
  }
  const total = students.reduce((sum, s) => sum + s.grade, 0);
  const prom = total / students.length;
  averageValue.textContent = prom.toFixed(2);
}

function deleteEstudiante(student,row){
  const index=students.indexOf(student);
  if(index > -1){
    students.splice(index, 1);
    row.remove();
    calcularPromedio();
  }
}

function editarEstudiante(student, row) {
  // Precargar los valores en el formulario
  nameInput.value = student.name;
  lastNameInput.value = student.lastname;
  gradeInput.value = student.grade;

  // Eliminar al estudiante actual de la lista y de la tabla
  const index = students.indexOf(student);
  if (index > -1) {
    students.splice(index, 1);
  }
  row.remove();

  // Actualizar el promedio
  calcularPromedio();
}