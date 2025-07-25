import Customers from "./sections/customer";
import Analytics from "./sections/analytics";
import Transactions from "./sections/transactions";
import Settings from "./sections/settings";
import Help from "./sections/help";
import Profile from "./sections/profile";

export default function DashboardContent({ activeSection }) {
  switch (activeSection) {
    case "customers":
      return <Customers />;
    case "analytics":
      return <Analytics />;
    case "Transaction":
      return <Transactions />;
    case "settings":
      return <Settings />;
    case "help":
      return <Help />;
    case "profile":
      return <Profile />;
    default:
      return <div></div>;
  }
}
