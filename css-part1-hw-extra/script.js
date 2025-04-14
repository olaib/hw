"use strict";

class Branch {
    constructor(name, address, notes, startHour, endHour) {
        this.name = name;
        this.address = address;
        this.notes = notes;
        this.startHour = startHour;
        this.endHour = endHour;
    }
}
(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const branchNameElem = document.getElementById("branch-name");
        const branchAddressElem = document.getElementById("address");
        const notesElem = document.getElementById("notes");
        const table = document.getElementById("branches-table");
        const form = document.getElementById("add-branch-form");
        table.querySelectorAll("td .btn.btn-danger").forEach(button => button.addEventListener("click", () => button.parentElement.parentElement.remove()));
        form.addEventListener("submit", (event) => submit(event, branchNameElem, branchAddressElem, notesElem, table));
    })

    const buildNewBranchTr = (branch) => {
        const tr = document.createElement("tr");
        const [tdName, tdAddress, thHour, tdNotes] = [document.createElement("td"), document.createElement("td"), document.createElement("td"), document.createElement("td")];
        tdName.textContent = branch.name;
        thHour.textContent = `${branch.startHour} - ${branch.endHour} `;
        tdAddress.textContent = branch.address;
        tdNotes.textContent = branch.notes ?? "";
        const deleteBtn = createRemoveBtn();
        deleteBtn.onclick = () => tr.remove();

        [tdName, thHour, tdAddress, tdNotes, deleteBtn].forEach((attribute) => tr.appendChild(attribute));

        return tr;
    }
    const hide = (elem) => elem.classList.add('d-none');
    const show = (elem) => elem.classList.remove('d-none');

    const createRemoveBtn = () => {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", "btn-danger")
        button.textContent = "הסרה";
        button.style.backgroundColor = "red";
        button.style.textAlign = "center";
        return button;
    }
    const clear = (input) => input.value = "";
    const submit = (event, branchNameElem, branchAddressElem, notesElem, table) => {
        try {
            event.preventDefault();
            const startHour = document.getElementById("start-time");
            const endHour = document.getElementById("end-time");
            const isInvalid = validateFrom(branchNameElem, branchAddressElem);
            if (isInvalid) return false;

            const branch = new Branch(branchNameElem.value, branchAddressElem.value, notesElem.value, startHour.value, endHour.value);

            const newBranch = buildNewBranchTr(branch);

            table.querySelector("tbody").appendChild(newBranch);
            console.log("valid")


            clear(branchNameElem);
            clear(branchAddressElem);
            clear(notesElem);
        } catch (e) {
            console.log("invalid")

            return false;
        }
    }

    function validateFrom(branchNameElem, branchAddressElem) {
        let isInvalid = false;
        const error = branchNameElem.nextElementSibling;
        const errorAdress = branchAddressElem.nextElementSibling;
        if (branchNameElem.value == "") {
            show(error);
            isInvalid = true;
        }
        else hide(error);

        if (branchAddressElem.value == "") {
            show(errorAdress);
            isInvalid = true;
        }
        else hide(errorAdress);
        return isInvalid;
    }
})();