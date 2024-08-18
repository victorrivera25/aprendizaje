document.addEventListener('DOMContentLoaded', () => {
    const enviar = document.getElementById('enviar');

    enviar.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();

        if (nombre && apellido) {
            alert('Registrado con éxito');
        } else {
            alert('Por favor, complete todos los campos');
        }
    });
});
