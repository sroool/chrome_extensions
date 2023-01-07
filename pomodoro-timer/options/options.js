const timeOption = document.querySelector("#time-option")
timeOption.addEventListener("change", (event)=>{
    const val = event.target.value;
    if(!isValidTime(val)){
        timeOption.value = 25;
    }
});

const saveBtn = document.querySelector("#save-options-btn");
saveBtn.addEventListener("click", ()=>{
    chrome.storage.local.set({
        timer: 0,
        isRunning:false,
        timeOption : isValidTime(timeOption.value) ? timeOption.value : 25
    })
});

const isValidTime = (val) => val >= 1 && val <= 60;

chrome.storage.local.get(["timeOption"], (res)=>{
    timeOption.value = res.timeOption ?? 25;
});