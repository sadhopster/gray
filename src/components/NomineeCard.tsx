import type { Nominee } from '../types';

export default function NomineeCard({ nominee, onClick }: { nominee: Nominee, onClick: ()=>void }) {
  const photo = nominee.photo ?? '/photos/placeholder.jpg';
  return (
    <div className="nominee-card" onClick={onClick}>
      <div className="photo-wrap">
        {nominee.readyPhoto ? <img src={photo} alt={nominee.name} /> : <div className="glow-placeholder">{nominee.name.split(' ')[0]}</div>}
      </div>
      <div className="meta">
        <div className="name">{nominee.name}</div>
      </div>
    </div>
  );
}
