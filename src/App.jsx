
import './App.css'
import Navbar from './components/Navbar'
import DestinationCard from './components/DestinationCard'
import SearchBar from './components/SearchBar'
import RedButton from './components/RedButton'
import TripCard from './components/TripCard'
import ServiceCard from './components/ServiceCard'

function App() {

  return (
    <>
      <Navbar />
      <header>
        <div className="images">
          <img className="backImage" src="src\assets\GradientBackgroundHomePage.png" alt="" />
        </div>
        <div className="headingText">
          <h1>Where do you want to go?</h1>
          <p>Trips, experiences, and places. All in one service.</p>
        </div>
        <div className="searchForm">
          <div className="search">
            <SearchBar />
          </div>
          <div className="searchButton">
            <RedButton />
          </div>
        </div>
      </header>
      <main>
        <div className="destinationText">
          <h2>Popular Destinations</h2>
          <p>World's best tourist city destinations</p>
        </div>
        <div className="destinationCards">
          <DestinationCard name="Tokyo" url="src\assets\TokyoDestinationCard.png" />
          <DestinationCard name="Paris" url="src\assets\ParisDestinationCard.png" />
          <DestinationCard name="Skardu" url="src\assets\SkarduDestinationCard.png" />
          <DestinationCard name="London" url="src\assets\LondonDestinationCard.png" />
        </div>
        <div className="valueTripText">
          <h2>Best Value Trips</h2>
          <p>Best trips offered by us!</p>
        </div>
        <div className="AllTripCards">
          <TripCard url="src\assets\TokyoTripCard.png" title="Konnichiwa" desc="City tours, iconic" price="$3000"/>
          <TripCard url="src\assets\ParisTripCard.png" title="French Fever" desc="City tours, urban" price="$5000"/>
          <TripCard url="src\assets\SkarduTripCard.png" title="Northern Blast" desc="Nature, scenic" price="$2000"/>
        </div>
        <div className="servicesText">
          <h2>Our Services</h2>
        </div>
        <div className="allServices">
          <ServiceCard title="Rent A Car" desc="Choose from our finest car rentals choices" iden="car"/>
          <ServiceCard title="Book A Flight" desc="Enter departure and destination, we'll book the flight for you" iden="plane"/>
          <ServiceCard title="Book A Hotel" desc="Luxurious and affordable hotels available for you" iden="hotel"/>
        </div>
      </main>
    </>
  )
}

export default App
