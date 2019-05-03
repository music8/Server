const axios = require("axios")

let songkick = axios.create({
    baseURL: 'https://api.songkick.com/api/3.0/',
});

class Controller {
    static showEvents(req, res) {
        let apikey = "xJoA8o1xf0p5xjZK"

        let metroarea
        if(req.body.city === "jakarta") {
            metroarea = 29154
        }
        else if(req.body.city === "singapore") {
            metroarea = 32258
        }
        else if(req.body.city === "kualalumpur") {
            metroarea = 31146
        }
        else if(req.body.city === "surabaya") {
            metroarea = 29287
        }
        else if(req.body.city === "bangkok") {
            metroarea = 32333
        }
        else if(req.body.city === "melbourne") {
            metroarea = 26790
        }
        else if(req.body.city === "sydney") {
            metroarea = 26794
        }
        else if(req.body.city === "tokyo") {
            metroarea = 30717
        }
        else if(req.body.city) {
            metroarea = 29154
        }

        let d1 = req.body.mindate
        let d2 = req.body.maxdate

        songkick.get(`/metro_areas/${metroarea}/calendar.json?apikey=${apikey}&min_date=${d1}&max_date=${d2}`)
        .then(({data}) => {
            let arr = data.resultsPage.results.event
            
            let tidy = arr.map(item => {
                let artists = []
                for(let artist of item.performance) {
                    artists.push(artist.displayName)
                }

                artists = artists.join(", ")

                return {
                    id: item.id,
                    displayName: item.displayName,
                    startDate: item.start.date,
                    venue: item.venue.displayName,
                    city: item.location.city,
                    artists: artists,
                }
            })
            res.status(200).json(tidy)
        })
        .catch(err => {
            console.log({Error: err})
        })
    }   
}

module.exports = Controller