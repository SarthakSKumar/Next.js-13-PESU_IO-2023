import styles from "../page.module.css";

import Button from "../components/button";
import Heading from "../components/heading";

export default function Home() {
  return (
    <main>
      <Heading number={9}/>
      <h1>Next.js + Tailwind CSS Boilerplate</h1>
      <p>
        This is a boilerplate for Next.js 13 with Tailwind CSS 2.2, PostCSS 8,
        and CSS Modules.
      </p>
    </main>
  );
}