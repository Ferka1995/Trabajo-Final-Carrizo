const params = new URLSearchParams(window.location.search);
const idcod = params.get("idcod");

function cargarDatosProducto() {
  fetch(`https://api.yumserver.com/16755/products/${idcod}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json();
    })
    .then(producto => {
      console.log("Producto para editar:", producto);
      document.getElementById("editTitulo").value = producto.titulo;
      document.getElementById("editPrecioPeso").value = producto.precioPeso;
      document.getElementById("editPrecioDolar").value = producto.precioDolar;
      document.getElementById("editFecha").value = producto.fecha;
    })
    // .catch(error => {
    //   console.error("Error:", error);
    //   alert("Ocurrió un error al cargar los datos del producto.");
    // });
}

function actualizarProducto(event) {
  event.preventDefault();

  console.log("ID del producto:", idcod);

  const titulo = document.getElementById("editTitulo").value;
  const precioPeso = document.getElementById("editPrecioPeso").value;
  const precioDolar = document.getElementById("editPrecioDolar").value;
  const fecha = document.getElementById("editFecha").value;

  const productoActualizado = {
    idcod: idcod,
    titulo: titulo,
    precioPeso: parseFloat(precioPeso),
    precioDolar: parseFloat(precioDolar),
    fecha: fecha
  };

  console.log("Producto actualizado:", productoActualizado);

  fetch(`https://api.yumserver.com/16755/products/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productoActualizado)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      alert("Producto actualizado correctamente.");
      window.location.href = "index.html";
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Ocurrió un error al actualizar el producto.");
    });
}

cargarDatosProducto();
