import Home from "./pages/Home";
import AirportContextProvider from "./context/AirportContextProvider"


function App() {
  return (
    <AirportContextProvider>
      <Home />
    </AirportContextProvider>
  );
}

export default App;
