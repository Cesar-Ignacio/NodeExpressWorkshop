
const recuperarDatos=async ()=>{
    const data=await fetch("http://localhost:8080/api/toys/getToys");
    console.log(await data.json());
}

recuperarDatos();