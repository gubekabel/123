import Head from "next/head";

export default function CustomHead(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.desc} />
      <meta http-equiv="X-UA-Compatible" content="IE=7" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="keywords" content={props.keywords} />
    </Head>
  );
}
