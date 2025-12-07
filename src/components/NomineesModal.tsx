import { useState } from 'react';
import type { Nomination, Nominee } from '../types';
import VoteConfirmModal from './VoteConfirmModal';
import './NomineesModal.css';
import bersh from '../assets/bersh 2.png';
import stolyar from '../assets/stolyar 2.png';
import vlad from '../assets/vlad 2.png';
import krasnodar from '../assets/krasnodar 2.png';
import narbek from '../assets/narbek 3.png';
import simakin from '../assets/simakin 2.png';
import babkin from '../assets/babkin 2.png';
import semenov from '../assets/semenov 2.png';
import bognuk from '../assets/bognuk 2.png';
import president from '../assets/president 2.png';
import pauza from '../assets/pauza 3.png';
import vanya from '../assets/vanya 3.png';
import sheff from '../assets/sheff 3.png';
import maksik from '../assets/maksik 3.png';
import gleb from '../assets/gleb 3.png';
import den from '../assets/denchik 3.png';
import bogdan from '../assets/bogdan 3.png';

// Используем всех номинантов из ваших импортов
const TEMP_NOMINEES: Nominee[] = [
  { 
    id: '1', 
    name: 'VADIM "BERSH" BERSH', 
    readyPhoto: true, 
    photo: bersh 
  },
  { 
    id: '2', 
    name: 'SANYOK "SUETA" STOLYAR', 
    readyPhoto: true, 
    photo: stolyar
  },
  { 
    id: '3', 
    name: 'VLADISLAV "KILLER" KUSAKOVSKIY', 
    readyPhoto: true, 
    photo: vlad
  },
  { 
    id: '4', 
    name: 'ANDREY "KRASNODAR" VOSKRESENSKIY', 
    readyPhoto: true, 
    photo: krasnodar 
  },
  { 
    id: '5', 
    name: 'NIKOLAY "EM1LE" NARBEKOV', 
    readyPhoto: true, 
    photo: narbek 
  },
  { 
    id: '6', 
    name: 'ALEXANDER "MUGIWARA" SIMAKIN', 
    readyPhoto: true, 
    photo: simakin
  },
  { 
    id: '7', 
    name: 'DANIIL "GRISHA" BABKIN', 
    readyPhoto: true, 
    photo: babkin
  },
  { 
    id: '8', 
    name: 'ILYA "LISIY" SEMENOV', 
    readyPhoto: true, 
    photo: semenov
  },
  { 
    id: '9', 
    name: 'KIRILL "PRESIDENT" KUVSHINOV', 
    readyPhoto: true, 
    photo: president
  },
  { 
    id: '10', 
    name: 'EGOR "SHEFF" SHEFER', 
    readyPhoto: true, 
    photo: sheff
  },
  { 
    id: '11', 
    name: 'MAKSIM "DEREK" DEREKA', 
    readyPhoto: true, 
    photo: maksik
  },
  { 
    id: '12', 
    name: 'DENIS "DEREK" DEREKA', 
    readyPhoto: true, 
    photo: den
  },
  { 
    id: '13', 
    name: 'GLEB "DURNOY" KRASOCHKO', 
    readyPhoto: true, 
    photo: gleb
  },
  { 
    id: '14', 
    name: 'VANYA "ALKO" MAKAROV', 
    readyPhoto: true, 
    photo: vanya
  },
  { 
    id: '15', 
    name: 'BOGDAN "G*B*" LEBEDEV', 
    readyPhoto: true, 
    photo: bogdan
  },
  { 
    id: '16', 
    name: 'KIRILL "HOPSTER" BOGNYUKOV', 
    readyPhoto: true, 
    photo: bognuk
  },
  { 
    id: '17', 
    name: 'DENIS "PAUZAQQ" GOVORUKHIN', 
    readyPhoto: true, 
    photo: pauza
  },
];

interface Props {
  nomination: Nomination;
  deadline: number;
  onClose: () => void;
}

export default function NomineesModal({ nomination, onClose }: Props) {
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [showVoteConfirm, setShowVoteConfirm] = useState(false);

  const handleVoteClick = (nominee: Nominee) => {
    setSelectedNominee(nominee);
    setShowVoteConfirm(true);
  };

  const handleVoteConfirmClose = () => {
    setShowVoteConfirm(false);
    setSelectedNominee(null);
  };

  const handleVoteSubmit = (voterName: string) => {
    console.log(`Голос за ${selectedNominee?.name} в номинации "${nomination.title}" от ${voterName}`);
    setShowVoteConfirm(false);
    setSelectedNominee(null);
    onClose();
  };

  return (
    <>
      <div className="nominees-modal-backdrop" onClick={onClose}>
        <div className="nominees-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="nomination-header-gradient">
            <h2 className="nomination-title-elegant">{nomination.title}</h2>
            <div className="nomination-subtitle">Выберите номинанта</div>
          </div>
          
          <button className="modal-close-elegant" onClick={onClose}>
            <span>×</span>
          </button>
          
          <div className="nominees-modal-body">
            <div className="nominees-grid-transparent">
              {TEMP_NOMINEES.map((nominee) => (
                <div key={nominee.id} className="nominee-transparent-card">
                  <div className="nominee-photo-backglow">
                    <div className="photo-glow-effect"></div>
                    <img 
                      src={nominee.photo} 
                      alt={nominee.name}
                      className="nominee-photo-simple"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/220x300/222/fff?text=Nominee';
                      }}
                    />
                  </div>
                  
                  <div className="nominee-name-simple">{nominee.name}</div>
                  <div className="nominee-underline-simple"></div>
                  
                  {/* Кнопка голосования с оранжевым контуром */}
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

      {/* Увеличенное модальное окно подтверждения голоса */}
      {showVoteConfirm && selectedNominee && (
        <VoteConfirmModal
          nominee={selectedNominee}
          nomination={nomination}
          onClose={handleVoteConfirmClose}
          onSubmit={handleVoteSubmit}
        />
      )}
    </>
  );
}