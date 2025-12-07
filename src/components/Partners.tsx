import './Partners.css';

export default function Partners(){
  return (
    <section className="partners">
      <div className="partners-row">
        <img src="/2x2.png" alt="2x2" className="partner-logo" />
        <img src="/The Girl.png" alt="The Girl" className="partner-logo" />
        <img src="/Chempionat.png" alt="Чемпионат" className="partner-logo" />
        <img src="/Voice.png" alt="Voice" className="partner-logo" />
        <img src="/Maxim Maximonline.png" alt="Maxim" className="partner-logo" />
      </div>
      <div className="partners-row">
        <img src="/Igromania.png" alt="Игромания" className="partner-logo" />
        <img src="/Afisha Daily.png" alt="Афиша Daily" className="partner-logo" />
        <img src="/ZharaFM.png" alt="Жара FM" className="partner-logo" />
      </div>
    </section>
  );
}
