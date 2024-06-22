const express = require("express");
const path = require("path");

const app = express();
const port = 5000;

const data = [];
const projects = []; // Tambahkan ini untuk mendefinisikan variabel projects
const defaultImage = "/jj.jpg"; // Tambahkan ini untuk mendefinisikan defaultImage

const hbs = require('hbs');

// Registering a custom Handlebars helper
hbs.registerHelper('includes', function(array, value) {
  return array.includes(value);
});


// app.set
// mendeskripsikan template engine apa yang dipakai
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// ini untuk assets
app.use("/assets", express.static(path.join(__dirname, "src/assets")));
// midleware alat yg berfungsi memproses inputan dari form (request)
app.use(express.urlencoded({ extended: false }));

// routing
app.get("/", Home);
app.get("/blog", blog);
app.get("/add-blog", viewblog);
app.post("/add-blog", addBlog);
app.get("/blog-detail/:id", blogDetail);
app.get("/update-blog/:id", editBlogview);
app.post("/update-blog/:id", updateBlog); // Perbaiki route update-blog untuk menerima id
app.post("/delete-blog/:id", deleteBlog);

// Batas routing project

app.get("/testimonial", testimonial);
app.get("/contact", contact);
function Home(req, res) {
  res.render("index");
}

// Blog
function blog(req, res) {
  res.render("blog", { data });
}

function viewblog(req, res) {
  res.render("add-blog");
}

// array manipulation
function addBlog(req, res) {
  const { title, content } = req.body;

  console.log("title: ", title);
  console.log("content: ", content);

  const dataBlog = { title, content };

  data.unshift(dataBlog);

  res.redirect("blog");
}

function blogDetail(req, res) {
  const { id } = req.params;
  const detail = data[id];
  res.render("blog-detail", { detail });
}

function editBlogview(req, res) {
  const { id } = req.params;
  const datafilter = data[parseInt(id)];
  datafilter.id = parseInt(id);
  res.render("update-blog", { data: datafilter });
}

function updateBlog(req, res) {
  const { title, content, id } = req.body;

  data[parseInt(id)] = {
    title,
    content,
  };

  res.redirect("/blog");
}

function deleteBlog(req, res) {
  const { id } = req.params;

  data.splice(id, 1);
  res.redirect("/blog");
}

// Batas blog

// My project
app.get('/myproject', (req, res) => {
  res.render('myproject', { projects });
});

app.get('/add-project', (req, res) => {
  res.render('add-project');
});

app.get('/myproject/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < projects.length) {
    res.render('projectDetail', { project: projects[index] });
  } else {
    res.redirect('/myproject');
  }
});

app.post('/add-project', (req, res) => {
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

app.get('/update-project/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < projects.length) {
    res.render('update-project', { project: projects[index], index });
  } else {
    res.redirect('/myproject');
  }
});

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
      image: projects[index].image,
    };
  }
  res.redirect('/myproject');
});

app.post('/delete-project/:index', (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < projects.length) {
    projects.splice(index, 1);
  }
  res.redirect('/myproject');
});


// Batas my project

function testimonial(req, res) {
  res.render("testimonial");
}

function contact(req, res) {
  res.render("contact");
}


app.listen(port, () => {
  console.log(`server berjalan pada port ${port}`);
});
