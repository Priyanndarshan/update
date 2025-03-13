import { redirect } from 'next/navigation';
import Image from "next/image";
import TestComponent from "../components/TestComponent";

export default function Home() {
  redirect('/dashboard');
}
