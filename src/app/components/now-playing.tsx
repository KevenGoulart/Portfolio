import Image from "next/image";
import Link from "next/link";
import { getCurrentlyPlaying } from "../utils/spotify";

type TrackData = {
  artist: string;
  songUrl: string;
  title: string;
  albumCover: {
    width: number;
    height: number;
    url: string;
  };
};

export default async function CurrentlyPlaying() {
  const track: TrackData | null = await getCurrentlyPlaying();

  return (
    <>
      {track ? (
        <div className="flex items-center gap-3 mb-4">
          <div className="flex justify-center">
            <Image
              src={track.albumCover.url}
              width={100}
              height={100}
              alt={track.title}
            />
            <div className="ml-2 mt-1">
              <p className="font-baloo text-2xl text-pink-300">
                <Link href={track.songUrl} className="link-transition">
                  {track.title}
                </Link>
              </p>
              <p className="font-baloo">{track.artist}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No track is currently playing</p>
      )}
    </>
  );
}