import type { Nominee } from '../types';
import VoteModal from './VoteModal';

export default function NomineeProfile({ 
  nominee, 
  nominationId, 
  nominationType,
  deadline,
  onClose, 
  onVote 
}: { 
  nominee: Nominee, 
  nominationId: string,
  nominationType: 'public' | 'private',
  deadline: number,
  onClose: () => void,
  onVote: () => void
}) {
  const photo = nominee.photo ?? '/photos/placeholder.jpg';

  return (
    <div className="nominee-profile">
      <button className="profile-back-button" onClick={onClose}>← Назад</button>
      <div className="profile-content">
        <div className="profile-photo-wrap">
          {nominee.readyPhoto ? (
            <img src={photo} alt={nominee.name} />
          ) : (
            <div className="glow-placeholder">{nominee.name.split(' ')[0]}</div>
          )}
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{nominee.name}</h2>
          <button className="profile-vote-btn" onClick={onVote}>Отдать голос</button>
        </div>
      </div>
    </div>
  );
}

