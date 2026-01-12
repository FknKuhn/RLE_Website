import ServicesPage from "@/components/servicespage";
import { Suspense } from "react";

export default async function Page(){
  return (<Suspense><ServicesPage/></Suspense>);
}