const images = ['bp1','bp2','bp3','bp4']
const imgElem = document.querySelector('img')

function random(array){
    let randomNo = Math.floor(Math.random() * array.length)
    return array[randomNo]
}

setInterval(function(){
    let randomChoice = random(images)
    imgElem.src = 'images/'+randomChoice+'.jpeg'
}, 2000)