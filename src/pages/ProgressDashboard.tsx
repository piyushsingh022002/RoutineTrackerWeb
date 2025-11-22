import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useNotes } from '../context/NotesContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(180deg, rgba(99,102,241,0.04), transparent);
`;

const Header = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: #111827;
`;

const Actions = styled.div`
  display:flex;
  gap:10px;
  align-items:center;
`;

const ActionButton = styled.button`
  background: linear-gradient(90deg,#4f46e5,#06b6d4);
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(79,70,229,0.12);
  transition: transform .12s ease, box-shadow .12s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(79,70,229,0.14);} 
`;

const ChartsRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const ChartCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 6px 18px rgba(15,23,42,0.06);
  min-width: 300px;
  flex: 1 1 360px;
`;

const ChartTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #374151;
`;

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 180px;
  padding: 8px 6px;
`;

const Bar = styled.div<{ $height: number }>`
  width: 28px;
  background: linear-gradient(180deg,#60a5fa,#3b82f6);
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-size: 12px;
  box-sizing: border-box;
  padding-bottom: 6px;
  height: ${props => props.$height}px;
`;

const XLabels = styled.div`
  display:flex;
  gap:12px;
  margin-top:8px;
  flex-wrap:wrap;
`;

const StatRow = styled.div`
  display:flex;
  gap:16px;
  margin-top: 8px;
  flex-wrap:wrap;
`;

const StatCard = styled.div`
  background: linear-gradient(180deg,#ffffff,#f8fafc);
  padding:12px 14px;
  border-radius:10px;
  box-shadow: 0 4px 10px rgba(2,6,23,0.04);
  display:flex;
  flex-direction:column;
  gap:6px;
  min-width:160px;
`;

const StatValue = styled.div`
  font-weight:700;
  font-size:18px;
  color:#111827;
`;

const StatLabel = styled.div`
  font-size:12px;
  color:#6b7280;
`;

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const ProgressDashboard: React.FC = () => {
  const { notes } = useNotes();
  const navigate = useNavigate();

  const daily = useMemo(() => {
    const result: { label: string; count: number }[] = [];
    const today = startOfDay(new Date());
    const days = 7;
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const label = d.toLocaleDateString(undefined, { weekday: 'short' });
      const start = startOfDay(d).getTime();
      const end = start + 24 * 60 * 60 * 1000;
      const count = (notes || []).filter(n => {
        if (!n || !n.createdAt) return false;
        const t = new Date(n.createdAt).getTime();
        return t >= start && t < end;
      }).length;
      result.push({ label, count });
    }
    return result;
  }, [notes]);

  const weekly = useMemo(() => {
    const result: { label: string; count: number }[] = [];
    const today = startOfDay(new Date());
    const weeks = 8;
    for (let i = weeks - 1; i >= 0; i--) {
      const weekEnd = new Date(today.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const weekStart = new Date(weekEnd.getTime() - 6 * 24 * 60 * 60 * 1000);
      const label = weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const start = startOfDay(weekStart).getTime();
      const end = start + 7 * 24 * 60 * 60 * 1000;
      const count = (notes || []).filter(n => {
        if (!n || !n.createdAt) return false;
        const t = new Date(n.createdAt).getTime();
        return t >= start && t < end;
      }).length;
      result.push({ label, count });
    }
    return result;
  }, [notes]);

  const totalNotes = (notes || []).length;
  const avgPerDay = Math.round((daily.reduce((s, d) => s + d.count, 0) / daily.length) * 10) / 10;

  // simple streak: count consecutive days up to today with >0 notes
  const streak = useMemo(() => {
    const today = startOfDay(new Date()).getTime();
    let s = 0;
    for (let i = 0; i < 30; i++) {
      const dayStart = today - i * 24 * 60 * 60 * 1000;
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;
      const has = (notes || []).some(n => {
        if (!n || !n.createdAt) return false;
        const t = new Date(n.createdAt).getTime();
        return t >= dayStart && t < dayEnd;
      });
      if (has) s++; else break;
    }
    return s;
  }, [notes]);

  const maxDaily = Math.max(...daily.map(d => d.count), 1);
  const maxWeekly = Math.max(...weekly.map(w => w.count), 1);

  return (
    <Container>
      <Header>
        <div>
          <Title>Progress Dashboard</Title>
          <div style={{color:'#6b7280', marginTop:6}}>Insight into your notes and streaks</div>
        </div>

        <Actions>
          <ActionButton onClick={() => navigate('/notfound')}>Try New</ActionButton>
          <ActionButton onClick={() => navigate('/notfound')}>Points</ActionButton>
        </Actions>
      </Header>

      <StatRow>
        <StatCard>
          <StatValue>{totalNotes}</StatValue>
          <StatLabel>Total Notes</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{avgPerDay}</StatValue>
          <StatLabel>Avg / day (7d)</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{streak}</StatValue>
          <StatLabel>Current Streak (days)</StatLabel>
        </StatCard>
      </StatRow>

      <ChartsRow>
        <ChartCard>
          <ChartTitle>Notes Created (last 7 days)</ChartTitle>
          <Bars>
            {daily.map((d) => (
              <Bar key={d.label} $height={Math.round((d.count / maxDaily) * 160)} title={`${d.count} notes`}>
                {d.count > 0 ? d.count : ''}
              </Bar>
            ))}
          </Bars>
          <XLabels>
            {daily.map(d => <div key={d.label} style={{width:28,textAlign:'center',fontSize:12,color:'#374151'}}>{d.label}</div>)}
          </XLabels>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Notes Created Per Week (last 8 weeks)</ChartTitle>
          <Bars>
            {weekly.map(w => (
              <Bar key={w.label} $height={Math.round((w.count / maxWeekly) * 160)} title={`${w.count} notes`}>
                {w.count > 0 ? w.count : ''}
              </Bar>
            ))}
          </Bars>
          <XLabels>
            {weekly.map(w => <div key={w.label} style={{width:28,textAlign:'center',fontSize:11,color:'#374151'}}>{w.label}</div>)}
          </XLabels>
        </ChartCard>
      </ChartsRow>
    </Container>
  );
};

export default ProgressDashboard;
