dragAndDropImg()

function dragAndDropImg() {
    // Your existing JavaScript code
    document
        .getElementById('applyImage')
        .addEventListener('click', function () {
            const image = document.getElementById('image')
            const imageUrl = document.getElementById('imageUrl').value
            image.src = imageUrl
        })

    // New JavaScript code for drag and drop
    const dropArea = document.getElementById('dropArea')

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropArea.classList.add('drag-over')
    })

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('drag-over')
    })

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault()
        dropArea.classList.remove('drag-over')
        const file = e.dataTransfer.files[0]
        const reader = new FileReader()

        reader.onload = function (e) {
            const image = document.getElementById('image')
            image.src = e.target.result
        }

        reader.readAsDataURL(file)
    })

    const fileInput = document.getElementById('fileInput')

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = function (e) {
            const image = document.getElementById('image')
            image.src = e.target.result
        }

        reader.readAsDataURL(file)
    })
}

function dots() {
    let activeDot = null

    document.querySelectorAll('.section-drag__dot').forEach((dot) => {
        dot.addEventListener('mousedown', function (e) {
            activeDot = dot
            const rect = activeDot.parentElement.getBoundingClientRect()

            const onMouseMove = function (e) {
                let x = (e.clientX - rect.left) / rect.width
                let y = (e.clientY - rect.top) / rect.height

                x = Math.max(0, Math.min(x, 1)) // Restrict x to the range [0, 1]
                y = Math.max(0, Math.min(y, 1)) // Restrict y to the range [0, 1]

                activeDot.style.left = `${x * 97}%`
                activeDot.style.top = `${y * 95.2}%`
            }

            const onMouseUp = function () {
                activeDot = null
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        })
    })

    document.getElementById('getData').addEventListener('click', getData)

    function getData() {
        let blockCountClass = 0
        let blockCountClassTwo = 100
        let blockCountClassAll = 200
        const dots = document.querySelectorAll('.section-drag__dot')
        const dotList = document.createElement('ul')
        dotList.classList.add('section-drag-data__list')

        dots.forEach((dot) => {
            blockCountClass++
            blockCountClassTwo++
            blockCountClassAll++
            const top = roundToHundredth(parseFloat(dot.style.top)) + '%'
            const left = roundToHundredth(parseFloat(dot.style.left)) + '%'
            // const positionInfo = `top: ${top}, left: ${left}`
            const dotNumber = dot.classList[1].split('--')[1]
            const dotItem = document.createElement('li')
            dotItem.classList.add('section-drag-data__list-item')
            dotItem.innerHTML = `<div class="section-drag-data__list-item-wrap"> <div class="section-drag-data__list-item-num"> ${dotNumber} </div> <div class="section-drag-data__list-item-position"> <button onclick="copyText('dataToCopy${blockCountClass}')" class="position"> <div class="position__title"> Top: </div> <div id="dataToCopy${blockCountClass}" class="position__num"> ${top} </div> </button> <button onclick="copyText('dataToCopy${blockCountClassTwo}')" class="position"> <div class="position__title"> Left: </div> <div id="dataToCopy${blockCountClassTwo}" class="position__num"> ${left} </div> </button> </div> </div> <div id="dataToCopy${blockCountClassAll}" class="section-drag-data__all"> ${top} ${left} </div> <button class="btn-copy" onclick="copyText('dataToCopy${blockCountClassAll}')"> <span> Copy All </span> <svg> <use xlink:href="img/sprite.svg#icon-copy"></use> </svg> </button>`
            dotList.appendChild(dotItem)
        })

        const dataContainer = document.querySelector('.section-drag-data')
        dataContainer.innerHTML = ''
        dataContainer.appendChild(dotList)
        dataContainer.classList.add('active')
        
        setTimeout(() => {
            dataContainer.classList.remove('active')
        }, 1100)
        
    }

    function roundToHundredth(num) {
        return Math.round(num * 100) / 100
    }
}

function copyText(elementId) {
    const alertBlock = document.querySelector('.alert')
    const addClassActive = 'active'
    const addClassNoActive = 'noactive'

    let text = document.getElementById(elementId).innerText
    navigator.clipboard.writeText(text)
    console.log('Copied the text: ' + text)

    alertBlock.classList.add(addClassActive)

    setTimeout(() => {
        alertBlock.classList.add(addClassNoActive)
    }, 1000)

    setTimeout(() => {
        alertBlock.classList.remove(addClassActive)
        alertBlock.classList.remove(addClassNoActive)
    }, 1100)
}

// Default number of HTML blocks to display
let numBlocks = 1

function selectNumber(num) {
    numBlocks = num
    document.getElementById('dots').innerHTML = ''

    for (let i = 1; i <= numBlocks; i++) {
        let html = `
                <div class="section-drag__dot dot--${i}">
                    ${i}
                </div>
            `
        document.getElementById('dots').innerHTML += html
    }

    dots()
}

window.onload = function () {
    dots()
}

const dropDownBtn = document.querySelector('.dropdown')

dropDownBtn.addEventListener('click', (e) => {
    e.stopPropagation() // Stop the click event from propagating to the document
    dropDownBtn.classList.toggle('active')
})

document.addEventListener('click', (e) => {
    if (!dropDownBtn.contains(e.target)) {
        dropDownBtn.classList.remove('active')
    }
})

function updateYear() {
    var currentYear = new Date().getFullYear()
    var yearElement = document.getElementById('year')
    yearElement.innerHTML = currentYear
}

updateYear()
setInterval(updateYear, 31536000000)
