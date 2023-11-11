let body, formLogin, alertModal, inputs, rootCSS



const api = {
    log: 'sdsdsdsdsd',
}

const main = () => {
    prepareDOMElements()
	prepareDOMEvents()
    window.addEventListener('load', checkLoading)
}

const prepareDOMElements = () => {
    body = document.querySelector('body')
    rootCSS = document.documentElement
    formLogin = body.querySelector('.login__form')
    inputs = [...formLogin.querySelectorAll('input')]
    alertModal = body.querySelector('.modal__alert')
    console.log(rootCSS);
}

const prepareDOMEvents = () => {
    onStartWebsite()
}

const currentDate = () => new Date()

const onStartWebsite = () => {
    setThemeLogin()
}

const setThemeLogin = () => {
    let i
    const month = currentDate().getMonth()
    const day = currentDate().getDate()

    const isWinter = (month >= 0 && month <= 2) && (day < 21)
    const isSpring = (month >= 3 && month <= 5) && (day < 22)
    const isSummer = (month >= 6 && month <= 8) && (day < 23)
    const isAutumn = (month >= 9 && month <= 11) && (day < 22)

    ;[isWinter, isSpring, isSummer, isAutumn].some((el, index) => el === true ? i = index : null)

    const colors = ['210', '122', '300', '14']
    rootCSS.style.setProperty('--login-color', colors[i])
    body.querySelector('.login').style.backgroundImage = `url('dist/img/bacground-login${i}.png')`
}


const checkLoading = () => {
    const images = body.querySelectorAll('img');
    for (const image of images) {
        if (!image.complete) return
    }
    body.querySelector('.loader').style.opacity = 0
}

// ---   Login
const checkLogin = e => {
    e.preventDefault()
    if (!navigator.onLine) return showAlert('Brak połączenia z internetem!', false)
    const values = inputs.map(input => input.value)
    if(values[2] !== '') return    

    let alert = ''
    if (!values[0].length && !values[1].length) {
        alert = 'Wprowadź dane!'
    }else if (!values[0].length && values[1].length) {
        alert = 'Wprowadź login!'
    }else if (values[0].length && !values[1].length) {
        alert = 'Wprowadź hasło!'
    }
    alert !== '' ? showAlert(alert, false) : sendLogin(e.target, inputs)
}

const sendLogin = async (e, [log, pass]) => {
    e.disabled = true
    e.classList.add('loading')
  
    try {
      const response = await fetch(api.log, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: log, password: pass }),
      });
  
      if (response.ok) {
        showAlert('Zalogowano', true)
        const data = await response.json()
        console.log(data)
        // openApp(data)
      } else {
        console.error('Złe API!')
      }
    } catch (error) {
      showAlert(error, false)
    } finally {
      e.disabled = false
      e.classList.remove('loading')
    }
}

const showAlert = (text, state) => {
	alertModal.classList.add('scroll-down')
	alertModal.textContent = text
	alertModal.style.backgroundColor = state ? 'green' : 'red'
	setTimeout(() => alertModal.classList.remove('scroll-down'), 1400)
}

const showPassword = el => {
    document.querySelector('.login__pass').textContent = el ? '🙈':'👀'
    inputs[1].type = el ? 'text' : 'password'
}

















// let btnCategories, prev, btnSendForm, formSections, dialog, dialogBoxBtns, boxesForm, dialogBoxImg, logoSchool, schoolBell, inputEvent, checkboxes, divHidden, carouselImg, listImg, announcements, prevTable, liList, btnDialogDel
// let parentDiv, idImg = 0, idRow = 0
// // let indexBox, addEdits, boxesImg

// let settings = {
//     maxLength: 30,
//     maxLengthTextarea: 280,
// }

// //jak polonczenie przychodzi to musi nadawac klase hide-now oraz active na inputa checkbox

// const main = () => {
// 	prepareDOMElements()
// 	prepareDOMEvents()
// }

