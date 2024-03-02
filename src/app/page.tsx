import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
export default function Home() {
  const { userId } = auth();
  // if (userId) {
  //   redirect("/dashboard");
  // }

  const name = Cookies.get("userId");
  return <h1>Özkanım kolay gelsin {name}</h1>;
}
