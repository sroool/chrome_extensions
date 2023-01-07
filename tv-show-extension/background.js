chrome.runtime.onInstalled.addListener((details)=>{
    console.log(details);
    chrome.contextMenus.create({
        title: "Test Context Menu",
        id: "contextMenu1",
        contexts: ["page", "selection"]
    })
    chrome.contextMenus.onClicked.addListener((event)=>{
        console.log(event);
        // chrome.search.query({
        //     disposition: "NEW_TAB",
        //     text: `imdb ${event.selectionText}`
        // });
        // chrome.tabs.query({
        //     currentWindow: true
        // }, (tabs)=>{
        //     console.log(tabs)
        // })
        chrome.tabs.create({
            active: true,
            url: `https://www.imdb.com/find?q=${event.selectionText}`
        })

    })
    // chrome.contextMenus.create({
    //     title: "Text Context Menu 1",
    //     id: "contextMenu2",
    //     parentId: "contextMenu1",
    //     contexts: ["page", "selection"]
    // })
    // chrome.contextMenus.create({
    //     title: "Text Context Menu 2",
    //     id: "contextMenu3",
    //     parentId: "contextMenu1",
    //     contexts: ["page", "selection"]
    // })
});

console.log("background script running...")