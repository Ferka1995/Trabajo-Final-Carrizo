function obtenerProductos() {
  fetch("https://api.yumserver.com/16755/products")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json(); 
    })
    .then(data => {
      console.log("Productos recibidos:", data);
      mostrarProductos(data); 
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Ocurrió un error al obtener los productos.");
    });
}


function mostrarProductos(productos) {
  const tbody = document.getElementById("productsBody");  
  tbody.innerHTML = "";  
  productos.forEach(producto => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${producto.titulo}</td>
      <td>${producto.precioPeso}</td>
      <td>${producto.precioDolar}</td>
      <td>${producto.fecha}</td>
      <td>
        <button onclick="editarProducto('${producto.idcod}')">Editar</button>
        <button onclick="eliminarProducto('${producto.idcod}')">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });  
}
function editarProducto(idcod) {
  window.location.href = `editarProducto.html?idcod=${idcod}`;
}

function eliminarProducto(idcod) {
  if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    return; 
  }
  const data = { idcod: idcod };
  fetch(`https://api.yumserver.com/16755/products/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      alert("Producto eliminado correctamente.");      
      obtenerProductos(); 
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Ocurrió un error al eliminar el producto.");
    });
}

obtenerProductos();



  
  