// const prepareDOMElements = () => {
//     btnCategories = [...document.querySelectorAll('.app__btn--cat')]
//     formSections = [...document.querySelectorAll('.app__item')]
//     prev = [...document.querySelectorAll('.prev')]
//     dialog = document.querySelector('.app__dialog')
//     dialogBoxBtns = dialog.querySelector('.app__box-btn')
//     dialogBoxImg = dialog.querySelector('.app__box-img')
//     boxesForm = [...document.querySelectorAll('.app__box-from')]
//     logoSchool = document.querySelector('.school__logo')
//     schoolBell = document.querySelector('.school__bell')
//     inputEvent = document.querySelector('#event-text')
//     checkboxes = document.querySelectorAll('.app__checkmark')
//     divHidden = document.querySelector('.app__hidden')
//     carouselImg = document.querySelector('.main__carousel')
//     listImg = document.querySelector('.list-img')
//     announcements = document.querySelector('.main__text')
//     prevTable = document.querySelector('.subsit__tbody')
//     liList = document.querySelector('.list-li')
//     btnDialogDel = dialog.querySelector('.app__btn-delete')

//     // btnSendForm = document.querySelector('.app__btn--send')
//     // boxesImg = [...document.querySelectorAll('.app__box-image')]
//     // addEdits = [...document.querySelectorAll('.app__btn--add')]

// }

// const changeCategory = (e, index) => {
//     btnCategories.forEach((el, i) => el.classList.toggle('active', i === index))

//     if (index === 5) return showModal()
//     prev.forEach((el, i) => el.classList.toggle('none', i !== index))
//     formSections.forEach((el, i) => el.classList.toggle('none', i !== index))
//     divHidden.classList.toggle('none', !prev[index].classList.contains('hide-now'))

//     // console.log(e.target.closest('div'));
//     //fetch pobiera dane?
// }

// const showModal = () => {
//     dialog.classList.toggle('none')
//     dialog.classList.remove('active')
//     dialog.querySelector('form').classList.toggle('transform-down')
//     document.body.classList.toggle('hidden')
//     dialogBoxBtns.classList.remove('none')
// }

// const closeModal = e => {
//     const closeBtn = dialog.querySelector('.app__btn-close')
//     if (e.target === dialog || e.target === closeBtn) {
//         e.preventDefault()
//         showModal()
//         btnCategories[5].classList.remove('active')
//         removeSettingDelete()
//     }
// }

// const checkClick = (e, index) => {
//     e.preventDefault()
// }

// /// --- addNewIMg
// const checkImg = event => {
//     parentDiv = event.target.closest('div')
//     showModal()
//     dialogBoxBtns.classList.add('none')
//     dialog.classList.add('active')
// }

// const selectImg = e => {
//     if (e.target !== dialogBoxImg && dialog.classList.contains('active')) {
//         const buttons = [...parentDiv.querySelectorAll('button')]
//         const span = document.createElement('span')
//         if (!buttons[0].classList.contains('check')) {
//             buttons.forEach(el => el.classList.toggle('none'))
//         }else{
//             buttons[0].classList.toggle('none')
//         }
//         span.textContent = e.target.src.split('/').pop()
//         parentDiv.appendChild(span)

//         addNewImg(e.target.src.split('/').pop(), parentDiv)
//         showModal()
//         dialog.classList.remove('active')
//     } else if(e.target !== dialogBoxImg && dialog.classList.contains('delete')){
//         e.target.remove()
//     }
// }

// const addNewImg = (imgSrc, parentDiv) => {
//     // console.log(imgSrc, parentDiv);
//     if (parentDiv.classList.contains('logo-school')) {
//         logoSchool.src = `dist/img/${imgSrc}`
//     }else if (parentDiv.classList.contains('gallery-school')) {
//         const className = parentDiv.parentElement.closest('div').className
//         const parentImg = document.querySelector(`.${className}`)
//         parentImg.querySelector('img').src = `dist/img/${imgSrc}`
//     }else if (parentDiv.classList.contains('news-poster')) {
//         document.querySelector('.main__news').style.backgroundImage = `url('dist/img/${imgSrc}')`
//         announcements.style.color = 'transparent'
//     }
// }

