const ALARM_POMODORO_TIMER = "pomodoroTimer"
chrome.alarms.create(ALARM_POMODORO_TIMER, {
    periodInMinutes: 1/60
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_POMODORO_TIMER){
        chrome.storage.local.get(["timer", "isRunning"], (res)=>{
            if(res.isRunning){
                let timer = res.timer + 1
                console.log(timer);
                chrome.storage.local.set({
                    timer,

                })
            }
        })
    }
});

chrome.storage.local.get(["timer", "isRunning"], (res)=>{
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer:0,
        isRunning : "isRunning" in res ? res.isRunning : false,
    })
});