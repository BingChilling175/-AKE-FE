import { useState } from 'react';
import { Button } from '../components/ui';
import AuthModal from '../components/Auth/AuthModal';
import { ModeToggle } from '../components/ui/mode-toggle';

const Home = () => {
  const [showModal, setShowModal] = useState<null | 'login' | 'register'>(null);

  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center">
      {/* Header - Logo and top-right buttons */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 z-20">
        <div className="font-bold text-lg flex items-center gap-2">
          <span role="img" aria-label="logo">💬</span> AKE Chat
        </div>
        <div className="flex gap-2 items-center">
          <ModeToggle />
          <Button variant="ghost" onClick={() => setShowModal('login')}>Đăng nhập</Button>
          <Button variant="outline" onClick={() => setShowModal('register')}>Đăng ký</Button>
        </div>
      </header>
      {/* Centered content */}
      <main className="flex flex-col items-center justify-center flex-1 min-h-screen">
        {/* Placeholder for cover image */}
        <div className="text-muted-foreground">
          {/* User will add cover image here */}
        </div>
      </main>
      {/* Modal login/register */}
      <AuthModal
        show={!!showModal}
        mode={showModal}
        onClose={() => setShowModal(null)}
      />
    </div>
  );
};

export default Home;
