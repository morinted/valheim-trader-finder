import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Dropzone } from "../valheim/Dropzone";
import { Map, WorldMap } from "../valheim/WorldMap";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [worldName, setWorldName] = useState("");
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Valheim Trader Finder</h1>

        <div className={styles.description}>
          <p>Provide your world database to locate traders.</p>
          <p>
            It can be found in{" "}
            <code>%userprofile%\AppData\LocalLow\IronGate\Valheim\worlds</code>
          </p>
          <Dropzone
            onLocationsFound={([worldName, locations]) => {
              setLocations(locations);
              setWorldName(worldName);
            }}
          />
        </div>

        {worldName && (
          <div className={styles.description}>
            <p>I've heard rumors of traders in {worldName}…</p>
            <WorldMap locations={locations} />

          </div>

        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://jsfiddle.net/b7mjeuan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          I just made this pretty website. Original trader finding code is from
          this JSFiddle.
        </a>
      </footer>
    </div>
  );
}
