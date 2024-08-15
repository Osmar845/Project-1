import express from 'express';
import cookieParser from 'cookie-parser';


//fix for __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from './controllers/authentication.controller.js';
import { methods as authorization } from './middlewares/authorization.js';

//server
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en el puerto",app.get("port"),"ó http://localhost:4000");

// configuration
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/",authorization.soloPublico,(req,res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/register",authorization.soloPublico,(req,res) => res.sendFile(__dirname + "/pages/singup.html"));
app.get("/forgotpassword",authorization.soloPublico,(req,res) => res.sendFile(__dirname + "/pages/password.html"));
app.get("/admin",authorization.soloAdmin,(req,res) => {res.sendFile(__dirname + "/pages/admin/main.html")});
app.get("/contacto",authorization.soloAdmin,(req,res) => res.sendFile(__dirname + "/pages/admin/contacto.html"));
app.get("/list",authorization.soloAdmin,(req,res) => res.sendFile(__dirname + "/pages/admin/list.html"));
app.post("/api/login",authentication.login);
app.post("/api/register",authentication.register);

// Logout route
app.post('/api/logout', (req, res) => {
    res.cookie('jwt', '', { expires: new Date(0), path: '/' });
    res.status(200).send({ status: "Ok", message: "Logout successful" });
});
