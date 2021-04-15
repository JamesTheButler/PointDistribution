import DefaultHeader from "./Components/Default/DefaultHeader/DefaultHeader.jsx";
import DefaultAlgorithmTitle from "./Components/Default/DefaultAlgorithmTitle/DefaultAlgorithmTitle.jsx";
import PointDistribution from "./Components/PointDistribution/PointDistribution.jsx";
// css
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <DefaultHeader />
      <DefaultAlgorithmTitle title="Algorithms for scattering 2D Points" />
      <PointDistribution />
    </div>
  );
}
