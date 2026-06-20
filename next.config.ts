import path from "node:path";
import type { NextConfig } from "next";
import { basePath } from "./lib/basePath";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
