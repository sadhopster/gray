import type { Nominee, Nomination } from '../types';

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
import tempphoto from '../assets/narbek 2.png';
// Заглушка
const placeholder = tempphoto;

const temp = (id: string, name: string): Nominee => ({
  id,
  name,
  photo: placeholder,
  readyPhoto: false,
});

// Основные номинанты (соответствуют списку)
const BASE: Record<string, Nominee> = {
  bersh: { id: '1', name: 'VADIM "BERSH" BERSH', photo: bersh, readyPhoto: true },
  stolyar: { id: '2', name: 'SANYOK "SUETA" STOLYAR', photo: stolyar, readyPhoto: true },
  vlad: { id: '3', name: 'VLADISLAV "KILLER" KUSAKOVSKIY', photo: vlad, readyPhoto: true },
  krasnodar: { id: '4', name: 'ANDREY "KRASNODAR" VOSKRESENSKIY', photo: krasnodar, readyPhoto: true },
  narbek: { id: '5', name: 'NIKOLAY "EM1LE" NARBEKOV', photo: narbek, readyPhoto: true },
  simakin: { id: '6', name: 'ALEXANDER "MUGIWARA" SIMAKIN', photo: simakin, readyPhoto: true },
  babkin: { id: '7', name: 'DANIIL "GRISHA" BABKIN', photo: babkin, readyPhoto: true },
  semenov: { id: '8', name: 'ILYA "LISIY" SEMENOV', photo: semenov, readyPhoto: true },
  president: { id: '9', name: 'KIRILL "PRESIDENT" KUVSHINOV', photo: president, readyPhoto: true },
  sheff: { id: '10', name: 'EGOR "SHEFF" SHEFER', photo: sheff, readyPhoto: true },
  maksik: { id: '11', name: 'MAKSIM "DEREK" DEREKA', photo: maksik, readyPhoto: true },
  den: { id: '12', name: 'DENIS "DEREK" DEREKA', photo: den, readyPhoto: true },
  gleb: { id: '13', name: 'GLEB "DURNOY" KRASOCHKO', photo: gleb, readyPhoto: true },
  vanya: { id: '14', name: 'VANYA "ALKO" MAKAROV', photo: vanya, readyPhoto: true },
  bogdan: { id: '15', name: 'BOGDAN "G*B*" LEBEDEV', photo: bogdan, readyPhoto: true },
  bognuk: { id: '16', name: 'KIRILL "HOPSTER" BOGNUKOV', photo: bognuk, readyPhoto: true },
  pauza: { id: '17', name: 'DENIS "PAUZAQQ" GOVORUKHIN', photo: pauza, readyPhoto: true },
};

// Пары
const PAIRS = [
  temp('100', 'Симакин & Марина'),
  temp('101', 'Президент & Настя'),
  temp('102', 'Глеб & Алина'),
];

// Дуэты
const DUOS = [
  temp('110', 'Максик & Денчик'),
  temp('111', 'Илюха & Вадим'),
  temp('112', 'Влад & Бублей'),
  temp('113', 'Столяр & Краснодар'),
  temp('114', 'Ваня & Глеб'),
  temp('115', 'Я & Нарбек'),
];

// Человек-мем
const MEM = [
  BASE.semenov,
  BASE.bersh,
  BASE.narbek,
  BASE.maksik,
  BASE.bogdan,
];

// Стиль
const STYLE = [
  BASE.vanya,
  BASE.stolyar,
  BASE.simakin,
  BASE.president,
  BASE.pauza,
  BASE.gleb,
  BASE.bersh,
];

// Студент
const STUDENT = [
  BASE.vlad,
  BASE.vanya,
  BASE.stolyar,
  BASE.simakin,
  BASE.sheff,
  BASE.semenov,
  BASE.president,
  BASE.pauza,
  BASE.maksik,
  BASE.den,
  temp('200', 'Андрюха'),
  BASE.gleb,
  BASE.bognuk,
  BASE.bersh,
  BASE.babkin,
];

// Кайфарик
const KAIF = [
  BASE.narbek,
  BASE.semenov,
  BASE.bogdan,
  BASE.maksik,
  BASE.den,
  temp('201', 'Андрюха'),
  BASE.bersh,
  BASE.babkin,
];

// Работяга
const WORK = [
  BASE.vanya,
  BASE.simakin,
  BASE.semenov,
  BASE.pauza,
  temp('210', 'Андрюха'),
  BASE.bersh,
];

// Спортсмен
const SPORT = [
  BASE.gleb,
  BASE.bersh,
  BASE.stolyar,
  BASE.semenov,
  temp('211', 'Андрюха'),
];

// Злой
const ANGRY = [
  BASE.simakin,
  BASE.narbek,
  BASE.bogdan,
  BASE.bersh,
];

// Добрый
const KIND = [
  BASE.vlad,
  BASE.vanya,
  BASE.stolyar,
  BASE.president,
  BASE.maksik,
  BASE.den,
  BASE.bognuk,
  BASE.babkin,
];

// Разъебай
const RAZ = [
  BASE.vlad,
  BASE.stolyar,
  BASE.simakin,
  BASE.semenov,
  BASE.pauza,
  BASE.narbek,
  BASE.maksik,
  BASE.krasnodar,
  BASE.bogdan,
  BASE.bersh,
  BASE.babkin,
];