// const checkInput = () => {
//     if (inputEvent.value !== '') {
//         schoolBell.style.backgroundColor = 'green'
//         inputEvent.value = inputEvent.value.slice(0, settings.maxLength)
//         schoolBell.textContent = inputEvent.value
//     }
// }

// const hideElement = ( e, index) => {
//     const input = e.target.closest('label').querySelector('input')
//     input.classList.toggle('active')
//     divHidden.classList.toggle('none')
//     prev[index+1].classList.toggle('hide-now')
// }

// const addLiImg = e => {
//     e.preventDefault()
//     idImg++
//     const div = document.createElement('div')
//     div.className = `li-${idImg}`
//     div.innerHTML = `
//             <span class="app__label">Zdjęcie</span>
//             <div class="app__box-image gallery-school">
//                 <button class="app__btn-img check" onclick="checkImg(event)">Wybierz zdjęcie</button>
//                 <button class="app__btn-form app__btn-form--delete" onclick="deleteLiImg(event)"></button>
//             </div>`

//     listImg.appendChild(div)

//     const li = document.createElement('li')
//     li.className = `main__card li-${idImg}`
//     li.innerHTML = `
//     <img src="dist/img/drop-square.png" alt="Picture" class="main__img">`
//     carouselImg.appendChild(li)
//     // listIMg---ulista edycja from
//     //carouselImg --ulista zdjec
// }

// const editTextarea = e => {
//     const textarea = e.target.closest('div').querySelector('textarea')
//     if (textarea.value !== '') {
//         console.log(textarea);
//         textarea.value = textarea.value.slice(0, settings.maxLengthTextarea) + '...'
//         announcements.textContent = textarea.value
//     }
// }

// const editRow = e => {
//     const className = e.target.closest('div').className.split(' ')[1]
//     const rowTable = document.querySelector(`.${className}`)
//     const cellsTable = [...rowTable.querySelectorAll('td')]

//     const trForm = e.target.closest('div').querySelector('tr')
//     const inputs = [...trForm.querySelectorAll('input')]

//     if (!inputs.some(el => el.value === '')) {
//         inputs.forEach((input, index) => {
//             cellsTable[index].textContent = input.value
//         })
//     }
// }

// const addNewLi = e => {
//     e.preventDefault()
//     idRow++
//     const div = document.createElement('div')
//     div.className = `app__box-from li-${idRow}`
//     div.innerHTML = `
//         <label class="app__label">Kolumna</label>
//         <div class="app__box--table">
//             <table>
//                 <tbody><tr class="subsit__row">
//                     <td class="subsit__cell"><input type="text" class="app__input short"></td>
//                     <td class="subsit__cell"><input type="text" class="app__input long"></td>
//                     <td class="subsit__cell"><input type="text" class="app__input mid"></td>
//                     <td class="subsit__cell"><input type="text" class="app__input long"></td>
//                     <td class="subsit__cell"><input type="text" class="app__input mid"></td>
//                     <td class="subsit__cell"><input type="text" class="app__input long"></td>
//                     <td class="subsit__cell"><input type="text" class="app__input long"></td>
//                 </tr>
//             </tbody></table>
//         </div>
//         <button class="app__btn-form app__btn-form--check write" onclick="editRow(event)"></button>
//         <button class="app__btn-form app__btn-form--delete write" onclick="deleteRow(event)"></button>`
//     liList.appendChild(div)

//     const tr = document.createElement('tr')
//     tr.className = `subsit__row li-${idRow}`
//     tr.innerHTML = `
//         <td class="subsit__cell">---</td>
//         <td class="subsit__cell">---</td>
//         <td class="subsit__cell">---</td>
//         <td class="subsit__cell">---</td>
//         <td class="subsit__cell">---</td>
//         <td class="subsit__cell">---</td>
//         <td class="subsit__cell">---</td>`
//     prevTable.appendChild(tr)
// }

