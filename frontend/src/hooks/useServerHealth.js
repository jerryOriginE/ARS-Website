// src/hooks/useServerHealth.js
import { useEffect } from 'react';
import { useServerStatus } from '../context/ServerStatusContext';
import API_BASE_URL from '../config';

export default function useServerHealth() {
  const { setServerOnline, setChecked } = useServerStatus();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health`);
        if (!res.ok) throw new Error();
        setServerOnline(true);
      } catch {
        setServerOnline(false);
      } finally {
        setChecked(true);
      }
    };

    check();
  }, [setServerOnline, setChecked]);
}
