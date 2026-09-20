const anniversary = new Date("2024-09-24T00:00:00+05:30");

function pad(n){return String(Math.max(0,n)).padStart(2,"0")}
function updateCounter(){
  const now = new Date();
  const elapsed = Math.max(0, now - anniversary);
  const total = Math.floor(elapsed/1000);
  const days = Math.floor(total/86400);
  const hours = Math.floor((total%86400)/3600);
  const minutes = Math.floor((total%3600)/60);
  const seconds = total%60;
  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
  document.getElementById("counterLabel").textContent = "TOGETHER FOR";
  document.getElementById("counterTitle").textContent = "24 SEPTEMBER 2024";
  document.getElementById("counterCaption").textContent = "and somehow, every second still feels worth counting.";
}
updateCounter();
setInterval(updateCounter,1000);

const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll",()=>{
  const h = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = h > 0 ? (scrollY / h * 100) + "%" : "0%";
},{passive:true});

document.querySelectorAll(".envelope").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.getElementById("modalText").textContent = btn.dataset.message;
    document.getElementById("messageModal").classList.add("show");
    document.getElementById("messageModal").setAttribute("aria-hidden","false");
  });
});
function closeModal(){
  document.getElementById("messageModal").classList.remove("show");
  document.getElementById("messageModal").setAttribute("aria-hidden","true");
}
document.getElementById("closeModal").addEventListener("click",closeModal);
document.querySelector(".modal-backdrop").addEventListener("click",closeModal);

/* Soft original romantic instrumental using the browser Web Audio API. */
let audioContext = null;
let masterGain = null;
let soundtrackTimer = null;
let soundtrackOn = false;
const melody = [[261.63,.42],[329.63,.42],[392,.58],[329.63,.42],[293.66,.42],[349.23,.42],[440,.58],[349.23,.42],[261.63,.42],[329.63,.42],[392,.42],[523.25,.7],[392,.42],[349.23,.42],[329.63,.42],[293.66,.7]];
let melodyIndex = 0;
function playNote(freq,duration){
  if(!audioContext || !masterGain)return;
  const now=audioContext.currentTime;
  const osc=audioContext.createOscillator();
  const gain=audioContext.createGain();
  osc.type="sine";
  osc.frequency.setValueAtTime(freq,now);
  gain.gain.setValueAtTime(.0001,now);
  gain.gain.exponentialRampToValueAtTime(.045,now+.08);
  gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
  osc.connect(gain).connect(masterGain);
  osc.start(now);
  osc.stop(now+duration+.03);
}
function playMelody(){
  if(!soundtrackOn)return;
  const [freq,duration]=melody[melodyIndex];
  playNote(freq,duration);
  melodyIndex=(melodyIndex+1)%melody.length;
  soundtrackTimer=setTimeout(playMelody,duration*1000+70);
}
function startSoundtrack(){
  audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();
  if(audioContext.state==="suspended")audioContext.resume();
  masterGain=masterGain||audioContext.createGain();
  masterGain.gain.setTargetAtTime(.8,audioContext.currentTime,.3);
  masterGain.connect(audioContext.destination);
  soundtrackOn=true;
  melodyIndex=0;
  playMelody();
}
function stopSoundtrack(){
  soundtrackOn=false;
  clearTimeout(soundtrackTimer);
  if(masterGain&&audioContext)masterGain.gain.setTargetAtTime(.0001,audioContext.currentTime,.2);
}
const soundToggle=document.getElementById("soundToggle");
soundToggle.addEventListener("click",()=>{
  if(soundtrackOn){
    stopSoundtrack();
    soundToggle.setAttribute("aria-pressed","false");
    soundToggle.innerHTML="♫ <span>Soundtrack</span>";
  }else{
    startSoundtrack();
    soundToggle.setAttribute("aria-pressed","true");
    soundToggle.innerHTML="Ⅱ <span>Playing</span>";
  }
});
