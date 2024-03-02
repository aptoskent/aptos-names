import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";
import ReactGA from "react-ga4";
import {StatsigProvider} from "statsig-react";

import {ProvideColorMode} from "./context";
import {GraphqlClientProvider} from "./hooks/useGraphqlClient";

// Components
import AptosNamingServiceRoutes from "./AptosNamingServiceRoutes";
import WalletsProvider from "./WalletsProvider";
import {SnackBarProvider} from "./context/snackbar/provider";
import {GlobalStateProvider} from "./context";
import {PrimaryNameProvider} from "./context/primaryName/provider";

ReactGA.initialize(process.env.GA_TRACKING_ID || "G-0PMZ9GNT1Z");

Sentry.init({
  dsn: "https://a20019085ab549539ee2f78e4f82bdc4@o1162451.ingest.sentry.io/4503905329676288",
  integrations: [new BrowserTracing()],
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV == "production",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
window.addEventListener("load", () => {
  root.render(
    <React.StrictMode>
      <StatsigProvider
        sdkKey={
          process.env.REACT_APP_STATSIG_SDK_KEY ||
          "client-gQ2Zhz3hNYRf6CSVaczkQcZfK0yUBv5ln42yCDzTwbr" // dummy key
        }
        waitForInitialization={true}
        options={{
          environment: {tier: process.env.NODE_ENV},
        }}
        user={{}}
      >
        <QueryClientProvider client={queryClient}>
          <WalletsProvider>
            <GlobalStateProvider>
              <PrimaryNameProvider>
                <GraphqlClientProvider>
                  <ProvideColorMode>
                    <BrowserRouter>
                      <SnackBarProvider>
                        <AptosNamingServiceRoutes />
                      </SnackBarProvider>
                    </BrowserRouter>
                  </ProvideColorMode>
                </GraphqlClientProvider>
              </PrimaryNameProvider>
            </GlobalStateProvider>
          </WalletsProvider>
        </QueryClientProvider>
      </StatsigProvider>
    </React.StrictMode>,
  );
});
