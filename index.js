import express from 'express';

const app = express();
app.use(express.json());

// Base de datos simulada en memoria
let usuarios = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@mail.com' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@mail.com' }
];

// Breve descripción de la app para la interfaz principal
app.get('/', (req, res) => {
    res.send(`
        <h1>API CRUD de Usuarios (Dockerizada)</h1>
        <p>Esta es una aplicación web sencilla que gestiona un CRUD de usuarios en memoria usando Node.js, Express y ES Modules.</p>
        <h3>Endpoints disponibles:</h3>
        <ul>
            <li><strong>GET /usuarios</strong> - Listar usuarios</li>
            <li><strong>POST /usuarios</strong> - Crear usuario</li>
            <li><strong>DELETE /usuarios/:id</strong> - Eliminar usuario</li>
        </ul>
        <p>Estado del servidor: <strong>Activo en Docker 🚀</strong></p>
    `);
});

// GET: Listar usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// POST: Crear usuario
app.post('/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    const nuevoUsuario = { id: usuarios.length + 1, nombre, email };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    const usuario = usuarios.find(u => u.id === parseInt(id));
    if (usuario) {
        usuario.nombre = nombre || usuario.nombre;
        usuario.email = email || usuario.email;
        res.json(usuario);
    }
    else {
        res.status(404).json({ mensaje: `Usuario con ID ${id} no encontrado.` });
    }
});

// DELETE: Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    usuarios = usuarios.filter(u => u.id !== parseInt(id));
    res.json({ mensaje: `Usuario con ID ${id} eliminado.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});