const BOT_TOKEN = "8595596858:AAFlfcgi_np5e2MxVzYvIH7vGXBX9LM_ugM";
const CHAT_ID = "8088335060";



async function sendMessage(type){

const statusDiv=document.getElementById("status");

if(!navigator.onLine){
statusDiv.innerHTML="❌ Internet connection nahi hai";
return;
}

const now=new Date();

const timeStr=now.toLocaleString("hi-IN");

const message=
`🛒 MyShop Pro

${type}

⏰ ${timeStr}`;

statusDiv.innerHTML="📤 Message bheja ja raha hai...";

try{

const response=await fetch(
`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
chat_id:CHAT_ID,
text:message
})
}
);

const result=await response.json();

if(result.ok){

statusDiv.innerHTML=
`✅ Success<br><br>${type}<br>${timeStr}`;

}else{

statusDiv.innerHTML=
`❌ ${result.description}`;

}

}catch(e){

statusDiv.innerHTML=
"❌ Telegram server error";

}

}

function openShop(){
sendMessage("🚪 SHOP OPEN");
}

function closeShop(){
sendMessage("🔒 SHOP CLOSE");
}

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("./sw.js")
.then(()=>console.log("SW Registered"))
.catch(err=>console.log(err));

});

}