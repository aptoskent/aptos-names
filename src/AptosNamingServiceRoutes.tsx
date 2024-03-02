import {Route, Routes} from "react-router-dom";
import AptosNamesLayout from "./layout";
import {Documentation} from "./pages/About";
import {Account, Manage} from "./pages/Account";
import DomainName from "./pages/Domains";
import Homepage from "./pages/Homepage";

export default function AptosNamingServiceRoutes() {
  return (
    <AptosNamesLayout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/name/:domain" element={<DomainName />} />
        <Route path="about/">
          <Route path="doc" element={<Documentation />} />
        </Route>
        <Route path="/account/:domain/manage" element={<Manage />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </AptosNamesLayout>
  );
}
