const search = document.querySelector("button")
const input = document.querySelector("input")
const resultContainer = document.querySelector(".result-container")
let imageUrl, tname, tsummary, tpremiered, tstatus

const getShow = async (showName) => {
    let trs = document.querySelectorAll("tr")
    if (trs.length > 1) {
        for (let j = 1; j < trs.length; j++) {
            resultContainer.removeChild(trs[j])
        }
    }

    let response = await fetch(`https://api.tvmaze.com/search/shows?q=${showName}`)
    let showBuff = await response.json()
    for (let i of showBuff) {
        try {
            imageUrl = i.show.image.medium
            tname = i.show.name
            tsummary = i.show.summary.replace("<p>", "")
            tpremiered = i.show.premiered
            tstatus = i.show.status
        } catch (error) {
            console.log(tname);
            console.log(error);
        }


        let row = document.createElement("tr")

        let thumbnail = document.createElement("td")
        let image = document.createElement("img")
        image.src = imageUrl
        thumbnail.append(image)

        let title = document.createElement("td")
        title.innerHTML = tname

        let status = document.createElement("td")
        status.innerHTML = tstatus

        let premiered = document.createElement("td")
        premiered.innerHTML = tpremiered

        let summary = document.createElement("td")
        summary.innerHTML = tsummary.replace("<p></p>", "")

        row.appendChild(thumbnail)
        row.appendChild(title)
        row.appendChild(status)
        row.appendChild(premiered)
        row.appendChild(summary)

        row.addEventListener('mouseenter', () => {
            row.style.background = "linear-gradient(315deg, blue, red)"
            row.style.transform = "scale(1.03)"

        })

        row.addEventListener('mouseleave', () => {
            row.style.background = 'none'
            row.style.transform = "scale(1.0)"

        })

        resultContainer.appendChild(row)
    }


}




search.addEventListener('click', async () => {

    let query = input.value
    if (query !== '') {
        getShow(query)
    }
    input.value = ""
})