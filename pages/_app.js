import { SWRConfig } from "swr";
import "../styles/globals.css";
import {fetchWrapper} from "../utils/fetchWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetchWrapper(resource, init),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
