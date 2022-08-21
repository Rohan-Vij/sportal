import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config.cjs"; // IMPORTANT that the path is NOT relative, only the file name

export default resolveConfig(tailwindConfig);
