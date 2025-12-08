const API_KEY = '9048bf4f1d2ee3adbd469e59d2886797'; 

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      weatherData: null,
      loading: false,
      error: null
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  }

  fetchWeather = async () => {
    const { query } = this.state;
    if (!query) return;

    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error(`Error fetching the weather data: ${response.statusText}`);
      }
      const data = await response.json();
      this.setState({ weatherData: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchWeather();
  }

  render() {
    const { query, weatherData, loading, error } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            value={query}
            onChange={this.handleInputChange}
            placeholder="introduzca el nombre de la ciudad" 
          />
          <button type="submit">OBTENER CLIMA</button>
        </form>
        
        {loading && <p>cargando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.main.temp}°C</p>
            <p>{weatherData.weather[0].description}</p>
            <i className={`meteo-${weatherData.weather[0].icon}`}></i>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));
