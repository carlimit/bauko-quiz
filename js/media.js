// Bild-Illustrationen aus der Zusammenfassung + bildbasierte Fragen/Karten (kuratiert).
window.BAUKO_MEDIA = {
  quiz: [
    // ---- Dachformen ----
    { topic: "Dachkonstruktionen", image: "img/dachformen.png",
      q: "Welche der abgebildeten Dachformen hat nur eine einzige geneigte Dachfläche?",
      options: ["Satteldach", "Pultdach", "Walmdach", "Sheddach"], answer: 1,
      explanation: "Das Pultdach besitzt genau eine geneigte Fläche; das Satteldach hat zwei, Walm/Shed mehrere." },
    { topic: "Dachkonstruktionen", image: "img/dachformen.png",
      q: "Wie heißt die abgebildete, sägezahnartig aneinandergereihte Dachform (oft für Hallen zur Belichtung)?",
      options: ["Grabendach", "Sheddach", "Pultdach", "Walmdach"], answer: 1,
      explanation: "Das Sheddach reiht mehrere geneigte Flächen sägezahnartig aneinander (Nordlicht-Belichtung)." },
    { topic: "Dachkonstruktionen", image: "img/dachformen.png",
      q: "Welche abgebildete Dachform ist an allen vier Seiten – auch an den Giebelseiten – geneigt?",
      options: ["Satteldach", "Pultdach", "Walmdach", "Flachdach"], answer: 2,
      explanation: "Beim Walmdach sind auch die Giebelseiten als geneigte Walmflächen ausgebildet." },

    // ---- Sparrendach / Pfettendach ----
    { topic: "Dachkonstruktionen", image: "img/sparrendach.png",
      q: "Das abgebildete Tragwerk besteht aus paarweise gegeneinander geneigten Hölzern, die mit dem Dachbalken ein Dreieck bilden. Welche Dachkonstruktion ist das?",
      options: ["Pfettendach", "Sparrendach", "Sheddach", "Flachdach"], answer: 1,
      explanation: "Sparren + Dachbalken bilden ein unverschiebliches Dreieck – kennzeichnend für das Sparrendach." },
    { topic: "Dachkonstruktionen", image: "img/sparrendach.png",
      q: "Wozu dient ein 'Wechsel' mit Wechselsparren (im Bild bezeichnet), wie er im Sparrendach eingebaut wird?",
      options: ["Zur Wärmedämmung des Dachs", "Um eine Öffnung auszubilden, indem unterbrochene Sparren aufgefangen werden", "Zur Entwässerung", "Als Blitzschutz"], answer: 1,
      explanation: "Ein Wechsel fängt unterbrochene (ausgewechselte) Sparren auf und ermöglicht so Öffnungen, z. B. für Dachfenster oder Schornstein." },
    { topic: "Dachkonstruktionen", image: "img/pfettendach.png",
      q: "Das abgebildete Dachtragwerk stützt die Sparren über waagerechte Pfetten, die auf Pfosten ruhen. Um welche Dachkonstruktion handelt es sich?",
      options: ["Sparrendach", "Pfettendach", "Kehlbalkendach", "Zeltdach"], answer: 1,
      explanation: "Beim Pfettendach lagern die Sparren auf horizontalen Pfetten, die über Pfosten abgetragen werden." },
    { topic: "Dachkonstruktionen", image: "img/pfettendach.png",
      q: "Welche Aufgabe haben die 'Kopfbänder' (im Bild bezeichnet) im Pfettendach?",
      options: ["Sie tragen die Dacheindeckung", "Sie steifen die Verbindung zwischen Pfosten und Pfette in Längsrichtung aus", "Sie dichten das Dach ab", "Sie bilden die Traufe"], answer: 1,
      explanation: "Kopfbänder verstreben Pfosten und Pfette und sorgen für die Längsaussteifung des Dachstuhls." },

    // ---- Balkenanordnung / Holzbalkendecke ----
    { topic: "Deckenkonstruktionen", image: "img/balkenanordnung.png",
      q: "Was zeigt die abgebildete Skizze mit durchgehenden Balken, Stichbalken und Wechsel?",
      options: ["Den Schichtaufbau eines Flachdachs", "Die Balkenanordnung (Grundriss) einer Holzbalkendecke", "Eine Pfosten-Riegel-Fassade", "Eine Treppenkonstruktion"], answer: 1,
      explanation: "Es ist der Grundriss der Balkenlage einer Holzbalkendecke mit den verschiedenen Balkenarten." },
    { topic: "Deckenkonstruktionen", image: "img/balkenanordnung.png",
      q: "Was ist in der Balkenlage ein 'Stichbalken'?",
      options: ["Ein durchlaufender Hauptbalken", "Ein kurzer Balken, der nicht durchläuft, sondern an einen Wechsel anschließt", "Der Balken an der Giebelwand", "Ein diagonaler Aussteifungsbalken"], answer: 1,
      explanation: "Stichbalken laufen nicht durch, sondern binden an einen Wechsel an – z. B. bei Deckenöffnungen." },

    // ---- Stahlbetondecken ----
    { topic: "Deckenkonstruktionen", image: "img/stahlbetondecken.png",
      q: "Wie heißt die pilzförmige Verstärkung am Stützenkopf einer stützengestützten Stahlbetonplatte (siehe Bild)?",
      options: ["Plattenbalken", "Flachpilz", "Unterzug", "Flachdecke"], answer: 1,
      explanation: "Die verbreiterte, pilzartige Verstärkung am Stützenkopf heißt Flachpilz." },
    { topic: "Deckenkonstruktionen", image: "img/stahlbetondecken.png",
      q: "Eine 'kreuzweise gespannte Platte' (im Bild) trägt die Lasten …",
      options: ["nur in eine Richtung (einachsig)", "in beide Richtungen (zweiachsig)", "gar nicht, sie ist nur Verkleidung", "ausschließlich über Unterzüge"], answer: 1,
      explanation: "Kreuzweise (zweiachsig) gespannte Platten tragen in beide Richtungen ab – im Gegensatz zur einachsig gespannten Platte." },

    // ---- Kaltdach ----
    { topic: "Flachdach", image: "img/kaltdach.png",
      q: "Wodurch unterscheidet sich das abgebildete zweischalige (Kaltdach) vom einschaligen Flachdach (Warmdach)?",
      options: ["Es hat keine Wärmedämmung", "Es besitzt einen belüfteten Zwischenraum zwischen Dämmung und Dachschale", "Es hat keine Abdichtung", "Es ist immer begrünt"], answer: 1,
      explanation: "Das zweischalige Kaltdach hat einen belüfteten Zwischenraum; das Warmdach ist einschalig und nicht belüftet." },
    { topic: "Flachdach", image: "img/kaltdach.png",
      q: "Welche Schicht sperrt im gezeigten Aufbau die Feuchtigkeit aus dem Innenraum ab (unter der Wärmedämmung)?",
      options: ["Die Dachabdichtung", "Die Dampfsperre", "Der Oberflächenschutz", "Der Belüftungsraum"], answer: 1,
      explanation: "Die (leichte) Dampfsperre unter der Dämmung verhindert, dass Raumfeuchte in die Konstruktion diffundiert." },

    // ---- Verbindungsmittel ----
    { topic: "Dachkonstruktionen", image: "img/verbindungsmittel.png",
      q: "Welches der abgebildeten mechanischen Verbindungsmittel nimmt einen Balken U-förmig auf und hängt ihn an einem anderen Bauteil an?",
      options: ["Winkelverbinder", "Balkenschuh", "Windrispenband", "Sparrenhalter"], answer: 1,
      explanation: "Der Balkenschuh umschließt den Balken U-förmig und überträgt seine Auflagerkraft auf das anschließende Bauteil." },
    { topic: "Dachkonstruktionen", image: "img/verbindungsmittel.png",
      q: "Wozu dient das abgebildete Windrispenband (das lange gelochte Stahlband)?",
      options: ["Zur Abdichtung des Dachs", "Zur Längsaussteifung des Daches gegen Windkräfte", "Zur Wärmedämmung", "Als Regenrinne"], answer: 1,
      explanation: "Diagonal genagelte Windrispenbänder steifen die Dachfläche gegen horizontale Windlasten aus." },

    // ---- Fassade ----
    { topic: "Fenster & Fassaden", image: "img/pfosten-riegel-systeme.png",
      q: "Welches Profil verläuft in der Pfosten-Riegel-Fassade vertikal und trägt die Hauptlasten?",
      options: ["Das Riegelprofil", "Das Pfostenprofil", "Die Verglasung", "Der Kragarm"], answer: 1,
      explanation: "Die vertikalen Pfostenprofile sind die tragenden Hauptprofile; die Riegel spannen horizontal dazwischen." },

    // ---- Holzbau ----
    { topic: "Holzbausysteme", image: "img/holztafelbau.png",
      q: "Die abgebildete Explosionsdarstellung aus geschossweisen Wand- und Deckentafeln zeigt welche Bauweise?",
      options: ["Blockbau", "Holztafel-/Holzrahmenbau", "Skelettbau", "Massivholzbau"], answer: 1,
      explanation: "Vorgefertigte, geschosshohe Wand- und Deckentafeln kennzeichnen den Holztafel-/Holzrahmenbau." },

    // ---- Treppen ----
    { topic: "Treppen", image: "img/treppen-trittschall.png",
      q: "Die abgebildeten Varianten (a–e) zeigen Möglichkeiten wofür in Treppenräumen?",
      options: ["Wärmedämmung", "Trittschalldämmung / schalltechnische Entkopplung", "Brandabschnitte", "Entwässerung"], answer: 1,
      explanation: "Sie zeigen verschiedene Ausführungen der Trittschalldämmung, u. a. durch schalltechnische Entkopplung von Läufen und Podesten." }
  ],

  flashcards: [
    { topic: "Dachkonstruktionen", image: "img/dachformen.png",
      front: "Die wichtigsten Dachformen im Überblick?",
      back: "Flachdach (nahezu waagerecht), Pultdach (eine geneigte Fläche), Satteldach (zwei geneigte Flächen mit First), Walmdach (auch die Giebelseiten geneigt), Sheddach (sägezahnartige Reihung, gute Belichtung) und Grabendach (V-förmig zusammenlaufende Flächen mit innenliegender Rinne)." },
    { topic: "Dachkonstruktionen", image: "img/sparrendach.png",
      front: "Unterschied Sparrendach und Pfettendach?",
      back: "Beim Sparrendach stützen sich die gegenüberliegenden Sparren gegenseitig ab und bilden mit dem Dachbalken ein starres Dreieck – ohne innere Stützen, aber begrenzte Spannweite. Beim Pfettendach lagern die Sparren auf horizontalen Pfetten, die über Pfosten und Kopfbänder abgetragen werden; das erlaubt größere Spannweiten und Öffnungen, braucht aber Stützen im Inneren." },
    { topic: "Deckenkonstruktionen", image: "img/balkenanordnung.png",
      front: "Balkenarten in der Balkenlage einer Holzbalkendecke?",
      back: "Durchgehende Balken laufen über die volle Länge; gestoßene Balken sind längs gestoßen; Stichbalken laufen nicht durch, sondern binden an einen Wechsel an. Der Wechsel ist ein quer eingesetzter Balken, der unterbrochene Balken an Öffnungen (Treppe, Kamin) auffängt. Streich- und Giebelbalken liegen am Rand, Füllhölzer schließen Zwischenräume." },
    { topic: "Deckenkonstruktionen", image: "img/stahlbetondecken.png",
      front: "Deckenarten im Stahlbetonbau (Überblick)?",
      back: "Platten über Unterzügen können einachsig (eine Tragrichtung) oder kreuzweise/zweiachsig gespannt sein. Stützengestützte Systeme kommen ohne Unterzüge aus: die Flachdecke lagert flach auf Stützen, der Flachpilz verstärkt den Stützenkopf pilzförmig. Plattenbalkendecken verbinden Platte und Balken, orthotrope Platten sind richtungsabhängig verstärkt." },
    { topic: "Flachdach", image: "img/kaltdach.png",
      front: "Zweischaliges belüftetes Flachdach (Kaltdach) – Aufbau und Idee?",
      back: "Über der tragenden Unterkonstruktion liegen Dampfsperre und Wärmedämmung; darüber ein belüfteter Zwischenraum und – getrennt davon – die obere Dachschale mit Abdichtung und Oberflächenschutz. Die durchströmte Luftschicht führt Feuchtigkeit ab. Im Gegensatz dazu ist das Warmdach einschalig und nicht belüftet, die Schichten liegen direkt aufeinander." },
    { topic: "Dachkonstruktionen", image: "img/verbindungsmittel.png",
      front: "Wichtige mechanische Verbindungsmittel im Holzbau?",
      back: "Winkelverbinder verbinden Bauteile rechtwinklig, Balkenschuh und Balkenträger hängen Balken U-förmig an, Sparrenhalter und Pfettenanker sichern Sparren bzw. Pfetten. Gerber-, Knagge- und Universalverbinder übertragen Kräfte an Stößen und Anschlüssen, und das Windrispenband steift die Dachfläche diagonal gegen Windkräfte aus." },
    { topic: "Fenster & Fassaden", image: "img/pfosten-riegel-systeme.png",
      front: "Pfosten-Riegel-Fassade – Tragprinzip?",
      back: "Vertikale Pfostenprofile bilden das tragende Grundgerüst und leiten die Lasten in das Primärtragwerk (Stützen, Decken). Horizontale Riegelprofile spannen zwischen den Pfosten und halten die Verglasungs- bzw. Füllelemente. Bei geringen Pfostenabständen können die Pfosten allein – ohne tragende Riegel – alle Lasten übernehmen." },
    { topic: "Holzbausysteme", image: "img/holztafelbau.png",
      front: "Holztafel-/Holzrahmenbau erkennen?",
      back: "Das Tragwerk besteht aus einem Rahmen (Ständer, Rähm, Schwelle), der beidseitig beplankt wird und so aussteifende Tafeln bildet. Wände und Decken werden als geschosshohe, oft vorgefertigte Tafeln montiert. Die Bauweise ist effizient, leicht und ermöglicht hohen Vorfertigungsgrad." }
  ]
};
