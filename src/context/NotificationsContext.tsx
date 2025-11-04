import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import type { Notification } from "../types";
import { useAuth } from "./AuthContext";

// API base URL (ensure no trailing slash when concatenating paths)
const API_ROOT = (import.meta.env.VITE_API_URL || "https://recotrackapi.onrender.com").replace(/\/$/, "");

interface NotificationsContextType {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  getAllPreviousNotifications: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all previous notifications from the API
  const getAllPreviousNotifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Try primary expected endpoint
  const res = await axios.get(`${API_ROOT}/api/notification`);
  let data = res.data?.data ?? res.data ?? [];

      // If no data returned, try some common alternative endpoints (fallbacks)
      if (!Array.isArray(data) || data.length === 0) {
        const alternatives = [
          `${API_ROOT}/api/notifications`,
          `${API_ROOT}/notifications`,
          `${API_ROOT}/notification`,
        ];
        for (const alt of alternatives) {
          try {
            const r = await axios.get(alt);
            const d = r.data?.data ?? r.data ?? [];
            if (Array.isArray(d) && d.length > 0) {
              data = d;
              break;
            }
          } catch (err) {
            // ignore individual fallback errors
            void err;
          }
        }
      }

      if (Array.isArray(data)) {
        setNotifications(data as Notification[]);
      } else {
        setNotifications([]);
      }
    } catch (e: unknown) {
      setError("Failed to fetch notifications");
      console.error("getAllPreviousNotifications error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    // Build SignalR connection to /notificationHub
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_ROOT}/notificationHub`, {
        accessTokenFactory: () => localStorage.getItem("token") || "",
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Error)
      .build();

    let mounted = true;

    connection
      .start()
      .then(() => {
        if (!mounted) return;
        // subscribe to server-sent notifications. The server method name may vary; 'ReceiveNotification' is common.
        connection.on("ReceiveNotification", (payload: Notification) => {
          setNotifications((prev) => [payload, ...prev]);
        });
      })
      .catch(() => {
        // ignore connection errors for now
      });

    return () => {
      mounted = false;
      connection.stop().catch(() => {});
    };
  }, [isAuthenticated]);

  return (
    <NotificationsContext.Provider value={{ notifications, isLoading, error, getAllPreviousNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
};
