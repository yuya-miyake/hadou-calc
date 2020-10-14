document.addEventListener('DOMContentLoaded', () => {
    const pricelist = {
        "玉壁": {price: 25000, jewel: 50},
        "白玉環": {price: 75000, jewel: 150},
        "杜康酒": {price: 75000, jewel: 150},
        "麻布": {price: 75000, jewel: 150},
        "馬皮": {price: 75000, jewel: 150},
        "策士の兵法書": {price: 75000, jewel: 150},
        "青銅の延べ棒": {price: 75000, jewel: 150},
        "尺壁": {price: 100000, jewel: 200},
        "儀狄酒": {price: 100000, jewel: 200},
        "絹布": {price: 100000, jewel: 200},
        "虎皮": {price: 100000, jewel: 200},
        "名士の兵法書": {price: 100000, jewel: 200},
        "銀の延べ棒": {price: 100000, jewel: 200},
    }
    
    const make_item = Handlebars.compile(document.getElementById('item-template').innerHTML)
    Array.prototype.slice.call(document.getElementsByClassName('item-list')).forEach(item => {
        const e = document.createElement('dl')
        e.classList.add('row')
        
        Object.keys(pricelist).forEach(key => {
            pricelist[key]
            
            e.innerHTML += make_item({
                name: key,
                values:pricelist[key],
            })
        })

        item.appendChild(e)
    })
    
    
    const occupation = document.getElementById('occupation')
    const barriers = document.getElementById('barriers')
    const gifts = document.getElementById('gifts')
    const products = document.getElementById('products')
    const acquired = document.getElementById('acquired')
    const consumption = document.getElementById('consumption')
    
    document.getElementById('same_as_barriers')
        .addEventListener('click', e => {
            e.preventDefault()
            
            const occupation_hours =
                  occupation.getElementsByClassName('amount')[0]
            
            occupation_hours.value =
                Array.prototype.slice.call(barriers.querySelectorAll('.amount'))
                .map(item => item.dataset.hours * item.value)
                .reduce((acc, v) => acc + v)

            const event = new Event('change', {bubbles: true, cancelable: true})
            occupation_hours.dispatchEvent(event)
            
            return false
        })
    
    document.getElementById('params')
        .addEventListener('change', e => {
            if (!e.target.classList.contains('amount')) return
            
            const hours = occupation.getElementsByClassName('amount')[0].value * 1
            
            // 収入
            const gifts_jewels =
                  Array.prototype.slice.call(gifts.querySelectorAll('.amount'))
                  .map(item => item.dataset.jewel * item.value)
                  .reduce((acc, v) => acc + v)
            
            const products_jewels =
                  Array.prototype.slice.call(products.querySelectorAll('.amount'))
                  .map(item => item.dataset.jewel * item.value)
                  .reduce((acc, v) => acc + v)

            acquired.getElementsByClassName('jewel')[0].innerText
                  = gifts_jewels * Math.floor(hours / 8)
                  + products_jewels * Math.floor(hours / 6)
            
            // 費用
            const barriers_cost =
                  Array.prototype.slice.call(barriers.querySelectorAll('.amount'))
                  .map(item => item.dataset.jewel * item.value)
                  .reduce((acc, v) => acc + v)
            
            const products_cost =
                  Array.prototype.slice.call(products.querySelectorAll('.amount'))
                  .map(item => item.dataset.price * item.value)
                  .reduce((acc, v) => acc + v)

            consumption.getElementsByClassName('jewel')[0].innerText
                = barriers_cost
            
            consumption.getElementsByClassName('money')[0].innerText
                = products_cost * Math.floor(hours / 6)
            
            return false
        })
    
})