// Завоз
const ZAVOZ = [
  temp('300', 'Дембель Коляна'),
  temp('301', 'Аквапарк'),
  temp('302', '19 августа — хата Андрюхи'),
  temp('303', '25 октября'),
  temp('304', '6 марта — Илюха и Вадим'),
  temp('305', 'Колян чихает у Аркаши'),
  temp('306', 'Борик суетит на даче Вадима'),
];

// Прорыв (исправляем - добавляем только уникальные элементы)
const PRORYV = [
  temp('310', 'Максик & Денчик'), // Делаем новую запись вместо использования BASE.sheff
];

// Треки
const TREK = [
  temp('400', 'Литвин'),
  temp('401', 'MAYOT'),
  temp('402', 'OG Buda'),
  temp('403', 'Эндшпиль & Miyagi'),
  temp('404', '4nWay'),
  temp('405', 'BigBabyTape'),
  temp('406', 'Kizaru'),
  temp('407', 'FRIENDLY THUG 52 NGG'),
  temp('408', 'ALBLAK 52'),
  temp('409', 'MACAN'),
  temp('410', 'ICEGERGERT'),
  temp('411', 'Скриптонит'),
  temp('412', 'BabyCute'),
  temp('413', 'OBLADAET'),
];

// Игры
const GAME = [
  temp('500', 'CS2'),
  temp('501', 'PUBG'),
  temp('502', 'Fortnite'),
  temp('503', 'Clash Royale'),
  temp('504', 'Rocket League'),
];

// Хаты
const HATA = [
  temp('600', 'Квартира Вадима'),
  temp('601', 'Квартира Влада 59'),
  temp('602', 'Квартира Влада 12'),
  temp('603', 'Квартира Коляна 57'),
  temp('604', 'Кружка'),
];

// Все возможные номинанты (включая временные для PRORYV)
const ALL_NOMINEES: Nominee[] = [
  ...Object.values(BASE),
  ...PAIRS,
  ...DUOS,
  ...ZAVOZ,
  ...PRORYV,
  ...TREK,
  ...GAME,
  ...HATA,
];

// Функция для поиска номинанта по ID
export function findNomineeById(id: string): Nominee | undefined {
  return ALL_NOMINEES.find(nominee => nominee.id === id);
}

// Номинации с привязкой nominees:[]
export const NOMINATIONS: Nomination[] = [
  { 
    title: "Пара Года", 
    image: "/gray/couple.png", 
    type: 'public', 
    nominees: PAIRS.map(x => x.id) 
  },
  { 
    title: "Дуо Года", 
    image: "/gray/duo.png", 
    type: 'public', 
    nominees: DUOS.map(x => x.id) 
  },
  { 
    title: "Человек-мем Года", 
    image: "/gray/mem.png", 
    type: 'public', 
    nominees: MEM.map(x => x.id) 
  },
  { 
    title: "Стиль Года", 
    image: "/gray/style.png", 
    type: 'public', 
    nominees: STYLE.map(x => x.id) 
  },
  { 
    title: "Студент Года", 
    image: "/gray/student.png", 
    type: 'public', 
    nominees: STUDENT.map(x => x.id) 
  },
  { 
    title: "Кайфарик Года", 
    image: "/gray/vibe.png", 
    type: 'public', 
    nominees: KAIF.map(x => x.id) 
  },
  { 
    title: "Работяга Года", 
    image: "/gray/work.png", 
    type: 'public', 
    nominees: WORK.map(x => x.id) 
  },
  { 
    title: "Спортсмен Года", 
    image: "/gray/sport.png", 
    type: 'public', 
    nominees: SPORT.map(x => x.id) 
  },
  { 
    title: "Самый Злой Года", 
    image: "/gray/angry.png", 
    type: 'public', 
    nominees: ANGRY.map(x => x.id) 
  },
  { 
    title: "Самый Добрый Года", 
    image: "/gray/kind.png", 
    type: 'public', 
    nominees: KIND.map(x => x.id) 
  },
  { 
    title: "Разъебай Года", 
    image: "/gray/reziebay.png", 
    type: 'private', 
    nominees: RAZ.map(x => x.id) 
  },
  { 
    title: "Завоз Года", 
    image: "/gray/zavoz.png", 
    type: 'private', 
    nominees: ZAVOZ.map(x => x.id) 
  },
  { 
    title: "Прорыв Года", 
    image: "/gray/proriv.png", 
    type: 'private', 
    nominees: PRORYV.map(x => x.id) 
  },
  { 
    title: "Трек Года", 
    image: "/gray/trek.png", 
    type: 'private', 
    nominees: TREK.map(x => x.id) 
  },
  { 
    title: "Игра Года", 
    image: "/gray/game.png", 
    type: 'private', 
    nominees: GAME.map(x => x.id) 
  },
  { 
    title: "Хата Года", 
    image: "/gray/hata.png", 
    type: 'private', 
    nominees: HATA.map(x => x.id) 
  },
];

// Единый список номинантов (БЕЗ ДУБЛИКАТОВ) - экспортируем
export const NOMINEES: Nominee[] = ALL_NOMINEES;