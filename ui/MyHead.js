import Head from "next/head";

export default function MyHead(props) {
  return (
    <Head>
      <title>{props.title}</title>
    </Head>
  );
}
