const input = document.querySelector('input')
const divRes = document.querySelector('.result')
const options = document.querySelector('.options-elem')

const debounce = (fn, debounceTime) => {
    let timeout;
    
    return function () {
        const fnCall = () => fn.apply(this, arguments)
        
        clearTimeout(timeout);
        
      timeout = setTimeout(fnCall, debounceTime)
    }
};

input.addEventListener('keyup',debounce( function(e) {
    fetch(`https://api.github.com/search/repositories?q=${e.target.value}&per_page=5`, {
        headers : {
            Accept : `application/vnd.github.v3+json`
        }
    }).then(data => {
        return data.json()
    }).then(data => {
        data.items.forEach(elem => {
             const createDiv = document.createElement('div')
             createDiv.classList.add('word')
             createDiv.innerText = elem.name
             divRes.appendChild(createDiv)
             createDiv.addEventListener('click', function(e) {
                input.value = ''
                 divRes.innerText = ''

                 const optionsAll = document.querySelectorAll('.options')
                 if(optionsAll.length === 3) {
                     return
                 }
                 const createOptions = document.createElement('div')
                 createOptions.classList.add('options')
                 createOptions.innerText = `Name: ${elem.name}
                                            Owner: ${elem.owner.login} 
                                            Stars: ${elem.stargazers_count}`
                 options.appendChild(createOptions)

                 const closeA = document.createElement('a')
                 closeA.classList.add('close')
                 createOptions.appendChild(closeA)

                 closeA.addEventListener('click', function(e) {
                    createOptions.classList.remove('options')
                    createOptions.innerText = ''
                 })
                    
             })
             
        })
    })
}, 700))