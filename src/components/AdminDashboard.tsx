import React, { useEffect, useState } from 'react';
import type { Nominee } from '../types';
import { NOMINEES } from '../data/nominees';
import { db, firebaseAvailable, ref, onValue } from '../firebase';

type CountMap = Record<string, { public: number; private: number }>;

function loadLocalVotes() {
  const raw = localStorage.getItem('votes');
  return raw ? JSON.parse(raw) : [];
}

export default function AdminDashboard({ deadline, firebaseEnabled }: { deadline: number, firebaseEnabled: boolean }) {
  const [counts, setCounts] = useState<CountMap>({});
  useEffect(() => {
    NOMINEES.forEach(n => {
      setCounts(prev => ({ ...prev, [n.id]: { public: 0, private: 0 } }));
    });

    const process = (arr: any[]) => {
      const map: CountMap = {};
      for (const n of NOMINEES) map[n.id] = { public: 0, private: 0 };
      arr.forEach((r: any) => {
        if (!r.nomineeId) return;
        const id = r.nomineeId;
        const t = r.nominationType === 'private' ? 'private' : 'public';
        map[id] = map[id] || { public: 0, private: 0 };
        map[id][t] = (map[id][t] || 0) + 1;
      });
      setCounts(map);
    };

    if (firebaseEnabled && db) {
      const votesRef = ref(db, 'votes');
      onValue(votesRef, (snap) => {
        const data = snap.val() || {};
        const arr = Object.keys(data).map(k => data[k]);
        process(arr);
      });
    } else {
      // poll localStorage occasionally
      process(loadLocalVotes());
      const id = setInterval(()=> process(loadLocalVotes()), 2000);
      return () => clearInterval(id);
    }
  }, [firebaseEnabled]);

  return (
    <aside className="admin">
      <h3>Admin — Статистика голосов (реально сейчас)</h3>
      <div>Deadline: {new Date(deadline).toLocaleString()}</div>
      <table className="admin-table">
        <thead><tr><th>Номинант</th><th>Публичные</th><th>Наши</th></tr></thead>
        <tbody>
          {NOMINEES.map(n => (
            <tr key={n.id}>
              <td>{n.name}</td>
              <td>{counts[n.id]?.public ?? 0}</td>
              <td>{counts[n.id]?.private ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="admin-note">Если не настроен Firebase — данные берутся из localStorage (только для теста).</div>
    </aside>
  );
}
