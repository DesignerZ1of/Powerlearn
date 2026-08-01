// CONTROLE DE TELAS
function trocarTela(tela){
document.querySelectorAll(".screen").forEach(t=>{
t.classList.remove("active")
})
document.getElementById(tela).classList.add("active")
}

// ================= DESKTOP =================

// carregar desktop
document.getElementById("desktop").innerHTML = `
<div class="desktop">

<div class="icon" onclick="trocarTela('google')">
<div>🌐</div>
Google
</div>

<div class="icon" style="top:120px" onclick="trocarTela('arquivos')">
<div>📁</div>
Arquivos
</div>

<div class="taskbar">
⊞
<input class="search" placeholder="Pesquisar">
📁 🌐
<div class="right">
<span>📶</span>
<span>🔊</span>
<span>🔋</span>
</div>
</div>

</div>
`

// ================= GOOGLE =================

document.getElementById("google").innerHTML = `
<div class="google">

<div class="logo">Google</div>

<input id="pesquisa" class="search-box" placeholder="Pesquisar no Google">

<button class="btn" onclick="buscar()">Pesquisa Google</button>

<div class="results" id="resultados"></div>

<button class="btn" onclick="trocarTela('desktop')">Voltar</button>

</div>
`

// ================= EXPLORADOR =================

document.getElementById("arquivos").innerHTML = `
<div class="window">

<div class="topbar">
<button onclick="renomear()">Renomear</button>
<button onclick="trocarTela('desktop')">Voltar</button>
</div>

<div class="main">

<div class="sidebar">
<div onclick="abrirDownloads()">Downloads</div>
</div>

<div class="content" id="conteudo">
Clique em Downloads
</div>

</div>
</div>
`

// ================= LÓGICA =================

let arquivoBaixado = false
let nomeArquivo = "letra.pdf"

// GOOGLE BUSCA
function buscar(){
let texto = document.getElementById("pesquisa").value.toLowerCase()

if(texto.includes("pdf") || texto.includes("musica")){
document.getElementById("resultados").innerHTML = `
<div style="color:blue;cursor:pointer" onclick="baixar()">
Baixar letra de música PDF
</div>
`
}else{
document.getElementById("resultados").innerHTML = `
<div>Resultado exemplo</div>
`
}
}

// DOWNLOAD
function baixar(){
arquivoBaixado = true
alert("Download concluído")
}

// ABRIR DOWNLOADS
function abrirDownloads(){
if(arquivoBaixado){
document.getElementById("conteudo").innerHTML = `
<div class="file">${nomeArquivo}</div>
`
}else{
document.getElementById("conteudo").innerHTML = `
Nenhum arquivo encontrado
`
}
}

// RENOMEAR + MUDAR TIPO
function renomear(){
if(!arquivoBaixado){
alert("Nenhum arquivo para renomear")
return
}

let novoNome = prompt("Digite o novo nome (ex: musica.txt)")

if(novoNome){
nomeArquivo = novoNome
abrirDownloads()
}
}