// /// ---  delete
// const deleteLogo = e => {
//     e.target.closest('div').querySelector('span').remove()
//     const buttons = e.target.closest('div').querySelectorAll('button')
//     buttons.forEach(el => el.classList.toggle('none'))
//     logoSchool.src = `dist/img/logo.png`
// }

// const deleteEvent = () => {
//     schoolBell.textContent = 'Do końca '
//     const subjectSpan = document.createElement('span')
//     const timerSpan = document.createElement('span')
//     subjectSpan.className = 'school__subject'
//     timerSpan.className = 'school__timer'
//     subjectSpan.textContent = 'lekcji 2'
//     timerSpan.textContent = '21min'
//     schoolBell.appendChild(subjectSpan)
//     schoolBell.appendChild(document.createTextNode(' - '))
//     schoolBell.appendChild(timerSpan)
//     schoolBell.style.backgroundColor = ''
//     inputEvent.value = ''
// }

// const deleteLiImg = e => {
//     const className = e.target.closest('div').parentElement.closest('div').className
//     const items = document.querySelectorAll(`.${className}`)
//     items.forEach(el => el.remove())
// }

// const deleteTextare = e => {
//     e.target.closest('div').querySelector('textarea').value = ''
//     announcements.textContent = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos eius at accusantium
//     provident culpa, aliquid asperiores tenetur deleniti, pariatur aspernatur vitae eligendi odio
//     veritatis impedit maiores minus commodi adipisci architecto, necessitatibus minima sapiente eos
//     voluptatum porro facere. Aperiam, iusto iure.`
// }

// const deletePoster = e => {
//     e.target.closest('div').querySelector('span').remove()
//     const buttons = e.target.closest('div').querySelectorAll('button')
//     buttons.forEach(el => el.classList.toggle('none'))
//     document.querySelector('.main__news').style.backgroundImage = ``
//     announcements.style.color = ''
// }

// const deleteRow = e => {
//     const className = e.target.closest('div').className.split(' ')[1]
//     const items = document.querySelectorAll(`.${className}`)
//     items.forEach(el => el.remove())
// }

// // --- gallery
// const uploadImage = e => {
//     if (!e.target.classList.contains('url')) {
//         const types = ['image/jpeg','image/png','image/gif','image/svg+xml','image/webp','image/bmp',
//         'image/tiff','image/x-icon','image/heif','image/avif']
//         const file = e.target.files[0]

//         if (types.includes(file.type)) {
//             const reader = new FileReader()
//             reader.readAsDataURL(file)

//             reader.onload = function () {
//                 createImageElement(reader.result)
//             }
//         }else{
//             e.target.value = ''
//         }
//     }else{
//         e.preventDefault()
//         const imageUrl = prompt('Wprowadz adress URL:')
//         if (imageUrl !== '') {
//             createImageElement(imageUrl)
//         }
//     }
// }

// const createImageElement = src => {
//     const img = document.createElement('img')
//     img.className = 'app__img--form'
//     img.src = src
//     img.alt = 'Picture'
//     dialogBoxImg.appendChild(img)
// }

// const deleteImgs = e => {
//     e.preventDefault()
//     const imgs = dialogBoxImg.querySelectorAll('img')
//     btnDialogDel.classList.toggle('active')
//     if (btnDialogDel.classList.contains('active') && imgs.length !== 0) {
//         btnDialogDel.textContent = 'Usuwanie'
//         dialog.style.border = '2px solid red'
//         dialog.classList.add('delete')

//     }else{
//         removeSettingDelete()
//     }
// }

// const removeSettingDelete = () => {
//     btnDialogDel.textContent = 'Usuń'
//     btnDialogDel.classList.remove('active')
//     dialog.style.border = ''
//     dialog.classList.remove('delete')
// }

// // const checkImg = (e, i) => {
// //     e.preventDefault()
// //     indexBox = i

