import type { Metadata } from "next";
import WordmarkPlayground from "@/components/playground/WordmarkPlayground";
import "./playground.css";

export const metadata: Metadata = {
  title: "Wordmark playground",
  description: "Drawn lowercase lettering, an ordered tuck, and code you can take with you. Make your own animated wordmark.",
  robots: {index:false,follow:true},
};
export default function PlaygroundPage(){return <WordmarkPlayground/>;}
