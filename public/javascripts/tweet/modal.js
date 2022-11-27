class Modal {
    constructor() {
        this.formModal = document.getElementById("form-modal");
        this.formModalBtn = document.getElementById("form-modal-btn");
        this.formClose = this.formModal.getElementsByClassName("form-close")[0];
        this.confirmModal = document.getElementById("demo-confirm-modal");
        this.confirmBtn = document.getElementById("post-confirm-btn");
        this.confirmCancel = this.confirmModal.getElementsByClassName("confirm-cancel")[0];
    }

    setFormModalOpenBtnEvent() {
        const self = this;
        self.formModalBtn.onclick = function() {
            self.formModal.style.display = "block";
        };
    }

    setFormModalCloseBtnEvent() {
        const self = this;
        self.formClose.onclick = function() {
            self.formModal.style.display = "none";
        };
    }

    setFormModalCloseOutsideEvent() {
        const self = this;
        window.onclick = function(event) {
            if (event.target == self.formModal) {
                self.formModal.style.display = "none";
            }
        };
    }

    closeFormModal() {
        this.formModal.style.display = "none";
    }

    setConfirmModalBtnEvent() {
        const self = this;
        self.confirmBtn.onclick = function() {
            self.confirmModal.style.display = "block";
        };
    }

    setConfirmModalCancelBtnEvent() {
        const self = this;
        self.confirmCancel.onclick = function() {
            self.confirmModal.style.display = "none";
        };
    }

    closeConfirmModal() {
        this.confirmModal.style.display = "none";
    }
}

window.Modal = Modal;
