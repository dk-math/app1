class Tab {
    constructor() {
        this.tabs = document.getElementsByClassName("tab-item");
    }

    setSwitchTabsEvent() {
        const self = this;
        for(let i = 0; i < self.tabs.length; i++) {
            self.tabs[i].addEventListener("click", function() {
                const arrayTabs = Array.prototype.slice.call(self.tabs);
                const index = arrayTabs.indexOf(this);
                document.getElementsByClassName("active-item")[0].classList.remove("active-item");
                this.classList.add("active-item");
                document.getElementsByClassName("active-space")[0].classList.remove("active-space");
                document.getElementsByClassName("header-space")[index].classList.add("active-space");
                document.getElementsByClassName("is-show")[0].classList.remove("is-show");
                document.getElementsByClassName("tab-content")[index].classList.add("is-show");
            }, false);
        }
    }
}