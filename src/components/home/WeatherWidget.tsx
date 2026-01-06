import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, Sun, CloudRain, AlertTriangle, Loader2 } from "lucide-react";

// Helper to map WMO codes to icons and conditions
const getWeatherInfo = (code: number) => {
  if (code === 0) return { icon: Sun, label: "Clear Sky" };
  if (code >= 1 && code <= 3) return { icon: Cloud, label: "Partly Cloudy" };
  if (code >= 45 && code <= 48) return { icon: Cloud, label: "Foggy" };
  if (code >= 51 && code <= 67) return { icon: CloudRain, label: "Rain" };
  if (code >= 71 && code <= 77) return { icon: CloudRain, label: "Snow" };
  if (code >= 80 && code <= 82) return { icon: CloudRain, label: "Showers" };
  if (code >= 95) return { icon: CloudRain, label: "Thunderstorm" };
  return { icon: Sun, label: "Clear" };
};

interface CurrentWeather {
  temp: number;
  condition: string;
  humidity: string;
  wind: string;
  uv: string;
  isDay: boolean;
}

interface DailyForecast {
  day: string;
  icon: React.ElementType;
  temp: string;
  condition: string;
  rain: string;
}

export const WeatherWidget = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Coordinates for Indore, MP
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=22.7196&longitude=75.8577&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto"
        );
        const data = await response.json();

        // Process Current Weather
        const currentInfo = getWeatherInfo(data.current.weather_code);
        setCurrentWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: currentInfo.label,
          humidity: `${data.current.relative_humidity_2m}%`,
          wind: `${data.current.wind_speed_10m} km/h`,
          uv: "Moderate", // API doesn't give UV for free easily, keeping placeholder or could use daily max
          isDay: data.current.is_day !== 0
        });

        // Process Daily Forecast
        const daily = data.daily.time.map((time: string, index: number) => {
          const date = new Date(time);
          const dayName = index === 0 ? "Today" : date.toLocaleDateString('en-US', { weekday: 'short' });
          const info = getWeatherInfo(data.daily.weather_code[index]);
          return {
            day: dayName,
            icon: info.icon,
            temp: `${Math.round(data.daily.temperature_2m_max[index])}°`,
            condition: info.label,
            rain: `${data.daily.precipitation_probability_max[index]}%`
          };
        });

        setDailyForecast(daily.slice(0, 7));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch weather", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
     return (
       <section className="py-16 lg:py-24">
         <div className="container flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
         </div>
       </section>
     );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="bg-gradient-to-br from-accent/10 via-background to-info/10 rounded-3xl border border-accent/20 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left - Current Weather */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12"
            >
              <div className="flex items-center gap-2 mb-6">
                <Cloud className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Weather Forecast
                </span>
              </div>

              {currentWeather && (
              <div className="flex items-center gap-6 mb-8">
                <div className="text-8xl">
                   {currentWeather.condition.includes("Rain") ? "🌧️" : currentWeather.condition.includes("Cloud") ? "☁️" : "☀️"}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold text-foreground">{currentWeather.temp}</span>
                    <span className="text-3xl text-muted-foreground">°C</span>
                  </div>
                  <p className="text-xl text-muted-foreground mt-1">
                    {currentWeather.condition}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    📍 Indore, Madhya Pradesh
                  </p>
                </div>
              </div>
              )}

              {/* Weather Stats */}
              {currentWeather && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Droplets, label: "Humidity", value: currentWeather.humidity },
                  { icon: Wind, label: "Wind", value: currentWeather.wind },
                  { icon: Sun, label: "UV Index", value: currentWeather.uv },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center"
                  >
                    <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                    <p className="text-lg font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
              )}

              {/* Alert */}
              <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Agro Advisory
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dailyForecast.some(d => parseInt(d.rain) > 50) 
                      ? "High chance of rain this week. Delay irrigation and protect harvested crops."
                      : "Weather looks clear. Good time for fertilizer application and irrigation."}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right - 7 Day Forecast */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border"
            >
              <h3 className="font-bold text-lg text-foreground mb-6">
                7-Day Forecast
              </h3>
              <div className="space-y-3">
                {dailyForecast.map((day, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                      i === 0
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span
                        className={`font-medium w-12 ${
                          i === 0 ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {day.day}
                      </span>
                      <day.icon
                        className={`w-6 h-6 ${
                          i === 0 ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm text-muted-foreground hidden sm:block">
                        {day.condition}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Droplets className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground">
                          {day.rain}
                        </span>
                      </div>
                      <span
                        className={`font-bold text-lg w-12 text-right ${
                          i === 0 ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {day.temp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
