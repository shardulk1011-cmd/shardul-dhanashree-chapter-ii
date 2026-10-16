/* A small, original, gentle instrumental. Audio begins only after the visitor chooses to play it. */
let audioContext=null, masterGain=null, soundtrackTimer=null, soundtrackOn=false, melodyIndex=0;
const melody=[[261.63,.48],[329.63,.48],[392,.62],[329.63,.45],[293.66,.48],[349.23,.48],[440,.62],[349.23,.45],[261.63,.48],[329.63,.48],[392,.48],[523.25,.72],[392,.48],[349.23,.48],[329.63,.48],[293.66,.72]];
function playNote(freq,duration){
  if(!audioContext||!masterGain)return;
  const now=audioContext.currentTime,osc=audioContext.createOscillator(),gain=audioContext.createGain();
  osc.type="sine";osc.frequency.setValueAtTime(freq,now);
  gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.035,now+.09);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
  osc.connect(gain).connect(masterGain);osc.start(now);osc.stop(now+duration+.04);
}
function playMelody(){if(!soundtrackOn)return;const [freq,duration]=melody[melodyIndex];playNote(freq,duration);melodyIndex=(melodyIndex+1)%melody.length;soundtrackTimer=setTimeout(playMelody,duration*1000+100)}
function startSoundtrack(){
  const AudioContextClass=window.AudioContext||window.webkitAudioContext;if(!AudioContextClass)return;
  audioContext=audioContext||new AudioContextClass();if(audioContext.state==="suspended")audioContext.resume();
  if(!masterGain){masterGain=audioContext.createGain();masterGain.gain.value=.75;masterGain.connect(audioContext.destination)}
  masterGain.gain.setTargetAtTime(.75,audioContext.currentTime,.2);soundtrackOn=true;melodyIndex=0;playMelody();
}
function stopSoundtrack(){soundtrackOn=false;clearTimeout(soundtrackTimer);if(masterGain&&audioContext)masterGain.gain.setTargetAtTime(.0001,audioContext.currentTime,.15)}
const soundToggle=document.getElementById("soundToggle");
soundToggle.addEventListener("click",()=>{
  if(soundtrackOn){stopSoundtrack();soundToggle.setAttribute("aria-pressed","false");soundToggle.innerHTML='♫ <span>Soft music</span>'}
  else{startSoundtrack();if(soundtrackOn){soundToggle.setAttribute("aria-pressed","true");soundToggle.innerHTML='Ⅱ <span>Playing</span>'}}
});
const progressBar=document.getElementById("progressBar");
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;progressBar.style.width=max>0?Math.min(100,window.scrollY/max*100)+"%":"0%"}
window.addEventListener("scroll",updateProgress,{passive:true});window.addEventListener("resize",updateProgress);updateProgress();
const modal=document.getElementById("messageModal"),modalTitle=document.getElementById("modalTitle"),modalText=document.getElementById("modalText"),closeModalButton=document.getElementById("closeModal");
let lastTrigger=null;
function openNote(button){lastTrigger=button;modalTitle.textContent=button.dataset.title||"A little note";modalText.textContent=button.dataset.message||"";modal.classList.add("show");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";closeModalButton.focus()}
function closeNote(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";if(lastTrigger)lastTrigger.focus()}
document.querySelectorAll(".note-envelope").forEach(button=>button.addEventListener("click",()=>openNote(button)));
closeModalButton.addEventListener("click",closeNote);
document.getElementById("modalDone").addEventListener("click",closeNote);
modal.querySelector(".modal-backdrop").addEventListener("click",closeNote);
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&modal.classList.contains("show"))closeNote()});
