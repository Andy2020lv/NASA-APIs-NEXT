import Head from "next/head";
import Alert from "../components/Alert";
import Router from "next/router";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

// export interface CounterState {
//   events: [Object];
// }

export default function Home() {
  const [category, setCategory] = useState<string>("wildfires");
  const [limit, setLimit] = useState<number>(6);

  const sendProps = () => {
    Router.push({
      pathname: "/Events",
      query: { limit, category },
    });
  };

  return (
    <>
      <Head>
        <title>Natural Events Visualizer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {/* <Alert /> */}
        <NavBar />
      </main>
    </>
  );
}
