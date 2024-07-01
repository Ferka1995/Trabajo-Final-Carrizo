function SubirProducto(event) {
    event.preventDefault();
    console.log("Formulario enviado");
  
    const titulo = document.getElementById("titulo").value;
    const precioPeso = document.getElementById("precioPeso").value;
    const precioDolar = document.getElementById("precioDolar").value;
    const fecha = document.getElementById("fecha").value;
  
    const precioPesoNum = parseFloat(precioPeso);
    const precioDolarNum = parseFloat(precioDolar);
  
    const productoNuevo = {
      titulo: titulo,
      precioPeso: precioPesoNum,
      precioDolar: precioDolarNum,
      fecha: fecha,
    };
  
    console.log("Producto a enviar:", productoNuevo);
  
    fetch("https://api.yumserver.com/16755/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoNuevo),
    })
      .then(response => {
        console.log("Respuesta recibida");
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.text;
      })
      .then(data => {
        console.log("Datos recibidos:", data);
        alert("Producto cargado correctamente.");
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al cargar el producto.");
      });
  }