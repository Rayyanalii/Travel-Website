
import './App.css'
import Navbar from './components/Navbar'
import DestinationCard from './components/DestinationCard'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <>
      <Navbar />
      <header>
        <div className="images">
          <img className="backImage" src="src\assets\CroppedHomePageBackground.png" alt="" />
        </div>
        <div className="headingText">
          <h1>Where do you want to go?</h1>
          <p>Trips, experiences, and places. All in one service.</p>
        </div>
        <SearchBar/>
      </header>
      <main>
        <div className="destinationText">
          <h2>Popular Destinations</h2>
          <p>World's best tourist city destinations</p>
        </div>
        <div className="destinationCards">
          <DestinationCard name="Tokyo" url="src\assets\TokyoDestinationCard.png"/>
          <DestinationCard name="Paris" url="src\assets\ParisDestinationCard.png"/>
          <DestinationCard name="Skardu" url="src\assets\SkarduDestinationCard.png"/>
          <DestinationCard name="London" url="src\assets\LondonDestinationCard.png"/>
        </div>
        <div className="valueTripText">
          <h2>Best Value Trips</h2>
          <p>Best trips offered by us!</p>
        </div>
      </main>
    </>
  )
}

export default App