// //     const buttons = boxesImg[i].querySelectorAll('button')
// //     if (e.target === buttons[0]) {
// //         showModal()
// //         dialogBoxBtns.classList.add('none')
// //         dialog.classList.add('active')
// //     } else if(e.target === buttons[1] && !buttons[1].classList.contains('img')){
// //         boxesImg[i].querySelector('span').remove()
// //         boxesImg[i].querySelectorAll('button').forEach(el => el.classList.toggle('none'))
// //     } else if(e.target === buttons[1] && buttons[1].classList.contains('img')){
// //         boxesImg[i].parentElement.closest('div').remove()
// //     }

// //     // const label = boxesImg[i].querySelector('label')
// //     // if (e.target === label) {

// //     // }else if (e.target === buttons[0]){
// //     //     e.preventDefault()
// //     //     prompt('Podaj kod')
// //     // }
// // }

// // const selectImg = (img) => {
// //     if (img.target.classList.contains('app__img--form') && dialog.classList.contains('active')) {
// //         const spanSrc = document.createElement('span')
// //         spanSrc.textContent = img.target.src.split('/').pop()
// //         boxesImg[indexBox].appendChild(spanSrc)
// //         boxesImg[indexBox].querySelectorAll('button').forEach(el => el.classList.toggle('none'))
// //         dialog.classList.remove('active')
// //         showModal()
// //     }
// // }

// // const addNextSlide = e => {
// //     e.preventDefault()
// //     const slide = `<span class="app__label">Zdjęcie</span>
// //     <div class="app__box-image">
// //        <button class="app__btn-img">Wybierz zdjęcie</button>

// //        <button class="app__btn-form app__btn-form--delete none img"></button>
// //    </div>`
// //    const div = document.createElement('div')
// //    div.innerHTML = slide
// //    document.querySelector('.list-img').appendChild(div)
// //    boxesImg = [...document.querySelectorAll('.app__box-image')]
// //    boxesImg.forEach((el, index) => el.addEventListener('click', e => checkImg(e, index)))
// // }

// // //  -----  form
// // const sendForm = e => {
// //     e.preventDefault()

// //     const itemEdits = formSections.findIndex(el => !el.classList.contains('none'));
// //     itemEdits === -1 ? null : sendDataToServer(`prev${itemEdits}`)

// //     if (itemEdits === 0) {
// //         // tu sie dopisze rzeczy ktore sie przesle do php
// //     }
// // }

// // const sendDataToServer = async (itemEdits) => {
// //     try {
// //         const response = await fetch('upload/sendForm.php', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ itemEdits })
// //         });

// //         if (response.ok) {
// //             const data = await response.json()
// //             console.log(data)
// //             subconsciously(data)
// //         } else {
// //             console.error('Wystąpił błąd podczas wysyłania danych.')
// //         }
// //     } catch (error) {
// //         console.error('Wystąpił błąd:', error)
// //     }
// // }

// // const subconsciously = ({ status }) => {
// //     warmModal.textContent = status
// //     warmModal.classList.toggle('none')
// //     warmModal.classList.add('transform-down')

// //     setTimeout(() => {
// //         warmModal.classList.toggle('none')
// //         warmModal.classList.add('transform-down')
// //     }, 1000);
// // }

// const prepareDOMEvents = () => {
//     btnCategories.forEach((el, index) => el.addEventListener('click', e => changeCategory(e, index)))
//     dialog.addEventListener('click', e => closeModal(e))
//     dialogBoxImg.addEventListener('click', e => selectImg(e))
//     boxesForm.forEach((el, index) => el.addEventListener('click', e => checkClick(e, index)))
//     checkboxes.forEach((el, index) => el.addEventListener('click', e => hideElement(e, index)))

//     // boxesImg.forEach((el, index) => el.addEventListener('click', e => checkImg(e, index)))
//     // dialog.addEventListener('click', img => selectImg(img))
//     // addEdits[0].addEventListener('click', addNextSlide)
//     // // btnSendForm.addEventListener('click', sendForm)

// }

document.addEventListener('DOMContentLoaded', main)
