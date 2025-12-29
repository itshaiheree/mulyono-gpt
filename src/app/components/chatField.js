"use client";

import { useRef, useState, useEffect } from "react";
import getSession from "../module/getSession";
import setSession from "../module/setSession";
import Content from '../components/content';
import Image from "next/image";

export default function Chat() {
  const textareaRef = useRef(null);
  const bottomRef = useRef(null);
  const [roundTextArea, setRoundTextArea] = useState(0);

useEffect(() => {
      setRoundTextArea("rounded-full");
  }, []);

  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [session, setSessionState] = useState(null);
  const [loading, setLoading] = useState(false);


  const isEmpty = messages.length === 0;

  /* =========================
     DETECT MOBILE DEVICE
  ========================= */
  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  /* =========================
     MOBILE KEYBOARD AWARE
  ========================= */
  useEffect(() => {
    if (!window.visualViewport) return;

    const handleViewport = () => {
      const vv = window.visualViewport;
      const offset = window.innerHeight - vv.height - vv.offsetTop;
      setKeyboardOffset(offset > 0 ? offset : 0);
    };

    window.visualViewport.addEventListener("resize", handleViewport);
    window.visualViewport.addEventListener("scroll", handleViewport);

    return () => {
      window.visualViewport.removeEventListener("resize", handleViewport);
      window.visualViewport.removeEventListener("scroll", handleViewport);
    };
  }, []);

  /* =========================
     AUTO HEIGHT TEXTAREA
  ========================= */
  const autoResize = () => {
    const el = textareaRef.current;

    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";

    if (el.scrollHeight <= 80) {
        setRoundTextArea("rounded-full");
    } else {
        setRoundTextArea("rounded-3xl");
    }
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSend = async () => {
    if (!value.trim()) return;

    const text = value.trim();

    setMessages((prev) => [...prev, { role: "user", text }]);
    setValue("");
    setLoading(true);

    requestAnimationFrame(() => {
      textareaRef.current.style.height = "36px";
    });

    try {
      const savedSession = session || (await getSession());

      const params = new URLSearchParams({
        text,
        ...(savedSession && { session: savedSession }),
      });

       const res = await fetch(`https://api.ryzumi.vip/api/ai/v2/chatgpt?${params}&prompt=Anggap%20kamu%20adalah%20Mulyono`, {
        method: "GET",
      });

      const data = await res.json();

      if (data.success) {
        setSessionState(data.session);
        setSession(data.session);

        console.log("New Session:", data);

        setMessages((prev) => [
          ...prev,
          { role: "ai", text: data.result },
        ]);
      } else {
        throw new Error(data.error);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: 'Umm... Otak aku crash nih\n\nKemungkinan besar karena pesan dari kamu terlalu "berbahaya" buat aku proses 😅\n\nCoba hindari penggunaan kata-kata kasar, rasis dan yang mengandung unsur pornografi' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     KEYBOARD LOGIC
  ========================= */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) return;
    if (e.key === "Enter" && isMobile) return;
    if (e.key === "Enter" && !isMobile) {
      e.preventDefault();
      handleSend();
    }
  };

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);


  return (
    <>
    {/* BAGIAN INTRO */}
<div className={`textarea-hide-scrollbar fixed inset-0 items-center justify-center
    text-center items-center justify-center text-center pb-35 ${
            isEmpty
              ? "flex"
              : "hidden"
          }`}>
              <Content>
                <Image
        src="/mulyonogpt-profile.png"
        alt="MulyonoGPT Profile" width={100} height={100} />
             <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-3">
        Halo!
      </h1>
              <p className="text-lg md:text-xl mt-2">
                Aku <a className="font-bold">MulyonoGPT</a>, ditenagai oleh ChatGPT API dari <a className="link" href="https://api.ryzumi.vip/">Ryzumi API</a>, siap menjawab segala hal darimu.
</p>
<p className="text-sm md:text-md mt-4 md:mt-2">
                MulyonoGPT <a className="font-bold">tidak menyimpan riwayat chat</a>, namun <a className="font-bold">sessionKey terakhir</a> dari chat kamu <a className="font-bold">akan disimpan dalam cookie di browsermu</a> agar percakapan dapat dilanjutkan dan lebih relevan.
</p>

<p className="text-xs md:text-sm mt-15">
                ⚠️ Project Ini Hanyalah Sekedar Bahan Hiburan ⚠️</p>
                <p className="text-xs md:text-sm mt-3">⚠️ Jawaban Yang Dihasilkan Kualitasnya Lebih Rendah Dibandingkan ChatGPT Biasa ⚠️
</p>
            </Content>

            
            
            </div>

      {/* CHAT BUBBLE AREA */}
      <div className="min-h-auto pt-5">
      <div
        className={`
          pb-40 px-4 pt-4 space-y-3 max-w-4xl mx-auto
          transition-all duration-300
          ${
            isEmpty
              ? "textarea-hide-scrollbar hidden overflow-hidden"
              : "overflow-y-auto rounded-xl z-1"
          }
        `}
        style={{ minHeight: "60vh" }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat ${
              m.role === "user" ? "chat-end" : "chat-start"
            }`}
          >
            <div className={`chat-bubble rounded-t-xl whitespace-pre-line p-3 ${
              m.role === "user" ? "chat-bubble-success rounded-l-xl" : "chat-bubble-primary rounded-r-xl"
            }`}>
              {m.text}
            </div>
            <div className={`chat-image avatar ${
              m.role === "user" ? "hidden" : ""
            }`}>
    <div className={`w-10 rounded-full`}>
      <img
        alt="Mulyono Avatar"
        src="/mulyonogpt-profile.png"
      />
    </div>
  </div>
          </div>
        ))}

        {loading && (
          <div className="chat chat-start">
            <div className="chat-bubble rounded-t-xl rounded-r-xl chat-bubble-base-100 p-3">
              ...
            </div>
            <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Mulyono Avatar"
        src="/mulyonogpt-profile.png"
      />
    </div>
  </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
</div>

      {/* INPUT FIELD */}
      <div
        className="fixed inset-x-0 z-50"
        style={{
          bottom: keyboardOffset,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="max-w-4xl mx-auto px-3 pt-5 pb-2">
          <div className={`flex items-center gap-2 bg-base-300 ${roundTextArea} px-3 py-2`}>
            <textarea
              ref={textareaRef}
              value={value}
              rows={1}
              placeholder="Tanya sesuatu"
              inputMode="text"
              enterKeyHint={isMobile ? "enter" : "send"}
              autoCapitalize="sentences"
              autoCorrect="on"
              spellCheck={true}
              className={`
                textarea bg-transparent border-0
                focus:outline-none focus:ring-0
                w-full resize-none
                placeholder:text-left
                whitespace-pre-wrap break-words
                overflow-y-auto overflow-x-hidden
                flex items-center
                py-[10px]                  
                leading-normal
                ${!value ? "textarea-hide-scrollbar" : ""}
     `}
  style={{
    minHeight: "44px",        
    maxHeight: "150px",        
    display: 'flex',
    alignItems: 'center'
  }}
  onInput={autoResize}
  onChange={(e) => setValue(e.target.value)}
  onKeyDown={handleKeyDown}
  disabled={loading === true}
/>

<button
      onClick={handleSend}
      className={`btn btn-circle btn-primary btn-md shrink-0 flex items-center justify-center ${!value.trim() && !loading ? "btn-disabled hidden" : ""} ${loading ? "btn-disabled" : ""}`}
    >
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <span className="">➤</span>
      )}
    </button>
          </div>
        </div>
        
<div className="bg-base-200 w-full rounded-xl py-2 pt-3">
          <div className="text-[12px] text-center leading-snug opacity-40">
            <p>
              Jawaban Dihasilkan Oleh AI Yang Dapat Melakukan Kesalahan. Periksa
              Kembali Jawaban.
            </p>
            <p className="mt-1">
              <a
                href="https://api.ryzumi.vip/images/qris.png"
                className="link underline"
              >
                Support Dev API
              </a>{" "}
              |{" "}
              <a
                href="https://saweria.co/akuanaksehatt"
                className="link underline"
              >
                Support Web Dev
              </a>{" "}
              |{" "}
              <a
                href="https://github.com/itshaiheree/mulyono-gpt"
                className="link underline"
              >
                Star Us On Github
              </a>
            </p>
          </div>
          </div>
      </div>
    </>
  );
}
