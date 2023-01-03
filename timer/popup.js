const timeElement = document.querySelector("#time")
const timerElement = document.querySelector("#timer")
const nameElement = document.querySelector("#name")

const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")
const resetBtn = document.querySelector("#reset")


startBtn.addEventListener("click", ()=>{
    chrome.storage.local.set({
        isRunning:true
    })
});
stopBtn.addEventListener("click", ()=>{
    chrome.storage.local.set({
        isRunning:false
    })
});
resetBtn.addEventListener("click", ()=>{
    chrome.storage.local.set({
        isRunning:false,
        timer: 0
    })
});

const updateTimeElements = () => {
    
    const currentTime = new Date().toLocaleTimeString()
    timeElement.textContent = `The time is: ${currentTime}`;
    chrome.storage.local.get(["timer"], (res)=>{
        const time = res.timer ?? 0;
        timerElement.textContent = `The timer is at ${time} seconds`
    });
}
updateTimeElements();
setInterval(updateTimeElements, 1000);
chrome.storage.sync.get(["name"], (res) => {
    const name = res.name ?? "???"
    nameElement.textContent =  `Your name is: ${name}`;
})