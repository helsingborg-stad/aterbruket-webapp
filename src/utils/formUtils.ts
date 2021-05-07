export const fieldsForm = [
  {
    name: "images",
    dataType: "file",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Bilder",
  },
  {
    name: "title",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Titel",
  },
  {
    name: "category",
    fieldType: "select",
    disabled: false,
    required: true,
    title: "Typ av möbel",
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
    name: "quantity",
    dataType: "number",
    fieldType: "input",
    disabled: false,
    title: "Antal",
  },
  {
    name: "height",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Höjd",
  },
  {
    name: "width",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Bredd",
  },
  {
    name: "length",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Djup",
  },
  {
    name: "color",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Färg",
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
  },
  {
    name: "description",
    fieldType: "textarea",
    disabled: false,
    title: "Beskrivning",
  },

  {
    name: "contactPerson",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,

    title: "Kontaktperson",
  },
  {
    name: "email",
    dataType: "email",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Email till kontaktperson",
  },
  {
    name: "phoneNumber",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Telefonnummer till kontaktperson",
  },
  {
    name: "department",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Avdelning",
  },
  {
    name: "location",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Adress",
  },
];

export const fieldsEditForm = [
  {
    name: "images",
    dataType: "file",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Bilder",
  },
  {
    name: "title",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Titel",
  },
  {
    name: "category",
    fieldType: "select",
    disabled: false,
    required: true,
    title: "Typ av möbel",
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
    name: "quantity",
    dataType: "number",
    fieldType: "input",
    disabled: false,
    title: "Antal",
  },
  {
    name: "height",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Höjd",
  },
  {
    name: "width",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Bredd",
  },
  {
    name: "length",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Djup",
  },
  {
    name: "color",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Färg",
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
  },
  {
    name: "description",
    fieldType: "textarea",
    disabled: false,
    title: "Beskrivning",
  },

  {
    name: "contactPerson",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Kontaktperson",
  },
  {
    name: "email",
    dataType: "email",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Email till kontaktperson",
  },
  {
    name: "phoneNumber",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    title: "Telefonnummer till kontaktperson",
  },
  {
    name: "department",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Avdelning",
  },
  {
    name: "location",
    dataType: "text",
    fieldType: "input",
    disabled: false,
    required: true,
    title: "Adress",
  },
];
