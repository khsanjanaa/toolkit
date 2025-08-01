// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AIKnowledgeAssistant from './components/AiAssit';
import KnowledgeDashboard from './components/DashboardCard';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import OnboardingTimeline from './components/Onboard';
import AdvancedSearch from './components/SearchFilter';
import KnowledgePlatformUpload from './components/UploadArticrafts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<KnowledgeDashboard />} />
          <Route path="/dashboard" element={<KnowledgeDashboard />} />
          <Route path="/upload" element={<KnowledgePlatformUpload />} />
          <Route path="/search" element={<AdvancedSearch />} />
          <Route path="/onboarding" element={<OnboardingTimeline />} />
          <Route path="/ai" element={<AIKnowledgeAssistant />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
