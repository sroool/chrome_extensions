console.log("hello from the background script!")

let time = 0;

setInterval(()=> {
    time +=1
    console.log(time)
}, 1000);

chrome.alarms.create({
    periodInMinutes:1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm)=>{
    chrome.storage.local.get(["timer", "notificationsSettings", "isRunning"], res => {
        const isRunning = res.isRunning ?? true;
        if(!isRunning) return;
        const time = res.timer ?? 0;
        chrome.storage.local.set({
            timer: time + 1
        })
        chrome.action.setBadgeText({
            text: `${time+1}`
        });
        const notificationsSettings = +res.notificationsSettings ;
        console.log(`notificationsSettings=${notificationsSettings}`)
        if(time % notificationsSettings === 0 ){

            this.registration.showNotification("Chrome Timer Extension", {
                body: "1 second has passed",
                icon: "icon.png"
            })
        }
    })
})