import { css, React } from "uebersicht"

// Position and size
const size = 30
const top = 530
const left = 660

const units = "metric"
const key = ""

export const refreshFrequency = 30 * 60 * 1000 //30 minutes

export const initialState = {
  loading: true,
  temp: null,
  icon: null,
}

// Get weather data
export const command = (dispatch) => {
  geolocation.getCurrentPosition(async pos => {
    const latitude = pos.position.coords.latitude
    const longitude = pos.position.coords.longitude

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`

    try {
      let data = await (await fetch(url)).json()
      return dispatch({ data: data, type: "Success" })
    } catch (e) {
      console.error(e)
    }

  })
}

export const updateState = (event, previousState) => {
  switch (event.type) {
    case 'Success':
      return { ...previousState, temp: event.data.main.temp, loading: false, icon: event.data.weather[0].icon }
    default: {
      return previousState;
    }
  }
}

export const render = ({ loading, temp, icon }) => (
  <div className={container}>
    {loading ? <p className={text}>Loading...</p> :
      <>
        <img src={"minimal-weather.widget/icons/" + icon + ".png"} className={image} />
        <p className={text}>{loading ? "Loading..." : Math.round(temp) + "°C"}</p>
      </>
    }
  </div>
)

export const className = {
  top: top,
  left: left,
  color: '#fff',
}

const text = css`
  font-size: ${size + "px"};
  text-align: center;
  color: white;
  text-shadow:2px 2px 4px rgba(0,0,0,1);
  font-family: 'Avenir Medium', 'Ariel';
  letter-spacing: 3px;
  font-smoothing: antialiased
`

const image = css`
  align-self: center;
  width: ${size + 25 + "px"};
  length: ${size + 25 + "px"};
  margin: 10px;
  filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.4));
`

const container = css`
  display: flex;
`