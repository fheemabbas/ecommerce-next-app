import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import '../styles/globals.css';
import Header from '../components/Header';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header/>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
