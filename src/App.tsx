import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Landing } from '@/pages/Landing';
import { Assistant } from '@/pages/Assistant';
import { Standards } from '@/pages/Standards';
import { StandardDetail } from '@/pages/StandardDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/standards" element={<Standards />} />
            <Route path="/standards/:id" element={<StandardDetail />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
