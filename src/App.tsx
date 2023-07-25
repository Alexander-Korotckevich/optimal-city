import { StoreContext } from 'storeon/react';
import { store } from './store/store';
import { CardList } from './components/CardList';

function App() {
  return (
    <StoreContext.Provider value={store}>
      <CardList />
    </StoreContext.Provider>
  )
}

export default App
