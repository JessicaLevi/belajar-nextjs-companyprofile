const nextJest = require("next/jest");

// Masukkan direktori project di sini agar Next.js otomatis memetakan path '@/'
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "node",
  // Tambahkan ini sebagai cadangan jika alias path masih belum terbaca otomatis
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
