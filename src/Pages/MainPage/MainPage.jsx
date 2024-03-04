import React, { useContext, useEffect } from "react";
import Loader from "../../Components/CompMainPage/Loader/Loader";
import ListVacancies from "../../Components/CompMainPage/listVacancies/ListVacancies";
import Lenis from "@studio-freight/lenis";
import PopupSend from "../../Components/PopupSendToServer/PopupSend";
import { observer } from "mobx-react-lite";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Context } from "../..";

const MainPage = observer(() => {
  const { isOpenPopupServer } = useContext(Context);
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  // useEffect(() => {
  //   isOpenPopupServer.isOpen
  //     ? document.querySelector("body").classList.add("loading")
  //     : document.querySelector("body").classList.remove("loading");
  // }, [isOpenPopupServer.isOpen]);
  return (
    <>
      <Header />
      <Loader />
      <ListVacancies />
      <PopupSend />
      <Footer />
    </>
  );
});

export default MainPage;
