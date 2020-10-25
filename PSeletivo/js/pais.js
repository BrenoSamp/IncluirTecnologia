$(document).ready(function () {
    const code = location.search.slice(1);
    const country_holder = $("#country_info")

    jQuery.get(`https://restcountries.eu/rest/v2/alpha/${code}`, function (response) {
        const borders = response.borders;
        let country_lang = ''

        response.languages.forEach(lang => {
            country_lang += `${lang.name}\n`
        })

        let country = `
        <img src="${response.flag}" alt="Pais" id="country_img">

        <div class="info">
            <span class="country_name">Nome: ${response.name}</span>
            <span class="country_capital">Capital: ${response.capital}</span>
            <span class="country_regiao">Região: ${response.region}</span>
            <span class="country_sub_reg">Sub-região: ${response.subregion}</span>
            <span class="country_populacao">População: ${response.population}</span>
            <span class="country_lang">Linguas: ${country_lang}</span>
        </div>
        `

        borders.forEach(border => {
            jQuery.get(`https://restcountries.eu/rest/v2/alpha/${border}`, function (response) {
                let border_tag = `
                <a href="./pais.html?${response.alpha3Code}" class="flag col-sm-12 col-md-6 col-lg-4">
                    <img src="${response.flag}" alt="Pais" id="country_img">
                </a>
                `

                $("#borders").append(border_tag)
            })
        })



        country_holder.append(country)
    })


})