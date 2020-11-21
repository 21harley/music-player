const $d=document;
const $login=$d.getElementById("login");
const $menuD=$d.querySelector(".menu__canciones");
const $menuR=$d.querySelector(".reproductor");
const nombres=[
     "Scott Pilgrim Vs. The World.mp3",
     "Future – Last Breath CREED.mp3",
     "Dj Shako - Fake Blood.mp3",
     "You reposted in the wrong neighborhood.mp3",
     "J. Balvin - Azul.mp3",
     "J Balvin - Morado.mp3"];
let act=-1;
let sonidoI=50;
$d.addEventListener("submit",(e)=>{
  const $login=$d.getElementById("login");
  const $menu=$d.getElementById("menu");
  $login.style.display="none";
  $menu.style.display="block";
  e.preventDefault();
  $login.style.display="none";
});

const $des1=$d.querySelector(".des1");
const $des2=$d.querySelector(".des2");
const $alarm=$d.createElement("audio");

function activarC(){
  const $play=$d.querySelector("#playBP");
  $alarm.play();
  $barra.setAttribute("min",0);
  $barra.setAttribute("max",formatoN($alarm.duration));
  $alarm.volume=0.5;
  $des1.innerHTML=formato($alarm.currentTime);
  $des2.innerHTML=formato($alarm.duration); act=1;
  $play.classList.remove("fa-play");
  $play.classList.add("fa-pause");
}

function pararC(){
  const $play=$d.querySelector("#playBP");
  act=0;
  $alarm.pause();
  $play.classList.remove("fa-pause");
  $play.classList.add("fa-play");
}
function nuevaCancion(id){
  if(act==-1) act=0;
  if(act==1){
    pararC();
  }
  $alarm.src="asset/music/"+nombres[id-1];
  $menuD.classList.toggle("openC");
  const $datos=$d.querySelectorAll(".list__item--des");
  const $mostrar=$d.querySelectorAll(".logo__des");
  for(let i=0;i<$datos[id-1].children.length;i++){
    $mostrar[i].innerHTML=$datos[id-1].children[i].innerHTML;
  }

}

$d.addEventListener("click",(e)=>{
  console.log(e.target);
  if(e.target.matches(".item__boton")||e.target.matches(".item__boton *")){
    $menuD.classList.toggle("openC");
  }
  if(e.target.matches(".sonic__block--item2")||e.target.matches(".sonic__block--item2 *")){
    if(act==0){
      activarC();
    }else if(act==1){
      pararC();
    }
  }
  if(e.target.matches(".login__log4")||e.target.matches(".login__log4 *")||
     e.target.matches(".item--music")||e.target.matches(".item--music *")){
      if(e.target.matches(".triangulo2")){
        nuevaCancion(e.target.parentNode.id[7]);
      }else if(e.target.matches(".icom")){
        nuevaCancion(e.target.parentNode.parentNode.id[7]);
      }else{
        nuevaCancion(e.target.id[7]);
      }

  }
   //if(e.target.matches(""))
});
function formatoN(valor){
  let numero=Math.ceil(valor);
  return numero;
} 
function formato(valor){
  let numero=Math.ceil(valor);
  let aux=Math.floor(numero/60);
  let aux1=(numero-(60*aux));
  if(aux1<=9){
    return aux+":0"+aux1;
  }else{
    return aux+":"+aux1;
  }
}
setInterval(()=>{
  $des1.innerHTML=formato($alarm.currentTime);
  $input[1].value=formatoN($alarm.currentTime);
  $input[1].style.setProperty("--value", (100/$alarm.duration)*$input[1].value);
  if(act==1){
    mostrarLinea();
  }
  
},1000);
function mostrarLinea(){
  const $lineas=$d.querySelectorAll(".lineas");
  if($alarm.currentTime!=$alarm.duration&&act!=0){
    for(let i=0;i<$lineas.length;i++){
      $lineas[i].style.height=`${Math.random()* (sonidoI - 1) + 1}px`;
    }
  }else{
    for(let i=0;i<$lineas.length;i++){
      $lineas[i].style.height=`${Math.random()* (1- 1) + 1}px`;
    }
  }

}
const $barra=$d.querySelector("#bR");
const $input = $d.querySelectorAll("input[type=range]");
for(let i=0;i<$input.length;i++){
  $input[i].style.setProperty("--value", $input[i].value);
}

$d.addEventListener("input", (e)=>{
   if(e.target.matches("input[type=range]")){
     if(e.target.id=="bR"){
      $input[1].style.setProperty("--value", (100/$alarm.duration)*e.target.value);
      $alarm.currentTime=e.target.value;
     }
     if(e.target.id=="bS"){
      $input[0].style.setProperty("--value", e.target.value);
      $alarm.volume=e.target.value/100;
      sonidoI=e.target.value;
     }

   }
},false);