import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import NativeCurrencyBalance from "../components/NativeCurrencyBalance";
import TokenBalance from "../components/TokenBalance";
import PontisLibrary from "../components/PontisLibrary";
import PendingClaims from "../components/PendingClaims";
import { phoTokenAddresses } from "../constants";
import useEagerConnect from "../hooks/useEagerConnect";

function Home() {
  const { account, library, chainId } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>Pontis - EVM Token Bridge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>LimeAcademy-boilerplate</a>
          </Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          Welcome to{" "}
          <a href="https://github.com/LimeChain/next-web3-boilerplate">
            LimeAcademy-boilerplate
          </a>
        </h1>

        {isConnected && (
          <section>
            <NativeCurrencyBalance />

            <TokenBalance tokenAddress={phoTokenAddresses.get(chainId)} symbol="PHO" />
            <PendingClaims />
            <PontisLibrary />
          </section>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
