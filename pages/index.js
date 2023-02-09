import Head from "next/head";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import CustomHead from "./../ui/CustomHead";
import { useRouter } from "next/router";
import { useState } from "react";
import LoaderPage from "./../ui/Loader";
import { useEffect } from "react";

export default function Home() {
  let router = useRouter();
  router.push("/login");
}
