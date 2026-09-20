const anniversary = new Date("2026-09-24T00:00:00+05:30");

function pad(n){return String(Math.max(0,n)).padStart(2,"0")}
function updateCounter(){
  const now = new Date();
  const diff = anniversary - now;
  const title = document.getElementById("counterTitle");
  const label = document.getElementById("counterLabel");
  const caption = document.getElementById("counterCaption");
  if(diff > 0){
    const total = Math.floor(diff/1000);
    const days = Math.floor(total/86400);
    const hours = Math.floor((total%86400)/3600);
    const minutes = Math.floor((total%3600)/60);
    const seconds = total%60;
    document.getElementById("days").textContent = pad(days);
    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);
    label.textContent = "COUNTING TOWARDS";
    title.textContent = "24 SEPTEMBER 2026";
    caption.textContent = "until Chapter II becomes our newest memory.";
  }else{
    const elapsed = now - anniversary;
    const total = Math.floor(elapsed/1000);
    const days = Math.floor(total/86400);
    const hours = Math.floor((total%86400)/3600);
    const minutes = Math.floor((total%3600)/60);
    const seconds = total%60;
    document.getElementById("days").textContent = pad(days);
    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);
    label.textContent = "CHAPTER II HAS BEEN";
    title.textContent = "OURS FOR";
    caption.textContent = "And the counter keeps counting because the story isn't finished.";
  }
}
updateCounter(); setInterval(updateCounter,1000);

const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll",()=>{
  const h = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = (scrollY / h * 100) + "%";
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

