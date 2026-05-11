let current=0;
let q=0;
let score=0;
let name="";
const total=10;

// آدرس وب‌اپ گوگل اسکریپت را اینجا قرار دهید
const ENDPOINT="PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE";

function startGame(){
 name=document.getElementById('name').value.trim();
 if(!name){alert('نام را وارد کنید');return}
 document.getElementById('start').style.display='none';
 document.getElementById('game').style.display='block';
 next();
}

function next(){
 if(q>=total){finish();return}
 current=Math.floor(Math.random()*100)+1;
 document.getElementById('number').innerText=current;
 document.getElementById('progress').innerText=`سوال ${q+1} از ${total}`;
}

function answer(type){
 let correct=(current%2===0)?'even':'odd';
 if(type===correct)score++;
 q++;
 next();
}

function finish(){
 document.getElementById('game').style.display='none';
 document.getElementById('end').style.display='block';
 document.getElementById('score').innerText=`امتیاز شما: ${score} از ${total}`;
 sendResult();
}

function sendResult(){
 if(!ENDPOINT || ENDPOINT.includes('PASTE')) return;
 fetch(ENDPOINT,{
 method:'POST',
 headers:{'Content-Type':'application/json'},
 body:JSON.stringify({name:name,score:score,total:total,date:new Date().toISOString()})
 }).catch(()=>{});
}
