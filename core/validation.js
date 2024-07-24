window.addEventListener('load', async ()=> {
    const tgApp = window.Telegram.WebApp;
    const urlParams = new URLSearchParams(tgApp.initData);
    // hash
    const hash = urlParams.get("hash");
    urlParams.delete("hash");
    // sort a->z
    urlParams.sort();
    let dataCheckString = "";
    for(const [key, value] of urlParams.entries()){
        dataCheckString += key+'='+value+'\n';
    }
    dataCheckString = dataCheckString.slice(0, -1);
    let dataUrl = [dataCheckString, hash];
    let validation = window.document.getElementById('validation');
    // -> server
    fetch('core/validation.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataUrl)
    })// server ->
    .then(response => response.json())
    .then(data => {
        if(data.success){
            // true
            validation.innerHTML = 'User: '+tgApp.initDataUnsafe.user.username+', is GOOD!';
            validation.style.color = '#008000';
        }else{
            // false
            validation.innerHTML = 'User: '+tgApp.initDataUnsafe.user.username+', is BAD!';
            validation.style.color = '#ff0000';
        }
    })
    .catch((e) => {
        console.log('Error: ' + e.message);
    })
})