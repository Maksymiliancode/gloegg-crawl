import type { Card } from '../domain/types';

export const PLAYERS = ['Agata', 'Michał', 'Julianna', 'Maksymilian'];

/**
 * Trasa na piątek 27.11. Pinezki to współrzędne sprawdzone w OpenStreetMap,
 * żeby Google Maps otwierał się dokładnie na placu z jarmarkiem.
 * Czasy przejść: routing pieszy OSM (ok. 4,5 km/h).
 */
export const CARDS: Card[] = [
  {
    kind: 'intro',
    num: 'God jul!',
    name: 'Gløgg Crawl',
    sub: 'Każdy na siebie. 5 jarmarków, 7 przystanków',
    time: '13:40 – późno',
    rows: [
      ['Jak', 'Idziecie pod adres z karty. Na miejscu odwracacie kartę.'],
      ['Zabierz', 'Czerwone rogi renifera z dzwoneczkami.'],
    ],
    note: 'Bilety na metro kupcie przed wyjściem w aplikacji DOT.',
    cta: 'Odwróć: zasady',
    back: {
      title: 'Zasady gry',
      rules: [
        ['Tu trzeba', 'Duńska rzecz, którą robicie wszyscy. Kto zaliczy całą listę: +1.'],
        ['Wyzwanie', '1. miejsce +3, 2. miejsce +1. Ostatni odbywa karę. Remis: kamień, papier, nożyce.'],
        ['Bonus', '+2 według karty.'],
        ['Z ręki', 'Za fajną, głupią albo śmieszną akcję: +1 albo +2, jeśli reszta się zgodzi.'],
        ['Rogi', 'Czerwone rogi renifera są przechodnie. Pierwszy zakłada je przegrany w Aamanns, a potem przejmuje je przegrany każdego wyzwania z ikonką rogów. Kto je zdejmie: −1.'],
        ['Skål', 'Przy toaście patrzysz każdemu w oczy. Kto odwróci wzrok, pije karny łyk i dostaje −1. (Legenda: siedem lat kiepskiego seksu.)'],
        ['Zakazane', 'Słowa „ślub” i „wesele”: karny łyk i −1.'],
        ['Joker', 'Jeden na osobę. Pomijasz wyzwanie bez kary.'],
        ['Finał', 'Ostatni stawia zwycięzcy drinka i wygłosi toast na jego weselu.'],
      ],
      phrases: [
        ['Skål!', 'na zdrowie', 'skol'],
        ['En gløgg, tak', 'jeden gløgg, poproszę', 'en glyg, tak'],
        ['Tak', 'dziękuję', 'tak'],
        ['Hvad er det?', 'co to jest?', 'wa er de'],
        ['Vil du gifte dig med mig?', 'wyjdziesz za mnie?', 'wel du gifte daj me maj'],
      ],
    },
  },
  {
    kind: 'stop',
    num: 'Przystanek 1 / 7',
    name: 'Aamanns 1921',
    sub: 'Smørrebrød i akvavit',
    address: 'Niels Hemmingsens Gade 19–21',
    pin: '55.68021,12.57591',
    mode: 'transit',
    time: '14:15 – 15:45',
    route: [
      ['13:40', 'Pieszo do metra Sluseholmen albo Enghave Brygge (10 min)'],
      ['M4', 'Do Gammel Strand (ok. 8–10 min)'],
      ['7 min', 'Pieszo do Aamanns'],
    ],
    back: {
      title: 'Snaps na rozgrzewkę',
      must: [
        ['Śledź na pierwszy ogień', 'Smørrebrød jemy w kolejności: ryba, mięso, ser. Nożem i widelcem.'],
        ['Akvavit do śledzia', 'Kęs śledzia, „Skål!”, oczy, na raz, znowu oczy.'],
      ],
      duels: [
        {
          title: 'Zgadnij rachunek',
          text: 'Zanim przyjdzie rachunek, każdy po cichu wpisuje w telefonie, ile wyniesie w koronach. Najbliższy wygrywa.',
          penalty: 'Najdalszy zakłada rogi renifera i nosi je, dopóki ktoś ich nie przejmie.',
          antlers: true,
        },
      ],
      bonus: 'Namów kelnera na wspólne „Skål!”, nawet bez picia: +2.',
    },
  },
  {
    kind: 'stop',
    num: 'Przystanek 2 / 7',
    name: 'Nytorv & Gammeltorv',
    sub: 'Pierwszy gløgg i łyżwy',
    address: 'Nytorv / Gammeltorv',
    pin: '55.67749,12.57312',
    mode: 'walking',
    time: '16:00 – 17:00',
    route: [['7 min', 'Pieszo z Aamanns do Strøget (490 m)']],
    note: 'Lodowisko i łyżwy są za darmo. Od razu stańcie w kolejce po łyżwy, gløgg pijcie w kolejce. Jeśli się nie uda, pomijacie obie konkurencje, a rogi zostają, gdzie są.',
    back: {
      title: 'Gløgg i łyżwy',
      must: [
        ['Gløgg zamówiony po duńsku', 'Każdy zamawia sam: „En gløgg, tak”. Kto przejdzie na angielski, pije karny łyk.'],
        ['Æbleskiver', 'Duńskie pączki-kulki z dżemem i cukrem pudrem.'],
      ],
      duels: [
        {
          title: 'Wyścig o rogi',
          text: 'Każdy jedzie jedno okrążenie lodowiska na czas, reszta mierzy stoperem. Najszybszy wygrywa.',
          penalty: 'Najwolniejszy przejmuje rogi. Jeśli to ta sama osoba, nosi je dalej.',
          antlers: true,
        },
        {
          title: 'Figura dnia',
          text: 'Każdy pokazuje jedną figurę: jazdę tyłem, piruet, jaskółkę albo pozę do zdjęcia. Głosujecie, nie na siebie.',
          penalty: 'Najsłabsza figura pije karny łyk gløgga.',
        },
      ],
      bonus: 'Æbleskive w jednym kęsie, bez śladu cukru pudru na sobie: +2.',
    },
  },
  {
    kind: 'stop',
    num: 'Przystanek 3 / 7',
    name: 'Jul på Højbro Plads',
    sub: 'Dania, Grenlandia i Wyspy Owcze',
    address: 'Højbro Plads',
    pin: '55.67838,12.57985',
    mode: 'walking',
    time: '17:10 – 17:45',
    route: [['7 min', 'Pieszo Strøget na wschód (550 m)']],
    note: 'Nowy jarmark, daty niepewne. Jeśli nie działa, zróbcie zdjęcie z Absalonem, a lakrids kupcie w najbliższym kiosku.',
    back: {
      title: 'Smak północy',
      must: [
        ['Coś z Grenlandii lub Wysp Owczych', 'Część Królestwa Danii z własną kuchnią: suszone ryby, baranina. Bez takiego stoiska: lakrids, duńska słona lukrecja.'],
        ['Zdjęcie z Absalonem', 'Konny pomnik biskupa, który w 1167 roku założył Kopenhagę.'],
      ],
      duels: [
        {
          title: 'Prezent na krzyż',
          text: 'Agata i Michał kupują po jednej rzeczy dla Julianny i Maksymiliana, a oni dla nich: najdziwniejszą z grenlandzkiego albo farerskiego stoiska, a bez niego najdziwniejszą lakrids. Zamawiacie po duńsku. Jecie jednocześnie: kto pierwszy skończy, wygrywa, a kto się skrzywi, spada na koniec.',
          penalty: 'Ostatni pije Gammel Dansk, duńską gorzką nalewkę. Jeśli jej nie ma, cokolwiek mocnego.',
        },
      ],
      bonus: 'Najlepsza póza Absalona (telefon jako topór). Wybiera przechodzień: +2.',
    },
  },
  {
    kind: 'stop',
    num: 'Przystanek 4 / 7',
    name: 'Kongens Nytorv',
    sub: 'Choinka i Magasin du Nord',
    address: 'Kongens Nytorv',
    pin: '55.68083,12.58494',
    mode: 'walking',
    time: '17:50 – 18:10',
    route: [['7 min', 'Pieszo z Højbro Plads (520 m)']],
    back: {
      title: 'Polski dla Duńczyków',
      must: [
        ['Dans om juletræet', 'W Wigilię Duńczycy trzymają się za ręce i chodzą wokół choinki ze śpiewem. Zróbcie jedno okrążenie, głośno.'],
        ['Witryny Magasin du Nord', 'Najstarszy dom towarowy w mieście i jego świąteczne wystawy.'],
      ],
      duels: [
        {
          title: 'Duńczyk mówi po polsku',
          text: '5 minut, dyktafon w dłoń. Każdy łapie obcego Duńczyka, uczy go polskiego zdania i nagrywa, jak je mówi: Na zdrowie (1), Wesołych Świąt (2), Szczęśliwego Nowego Roku (3), Chrząszcz brzmi w trzcinie (5). Potem porównujecie nagrania: najwyższa wartość wygrywa, remis rozstrzyga głosowanie.',
          penalty: 'Najniższa wartość albo brak nagrania przejmuje rogi.',
          antlers: true,
        },
      ],
      bonus: 'Rewanż w tej samej rozmowie: niech Duńczyk nauczy cię najdłuższego duńskiego słowa, jakie zna, i nagraj, jak je powtarzasz. Najdłuższe słowo (liczą się litery): +2.',
    },
  },
  {
    kind: 'stop',
    num: 'Przystanek 5 / 7',
    name: 'Nyhavn',
    sub: 'Kolorowe kamienice nad kanałem',
    address: 'Nyhavn',
    pin: '55.68052,12.58913',
    mode: 'walking',
    time: '18:15 – 19:15',
    route: [['5 min', 'Pieszo z Kongens Nytorv (370 m)']],
    note: 'Jarmark w piątek prawdopodobnie do 20:00.',
    back: {
      title: 'Zgadnij, skąd jestem',
      must: [
        ['Flæskestegssandwich', 'Pieczeń z chrupiącą skórką, czyli danie duńskiej Wigilii, w bułce.'],
        ['Brændte mandler', 'Migdały prażone w cukrze i cynamonie.'],
      ],
      duels: [
        {
          title: 'Zgadnij, skąd jestem',
          text: 'Każdy zaczepia obcego i pyta: „Guess where I am from?”. Na każdą złą odpowiedź mówisz tylko „nie” i liczysz pudła, aż padnie Polska (maks. 10). Nagraj to dyktafonem. Najwięcej pudeł, czyli najlepszy kamuflaż, wygrywa.',
          penalty: 'Najmniej pudeł kupuje wszystkim brændte mandler.',
        },
      ],
      bonus: 'W tej samej rozmowie zapytaj, z czym kojarzy mu się Polska. Najbardziej zaskakujące skojarzenie (głosujecie po odsłuchu): +2.',
    },
  },
  {
    kind: 'stop',
    num: 'Przystanek 6 / 7',
    name: 'Tivoli',
    sub: 'Finał wśród tysięcy światełek',
    address: 'Vesterbrogade 3',
    pin: '55.67465,12.56566',
    mode: 'transit',
    time: '19:35 – 22:30',
    route: [
      ['5 min', 'Pieszo do metra Kongens Nytorv'],
      ['M3/M4', 'Do København H (ok. 4 min)'],
      ['4 min', 'Pieszo do bramy Tivoli'],
    ],
    note: 'Bilety kupcie wcześniej na tivoli.dk. Przejażdżki płaci się osobno.',
    back: {
      title: 'Wielki finał',
      must: [
        ['Tuborg Julebryg', 'Świąteczne piwo, którego premiera, J-dag, oficjalnie otwiera w Danii sezon.'],
        ['Rød pølse', 'Hot dog z czerwoną parówką z budki pølsevogn.'],
        ['Kolejka razem', 'Dæmonen albo drewniana Rutschebanen z 1914 roku.'],
      ],
      duels: [
        {
          title: 'Turniej na stoisku',
          text: 'Jedno stoisko z grami, każdy ma trzy próby. Najwięcej trafień wygrywa.',
          penalty: 'Ostatni stawia rundę Julebryg.',
        },
      ],
      bonus: 'Nagraj duńską parę, która jest razem dłużej, niż ty masz lat, mówiącą swój sekret udanego małżeństwa. Kto pierwszy: +2.',
    },
  },
  {
    kind: 'stop',
    num: 'Przystanek 7 / 7',
    name: 'Mikkeller Bar',
    sub: 'Afterparty w Vesterbro',
    address: 'Viktoriagade 8B–C',
    pin: '55.67196,12.55755',
    mode: 'walking',
    time: 'od ok. 22:30',
    route: [['9 min', 'Pieszo z Tivoli (680 m)']],
    back: {
      title: 'Ostatnia runda',
      must: [
        ['Juleøl z kranu', 'Świąteczne piwo z kopenhaskiego browaru kraftowego.'],
        ['10 minut hygge', 'Świeca, telefony ekranem do stołu, tylko wy.'],
      ],
      duels: [
        {
          title: 'Ślepa degustacja',
          text: 'Osoba w rogach renifera podaje trzy różne juleøl w ukrytej kolejności (dostaje +1, ale nie gra). Reszta zgaduje, które jest które. Najwięcej trafień wygrywa.',
          penalty: 'Ostatni dopija resztki.',
        },
      ],
      bonus: '30-sekundowy toast weselny dla drugiej pary. Barman wybiera najlepszy: +2. Potem ogłaszacie zwycięzcę.',
    },
  },
  {
    kind: 'home',
    num: 'Godnat',
    name: 'Do domu',
    sub: 'Metro jeździ całą noc',
    time: 'kiedy padniecie',
    rows: [
      ['Metro', 'M4 z København H, kierunek Ny Ellebjerg'],
      ['Wysiadka', 'Enghave Brygge albo Sluseholmen'],
      ['Pieszo', 'Ok. 10 min do mieszkania'],
    ],
    note: 'Taksówka albo Uber z Vesterbro jedzie ok. 10 min.',
  },
];
