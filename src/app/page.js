import Banner from "./components/HomePage/Banner/Banner";
import About from "./components/HomePage/About/About";
import Skill from "./components/HomePage/Skill/Skill";
import Project from "./components/Project/Project";
import Experience from "./components/HomePage/Experience/Experience";

export default function Home() {
  return <div>
    <Banner></Banner>
    <About></About>
    <Skill></Skill>
    <Experience></Experience>
    <Project></Project>
  </div>
}
