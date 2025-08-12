import InformationsPage from "./informations/page";
import PreferencesPage from "./preferences/page";

export default function ParametresPage({ accountData, isLoading, accountError }) {
  return (
    <>
      <InformationsPage 
        accountData={accountData} 
        isLoading={isLoading} 
        accountError={accountError} 
      />
      <PreferencesPage 
        accountData={accountData} 
        isLoading={isLoading} 
        accountError={accountError} 
      />
    </>
  );
}
