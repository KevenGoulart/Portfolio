import CurrentlyPlaying from "./components/now-playing";
import TopTracks from "./components/top-tracks";

export default function Home() {
  return (
    <div>
      <h1 className="font-baloo text-center mt-8 text-5xl">Keven Goulart I FullStack Developer</h1>
      <div className="flex justify-center mt-4">
        <CurrentlyPlaying />
      </div>
      <div className="float-right mr-8">
        <TopTracks />
    </div>
    </div>
  );
}