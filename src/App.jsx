import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/general/Nav";
import FrozenLogo from "./components/general/FrozenLogo";
import Home from "./pages/Home";
import Build from "./pages/Build";
import Learn from "./pages/Learn";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import Namespace from "./components/general/Namespace";
import { useYoutubeAudio } from "./components/teach/useYoutubeAudio";
import Library from "./components/general/Library";
import Profile from "./components/account/Profile";
import RewardNotice from "./components/gamification/RewardNotice";
import Insights from "./pages/Insights";
function App() {
  const toggleMusic = useYoutubeAudio("2uhxcxRtkaQ");
  
  return (
    <>
      {/* Nav */}
      <RewardNotice/>
      <Namespace/>
      <div className="majorLeft">
        <Link to="/home" className="frozen-logo-link" aria-label="JVLIVN home" onClick={toggleMusic}>
          <FrozenLogo />
        </Link>
      </div>
      {/* Dashboard */}
      <div className="organicSplit">
        <div className="ogMid">
        <Nav />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/build" element={<Build />} />
            <Route path="/teach" element={<Learn />} />
            <Route path="/about" element={<Contact />} />
            <Route path="/lib" element={<Library/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/insights" element={<Insights/>} />
            <Route path="*" element={<Navigate to="/home" replace/>} />
          </Routes>
          <Footer />
        </div>

      </div>
    </>
  );
}

export default App;
