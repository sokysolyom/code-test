export interface IContactFormInterface {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export interface IIntroductionData {
  header: {
    annual?: string;
    titleBig?: string;
    titleSmall?: string;
    hashtag?: string;
    date?: string;
    place?: string;
  };
  calendarUrls?: {
    google?: string;
    outlook?: string;
    office?: string;
    apple?: string;
  };
  logoUrl?: string;
  mainThemes?: {
    text?: string;
  }[];
  quote?: string;
  introductionText: string;
  introductionPresidents?: IPeopleData[];
  honoraryPresidents?: IPeopleData[];
  conferencePresident?: IPeopleData[];
  organizingCommittee?: IPeopleData[];
  honoraryPresidency?: IPeopleData[];
  scientificCommittee?: IPeopleData[];
  eventOrganizer?: {
    imgsrc?: string;
    text?: string;
  };
  eventCoOrganizer?: {
    imgsrc?: string;
    text?: string;
  };
  underTheAuspices?: string[];
}

export interface IPeopleData {
  fullName: string;
  workPlace?: string;
  photo?: string;
}

export interface IAccommodationData {
  title?: string;
  accommodation?: {
    description?: string;
    descriptionBold?: string;
    equipment?: string[];
  };
  wayFromStations?: string;
  wayByPublicTransport?: string;
  addressStreet?: string;
  webPage?: {
    link?: string;
    name?: string;
  };
  telephoneNumbers?: string[];
  email?: string;
  checkIn?: string;
  checkOut?: string;
  parking?: string;
  pets?: string;
}

export interface IParkingData {
  title?: string;
  hotelParkingTitle?: string;
  hotelParking?: string;
  outsideParking?: {
    title: string;
    description?: string;
    payment?: {
      text?: string;
      table?: string;
    }[];
  }[];
  imageUrl?: string;
  imageRedirect?: string;
}

export interface IAbstractData {
  registerTerm?: string;
  activityConditions?: {
    text?: string;
    table?: string;
  }[];
  assignmentTerm?: string;
  abstractConditions?: {
    text?: string;
    table?: string;
  }[];
  sendAbstract?: string;
  forbiddenContent?: {
    text?: string;
    list?: {
      text?: string;
      table?: string;
    }[];
  };
}

export interface IPosterData {
  registerTerm?: string;
  activityConditions?: {
    text?: string;
    table?: string;
  }[];
  assignmentTerm?: string;
  posterConditions?: {
    text?: string;
    table?: string;
  }[];
  prohibitedContent?: {
    listTitle?: string;
    list?: {
      text?: string;
      table?: string;
    }[];
  };
  sendPoster?: {
    text?: string;
    methods?: {
      text?: string;
      table?: string;
    }[];
  };
  posterTemplate?: string;
  forbiddenContent?: {
    text?: string;
    list?: {
      text?: string;
      table?: string;
    }[];
  };
}

export interface IFAQData {
  organizer?: {
    text?: string;
    imageUrl?: string;
  };
  coOrganizer?: {
    text?: string;
    imageUrl?: string;
  };
  entrustedCompany?: {
    text?: string;
    imageUrl?: string;
  };
  underTheAuspices?: {
    text?: string;
    table?: string;
  }[];
  accreditation?: {
    law1?: string;
    law2?: string;
    accreditedFor?: {
      text?: string;
      people?: {
        text?: string;
        table?: string;
      }[];
    };
  };
  participationConfirmation?: string;
  nonMonetaryPayment?: string;
  importantTerms?: string;
  registrationInformation?: string;
  accommodation?: string;
  catering?: {
    text1?: string;
    text2?: string;
    table?: string;
  };
  parking?: string;
  activeParticipation?: string;
  actions?: {
    text1?: string;
    text2?: string;
    actionFor?: string[];
  };
}

export interface ISocialProgramData {
  term?: string;
  time?: string;
  fee?: string;
  paymentMethod?: string;
  capacity?: string;
  attendance?: string;
  contents?: string;
  changes?: string;
}

export interface ITemplatesData {
  presentationText?: string;
  posterText?: string;
}

export interface IVenueData {
  hotel?: string;
  addressStreet?: string;
  addressCity?: string;
  photos?: string[];
  positionMap?: {
    street: string;
    num: string;
    city: string;
    zoom: number;
  };
  buttonLink?: string;
  iFrameUrl: string;
}

export interface IRegisterPageData {
  conferenceRegisterTerm?: string;
  activityRegisterTerm?: string;
  registrationConditions?: {
    text?: string;
    table?: string;
  }[];
  registrationFee?: {
    table?: string;
    text?: string;
  };
  accommodationFee?: {
    table?: string;
    text?: string;
  };
  paymentConditions?: {
    text?: string;
    table?: string;
  }[];
  changeRegistration?: {
    text1?: string;
    boldText?: string;
    text2?: string;
  }[];
  inPlaceRegistration?: {
    text?: string;
    subCategories?: string[];
    table?: string;
  }[];
  catheringRegister?: {
    text?: string;
    table?: string;
  }[];
  registerChange?: {
    text?: string;
    table?: string;
  }[];
  conditionsChange?: string;
}

export interface IPresentationData {
  registerTerm?: string;
  activityConditions?: {
    text?: string;
    table?: string;
  }[];
  prohibitedContent?: {
    listTitle?: string;
    list?: {
      text?: string;
      table?: string;
    }[];
  };
  peresentationLawImageUrl?: string;
  presentationConditions?: {
    text?: string;
    table?: string;
  }[];
  presentationTemplate?: string;
  presentationTime?: {
    text?: string;
    table?: string;
  }[];
  sendPresentation?: {
    text?: string;
    methods?: {
      text?: string;
      table?: string;
    }[];
  };
}

export interface IWorkshopData {
  sponsor?: {
    title?: string;
    title2?: string;
    partner?: string;
  };
  date?: string;
  time?: string;
  capacity?: string;
  registration?: {
    text?: string;
    name?: string;
    email?: string;
  };
  lectors?: string[];
  mainThemes?: {
    text?: string;
    themes?: string[];
  };
  isTimeInProgram?: boolean;
  program?: {
    time?: string;
    title?: string;
    themes?: {
      text?: string;
    }[];
  }[];
}

export interface IPartner {
  bgImg: string;
  logo: string;
  description1?: string; // Optional, since not all partners have it
  description2?: string; // Optional, since not all partners have it
  linkName?: string;
  link?: string;
  videoCDNUrl?: string[]; // Optional, since some partners don't have videos
  portfolioImg?: string[];
}

export interface IEmailRespones {
  statusCode: number;
  message: string;
}
