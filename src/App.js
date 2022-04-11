import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Loader from './component/Loader';

const SupportTicketsView = lazy(() => import('./Pages/SupportTicketsListView'));
const SupportTicketView = lazy(() => import('./Pages/SupportTicketView'));


const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SupportTicketsView />} />
        <Route path="/:id" element={<SupportTicketView />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
