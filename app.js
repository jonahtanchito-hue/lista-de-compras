const input = document.getElementById("producto")
const btnAgregar = document.getElementById("agregar")
const lista = document.getElementById("lista")
const btnLimpiar = document.getElementById("limpiar-todo")

let productos = []

// -----------------------------
// Cargar desde LocalStorage
// -----------------------------
window.onload = () => {
  const guardado = localStorage.getItem("listaCompras")
  if (guardado) {
    productos = JSON.parse(guardado)
    renderLista()
  }
}

// -----------------------------
// Agregar producto
// -----------------------------
btnAgregar.addEventListener("click", () => {
  if (input.value.trim() === "") return

  productos.push({
    nombre: input.value,
    comprado: false,
  })

  input.value = ""
  guardar()
  renderLista()
})

// ENTER también agrega
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btnAgregar.click()
})

// -----------------------------
// Guardar en LocalStorage
// -----------------------------
function guardar() {
  localStorage.setItem("listaCompras", JSON.stringify(productos))
}

// -----------------------------
// Dibujar lista
// -----------------------------
function renderLista() {
  lista.innerHTML = ""

  productos.forEach((item, index) => {
    const li = document.createElement("li")
    li.className = item.comprado ? "comprado" : ""

    li.innerHTML = `
            ${item.nombre}
            <div>
                <button class="btn-ok" onclick="toggleComprado(${index})">✔</button>
                <button class="btn-delete" onclick="eliminar(${index})">🗑</button>
            </div>
        `

    lista.appendChild(li)
  })
}

// -----------------------------
// Marcar como comprado
// -----------------------------
function toggleComprado(i) {
  productos[i].comprado = !productos[i].comprado
  guardar()
  renderLista()
}

// -----------------------------
// Eliminar producto
// -----------------------------
function eliminar(i) {
  productos.splice(i, 1)
  guardar()
  renderLista()
}

// -----------------------------
// Limpiar lista completa
// -----------------------------
btnLimpiar.addEventListener("click", () => {
  if (confirm("¿Seguro que deseas borrar toda la lista?")) {
    productos = []
    guardar()
    renderLista()
  }
})
