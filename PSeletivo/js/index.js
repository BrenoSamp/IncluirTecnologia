function getAllCountries() {
    const pais_select = $("#pais_select")
    pais_select.empty()
    // buscar todos os paises
    jQuery.get('https://restcountries.eu/rest/v2/all', function (response) {
    response.forEach(pais => {
            let option = `<option value="${pais.alpha3Code}">${pais.name}</option>`
            pais_select.append(option)
        });
    })
}

function getFiltredCountries(region) {
    const pais_select = $("#pais_select")
    const flag_area = $("#flag_area")
    pais_select.empty()
    jQuery.get('https://restcountries.eu/rest/v2/all', function (response) {
    response.forEach(pais => {
            if(pais.region === region) {
                let option = `<option value="${pais.alpha3Code}">${pais.name}</option>`
                let flag = `
                <a href="../views/pais.html?${pais.alpha3Code}" class="flag col-sm-12 col-md-6 col-lg-4">
                    <div id="${pais.alpha3Code}">
                        <img src="${pais.flag}" alt="${pais.name}">
                    </div>
                </a>
                `
                pais_select.append(option)
                flag_area.append(flag)
            }
        });
    })
}

$(document).ready(function () {
    getAllCountries();
})

$('#btn_buscar').on('click', function () {
    const pais = $("#pais_select").val()
    const flag_area = $("#flag_area")
    jQuery.get(`https://restcountries.eu/rest/v2/alpha/${pais}`, function (response) {
        $("#flag_area").empty()
        if(pais !== 'null') {
            let flag = `
            <a href="../views/pais.html?${response.alpha3Code}" class="flag col-sm-12 col-md-6 col-lg-4">
                <div id="${response.alpha3Code}">
                    <img src="${response.flag}" alt="${response.name}">
                </div>
            </a>
            `
            flag_area.append(flag)
        }
    })
})

$("#regiao_select").on('change', function () {
    const region = $("#regiao_select").val()
    $("#flag_area").empty()
    if(region === 'all') {
        getAllCountries()
    }else {
        getFiltredCountries(region)
    }
})