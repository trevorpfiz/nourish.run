import { env } from "~/env";

export const HOME_DOMAIN = `https://${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

export const APP_HOSTNAMES = new Set([
  `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  `preview.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  "localhost:3000",
  "localhost",
]);

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
      : "http://localhost:3000";

export const APP_DOMAIN_WITH_NGROK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
      : process.env.NGROK_URL ?? "http://localhost:3000";

// --- nutrient dashboard ---
export const nutrient = {
  General: ["Energy", "Water", "Alcohol", "Caffeine"],
  Protein: [
    {
      Protein: [
        {
          "Essential - Muscle Building and Repair": [
            "Isoleucine",
            "Leucine",
            "Valine",
          ],
        },
        {
          "Essential - Muscle Building and Repair": [
            "Lysine",
            "Methionine",
            "Phenylalanine",
            "Threonine",
            "Tryptophan",
            "Histidine",
          ],
        },
        {
          "Conditionally Essential (e.g., stress, illness)": [
            "Arginine",
            "Cystine",
            "Glutamine",
            "Glycine",
            "Tyrosine",
          ],
        },
      ],
    },
  ],
  Fats: [
    {
      Fat: [
        {
          Polyunsaturated: [
            {
              "Omega-3": ["DHA", "EPA", "DPA", "ALA"],
            },
            {
              "Omega-6": ["Linoleic Acid", "Arachidonic Acid"],
            },
          ],
        },
        "Monounsaturated",
        "Short-Chain Fatty Acids (SCFAs)",
        "Medium-Chain Triglycerides (MCTs)",
        "Saturated",
        "Tans Fats",
      ],
    },
    "Cholesterol",
  ],
  Carbohydrates: [
    {
      Carbs: [
        "Fiber",
        "Starch",
        {
          Sugars: [
            {
              "Simple Sugars - Immediate Energy Source": [
                "Glucose",
                "Fructose",
                "Galactose",
              ],
            },
            {
              "Disaccharides - Require Breakdown": [
                "Sucrose (Table Sugar)",
                "Lactose (Milk Sugar)",
                "Maltose",
              ],
            },
          ],
        },
      ],
    },
    "Net Carbs",
  ],
  Vitamins: [
    {
      "Excreted - Replenish Daily": [
        {
          "Fat-Soluble": [
            "Vitamin A",
            "Vitamin D",
            "Vitamin E",
            "Vitamin K",
            "Vitamin K2",
          ],
        },
        {
          "Water-Soluble": [
            "Vitamin C",
            "Vitamin B1 (Thiamine)",
            "Vitamin B2 (Riboflavin)",
            "Vitamin B3 (Niacin)",
            "Vitamin B5 (Pantothenic Acid)",
            "Vitamin B6 (Pyridoxine)",
            "Vitamin B7 (Biotin)",
            "Vitamin B9 (Folate)",
            "Vitamin B12 (Cobalamin)",
          ],
        },
      ],
    },
  ],
  // not done
};

export const categoryOrder = [
  "General",
  "Protein",
  "Fats",
  "Carbohydrates",
  "Vitamins",
  "Minerals",
];

export const idToOrderMap = {
  // General
  1008: 1, // Energy
  1051: 2, // Water
  1018: 3, // Alcohol
  1057: 4, // Caffeine

  // Protein
  1003: 1, // Protein
  // Essential - Muscle Building and Repair
  1212: 1, // Isoleucine
  1213: 2, // Leucine
  1219: 3, // Valine
  // Essential - Must be Obtained from Diet
  1214: 1, // Lysine
  1215: 2, // Methionine
  1217: 3, // Phenylalanine
  1211: 4, // Threonine
  1210: 5, // Tryptophan
  1221: 6, // Histidine
  // Conditionally Essential (e.g., stress, illness)
  1220: 1, // Arginine
  1216: 2, // Cystine
  1233: 3, // Glutamine
  1218: 4, // Tyrosine

  // Fats
  1004: 1, // Fat
  // Subtypes of Fat
  1293: 1, // Polyunsaturated
  1: 1, // Omega-3
  // Subtypes of Omega-3
  1272: 1, // DHA
  1278: 2, // EPA
  1280: 3, // DPA
  1404: 4, // ALA
  2: 2, // Omega-6
  // Subtypes of Omega-6
  1269: 1, // Linoleic Acid
  1271: 2, // Arachidonic Acid

  1292: 2, // Monounsaturated
  1259: 3, // Short-Chain Fatty Acids (SCFAs)
  3: 4, // Medium-Chain Triglycerides (MCTs)
  1258: 5, // Saturated
  1257: 6, // Trans Fats

  1253: 2, // Cholesterol

  // Carbohydrates
  1005: 1, // Carbs
  // Subtypes of Carbs
  1079: 1, // Fiber
  1009: 2, // Starch
  2000: 3, // Sugars
  // Simple Sugars - Immediate Energy Source
  1011: 1, // Glucose
  1012: 2, // Fructose
  1075: 3, // Galactose
  // Disaccharides - Require Breakdown
  1010: 1, // Sucrose (Table Sugar)
  1013: 2, // Lactose (Milk Sugar)
  1014: 3, // Maltose

  9: 2, // Net Carbs

  // Vitamins
  // Excreted - Replenish Daily
  1165: 1, // B1 (Thiamine)
  1166: 2, // B2 (Riboflavin)
  1167: 3, // B3 (Niacin)
  1170: 4, // B5 (Pantothenic Acid)
  1175: 5, // B6 (Pyridoxine)
  1190: 6, // B9 (Folate)
  1178: 7, // B12 (Cobalamin)
  1162: 8, // Vitamin C
  1180: 9, // Choline
  // Stored - Replenish Weekly
  1106: 1, // Vitamin A
  // Subtypes of Vitamin A
  1108: 1, // Alpha-carotene
  1107: 2, // Beta-carotene
  1120: 3, // Beta-cryptoxanthin
  1105: 4, // Retinol

  1110: 2, // Vitamin D
  1109: 3, // Vitamin E
  1185: 4, // Vitamin K1

  // Minerals
  // Essential Daily Intake - High Priority
  1090: 1, // Magnesium
  1089: 2, // Iron
  1087: 3, // Calcium
  1092: 4, // Potassium
  1095: 5, // Zinc
  // Important for Regular Intake - Moderate Priority
  1093: 1, // Sodium
  1091: 2, // Phosphorus
  1103: 3, // Selenium
  // Flexible Intake - Lower Priority
  1098: 1, // Copper
  1101: 2, // Manganese
};

type IdToOrderHierarchyMap = Record<number, string>;

export const idToOrderHierarchyMap: IdToOrderHierarchyMap = {
  // General
  1008: "1", // Energy
  1051: "2", // Water
  1018: "3", // Alcohol
  1057: "4", // Caffeine

  // Protein
  1003: "1", // Protein
  // Essential - Muscle Building and Repair
  1212: "1.1", // Isoleucine
  1213: "1.2", // Leucine
  1219: "1.3", // Valine
  // Essential - Must be Obtained from Diet
  1214: "1.4", // Lysine
  1215: "1.5", // Methionine
  1217: "1.6", // Phenylalanine
  1211: "1.7", // Threonine
  1210: "1.8", // Tryptophan
  1221: "1.9", // Histidine
  // Conditionally Essential (e.g., stress, illness)
  1220: "1.10", // Arginine
  1216: "1.11", // Cystine
  1233: "1.12", // Glutamine
  1218: "1.13", // Tyrosine

  // Fats
  1004: "1", // Fat
  // Polyunsaturated
  1293: "1.1", // Polyunsaturated
  1: "1.1.1", // Omega-3
  // Subtypes of Omega-3
  1272: "1.1.1.1", // DHA
  1278: "1.1.1.2", // EPA
  1280: "1.1.1.3", // DPA
  1404: "1.1.1.4", // ALA
  2: "1.1.2", // Omega-6
  // Subtypes of Omega-6
  1269: "1.1.2.1", // Linoleic Acid
  1271: "1.1.2.2", // Arachidonic Acid
  // Other Fat Subtypes
  1292: "1.2", // Monounsaturated
  1259: "1.3", // Short-Chain Fatty Acids (SCFAs)
  3: "1.4", // Medium-Chain Triglycerides (MCTs)
  1262: "1.4.1", // Capric Acid
  1261: "1.4.2", // Caprylic Acid
  1260: "1.4.3", // Caproic Acid
  1258: "1.5", // Saturated
  1257: "1.6", // Trans Fats
  1253: "2", // Cholesterol

  // Carbohydrates
  1005: "1", // Carbs
  // Subtypes of Carbs
  1079: "1.1", // Fiber
  1009: "1.2", // Starch
  2000: "1.3", // Sugars
  // Simple Sugars - Immediate Energy Source
  1011: "1.3.1", // Glucose
  1012: "1.3.2", // Fructose
  1075: "1.3.3", // Galactose
  // Disaccharides - Require Breakdown
  1010: "1.3.4", // Sucrose (Table Sugar)
  1013: "1.3.5", // Lactose (Milk Sugar)
  1014: "1.3.6", // Maltose
  9: "2", // Net Carbs

  // Vitamins
  // Excreted - Replenish Daily
  1165: "1", // B1 (Thiamine)
  1166: "2", // B2 (Riboflavin)
  1167: "3", // B3 (Niacin)
  1170: "4", // B5 (Pantothenic Acid)
  1175: "5", // B6 (Pyridoxine)
  1190: "6", // B9 (Folate)
  1178: "7", // B12 (Cobalamin)
  1162: "8", // Vitamin C
  1180: "9", // Choline
  // Stored - Replenish Weekly
  1106: "10", // Vitamin A
  // Subtypes of Vitamin A
  1108: "10.1", // Alpha-carotene
  1107: "10.2", // Beta-carotene
  1120: "10.3", // Beta-cryptoxanthin
  1105: "10.4", // Retinol
  1110: "11", // Vitamin D
  1109: "12", // Vitamin E
  1185: "13", // Vitamin K1

  // Minerals
  // Essential Daily Intake - High Priority
  1090: "1", // Magnesium
  1089: "2", // Iron
  1087: "3", // Calcium
  1092: "4", // Potassium
  1095: "5", // Zinc
  // Important for Regular Intake - Moderate Priority
  1093: "6", // Sodium
  1091: "7", // Phosphorus
  1103: "8", // Selenium
  // Flexible Intake - Lower Priority
  1098: "9", // Copper
  1101: "10", // Manganese
};

export const subheadingOrderMap = {
  // General Subheadings
  // No specific subheadings under General

  // Protein Subheadings
  "Essential - Muscle Building and Repair": 1,
  "Essential - Must be Obtained from Diet": 2,
  "Conditionally Essential (e.g., stress, illness)": 3,

  // Fats Subheadings
  // No specific subheadings under Fats

  // Carbohydrates Subheadings
  "Simple Sugars - Immediate Energy Source": 1,
  "Disaccharides - Require Breakdown": 2,

  // Vitamins Subheadings
  "Excreted - Replenish Daily": 1,
  "Stored - Replenish Weekly": 2,

  // Minerals Subheadings
  "Essential Daily Intake - High Priority": 1,
  "Important for Regular Intake - Moderate Priority": 2,
  "Flexible Intake - Lower Priority": 3,
};
