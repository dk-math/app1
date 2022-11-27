window.addEventListener("load", () => {
    let username = localStorage.getItem("username");
    if (!username) {
        username = window.prompt("What is your name?");
        localStorage.setItem("username", username);
    }
    
    const tab = new Tab();
    tab.setSwitchTabsEvent();
})