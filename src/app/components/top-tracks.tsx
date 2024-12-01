import Image from "next/image";
import Link from "next/link";
import { getTopTracks } from "../utils/spotify";

type TracksData = {
    artist: string;
    songUrl: string;
    title: string;
    albumCover: {
        width: number;
        height: number;
        url: string;
    }
}[]

export default async function TopTracks(){
    const tracks:TracksData = await getTopTracks();

    console.log(tracks)
    return (
      <>
        {tracks
          ? tracks?.map((track, index) => (
              <li key={track.songUrl} className="flex items-center mb-4 ml-3">
                <span className="font-baloo text-4xl text-neutral-400 font-bold inline-block w-12">
                  {index + 1}
                </span>
                <div className="flex justify-center">
                  <Image
                    src={track.albumCover.url}
                    width={100}
                    height={100}
                    alt="d"
                  />
                  <div className="ml-2">
                    <p className="font-baloo text-xl">
                      <Link href={track.songUrl} className="link-transition">
                        {track.title}
                      </Link>
                    </p>
                    <p className="font-baloo">{track.artist}</p>
                  </div>
                </div>
              </li>
            ))
          : "Something went wrong"}
      </>
    );
}