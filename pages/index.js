import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Dropzone } from "../valheim/Dropzone";
import { Hint } from "../valheim/Hint";
import { Map, WorldMap } from "../valheim/WorldMap";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [worldName, setWorldName] = useState("");
  const [showMap, setShowMap] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Valheim Trader Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Valheim Trader Finder</h1>

        <div className={styles.description}>
          <p>
            Provide your world database if you're having trouble locating
            Haldor, the vendor of fine goods.
          </p>
          <ol className={styles.ol}>
            <li>Data stays offline</li>
            <li>Roleplay-friendly directions to the nearest merchant</li>
            <li>Full map available</li>
          </ol>
          <p>
            Your world can be found in:
            <br />
            <code className={styles.code}>
              %userprofile%\AppData\LocalLow\IronGate\Valheim\worlds
            </code>
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
            <p>
              <Hint locations={locations} />
            </p>
            {showMap ? (
              <p>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMap(false);
                  }}
                  href="#"
                >
                  Hide Map ↑
                </a>
              </p>
            ) : (
              <p>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMap(true);
                  }}
                  href="#"
                >
                  Show me a map please…
                </a>
              </p>
            )}
          </div>
        )}

        {showMap && (
          <div className={styles.map}>
            <WorldMap locations={locations} />
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/morinted/valheim-trader-finder"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code on Github
        </a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a
          href="https://jsfiddle.net/b7mjeuan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Adapted from this JSFiddle
        </a>
      </footer>
    </div>
  );
}
