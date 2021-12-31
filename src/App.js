import { RecoilRoot } from "recoil";
import "./App.css";
import Cards from "./Cards";

const appStyle = {
  padding: "10px",
  textAlign: "center",
};

function App() {
  return (
    <RecoilRoot>
      <div className="App" style={appStyle}>
        <Cards />
      </div>
    </RecoilRoot>
  );
}

export default App;
