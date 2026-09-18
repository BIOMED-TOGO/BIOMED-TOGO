const defaultProducts=[
{id:1,name:"Glucomètre YASEE",cat:"Diagnostic",desc:"Kit complet : appareil, 50 bandelettes, 50 lancettes et autopiqueur.",price:"12 000 FCFA",status:"Disponible"},
{id:2,name:"Glucomètre SINOCARE",cat:"Diagnostic",desc:"Kit complet pour le suivi de la glycémie.",price:"12 000 FCFA",status:"Disponible"},
{id:3,name:"Bandelettes SINOCARE",cat:"Consommables",desc:"Boîte de 50 bandelettes.",price:"8 000 FCFA",status:"Disponible"},
{id:4,name:"Tensiomètre électronique rechargeable",cat:"Diagnostic",desc:"Appareil de mesure de la pression artérielle.",price:"Sur demande",status:"Disponible"},
{id:5,name:"Tubes EDTA",cat:"Laboratoire",desc:"Consommables de prélèvement pour analyses.",price:"Sur demande",status:"Disponible"},
{id:6,name:"Gants médicaux",cat:"Consommables",desc:"Gants à usage médical, différentes tailles.",price:"Sur demande",status:"Disponible"},
{id:7,name:"Microscope",cat:"Laboratoire",desc:"Équipement de laboratoire selon configuration.",price:"Sur demande",status:"Bientôt disponible"},
{id:8,name:"Réactifs de laboratoire",cat:"Réactifs",desc:"Références selon vos analyses et besoins.",price:"Sur demande",status:"Bientôt disponible"}
];
let products=JSON.parse(localStorage.getItem("biomed_products")||"null")||defaultProducts;
let category="Tous";
function renderFilters(){let cats=["Tous",...new Set(products.map(p=>p.cat))];document.getElementById("filters").innerHTML=cats.map(c=>`<button class="filter ${c===category?"active":""}" onclick="category='${c}';renderFilters();renderProducts()">${c}</button>`).join("")}
function renderProducts(){let q=(document.getElementById("search")?.value||"").toLowerCase();let list=products.filter(p=>(category==="Tous"||p.cat===category)&&(p.name+" "+p.desc).toLowerCase().includes(q));document.getElementById("products").innerHTML=list.length?list.map(p=>`<article class="product"><div class="icon">${p.cat==="Diagnostic"?"🩺":p.cat==="Laboratoire"?"🔬":p.cat==="Réactifs"?"🧪":"📦"}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${p.price}</div><span class="status ${p.status.includes("Bientôt")?"soon":""}">${p.status}</span><button class="btn primary" style="margin-top:14px" onclick="orderProduct('${p.name.replace(/'/g,"\\'")}')">Commander</button></article>`).join(""):"<p>Aucun produit trouvé.</p>"}
function orderProduct(name){document.getElementById("items").value=name+" — Quantité : ";location.hash="commande";document.getElementById("name").focus()}
document.getElementById("orderForm")?.addEventListener("submit",e=>{e.preventDefault();let n=document.getElementById("name").value,p=document.getElementById("phone").value,i=document.getElementById("items").value;let msg=`Bonjour BIOMED-TOGO,%0A%0AJe souhaite passer une commande.%0A%0ANom/Structure : ${encodeURIComponent(n)}%0ATéléphone : ${encodeURIComponent(p)}%0ABesoin : ${encodeURIComponent(i)}%0A%0AMerci.`;window.open("https://wa.me/22897571303?text="+msg,"_blank")});
renderFilters();renderProducts();