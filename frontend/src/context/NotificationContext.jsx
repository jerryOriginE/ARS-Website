import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // simulate backend fetch (replace later with API)
  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        title: "Nueva ruta disponible",
        message: "Se agregó una recolección cerca de ti",
        date: "Hoy"
      },
      {
        id: 2,
        title: "Puntos actualizados",
        message: "+20 puntos añadidos",
        date: "Ayer"
      }
    ];

    setNotifications(fakeData);
  }, []);

  const openNotifications = () => setOpen(true);
  const closeNotifications = () => setOpen(false);

  return (
    <NotificationContext.Provider
      value={{
        open,
        notifications,
        openNotifications,
        closeNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () =>
  useContext(NotificationContext);