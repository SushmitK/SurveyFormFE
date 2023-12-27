import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/home/home";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="add" element={<Add />} />
          <Route path="addBulk" element={<AddBulk />} /> */}
        </Route>
        <Route path={"*"} element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
