import { useState } from 'react';
import type { Nominee } from '../types';
import { db, firebaseAvailable, ref, push } from '../firebase';

function writeLocalVote(record: any) {
  const data = JSON.parse(localStorage.getItem('votes') || '[]');
  data.push(record);
  localStorage.setItem('votes', JSON.stringify(data));
}

export default function VoteModal({ nominee, onClose, nominationType, nominationId, deadline }: { nominee: Nominee, onClose: ()=>void, nominationType: 'public'|'private', nominationId?: string, deadline: number }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const now = Date.now();
  const closed = now >= deadline;
  const submit = async () => {
    if (closed) { setMessage('Голосование закрыто'); return; }
    const rec = { nomineeId: nominee.id, nominationId: nominationId || '', nominationType, timestamp: Date.now(), voterName: name || 'anonymous' };
    try {
      if (firebaseAvailable && db) {
        const votesRef = ref(db, 'votes');
        await push(votesRef, rec);
      } else {
        writeLocalVote(rec);
      }
      setMessage('Голос учтён — спасибо!');
      setTimeout(()=> onClose(), 900);
    } catch (e) {
      console.error(e);
      setMessage('Ошибка при отправке. Попробуйте позже.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Голос за {nominee.name}</h3>
        <p>Номинация: <strong>{nominationType}</strong></p>
        {closed ? <div className="closed">Голосование завершено</div> : <>
          <input placeholder="Ваше имя (опционально)" value={name} onChange={e=>setName(e.target.value)} />
          {nominationType === 'private' && <div className="note">Это закрытая номинация — вам нужен ключ/пароль (попроси у организаторов).</div>}
          <div className="actions">
            <button onClick={submit} className="confirm">Голосовать</button>
            <button onClick={onClose} className="cancel">Отмена</button>
          </div>
        </>}
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}
