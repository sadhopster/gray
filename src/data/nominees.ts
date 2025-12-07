import type { Nominee, Nomination } from '../types';
import { useState } from 'react';

// ИМПОРТЫ КАРТИНОК
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

const ALL_NOMINEES: Nominee[] = [
  { id: '1', name: 'VADIM "BERSH" BERSH', readyPhoto: true, photo: bersh },
  { id: '2', name: 'SANYOK "SUETA" STOLYAR', readyPhoto: true, photo: stolyar },
  { id: '3', name: 'VLADISLAV "KILLER" KUSAKOVSKIY', readyPhoto: true, photo: vlad },
  { id: '4', name: 'ANDREY "KRASNODAR" VOSKRESENSKIY', readyPhoto: true, photo: krasnodar },
  { id: '5', name: 'NIKOLAY "EM1LE" NARBEKOV', readyPhoto: true, photo: narbek },
  { id: '6', name: 'ALEXANDER "MUGIWARA" SIMAKIN', readyPhoto: true, photo: simakin },
  { id: '7', name: 'DANIIL "GRISHA" BABKIN', readyPhoto: true, photo: babkin },
  { id: '8', name: 'ILYA "LISIY" SEMENOV', readyPhoto: true, photo: semenov },
  { id: '9', name: 'KIRILL "PRESIDENT" KUVSHINOV', readyPhoto: true, photo: president },
  { id: '10', name: 'EGOR "SHEFF" SHEFER', readyPhoto: true, photo: sheff },
  { id: '11', name: 'MAKSIM "DEREK" DEREKA', readyPhoto: true, photo: maksik },
  { id: '12', name: 'DENIS "DEREK" DEREKA', readyPhoto: true, photo: den },
  { id: '13', name: 'GLEB "DURNOY" KRASOCHKO', readyPhoto: true, photo: gleb },
  { id: '14', name: 'VANYA "ALKO" MAKAROV', readyPhoto: true, photo: vanya },
  { id: '15', name: 'BOGDAN "G*B*" LEBEDEV', readyPhoto: true, photo: bogdan },
  { id: '16', name: 'KIRILL "HOPSTER" BOGNYUKOV', readyPhoto: true, photo: bognuk },
  { id: '17', name: 'DENIS "PAUZAQQ" GOVORUKHIN', readyPhoto: true, photo: pauza },
];

// Обновляем номинации с типами
export const NOMINATIONS: Nomination[] = [
  // Публичные номинации
  { title: "Пара Года", image: "/couple.png", type: 'public' },
  { title: "Дуо Года", image: "/duo.png", type: 'public' },
  { title: "Человек-мем Года", image: "/mem.png", type: 'public' },
  { title: "Стиль Года", image: "/style.png", type: 'public' },
  { title: "Студент Года", image: "/student.png", type: 'public' },
  { title: "Кайфарик Года", image: "/vibe.png", type: 'public' },
  { title: "Работяга Года", image: "/work.png", type: 'public' },
  { title: "Спортсмен Года", image: "/sport.png", type: 'public' },
  { title: "Самый Злой Года", image: "/angry.png", type: 'public' },
  { title: "Самый Добрый Года", image: "/kind.png", type: 'public' },

  // Приватные номинации
  { title: "Разъебай Года", image: "/reziebay.png", type: 'private' },
  { title: "Завоз Года", image: "/zavoz.png", type: 'private' },
  { title: "Прорыв Года", image: "/proriv.png", type: 'private' },
  { title: "Трек Года", image: "/trek.png", type: 'private' },
  { title: "Игра Года", image: "/game.png", type: 'private' },
  { title: "Хата Года", image: "/hata.png", type: 'private' },
];

// Для обратной совместимости
export const NOMINEES: Nominee[] = ALL_NOMINEES;