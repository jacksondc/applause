!function(){function f(a,b){var c=new XMLHttpRequest;return"withCredentials"in c?c.open(a,b,!0):"undefined"!=typeof XDomainRequest?(c=new XDomainRequest,c.open(a,b)):c=null,c}function g(){throw new Error("Error with Applause request.")}function h(a){return a>=1e3?Math.round(a/100)/10+"k":a}function i(a){var b=h(a);document.querySelector("#applause span.applause-count").innerHTML=b}function j(c){var d=f("GET",a+"/"+c+"?url="+encodeURIComponent(b));if(!d)throw new Error("Applause won't work because CORS is not supported.");d.onload="get"===c?function(){var a=JSON.parse(d.responseText);i(a.votes),a.voted&&(document.querySelector("#applause").className+=" applause-voted",document.querySelector("#applause .applause-action").innerHTML="Applauded"),document.querySelector("#applause").style.display="table"}:function(){var a=JSON.parse(d.responseText);i(a.votes);var b=document.querySelector("#applause .applause-action");(" "+applause.className+" ").indexOf(" applause-voted ")<=-1?(applause.className+=" applause-voted",b.innerHTML="Applauded"):(applause.className=(" "+applause.className+" ").replace(/(?:^|\s)applause-voted(?!\S)/,""),b.innerHTML="Applaud")},d.onerror=g,d.send()}var a="http://applauding.herokuapp.com",b=location.host+location.pathname,c="<link rel='stylesheet' type='text/css' href='"+a+"/style.css'>",d="<link rel='stylesheet' type='text/css' href='"+a+"/cleanslate.css'>",e="<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>";document.querySelector("head").innerHTML+=d+c+e,document.addEventListener("DOMContentLoaded",function(){var a=document.querySelector("#applause");a.className+="cleanslate",a.innerHTML="<div><span class='applause-count'>0</span><span class='applause-action'>Applaud</span></div>",a.addEventListener("click",function(){j("update")},!1),j("get")})}();
