const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

const data = [];
const projects = [];

//app.set
//mendeskripsikan template engine apa yang dipakai
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// ini untuk assets
app.use("/assets", express.static(path.join(__dirname, "src/assets")));
//midleware alat yg berfungsi memproses inputan dari form (request)
app.use(express.urlencoded({ extended: false }));

//routing
app.get("/", Home);
app.get("/blog", blog);
app.get("/add-blog", viewblog);
app.post("/add-blog", addBlog);
app.get("/blog-detail/:id", blogDetail);
app.get("/testimonial", testimonial);
app.get("/contact", contact);
app.get("/myproject", myproject);
app.get('/add-project', viewAddProject);
app.post('/add-project', addProject);

function Home(req, res) {
  res.render("index");
}

function blog(req, res) {
  res.render("blog", { data });
}

function viewblog(req, res) {
  res.render("add-blog");
}

function addBlog(req, res) {
  const { title, content } = req.body;

  console.log("title: ", title);
  console.log("content: ", content);

  const dataBlog = { title, content };

  const uwu = data.unshift(dataBlog);

  console.log("uwu");

  res.redirect("blog");
}

function blogDetail(req, res) {
  const { id } = req.params;
  //const data = {id,title,content};

  const detail = data[id];
  res.render("blog-detail", { detail });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function contact(req, res) {
  res.render("contact");
}

//My Project
function myproject(req, res) {
  res.render("myproject", { projects });
}

// Route untuk halaman tambah proyek
function viewAddProject(req, res) {
  res.render('add-project');
}

// Route untuk menerima data form dan menambahkannya ke projects
app.post('/addPproject', (req, res) => {
  const { inputProjectName, startDate, endDate, inputDescription, technologies } = req.body;

  console.log('inputProjectName', inputProjectName);
  console.log('startDate', startDate);
  console.log('endDate', endDate);
  console.log('inputDescription', inputDescription);
  console.log('technologies', technologies);

  const newProject = {
    inputProjectName,
    startDate,
    endDate,
    inputDescription,
    technologies: Array.isArray(technologies) ? technologies : [technologies],
    image: defaultImage,
  };

  data.unshift(newProject);
  projects.push(newProject);
  res.redirect('/myproject');
});

// Route untuk menampilkan detail proyek berdasarkan index
app.get('/myproject/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < projects.length) {
    res.render('projectDetail', { project: projects[index] });
  } else {
    res.redirect('/myproject'); // Atau sesuaikan dengan penanganan yang sesuai
  }
});

// Route untuk update proyek berdasarkan index
app.get('/update-project/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < projects.length) {
    res.render('update-project', { project: projects[index], index });
  } else {
    res.redirect('/myproject');
  }
});

// Route untuk memproses data form update proyek
app.post('/update-project/:index', (req, res) => {
  const { index } = req.params;
  const { inputProjectName, startDate, endDate, inputDescription, technologies } = req.body;
  if (index >= 0 && index < projects.length) {
    projects[index] = {
      inputProjectName,
      startDate,
      endDate,
      inputDescription,
      technologies: Array.isArray(technologies) ? technologies : [technologies],
      image: projects[index].image // Tetap gunakan gambar yang sudah ada
    };
  }
  res.redirect('/myproject');
});



app.listen(port, () => {
  console.log(`server berjalan pada port ${port}`);
});
