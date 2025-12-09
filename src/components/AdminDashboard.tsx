import { useEffect, useState } from 'react';
import { NOMINEES, NOMINATIONS } from '../data/nominees';
import { db, ref, onValue } from '../firebase';
import './AdminDashboard.css';

type VoteCount = Record<string, number>; // nomineeId → количество голосов

export default function AdminDashboard({ firebaseEnabled }: { firebaseEnabled: boolean }) {
  const [allVotes, setAllVotes] = useState<any[]>([]);
  const [selectedNomination, setSelectedNomination] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем все голоса
  useEffect(() => {
    const loadVotes = (votes: any[]) => {
      setAllVotes(votes);
      setIsLoading(false);
    };

    if (firebaseEnabled && db) {
      const votesRef = ref(db, 'votes');
      onValue(votesRef, (snap) => {
        const data = snap.val() || {};
        const votes = Object.keys(data).map(k => data[k]);
        loadVotes(votes);
      });
    } else {
      // Из localStorage
      const raw = localStorage.getItem('votes') || '[]';
      const votes = JSON.parse(raw);
      loadVotes(votes);
    }
  }, [firebaseEnabled]);

  // Подсчет голосов для каждой номинации
  const getNominationStats = () => {
    const stats: { 
      title: string; 
      type: 'public' | 'private'; 
      totalVotes: number; 
      voteCounts: VoteCount 
    }[] = [];

    NOMINATIONS.forEach(nomination => {
      const votesInNomination = allVotes.filter(vote => 
        vote.nominationTitle === nomination.title
      );
      
      const voteCounts: VoteCount = {};
      votesInNomination.forEach(vote => {
        if (vote.nomineeId) {
          voteCounts[vote.nomineeId] = (voteCounts[vote.nomineeId] || 0) + 1;
        }
      });

      stats.push({
        title: nomination.title,
        type: nomination.type,
        totalVotes: votesInNomination.length,
        voteCounts
      });
    });

    return stats.sort((a, b) => b.totalVotes - a.totalVotes);
  };

  // Получаем номинантов для выбранной номинации
  const getNomineesForSelectedNomination = () => {
    if (!selectedNomination) return [];
    
    const nomination = getNominationStats().find(n => n.title === selectedNomination);
    if (!nomination) return [];
    
    // Сортируем номинантов по убыванию голосов
    const nomineesWithVotes = NOMINEES
      .filter(nominee => nomination.voteCounts[nominee.id] !== undefined)
      .map(nominee => ({
        ...nominee,
        votes: nomination.voteCounts[nominee.id] || 0,
        percentage: nomination.totalVotes > 0 
          ? (nomination.voteCounts[nominee.id] / nomination.totalVotes) * 100 
          : 0
      }))
      .sort((a, b) => b.votes - a.votes);
    
    return nomineesWithVotes;
  };

  const nominationStats = getNominationStats();
  const selectedNominees = getNomineesForSelectedNomination();
  const totalVotes = allVotes.length;

  if (isLoading) {
    return (
      <div className="admin-simple">
        <div className="loading">Загрузка данных...</div>
      </div>
    );
  }

  return (
    <div className="admin-simple">
      <div className="admin-header">
        <h2>📊 Админ-панель</h2>
        <div className="total-info">Всего голосов: {totalVotes}</div>
      </div>

      <div className="admin-content">
        {/* Левая панель: список номинаций */}
        <div className="nominations-list">
          <h3>Номинации ({NOMINATIONS.length})</h3>
          <div className="nomination-items">
            {nominationStats.map((nomination, index) => (
              <div 
                key={nomination.title}
                className={`nomination-item ${
                  selectedNomination === nomination.title ? 'selected' : ''
                } ${nomination.type === 'private' ? 'private' : ''}`}
                onClick={() => setSelectedNomination(nomination.title)}
              >
                <div className="nomination-header">
                  <span className="nomination-title">
                    {nomination.title}
                  </span>
                  <span className={`nomination-type ${nomination.type}`}>
                    {nomination.type === 'public' ? 'публичная' : 'внутренняя'}
                  </span>
                </div>
                <div className="nomination-stats">
                  <span className="vote-count">
                    {nomination.totalVotes} голосов
                  </span>
                  <span className="nomination-rank">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Правая панель: номинанты выбранной номинации */}
        <div className="nominees-details">
          {selectedNomination ? (
            <>
              <div className="details-header">
                <h3>{selectedNomination}</h3>
                <button 
                  className="back-button"
                  onClick={() => setSelectedNomination(null)}
                >
                  ← Назад к списку
                </button>
              </div>
              
              <div className="details-info">
                Всего голосов в номинации: {selectedNominees.reduce((sum, n) => sum + n.votes, 0)}
              </div>
              
              {selectedNominees.length > 0 ? (
                <div className="nominees-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Место</th>
                        <th>Номинант</th>
                        <th>Голоса</th>
                        <th>Процент</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedNominees.map((nominee, index) => (
                        <tr key={nominee.id} className={index < 3 ? 'top-three' : ''}>
                          <td className="position">
                            <div className={`position-circle ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                              {index + 1}
                            </div>
                          </td>
                          <td className="nominee-name">{nominee.name}</td>
                          <td className="vote-count">{nominee.votes}</td>
                          <td className="percentage">
                            <div className="percentage-bar">
                              <div 
                                className="percentage-fill"
                                style={{ width: `${nominee.percentage}%` }}
                              ></div>
                              <span className="percentage-text">
                                {nominee.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-votes">В этой номинации еще нет голосов</div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🏆</div>
              <h3>Выберите номинацию</h3>
              <p>Нажмите на номинацию слева, чтобы увидеть результаты голосования</p>
              <div className="stats-summary">
                <div className="stat">
                  <div className="stat-number">{NOMINATIONS.length}</div>
                  <div className="stat-label">Номинаций</div>
                </div>
                <div className="stat">
                  <div className="stat-number">{totalVotes}</div>
                  <div className="stat-label">Всего голосов</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}