export const fieldsForm = [
  {
    name: "images",
    dataType: "file",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "",
  },
  {
    name: "title",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Rubrik",
    placeholder: "Döp annonsen...",
  },
  {
    name: "category",
    fieldType: "select",
    disabled: false,
    required: true,
    title: "Kategori / Typ av möbel",
    swe: [
      "Bord",
      "Skrivbord",
      "Höj och sänkbart skrivbord",
      "Kontorsstol",
      "Stol",
      "Övrigt",
    ],
    eng: [
      "table",
      "desk",
      "raiseAndLowerableDesk",
      "officeChair",
      "chair",
      "other",
    ],
  },
  {
    name: "description",
    fieldType: "textarea",
    disabled: false,
    title: "Beskrivning",
    placeholder: "Beskriv grejen...",
  },
  {
    name: "quantity",
    dataType: "number",
    fieldType: "input",
    disabled: false,
    title: "Antal",
    placeholder: "Hur många?",
  },
  {
    name: "height",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Höjd",
    placeholder: "34 cm",
  },
  {
    name: "width",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Bredd",
    placeholder: "34 cm",
  },
  {
    name: "length",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Djup",
    placeholder: "34 cm",
  },
  {
    name: "color",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Färg",
    placeholder: "Färg",
  },
  {
    name: "material",
    dataType: "checkbox",
    fieldType: "input",
    disabled: false,
    title: "Material",
    option: [
      {
        name: "wood",
        swe: ["Trä"],
        eng: ["wood"],
      },
      {
        name: "plastic",
        swe: ["Plast"],
        eng: ["plastic"],
      },
      {
        name: "metal",
        swe: ["Metall"],
        eng: ["metal"],
      },
      {
        name: "other",
        swe: ["Annat"],
        eng: ["other"],
      },
    ],
  },
  {
    name: "condition",
    fieldType: "select",
    disabled: false,
    required: true,
    title: "Skick",
    swe: ["Nyskick", "Bra", "Sliten"],
    eng: ["Anew", "Bgood", "Cworn"],
  },
  {
    name: "areaOfUse",
    dataType: "checkbox",
    title: "Användningsområde",
    fieldType: "input",
    disabled: false,
    required: true,
    option: [
      {
        name: "indoors",
        swe: ["Inne"],
        eng: ["indoors"],
      },
      {
        name: "outside",
        swe: ["Ute"],
        eng: ["outside"],
      },
    ],
  },
  {
    name: "purchasePrice",
    dataType: "number",
    fieldType: "input",
    disabled: false,
    required: false,
    title: "Inköpspris",
    placeholder: "Inköpspris",
  },
  {
    name: "department",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Avdelning",
    placeholder: "ex. Miljöförvaltningen",
  },
  {
    name: "location",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Adress",
    placeholder: "ex. Larmvägen 33 Helsingborg",
  },

  {
    name: "contactPerson",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,

    title: "Kontaktperson",
    placeholder: "Kontaktperson",
  },
  {
    name: "phoneNumber",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Telefon",
    placeholder: "ex. 0701234567",
  },
  {
    name: "email",
    dataType: "email",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Epost",
    placeholder: "namn.efternamn@helsingborg.se",
  },
];

export const fieldsEditForm = [
  {
    name: "images",
    dataType: "file",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "",
  },
  {
    name: "title",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Rubrik",
    placeholder: "Döp annonsen...",
  },
  {
    name: "category",
    fieldType: "select",
    disabled: false,
    required: true,
    title: "Kategori / Typ av möbel",
    swe: [
      "Bord",
      "Skrivbord",
      "Höj och sänkbart skrivbord",
      "Kontorsstol",
      "Stol",
      "Övrigt",
    ],
    eng: [
      "table",
      "desk",
      "raiseAndLowerableDesk",
      "officeChair",
      "chair",
      "other",
    ],
  },
  {
    name: "description",
    fieldType: "textarea",
    disabled: false,
    title: "Beskrivning",
    placeholder: "Beskriv grejen...",
  },
  {
    name: "quantity",
    dataType: "number",
    fieldType: "input",
    disabled: false,
    title: "Antal",
    placeholder: "Hur många?",
  },
  {
    name: "height",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Höjd",
    placeholder: "34 cm",
  },
  {
    name: "width",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Bredd",
    placeholder: "34 cm",
  },
  {
    name: "length",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Djup",
    placeholder: "34 cm",
  },
  {
    name: "color",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Färg",
    placeholder: "Färg",
  },
  {
    name: "material",
    dataType: "checkbox",
    fieldType: "input",
    disabled: false,
    title: "Material",
    option: [
      {
        name: "wood",
        swe: ["Trä"],
        eng: ["wood"],
      },
      {
        name: "plastic",
        swe: ["Plast"],
        eng: ["plastic"],
      },
      {
        name: "metal",
        swe: ["Metall"],
        eng: ["metal"],
      },
      {
        name: "other",
        swe: ["Annat"],
        eng: ["other"],
      },
    ],
  },
  {
    name: "condition",
    fieldType: "select",
    disabled: false,
    required: true,
    title: "Skick",
    swe: ["Nyskick", "Bra", "Sliten"],
    eng: ["Anew", "Bgood", "Cworn"],
  },
  {
    name: "areaOfUse",
    dataType: "checkbox",
    title: "Användningsområde",
    fieldType: "input",
    disabled: false,
    required: true,
    option: [
      {
        name: "indoors",
        swe: ["Inne"],
        eng: ["indoors"],
      },
      {
        name: "outside",
        swe: ["Ute"],
        eng: ["outside"],
      },
    ],
  },
  {
    name: "purchasePrice",
    dataType: "number",
    fieldType: "input",
    disabled: false,
    required: false,
    title: "Inköpspris",
    placeholder: "Inköpspris",
  },
  {
    name: "department",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Avdelning",
    placeholder: "ex. Miljöförvaltningen",
  },
  {
    name: "location",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Adress",
    placeholder: "ex. Larmvägen 33 Helsingborg",
  },

  {
    name: "contactPerson",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Kontaktperson",
    placeholder: "Kontaktperson",
  },
  {
    name: "phoneNumber",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Telefon",
    placeholder: "ex. 0701234567",
  },
  {
    name: "email",
    dataType: "email",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Epost",
    placeholder: "namn.efternamn@helsingborg.se",
  },
];
