import './App.css';
import './css/bootstrap.css'
import './css/base/font-control.css'
import './css/base/typography.css'
import './css/base/base.css'
import './css/theme/colors-dark.css'
import './css/theme/theme-dark.css'
import './css/layouts/sider.css'
import './css/layouts/header.css'
import './css/components.css'
import './css/pages/create-token.css'
import './css/pages/swap.css'
import { AppContext, AppContextProvider } from './js/context/AppContext';
import { BlockchainProvider } from './lib/blockchain/blockchain-context';
import { SSO } from 'ft3-lib';
import Main from './js/components/Main';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LoadingOverlay from "react-loading-overlay";

import { PuffLoader } from 'react-spinners';
import { useContext } from 'react';
import MainApp from './js/components/MainApp';


LoadingOverlay.propTypes = undefined

function App() {
  SSO.vaultUrl = process.env.REACT_APP_VAULT_URL;

  return (
    <div className="App">
      <main className='hp-bg-color-dark-90 d-flex min-vh-100'>
        <BlockchainProvider>
          <AppContextProvider>
            <MainApp />
          </AppContextProvider>
        </BlockchainProvider>
      </main>
      <ToastContainer />
    </div>

  );
}

export default App;
