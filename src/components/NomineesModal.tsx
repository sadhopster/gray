import { useState } from 'react';
import type { Nomination, Nominee } from '../types';
import VoteConfirmModal from './VoteConfirmModal';
import './NomineesModal.css';

import { NOMINEES, findNomineeById } from '../data/nominees';

interface Props {
  nomination: Nomination;
  deadline: number;
  onClose: () => void;
}

export default function NomineesModal({ nomination, onClose }: Props) {
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [showVoteConfirm, setShowVoteConfirm] = useState(false);

  // 🔥 Теперь показываем только тех номинантов, кто есть в nominees:[]
  const nomineesForNomination = NOMINEES.filter(n =>
    (nomination.nominees || []).includes(n.id)
  );


  const handleVoteClick = (nominee: Nominee) => {
    setSelectedNominee(nominee);
    setShowVoteConfirm(true);
  };

  return (
    <>
      <div className="nominees-modal-backdrop" onClick={onClose}>
        <div className="nominees-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="nomination-header-gradient">
            <h2 className="nomination-title-elegant">{nomination.title}</h2>
            <div className="nomination-subtitle">Выберите номинанта</div>
          </div>

          <button className="modal-close-elegant" onClick={onClose}>×</button>

          <div className="nominees-modal-body">
            <div className="nominees-grid-transparent">
              {nomineesForNomination.map(nominee => (
                <div key={nominee.id} className="nominee-transparent-card">

                  <div className="nominee-photo-backglow">
                    <div className="photo-glow-effect"></div>
                    <img
                      src={nominee.photo}
                      alt={nominee.name}
                      className="nominee-photo-simple"
                      onError={e => e.currentTarget.src = '/placeholder.png'}
                    />
                  </div>

                  <div className="nominee-name-simple">{nominee.name}</div>
                  <div className="nominee-underline-simple"></div>

                  <button
                    className="vote-orange-button"
                    onClick={() => handleVoteClick(nominee)}
                  >
                    Голосовать
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-back-button-container">
              <button className="back-to-nominations-btn" onClick={onClose}>
                ← Вернуться к номинациям
              </button>
            </div>

          </div>
        </div>
      </div>

      {showVoteConfirm && selectedNominee && (
        <VoteConfirmModal
          nominee={selectedNominee}
          nomination={nomination}
          onClose={() => setShowVoteConfirm(false)}
          onSubmit={() => {}}
        />
      )}
    </>
  );
}
