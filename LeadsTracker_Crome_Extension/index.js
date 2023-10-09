
/****** Let's Build a Chrome Extension, which can save links of our interests ******/

let myLeads = []
const inputEl = document.getElementById("input-el") 
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) 
const tabBtn = document.getElementById("tab-btn")


if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
       listItems += `
        <li>
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]} 
            </a>
        </li>
        `
    } 
    ulEl.innerHTML = listItems //since manipulating DOM s costlier instead of changing it 3 times in the loop we do this.
    
}

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear()
    console.log(leadsFromLocalStorage)
    myLeads = []
    render(myLeads)
})


 
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
}) 




