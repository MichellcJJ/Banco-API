import express from "express";
import { bancos } from "./bancos.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const app = express();
const port = 3000;
const bancosJS = bancos;

app.get('/', (req, res) => {
    res.send("Listado de bancos");
});

app.get('/banco', (req, res) => {
    res.send(bancosJS);
});

app.get('/banco/:id', (req, res) => {
    const bancosID = Number(req.params.id);
    res.send(bancosJS.find(b => b.id === bancosID));
});

app.get('/banco/:id/personas', (req, res) => {
    const bancosID = Number(req.params.id);
    res.send(bancosJS.find(b => b.id === bancosID).personas);
});

app.get('/banco/:id/personas/:idP', (req, res) => {
    const bancosID = Number(req.params.id);
    const personaID = Number(req.params.idP);
    res.send(bancosJS.find(b => b.id === bancosID).personas.find(p => p.id === personaID));
});

app.post('/banco', (req, res) => {
    rl.question('Nombre del banco que desee agregar: ', (nombreBanco) => {
        bancosJS.push({
            "id": 1,
            "nombre": nombreBanco,
            "personas": []
        });
        res.send(bancosJS)
    });
});

app.post('/banco', (req, res) => {
    rl.question('Nombre del banco que desee agregar: ', (nombreBanco) => {
        bancosJS.push({
            "id": 1,
            "nombre": nombreBanco,
            "personas": []
        });
        res.send(bancosJS)
    });
});

app.post('/banco', (req, res) => {
    rl.question('Nombre del banco que desee agregar: ', (nombreBanco) => {
        bancosJS.push({
            "id": (bancosJS.length + 1),
            "nombre": nombreBanco,
            "personas": []
        });
        res.send(bancosJS);
    });
});

app.post('/banco/:id/personas', (req, res) => {
    const bancosID = Number(req.params.id);
    rl.question('Nombre de la personas que desee agregar: ', (nombrePersona) => {
        bancosJS.find(b => b.id === bancosID).personas.push({
            "id": (bancosJS.find(b => b.id === bancosID).personas.length + 1),
            "nombre": nombrePersona,
            "balance": 0,
        });
        res.send(bancosJS)
    });
});

app.put('/banco/:id/personas/:idP', (req, res) => {
    const bancosID = Number(req.params.id);
    const personaID = Number(req.params.idP);
    rl.question('Monto del usuario seleccionado para actualizar su balance: ', (cantidadBalance) => {
        bancosJS.find(b => b.id === bancosID).personas.find(p => p.id === personaID).balance = Number(bancosJS.find(b => b.id === bancosID).personas.find(p => p.id === personaID).balance) + Number(cantidadBalance);
        res.send(bancosJS);
    });
});

app.delete('/banco/:id/personas/:idP', (req, res) => {
    const bancosID = Number(req.params.id);
    const personaID = Number(req.params.idP);
    bancosJS.find(b => b.id === bancosID).personas.pop(p => p.id === personaID);
    res.send(bancosJS);
});

app.listen(port, () => {
    console.log(`Server's running... http://localhost:${port}`);
});