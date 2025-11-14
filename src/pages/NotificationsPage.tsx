import { formatDistanceToNow, parseISO } from 'date-fns';
import { useNotifications } from "../context/NotificationsContext";
import { DashboardContainer, Content, StatCard } from './Dashboard.styles';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const float1 = keyframes`
  0% { transform: translateY(0) translateX(0) scale(1); }
  50% { transform: translateY(-18px) translateX(6px) scale(1.06); }
  100% { transform: translateY(0) translateX(0) scale(1); }
`;

const float2 = keyframes`
  0% { transform: translateY(0) translateX(0) scale(1); }
  50% { transform: translateY(22px) translateX(-8px) scale(1.04); }
  100% { transform: translateY(0) translateX(0) scale(1); }
`;

const NotificationBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  .blob {
    position: absolute;
    filter: blur(36px);
    opacity: 0.9;
    mix-blend-mode: soft-light;
    border-radius: 999px;
  }

  .b1 {
    width: 420px;
    height: 420px;
    background: radial-gradient(circle at 30% 30%, rgba(74,108,247,0.26), rgba(74,108,247,0.06) 40%, transparent 60%);
    left: -80px;
    top: -80px;
    animation: ${float1} 8s ease-in-out infinite;
  }

  .b2 {
    width: 360px;
    height: 360px;
    background: radial-gradient(circle at 70% 20%, rgba(34,211,238,0.22), rgba(34,211,238,0.04) 40%, transparent 60%);
    right: -60px;
    top: 30px;
    animation: ${float2} 10s ease-in-out infinite;
  }

  .b3 {
    width: 260px;
    height: 260px;
    background: radial-gradient(circle at 40% 60%, rgba(167,139,250,0.18), rgba(167,139,250,0.03) 40%, transparent 60%);
    right: 40px;
    bottom: -80px;
    animation: ${float1} 12s ease-in-out infinite;
  }
`;

export default function NotificationsPage() {
  const { notifications, isLoading, error, getAllPreviousNotifications } = useNotifications();

  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <NotificationBackground aria-hidden>
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </NotificationBackground>
      <Content style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => navigate('/dashboard')}
              aria-label="Back to dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.06)',
                background: 'rgba(255,255,255,0.6)',
                cursor: 'pointer'
              }}
            >
              <FaArrowLeft />
            </button>

            <div>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Notifications</h1>
              <div style={{ color: 'var(--text-light)', marginTop: 6 }}>Real-time updates and history</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => getAllPreviousNotifications()}
              style={{
                padding: '8px 14px',
                borderRadius: 10,
                background: 'linear-gradient(90deg,#fff,#f8fafc)',
                border: '1px solid rgba(74,108,247,0.12)',
                color: '#0f172a',
                fontWeight: 600,
                boxShadow: '0 6px 18px rgba(74,108,247,0.06)'
              }}
            >
              Get All Previous
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
          <div>
            <StatCard>
              {error && <div style={{ color: '#ef4444', marginBottom: 8 }}>{error}</div>}

              {isLoading ? (
                <div style={{ color: 'var(--text-light)' }}>Loading notifications...</div>
              ) : notifications.length === 0 ? (
                <div style={{ padding: 36, textAlign: 'center', color: 'var(--text-light)' }}>
                  You're all caught up — no notifications.
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 12 }}>
                  {notifications.map((n) => (
                    <div key={String(n.id)} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', padding: 12, borderRadius: 12, background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,255,0.85))', boxShadow: '0 6px 16px rgba(12,18,46,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
                      <div style={{ flex: 1, color: 'var(--text-color)', fontSize: 14 }}>{n.message}</div>
                      <div style={{ color: 'var(--text-light)', fontSize: 12, minWidth: 110, textAlign: 'right' }}>
                        {n.createdAt ? formatDistanceToNow(parseISO(n.createdAt), { addSuffix: true }) : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </StatCard>
          </div>

          <aside>
            <StatCard>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Notifications Summary</h3>
              <div style={{ marginTop: 8, color: 'var(--text-light)' }}>
                Total: <strong>{notifications.length}</strong>
              </div>
              <div style={{ marginTop: 12 }}>
                <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text-light)' }}>
                  <li>Real-time push via SignalR</li>
                  <li>Fetch history with Get All Previous</li>
                </ul>
              </div>
            </StatCard>
          </aside>
        </div>
      </Content>
    </DashboardContainer>
  );
}
