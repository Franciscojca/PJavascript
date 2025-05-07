    const students=[];

    document.getElementById("studentForm").addEventListener("submit",function (e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastname=document.getElementById("lastName").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);

    if(!name || !lastname || isNaN(grade) || (grade<1 || grade>7 )){
        alert("Error al ingresar los datos")
        return
    }

    const student={name,lastname,grade}
    students.push(student)
    console.log(students)

    this.reset();
});