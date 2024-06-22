let dataMyproject = [];
let editIndex = -1;

function submitmyProject(event) {
    event.preventDefault();

    let projectName = document.getElementById("inputProjectName").value;
    let startDate = document.getElementById("inputStartDate").value;
    let endDate = document.getElementById("inputEndDate").value;
    let description = document.getElementById("inputDescription").value;
    let nodejs = document.getElementById("techNodeJs").checked ? document.getElementById("techNodeJs").value : "";
    let nextjs = document.getElementById("techNextJs").checked ? document.getElementById("techNextJs").value : "";
    let reactjs = document.getElementById("techReactJs").checked ? document.getElementById("techReactJs").value : "";
    let typescript = document.getElementById("techTypeScript").checked ? document.getElementById("techTypeScript").value : "";
    let uploadImage = document.getElementById("inputImage").files;

    if (!projectName) {
        alert("Project name harus diisi");
        return;
    } else if (!startDate) {
        alert("Start date harus diisi");
        return;
    } else if (!endDate) {
        alert("End date harus diisi");
        return;
    } else if (!description) {
        alert("Description harus diisi");
        return;
    } else if (!nodejs && !nextjs && !reactjs && !typescript) {
        alert("Silahkan melakukan pilihan technologies");
        return;
    } else if (uploadImage.length === 0 && editIndex === -1) {  // hanya cek jika tidak sedang mengedit
        alert("File harus diisi");
        return;
    }

    let imageUrl = editIndex !== -1 ? dataMyproject[editIndex].image : URL.createObjectURL(uploadImage[0]);

    const addProject = {
        project: projectName,
        start: startDate,
        end: endDate,
        deskripsi: description,
        technologies: [nodejs, nextjs, reactjs, typescript].filter(tech => tech !== ""),
        image: imageUrl,
        postAt: new Date().toLocaleDateString(),
        author: "Harry Ramadani",
    };

    if (editIndex === -1) {
        dataMyproject.push(addProject);
    } else {
        dataMyproject[editIndex] = addProject;
        editIndex = -1;  // reset edit index setelah menyimpan perubahan
    }

    console.log("dataArray", dataMyproject); // Log seluruh array
    console.log("Current Project Data:", addProject); // Log data proyek saat ini

    renderBlog();
    document.getElementById("projectForm").reset();  // reset form setelah submit
}

function renderBlog() {
    const contentContainer = document.getElementById("content");
    contentContainer.innerHTML = "";
    for (let index = 0; index < dataMyproject.length; index++) {
        const project = dataMyproject[index];
        contentContainer.innerHTML += `
            <div class="blog-list-items">
                <div class="blog-image">
                    <img src="${project.image}" alt="image upload" />
                </div>
                <div class="blog-content">
                    <h1>${project.project} - ${new Date(project.start).getFullYear()}</h1>
                    <div class="detail-blog">
                        durasi : ${calculateDuration(project.start, project.end)}
                    </div>
                    <p class="list-deskripsi">${project.deskripsi}</p>
                    <p class="list-technologies">${project.technologies.map(tech => `<span>${tech}</span>`).join(" ")}</p>
                    <div class="program-icon">
                        <a href="#" class="icon">
                            <i class="fab fa-google-play"></i>
                        </a>
                        <a href="#" class="icon">
                            <i class="fab fa-android"></i>
                        </a>
                        <a href="#" class="icon">
                            <i class="fab fa-java"></i>
                        </a>
                    </div>
                    <div class="btn-group">
                        <button class="btn-edit" onclick="editProject(${index})">Edit</button>
                        <button class="btn-delete" onclick="deleteProject(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }
}

function editProject(index) {
    const project = dataMyproject[index];
    document.getElementById("inputProjectName").value = project.project;
    document.getElementById("inputStartDate").value = project.start;
    document.getElementById("inputEndDate").value = project.end;
    document.getElementById("inputDescription").value = project.deskripsi;

    document.getElementById("techNodeJs").checked = project.technologies.includes("Node.js");
    document.getElementById("techNextJs").checked = project.technologies.includes("Next.js");
    document.getElementById("techReactJs").checked = project.technologies.includes("React.js");
    document.getElementById("techTypeScript").checked = project.technologies.includes("TypeScript");

    // Set the edit index to the current project index
    editIndex = index;

    console.log("Edit Project Data:", project); // Log data proyek yang sedang diedit
}

function deleteProject(index) {
    dataMyproject.splice(index, 1);
    renderBlog();
    console.log("Data after deletion:", dataMyproject); // Log data array setelah penghapusan
}

function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let diffYears = endDate.getFullYear() - startDate.getFullYear();
    let diffMonths = endDate.getMonth() - startDate.getMonth();
    let diffDays = endDate.getDate() - startDate.getDate();

    if (diffDays < 0) {
        diffMonths--;
        diffDays += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    }
    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    return `${diffMonths} bulan ${diffYears > 0 ? diffYears + ' tahun' : ''}`;
}

