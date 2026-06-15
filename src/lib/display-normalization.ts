function trimCollapse(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function lookupKey(value: string): string {
  return trimCollapse(value).toLowerCase();
}

function capitalizeFirst(value: string): string {
  const trimmed = trimCollapse(value);

  if (!trimmed) {
    return trimmed;
  }

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function titleCaseEnglishWords(value: string): string {
  return trimCollapse(value)
    .split(" ")
    .map((word) => {
      if (/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(word)) {
        return word
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
          .join("-");
      }

      return word;
    })
    .join(" ");
}

function mapDisplayValue(
  value: string,
  map: Record<string, string>,
  fallback: (trimmed: string) => string,
): string {
  const trimmed = trimCollapse(value);

  if (!trimmed) {
    return trimmed;
  }

  const mapped = map[lookupKey(trimmed)] ?? map[trimmed];

  if (mapped) {
    return mapped;
  }

  return fallback(trimmed);
}

const SPECIES_MAP: Record<string, string> = {
  狗: "Dog",
  犬: "Dog",
  dog: "Dog",
  猫: "Cat",
  cat: "Cat",
  鸟: "Bird",
  bird: "Bird",
  兔: "Rabbit",
  rabbit: "Rabbit",
  其他: "Other",
  other: "Other",
};

const GENDER_MAP: Record<string, string> = {
  公: "Male",
  男: "Male",
  male: "Male",
  母: "Female",
  女: "Female",
  female: "Female",
  未知: "Unknown",
  不知道: "Unknown",
  unknown: "Unknown",
};

const COUNTRY_MAP: Record<string, string> = {
  中国: "China",
  china: "China",
  cn: "China",
  澳洲: "Australia",
  澳大利亚: "Australia",
  australia: "Australia",
  au: "Australia",
  美国: "United States",
  "united states": "United States",
  usa: "United States",
  us: "United States",
  英国: "United Kingdom",
  uk: "United Kingdom",
  "united kingdom": "United Kingdom",
  gb: "United Kingdom",
  加拿大: "Canada",
  canada: "Canada",
  ca: "Canada",
  新西兰: "New Zealand",
  "new zealand": "New Zealand",
  nz: "New Zealand",
  日本: "Japan",
  japan: "Japan",
  jp: "Japan",
  韩国: "South Korea",
  korea: "South Korea",
  "south korea": "South Korea",
  kr: "South Korea",
  新加坡: "Singapore",
  singapore: "Singapore",
  sg: "Singapore",
};

const BREED_MAP: Record<string, string> = {
  西高地: "West Highland White Terrier",
  西高地白梗: "West Highland White Terrier",
  westie: "West Highland White Terrier",
  比熊: "Bichon Frise",
  比熊犬: "Bichon Frise",
  bichon: "Bichon Frise",
  法国斗牛犬: "French Bulldog",
  法斗: "French Bulldog",
  frenchie: "French Bulldog",
  金毛: "Golden Retriever",
  金毛寻回犬: "Golden Retriever",
  边牧: "Border Collie",
  边境牧羊犬: "Border Collie",
  中华田园犬: "Chinese Rural Dog",
  田园犬: "Chinese Rural Dog",
  土狗: "Chinese Rural Dog",
  柯基: "Corgi",
  威尔士柯基: "Welsh Corgi",
  柴犬: "Shiba Inu",
  拉布拉多: "Labrador Retriever",
  拉布拉多寻回犬: "Labrador Retriever",
  贵宾: "Poodle",
  贵宾犬: "Poodle",
  泰迪: "Poodle",
  "toy poodle": "Toy Poodle",
  哈士奇: "Siberian Husky",
  阿拉斯加: "Alaskan Malamute",
  萨摩耶: "Samoyed",
  博美: "Pomeranian",
  约克夏: "Yorkshire Terrier",
  雪纳瑞: "Schnauzer",
  马尔济斯: "Maltese",
  腊肠: "Dachshund",
  吉娃娃: "Chihuahua",
  巴哥: "Pug",
  松狮: "Chow Chow",
  德牧: "German Shepherd",
  德国牧羊犬: "German Shepherd",
  杜宾: "Doberman Pinscher",
  罗威纳: "Rottweiler",
  秋田: "Akita",
  可卡: "Cocker Spaniel",
  喜乐蒂: "Shetland Sheepdog",
};

export function displaySpecies(value: string): string {
  return mapDisplayValue(value, SPECIES_MAP, capitalizeFirst);
}

export function displayGender(value: string): string {
  return mapDisplayValue(value, GENDER_MAP, capitalizeFirst);
}

export function displayCountry(value: string): string {
  return mapDisplayValue(value, COUNTRY_MAP, capitalizeFirst);
}

export function displayBreed(value: string): string {
  return mapDisplayValue(value, BREED_MAP, titleCaseEnglishWords);
}
