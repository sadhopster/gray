import React from "react";
import "./NominationCard.css";

interface Props {
    title: string;
    image: string;
}

const NominationCard: React.FC<Props> = ({ title, image }) => {
    return (
        <div className="nomination-card">
            {/* Только картинка без оберток */}
            <img src={image} alt={title} className="nomination-image" />

            <div className="nomination-title">{title}</div>
            <div className="nomination-underline"></div>
        </div>
    );
};

export default NominationCard;