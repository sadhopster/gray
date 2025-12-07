import { useState } from "react";
import "./AboutSlider.css";
import p1 from "../assets/1.jpg";
import p2 from "../assets/2.jpg";
import p3 from "../assets/3.jpg";

const SLIDES = [
    {
        img: p3,
        title: "RAZIEBAY OF THE YEAR",
        text: "Ежегодное мероприятие, которое проводится в рамках Новогоднего сбора в рогачике на какой-то хате, под управлением квадрата aka Денчика Говорухина, за что ему реально респект"
    },
    {
        img: p2,
        title: "RAZIEBAY OF THE YEAR",
        text: "Рогачинские голосования, десятки номинаций — настоящая битва разъебаев за победу в конченной номинации. Где еще можно такое увидеть?"
    },
    {
        img: p1,
        title: "RAZIEBAY OF THE YEAR",
        text: "Каждый участник — легенда. Каждый голос — важен. Каждый финал — новая глава в истории разъебаев."
    }
];

export default function AboutSlider() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((current + 1) % SLIDES.length);
    const prev = () => setCurrent((current - 1 + SLIDES.length) % SLIDES.length);

    return (
        <section className="about-slider">
            {/* Шлемы */}
            <img src="/right-helmet.png" className="helmet helmet-left" />
            <img src="/left-helmet.png" className="helmet helmet-right" />

            {/* Цепи */}
            <video className="chain chain-left" src="/chain-left.webm" autoPlay loop muted playsInline />
            <video className="chain chain-right" src="/chain-right.webm" autoPlay loop muted playsInline />

            <div className="slide-content">

                {/* Овальное окно */}
                <div className="image-mask">
                    <img className="slide-img" src={SLIDES[current].img} />
                    <div className="vignette"></div>
                    <div className="image-vignette-orange"></div>
                </div>

                <h2>{SLIDES[current].title}</h2>
                <p>{SLIDES[current].text}</p>

                {/* Нормальные стрелки-картинки */}
                <div className="arrows">
                    <img
                        src="/arrow-left.png"
                        className="arrow-img"
                        onClick={prev}
                    />
                    <div className="slide-counter">
                        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                    </div>
                    <img
                        src="/arrow-right.png"
                        className="arrow-img"
                        onClick={next}
                    />
                </div>

            </div>
        </section>
    );
}