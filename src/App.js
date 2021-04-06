import DefaultHeader from "./Components/Default/DefaultHeader/DefaultHeader.jsx";
import DefaultAlgorithmTitle from "./Components/Default/DefaultAlgorithmTitle/DefaultAlgorithmTitle.jsx";
import PointDistribution from "./Components/PointDistribution/PointDistribution.jsx";
// css
import "./App.css";
import "./css/Algorithms.css";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  return (
    <div className="App">
      <DefaultHeader />
      <DefaultAlgorithmTitle title="Algorithms for scattering 2D Points" />
      <PointDistribution className="pb-3" />
      <div className="container-fluid"></div>
    </div>
  );
}
