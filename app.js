// =======================
// NILE IDE CORE STATE
// =======================

let tree = []
let selectedId = null

// =======================
// ADD COMPONENT
// =======================

function addButton() {
  tree.push({
    id: Date.now(),
    type: "button",
    label: "Click me"
  })

  render()
}

// =======================
// RENDER CANVAS
// =======================

function renderCanvas() {
  const canvas = document.getElementById("canvas")
  canvas.innerHTML = ""

  tree.forEach(node => {
    if (node.type === "button") {
      const el = document.createElement("button")
      el.className = "element"
      el.innerText = node.label

      if (node.id === selectedId) {
        el.classList.add("selected")
      }

      el.onclick = () => {
        selectedId = node.id
        render()
      }

      canvas.appendChild(el)
    }
  })
}

// =======================
// PROPERTIES PANEL
// =======================

function renderProperties() {
  const panel = document.getElementById("props")
  panel.innerHTML = ""

  const node = tree.find(n => n.id === selectedId)

  if (!node) {
    panel.innerText = "Select an element"
    return
  }

  const labelInput = document.createElement("input")
  labelInput.value = node.label

  labelInput.oninput = (e) => {
    node.label = e.target.value
    render()
  }

  panel.appendChild(document.createTextNode("Label"))
  panel.appendChild(document.createElement("br"))
  panel.appendChild(labelInput)
}

// =======================
// CODE GENERATOR (NILE.JS)
// =======================

function renderCode() {
  const code = document.getElementById("code")

  let output = `Nile.app("#app", (ui, state) => {\n`

  tree.forEach(node => {
    if (node.type === "button") {
      output += `  ui.button("${node.label}", () => {})\n`
    }
  })

  output += `})`

  code.innerText = output
}

// =======================
// MASTER RENDER
// =======================

function render() {
  renderCanvas()
  renderProperties()
  renderCode()
}

// initial render
render()
