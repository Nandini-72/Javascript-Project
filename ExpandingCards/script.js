// selecting all panels with class of panel
const panels = document.querySelectorAll('.panel')
// Foreach panel when clicked
panels.forEach((panel)=>{
    panel.addEventListener('click',()=>{
        // remove active class from all another panel and add it to the selected panel
        removeActiveClasses()
        panel.classList.add('active')
    })
}) 
// remove active class from all another panel
function removeActiveClasses(){
    panels.forEach((panel) => {
        panel.classList.remove('active')
    })
}