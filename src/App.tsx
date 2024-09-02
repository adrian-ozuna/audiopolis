import Container from "./components/Container"
import PlayerContainer from "./components/PlayerContainer"

function App() {
  return (
    <div className="bg-[url('https://i.redd.it/g4crddfnmt9a1.jpg')] bg-no-repeat bg-cover bg-center">
      
      <Container>
        <PlayerContainer />
      </Container>
    </div>
    )
}

export default App
