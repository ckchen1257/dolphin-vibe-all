import './App.css'
import { useEffect, useState } from 'react'
import { auth } from "./lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Login error={error} />;
  }

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Atomic Google Sheet Editor</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user.displayName}</span>
          <button
            onClick={() => signOut(auth)}
            className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-500">Welcome! Google Sheets integration ready.</p>
      </div>
    </>
  )
}

export default App
