"use strict"
// clear form
const clearForm = document.querySelector(".clear-form");
// mortgage forms
const mortgageAmount = document.querySelector(".mortgage-amount");
const mortgageYears = document.querySelector(".mortgage-term");
const mortgageInterest = document.querySelector(".mortgage-interest");
const submitBtn = document.querySelector("button");
const errorMsg = document.querySelectorAll(".error");
const radioBtn = document.querySelectorAll(".radio-btn");
const noResult = document.querySelector(".no-result");
const result = document.querySelector(".result");
const monthlyAmount = document.querySelector(".monthly-amount");
const overallAmount = document.querySelector(".total-amount");


const checkActiveSate = [mortgageAmount, mortgageYears, mortgageInterest];

//  calculating Mortgage

const calcMortgage = function (mortgageAmount, mortgageYears, mortgageInterest) {

    const principalAmount = parseFloat(mortgageAmount.value);
    const annualRate = parseFloat(mortgageInterest.value) / 100;
    const monthlyRate = annualRate / 12;
    const months = parseInt(mortgageYears.value) * 12;

    const monthlyPayment = principalAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;

    return [monthlyPayment.toFixed(2), totalPayment.toFixed(2)];
}

// clearing the form 
const formClear = () => {
    mortgageAmount.value = mortgageYears.value = mortgageInterest.value = "";
    errorMsg.forEach((error) => {
        const avail = error.classList.contains("hidden");
        if (!avail) {
            error.classList.add("hidden");
        }
    })
    checkActiveSate.filter((item, index) => {
        const euroIcon = document.querySelector(`.euro-icon-${index + 1}`);
        euroIcon.style.backgroundColor = '';
    })
    noResult.classList.remove("hidden");
    result.classList.add("hidden");
}


clearForm.addEventListener("click", function () {
    formClear();
    this.style.color = "red";
    this.addEventListener("mouseout", () => {
        this.style.color = "black";
    })
});


// active - State
checkActiveSate.forEach((item, index) => {
    let euroIcon;
    item.addEventListener("focus", () => {
        euroIcon = document.querySelector(`.euro-icon-${index + 1}`);
        euroIcon.style.backgroundColor = '#d7da2f';
    })
    item.addEventListener("blur", () => {
        euroIcon = document.querySelector(`.euro-icon-${index + 1}`);
        euroIcon.style.backgroundColor = '';
    })
})

// error state
const isFormEmpty = function (form) {
    let isEmpty = false;
    if (form.value.trim() === "") {
        isEmpty = true;
    }
    return isEmpty;
}

// SUBMIT THE FORM 
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    checkActiveSate.forEach((item, index) => {
        if (isFormEmpty(item)) {
            const error = document.querySelector(`.error-${index + 1}`);
            const euroIcon = document.querySelector(`.euro-icon-${index + 1}`);
            euroIcon.style.backgroundColor = "red";
            error.classList.remove("hidden");
        }


        if (+item.value === 0) {
            const error = document.querySelector(`.error-${index + 1}`);
            const euroIcon = document.querySelector(`.euro-icon-${index + 1}`);
            euroIcon.style.backgroundColor = "red";
            error.classList.remove("hidden");
        }

        if (+mortgageAmount.value !== 0 && +mortgageInterest.value !== 0 && +mortgageYears.value !== 0) {
            const error = document.querySelector(`.error-${index + 1}`);
            error.classList.add("hidden");

            const value = calcMortgage(mortgageAmount, mortgageYears, mortgageInterest)
            noResult.classList.add("hidden");
            result.classList.remove("hidden");
            monthlyAmount.textContent = `${value[0]}`;
            overallAmount.textContent = `${value[1]}`;
        }

    })
});


