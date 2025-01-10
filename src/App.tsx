import { BrowserRouter } from "react-router";
import DynamicNavigation from "./routes/navigations";

function App() {
  return (
    <BrowserRouter>
      <DynamicNavigation />
    </BrowserRouter>
  );
}

export default App;
