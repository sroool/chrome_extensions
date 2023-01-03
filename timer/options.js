console.log('Hello from the options page!')

const nameInput = document.querySelector('#name-input')
const saveOptionsBtn = document.querySelector('#save-options-btn')
const notiOptions = document.querySelector("#show-notification-every-n-seconds")
const saveOptionsNotificationsBtn = document.querySelector("#save-options-noti-btn")

saveOptionsBtn.addEventListener('click', () => {
  chrome.storage.sync.set({ name: nameInput.value }, () => {
    console.log(`Name is set to ${nameInput.value}`)
  })
})
saveOptionsNotificationsBtn.addEventListener("click", ()=>{
    const n = notiOptions.value ?? 10;
    console.log(`saving ${n} to notificationsSettings`)
    chrome.storage.local.set({"notificationsSettings":`${n}`})
})

chrome.storage.sync.get(["name"], (res)=>{
    nameInput.value = res.name ?? "???";
});