// ================= ESTADO =================

let arquivos = [
{nome:"Documento.txt", tamanho:2},
{nome:"Foto.jpg", tamanho:5},
{nome:"Video.mp4", tamanho:50}
]

let lixeira = []
let espacoTotal = 100
let espacoUsado = 57 // soma inicial (2 + 5 + 50)

// ================= TELAS =================

function mostrarTela(id){
document.querySelectorAll(".screen").forEach(t=>t.classList.remove("active"))
document.getElementById(id).classList.add("active")
}

// ================= DESKTOP =================

document.getElementById("desktop").innerHTML = `
<div class="desktop">

<div class="icon" onclick="abrirArquivos()">
<div>📁</div>Arquivos
</div>

<div class="icon" style="top:120px" onclick="abrirLixeira()">
<div>🗑️</div>Lixeira
</div>

<div class="icon" style="top:200px" onclick="abrirPC()">
<div>💻</div>Este Computador
</div>

<div class="taskbar">
⊞
<input class="search" placeholder="Pesquisar">
📁 🗑️ 💻
<div class="right">📶 🔊 🔋</div>
</div>

</div>
`

// ================= EXPLORADOR =================

function abrirArquivos(){
mostrarTela("arquivos")

document.getElementById("arquivos").innerHTML = `
<div class="window">

<div class="topbar">
<button onclick="voltar()">⬅ Voltar</button>
</div>

<div class="main">

<div class="sidebar">
<div>Início</div>
<div>Galeria</div>
<div>Área de trabalho</div>
<div onclick="listarArquivos()">Downloads</div>
<div>Documentos</div>
<div>Imagens</div>
<div>Músicas</div>
<div>Este Computador</div>
</div>

<div class="content" id="conteudo">
Clique em Downloads
</div>

</div>

</div>
`
}

function listarArquivos(){
let area = document.getElementById("conteudo")

if(arquivos.length === 0){
area.innerHTML = "Sem arquivos"
return
}

area.innerHTML = arquivos.map((a,i)=>`
<div class="file">
<span onclick="verPropriedades(${i})">${a.nome}</span>
<button onclick="excluirArquivo(${i})">Excluir</button>
</div>
`).join("")
}

// ================= PROPRIEDADES =================

function verPropriedades(i){
let a = arquivos[i]
alert(`Nome: ${a.nome}\nTamanho: ${a.tamanho} MB`)
}

// ================= EXCLUIR =================

function excluirArquivo(i){
lixeira.push(arquivos[i])
arquivos.splice(i,1)
listarArquivos()
}

// ================= LIXEIRA =================

function abrirLixeira(){
mostrarTela("lixeira")

document.getElementById("lixeira").innerHTML = `
<div class="trash">

<div class="topbar">
<button onclick="voltar()">⬅ Voltar</button>
<button onclick="esvaziarLixeira()">Esvaziar Lixeira</button>
</div>

<div class="trash-content" id="conteudoLixeira">
</div>

</div>
`

listarLixeira()
}

function listarLixeira(){
let area = document.getElementById("conteudoLixeira")

if(lixeira.length === 0){
area.innerHTML = "Lixeira vazia"
return
}

area.innerHTML = lixeira.map(a=>`
<div class="trash-item">${a.nome} - ${a.tamanho} MB</div>
`).join("")
}

// ================= ESVAZIAR =================

function esvaziarLixeira(){
lixeira.forEach(a=>{
espacoUsado -= a.tamanho
})
lixeira = []
listarLixeira()
}

// ================= PC =================

function abrirPC(){
mostrarTela("computador")

let livre = espacoTotal - espacoUsado
let porcentagem = (espacoUsado / espacoTotal) * 100

document.getElementById("computador").innerHTML = `
<div class="pc">

<div class="topbar">
<button onclick="voltar()">⬅ Voltar</button>
</div>

<div class="disk">
<b>Disco Local (C:)</b><br><br>
Espaço usado: ${espacoUsado} GB<br>
Espaço livre: ${livre} GB

<div class="bar">
<div class="bar-fill" style="width:${porcentagem}%"></div>
</div>

</div>

</div>
`
}

// ================= VOLTAR =================

function voltar(){
mostrarTela("desktop")
}