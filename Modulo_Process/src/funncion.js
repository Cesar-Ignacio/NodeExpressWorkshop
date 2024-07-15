process.on('message', message => {
    console.log('Mensaje recibido del proceso principal:', message);
    let result = 0;
    for (let i = 0; i <= 3e9; i++) result += i;
    process.send(result);
    console.log('Resultado enviado al proceso principal:', result);
    process.exit(0);
});