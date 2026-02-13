import React, { useEffect, useMemo, useRef, useState } from "react";
import p1 from "./assets/photos/1.jpg";
import p2 from "./assets/photos/2.jpg";
import p3 from "./assets/photos/3.jpg";
import p4 from "./assets/photos/4.jpg";
import p5 from "./assets/photos/5.jpg";
import p6 from "./assets/photos/6.jpg";
import p7 from "./assets/photos/7.jpg";
import p8 from "./assets/photos/8.jpg";
import p9 from "./assets/photos/9.jpg";
import p10 from "./assets/photos/10.jpg";
import p11 from "./assets/photos/11.jpg";
import p12 from "./assets/photos/12.jpg";
import p13 from "./assets/photos/13.jpg";
import p14 from "./assets/photos/14.jpg";
import p15 from "./assets/photos/15.jpg";
import p16 from "./assets/photos/16.jpg";
import p17 from "./assets/photos/17.jpg";
import p18 from "./assets/photos/18.jpg";
import p19 from "./assets/photos/19.jpg";
import p20 from "./assets/photos/20.jpg";
import p21 from "./assets/photos/21.jpg";
import p22 from "./assets/photos/22.jpg";
import p23 from "./assets/photos/23.jpg";
import p24 from "./assets/photos/24.jpg";
import p25 from "./assets/photos/25.jpg";
import p26 from "./assets/photos/26.jpg";
import p27 from "./assets/photos/27.jpg";
import p28 from "./assets/photos/28.jpg";
import p29 from "./assets/photos/29.jpg";
import p30 from "./assets/photos/30.jpg";
import songMp3 from "./assets/music/music.mp3";
import songPoster from "./assets/music/banner.jpg";
import logo from "./assets/logo.png";


function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function Starfield() {
  const stars = useMemo(() => {
    const n = 80;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2.4,
      tw: 2 + Math.random() * 4,
      delay: Math.random() * 4,
      op: 0.25 + Math.random() * 0.55,
    }));
  }, []);

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.op,
            animationDuration: `${s.tw}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = useMemo(() => {
    const n = 18;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 20 + Math.random() * 75,
      size: 10 + Math.random() * 24,
      dur: 7 + Math.random() * 10,
      delay: Math.random() * 4,
      drift: (Math.random() * 2 - 1) * 18,
      op: 0.14 + Math.random() * 0.22,
    }));
  }, []);

  return (
    <div className="floaters" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floater"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            opacity: h.op,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            transform: `translateX(${h.drift}px)`,
          }}
        />
      ))}
    </div>
  );
}

function Confetti({ fire }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!fire) return;
    const n = 130;
    const arr = Array.from({ length: n }, (_, i) => {
      const a = Math.random() * Math.PI * 2;
      const s = 2 + Math.random() * 6;
      return {
        id: `${Date.now()}-${i}`,
        x: 50,
        y: 28,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 2.3,
        life: 0,
        rot: Math.random() * 180,
        vr: (Math.random() * 2 - 1) * 7,
        w: 2 + Math.random() * 3,
        h: 5 + Math.random() * 6,
      };
    });
    setPieces(arr);
  }, [fire]);

  useEffect(() => {
    if (!pieces.length) return;
    let raf;
    const tick = () => {
      setPieces((prev) =>
        prev
          .map((p) => {
            const drag = 0.985;
            const vx = p.vx * drag;
            const vy = p.vy * drag + 0.18;
            return {
              ...p,
              life: p.life + 1,
              vx,
              vy,
              x: p.x + vx,
              y: p.y + vy,
              rot: p.rot + p.vr,
            };
          })
          .filter((p) => p.life < 160 && p.y < 120 && p.x > -20 && p.x < 120)
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pieces.length]);

  if (!pieces.length) return null;

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti__p"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.w}px`,
            height: `${p.h}px`,
            transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
            opacity: clamp(1 - p.life / 160, 0, 1),
          }}
        />
      ))}
    </div>
  );
}

function LoveConstellation({ reducedMotion }) {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [tip, setTip] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf;
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const maxLine = 140;
      const lineAlpha = 0.28;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const others = points
          .filter((_, idx) => idx !== i)
          .map((q) => ({ q, d: dist(p, q) }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);

        others.forEach(({ q, d }) => {
          if (d > maxLine) return;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(255,255,255,${lineAlpha * (1 - d / maxLine)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,.8)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,77,141,.10)";
        ctx.fill();
      });

      if (!reducedMotion) raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [points, reducedMotion]);

  const onClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => {
      const next = [...prev, { x, y, id: `${Date.now()}-${prev.length}` }];
      if (next.length > 18) next.shift();
      return next;
    });

    setTip(false);
  };

  const clear = () => setPoints([]);

  return (
    <section className="panel panel--constellation">
      <div className="panel__head">
        <h2 className="h2">Махаббатымыздың шоқжұлдызын құрайық</h2>
        <p className="sub">
          Кез келген жерді түртсең, жүрек-жұлдыз пайда болады. Ол ең жақын жұлдыздармен байланысады.
        </p>
      </div>

      <div className="constellation">
        <canvas
          ref={canvasRef}
          className="constellation__canvas"
          onClick={onClick}
          role="img"
          aria-label="Интерактивті шоқжұлдыз кенебі. Түртіңіз - жүрек-жұлдыздар пайда болады."
        />
        {tip && (
          <div className="hint" aria-hidden="true">
            Жұлдыз жасау үшін түрт.
          </div>
        )}

        <div className="constellation__overlay" aria-hidden="true">
          {points.map((p) => (
            <span
              key={p.id}
              className="heartStar"
              style={{ left: p.x, top: p.y }}
            >
              ❤
            </span>
          ))}
        </div>

        <div className="constellation__actions">
          <button className="btn btn--ghost" onClick={clear}>
            Тазалау
          </button>
          <div className="tiny">
            Ең көбі 18 жұлдыз жасауға болады.
          </div>
        </div>
      </div>
    </section>
  );
}

function Letter({ toName = "Zhamilya", fromName = "Me" }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="panel">
      <div className="panel__head">
        <h2 className="h2">Махаббат хаты</h2>
        <p className="sub">Хатты ашу үшін жүректі түрт.</p>
      </div>

      <button
        className={"letter " + (open ? "letter--open" : "")}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="letter__top">
          <div className="seal" aria-hidden="true">❤</div>
          <div className="letter__meta">
            <div className="letter__to">Кімге: {toName}</div>
            <div className="letter__from">Кімнен: {fromName}</div>
          </div>
        </div>

        <div className="letter__paper">
<p className="letter__p">
  Биыл біздің бірге болғанымызға тура бір жыл толды. Уақыт қандай зымырап өтеді десеңші… 
  Кеше ғана танысқандай едік, ал бүгін сен менің өмірімнің ең қымбат бөлігіне айналдың.
</p>

<p className="letter__p">
  Осы бір жылдың ішінде саған шын бауыр басып қалдым. 
  Жұбына мәңгі адал аққудай, мен де саған қатты байланып қалдым. 
  Сенсіз көлде жүзе алмайтын аққудаймын - сенсіз өмірдің де сәні кем сияқты.
</p>

<p className="letter__p">
  Біз біраз нәрседен өттік. Қуанышты күндер де болды, сынақтар да болды. 
  Бірақ солардың бәрі бізді әлсіреткен жоқ - керісінше, жақындата түсті. 
  Алдымызда әлі талай ұзақ жол бар. Сол жолды сенің қолыңды ұстап бірге жүрсем екен деймін.
</p>

<p className="letter__p">
  Арамызда әрдайым сыйластық, сенім, сүйіспеншілік және шынайы махаббат болғай. 
  Қандай жағдай болса да, бір-бірімізге тірек болып, жүрегімізді таза сақтайық.
</p>

<p className="letter__p">
  Мен сені қатты жақсы көремін. Оны сөзбен жеткізу мүмкін емес. 
  Сен - менің өмірімнің гүлісің, мәнісің, жарығымсың. 
  Алланың сендей жанды жолықтырғанына шын жүректен шүкір етемін.
</p>

<p className="letter__p">
  Махаббатымыз баянды, берік әрі мәңгі болсын, жаным. 
  Мен сені шын жүрегіммен, бар болмысыммен жақсы көремін.
</p>

          <p className="letter__sign">- {fromName}</p>
          {/* <div className="letter__hint">{open ? "Жабу үшін түрт" : "Ашу үшін түрт"}</div> */}
        </div>
      </button>
    </section>
  );
}

function Reasons() {
  const items = [
  { t: "Сенің сабырлылығың", d: "Сен жанымда болсаң, уайым өз-өзінен тына қалады." },
  { t: "Сенің ойың", d: "Сенің ойларың мен үшін өте терең." },
  { t: "Сенің мейірімің", d: "Мейірімің жүректі жылытып, жанды емдейді." },
  { t: "Сенің күлкің", d: "Күлкің шықса әлем жарықтанып кетеді." },
  { t: "Сенің қасыңда болу", d: "Қасыңда отырсам, тыныштықтың өзі ән салады." },

  { t: "Сенің көзқарасың", d: "Көзіңнің ішінде тұтас бір әлем бар." },
  { t: "Сенің дауысың", d: "Даусың жанымды тербететін әуен." },
  { t: "Сенің нәзіктігің", d: "Нәзіктігің жүрегіме жібек болып оралады." },
  { t: "Сенің шынайылығың", d: "Сен бар жерде өтірік тұра алмайды." },
  { t: "Сенің жылулығың", d: "Жылуың қыстың өзін қысылтады." },
  { t: "Сенің қамқорлығың", d: "Қамқорлығың менің ішкі тыныштығым." },

  { t: "Сенің күлкіңнің үні", d: "Ол естілсе, көңілім бірден жайнап кетеді." },
  { t: "Сенің ұяңдығың", d: "Ұяңдығың ең әдемі сұлулық." },
  { t: "Сенің батылдығың", d: "Батылдығың маған да күш береді." },
  { t: "Сенің ақылдығың", d: "Ақылың менің мақтанышым." },
  { t: "Сенің қарапайымдылығың", d: "Қарапайым болған сайын, қадірің арта түседі." },
  { t: "Сенің адалдығың", d: "Адалдығың махаббаттың таза айнасы." },

  { t: "Сенің еркелеткенің", d: "Еркелетсең, жаным балқып кетеді." },
  { t: "Сенің қолдауың", d: "Сен қолдасаң, мен бәрін істей аламын." },
  { t: "Сенің сенімің", d: "Сенімің жүрегіме қанат." },
  { t: "Сенің жанарың", d: "Жанарыңда менің ең тәтті арманым тұрады." },
  { t: "Сенің қылығың", d: "Ұсақ қылықтарыңның өзі сүйкімді." },
  { t: "Сенің күлкіңнің шуағы", d: "Ол менің ішкі әлемімді жылытады." },
  { t: "Біз", d: "Біз бірге болсақ, қарапайым күн де ертегіге айналады." },

  ];

  return (
    <section className="panel">
      <div className="panel__head">
        <h2 className="h2">Саған ғашық болуымның себептері</h2>
        <p className="sub">Мыңның ішіндегі бірнешеуі ғана…</p>
      </div>

      <div className="grid">
        {items.map((it, i) => (
          <article className="card" key={i}>
            <div className="card__top">
              <span className="badge">#{i + 1}</span>
              <span className="spark" aria-hidden="true">✦</span>
            </div>
            <h3 className="h3">{it.t}</h3>
            <p className="p">{it.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery({ photos }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => {
    setOpen(false);
    document.documentElement.style.overflow = "";
  };

  const prev = () => setIdx((v) => (v - 1 + photos.length) % photos.length);
  const next = () => setIdx((v) => (v + 1) % photos.length);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, photos.length]);

  const startX = useRef(null);
  const onTouchStart = (e) => {
    startX.current = e.touches?.[0]?.clientX ?? null;
  };
  const onTouchEnd = (e) => {
    const endX = e.changedTouches?.[0]?.clientX ?? null;
    if (startX.current == null || endX == null) return;
    const dx = endX - startX.current;
    if (Math.abs(dx) < 40) return;
    if (dx > 0) prev();
    else next();
    startX.current = null;
  };

  return (
    <section className="panel" id="gallery">
      <div className="panel__head">
        <h2 className="h2">Біздің естеліктер</h2>
        <p className="sub">Біздің естеліктер бұдан да көп, бірақ кейбірін салып қойдым)</p>
      </div>

      <div className="gallery">
        {photos.map((src, i) => (
          <button
            key={i}
            className="shot"
            onClick={() => openAt(i)}
            aria-label={`Фотоны ашу ${i + 1}`}
          >
            <img className="shot__img" src={src} alt={`Біздің фото ${i + 1}`} loading="lazy" />
            <span className="shot__veil" aria-hidden="true" />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Фотоларды қарау терезесі"
        >
          <div className="lightbox__backdrop" onClick={close} />
          <div
            className="lightbox__panel"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button className="lb__close" onClick={close} aria-label="Жабу">
              ✕
            </button>

            <button className="lb__nav lb__nav--left" onClick={prev} aria-label="Алдыңғы фото">
              ‹
            </button>

            <figure className="lb__figure">
              <img className="lb__img" src={photos[idx]} alt={`Біздің фото ${idx + 1}`} />
              <figcaption className="lb__cap">
                {idx + 1} / {photos.length}
              </figcaption>
            </figure>

            <button className="lb__nav lb__nav--right" onClick={next} aria-label="Келесі фото">
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function MiniPlayer({
  src,
  poster,
  title = "Our Song",
  artist = "Valentine Mix",
  autoPlay = true,
}) {
  const audioRef = useRef(null);
  const rafRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [muted, setMuted] = useState(false);

  const [dur, setDur] = useState(0);
  const [pos, setPos] = useState(0);

  const fmt = (sec) => {
    if (!sec || Number.isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const sync = () => {
    const a = audioRef.current;
    if (!a) return;
    setPos(a.currentTime || 0);
    setDur(a.duration || 0);
    rafRef.current = requestAnimationFrame(sync);
  };

  const stopSync = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onLoaded = () => setDur(a.duration || 0);
    const onPlay = () => {
      setIsPlaying(true);
      setBlocked(false);
      stopSync();
      rafRef.current = requestAnimationFrame(sync);
    };
    const onPause = () => {
      setIsPlaying(false);
      stopSync();
    };

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      stopSync();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !autoPlay) return;

    a.muted = false;
    a.volume = 0.85;

    a.play()
      .then(() => {
        setMuted(false);
        setBlocked(false);
      })
      .catch(() => {
        setBlocked(true);
        setIsPlaying(false);
      });
  }, [autoPlay]);

  useEffect(() => {
    if (!blocked) return;

    const tryUnlock = () => {
      const a = audioRef.current;
      if (!a) return;

      a.play()
        .then(() => {
          setBlocked(false);
          setMuted(false);
        })
        .catch(() => {
        });
    };

    window.addEventListener("pointerdown", tryUnlock, { once: true });
    return () => window.removeEventListener("pointerdown", tryUnlock);
  }, [blocked]);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      try {
        await a.play();
        setBlocked(false);
      } catch {
        setBlocked(true);
      }
    } else {
      a.pause();
    }
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const onSeek = (e) => {
    const a = audioRef.current;
    if (!a || !dur) return;
    const v = Number(e.target.value);
    a.currentTime = (v / 1000) * dur;
    setPos(a.currentTime);
  };

  return (
    <div className="miniPlayer" role="region" aria-label="Music player">
      <audio ref={audioRef} src={src} preload="auto" loop />

      <div className="miniPlayer__left">
        <img className="miniPlayer__poster" src={poster} alt="Song poster" />
      </div>

      <div className="miniPlayer__mid">
        <div className="miniPlayer__meta">
          <div className="miniPlayer__title" title={title}>{title}</div>
          <div className="miniPlayer__artist" title={artist}>{artist}</div>
        </div>

        <div className="miniPlayer__barRow">
          <span className="miniPlayer__time">{fmt(pos)}</span>
          <input
            className="miniPlayer__bar"
            type="range"
            min="0"
            max="1000"
            value={dur ? Math.floor((pos / dur) * 1000) : 0}
            onChange={onSeek}
            aria-label="Seek"
          />
          <span className="miniPlayer__time">{fmt(dur)}</span>
        </div>

        {blocked && (
          <button className="miniPlayer__unlock" onClick={togglePlay}>
            Включить звук ▶
          </button>
        )}
      </div>

      <div className="miniPlayer__right">
        <button
          className="miniBtn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <button
          className="miniBtn miniBtn--ghost"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}


export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const photos = useMemo(
    () => [
      p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
      p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
      p21, p22, p23, p24, p25, p26, p27, p28, p29, p30
    ],
    []
  );
  const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  const onKey = (e) => {
    if (e.key === "Escape") setMenuOpen(false);
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

useEffect(() => {
  document.documentElement.style.overflow = menuOpen ? "hidden" : "";
}, [menuOpen]);

const closeMenu = () => setMenuOpen(false);


  const [fire, setFire] = useState(false);
  const timer = useRef(null);

  const celebrate = () => {
    setFire(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFire(false), 450);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="app">
      <Starfield />
      <FloatingHearts />
      <Confetti fire={fire} />

      <header className="hero">
        <nav className="nav">
  <div className="brand">
    <img className="brand__logo" src={logo} alt="Логотип" />
    <span className="brand__name">Махаббат қызық мол жылдар</span>
  </div>

  {/* Desktop меню */}
  <div className="nav__right nav__right--desktop">
    <a className="nav__link" href="#constellation">Шоқжұлдыз</a>
    <a className="nav__link" href="#letter">Хат</a>
    <a className="nav__link" href="#gallery">Естеліктер</a>
    <a className="nav__link" href="#reasons">Себептер</a>
    <a className="nav__link" href="#final">Сұрақ</a>
  </div>

  {/* Burger кнопка (mobile) */}
  <button
    className={"burger " + (menuOpen ? "burger--open" : "")}
    onClick={() => setMenuOpen((v) => !v)}
    aria-label="Мәзір"
    aria-expanded={menuOpen}
    aria-controls="mobileMenu"
  >
    <span />
    <span />
    <span />
  </button>
</nav>

{/* Mobile меню */}
<div className={"mobileMenu " + (menuOpen ? "mobileMenu--open" : "")} id="mobileMenu">
  <div className="mobileMenu__backdrop" onClick={closeMenu} />
  <div className="mobileMenu__panel">
    <div className="mobileMenu__top">
      <div className="brand brand--mobile">
        <img className="brand__logo" src={logo} alt="Логотип" />
        <span className="brand__name">Махаббат қызық мол жылдар</span>
      </div>
      <button className="mobileMenu__close" onClick={closeMenu} aria-label="Жабу">✕</button>
    </div>

    <a className="mobileMenu__link" href="#constellation" onClick={closeMenu}>Шоқжұлдыз</a>
    <a className="mobileMenu__link" href="#letter" onClick={closeMenu}>Хат</a>
    <a className="mobileMenu__link" href="#gallery" onClick={closeMenu}>Естеліктер</a>
    <a className="mobileMenu__link" href="#reasons" onClick={closeMenu}>Себептер</a>
    <a className="mobileMenu__link" href="#final" onClick={closeMenu}>Сұрақ</a>


  </div>
</div>


        <div className="hero__inner">
          <div className="hero__copy">
            <div className="kicker">Бір адамға арналған кішкентай әлем.</div>
            <h1 className="h1">
              Аспанды түртіп, біздің <span className="glow">махаббат шоқжұлдызымызды</span> құр.
            </h1>
            <p className="lead">
              Бұл сайт сенің - менің ең сүйікті орным екенін еске салу үшін жасалды. Мұнда біздің махаббатымыздың кейбір сәттері мен себептері жинақталған. Әрине, бәрін сыйғызу мүмкін емес, бірақ мен ең жақсысын таңдауға тырыстым.
            </p>

            <div className="hero__cta">
              <a className="btn" href="#constellation">Бастау</a>
              <a className="btn btn--ghost" href="#letter">Хатты ашу</a>
            </div>

            <div className="hero__chips">
              <span className="pill">Мен</span>
              <span className="pill">Сені</span>
              <span className="pill">Жақсы</span>
              <span className="pill">Көремін</span>
            </div>
          </div>

          {/* <div className="hero__side">
            <div className="glass">
              <div className="glass__title">Қалай сурет саламын?</div>
              <div className="glass__text">
                Түртсең жүрек-жұлдыз пайда болады. Олар автоматты түрде байланысып, шоқжұлдыз құрайды.
                Жүрек пішінін, инициалдарды немесе екеуімізге ғана белгілі бір белгі жаса.
              </div>
              <div className="glass__mini">
                Бонус: соңында дұрыс жауап берсең, конфетти шашылады)
              </div>
            </div>

            <div className="orb" aria-hidden="true">
              <div className="orb__inner" />
            </div>
          </div> */}
        </div>
      </header>

      <main className="main">
        <div id="constellation" className="anchor" />
        <LoveConstellation reducedMotion={reducedMotion} />

        <div id="letter" className="anchor" />
        <Letter toName="Zhamilya" fromName="Shapagat" />

        <div id="gallery" className="anchor" />
        <Gallery photos={photos} />

        <div id="reasons" className="anchor" />
        <Reasons />

        <section id="final" className="panel panel--final">
          <div className="panel__head">
            <h2 className="h2">Соңғы бір сұрақ</h2>
            <p className="sub">Менің Валентинім, жоқ Менің Өмірлік Серігім боласың ба?</p>
          </div>

          <div className="final">
            <button className="btn btn--big" onClick={celebrate}>
              Ия ❤
            </button>
            <a className="btn btn--ghost btn--big" href="#constellation">
              Тағы бір шоқжұлдыз жасайық
            </a>
          </div>

          <footer className="footer">
            Мен сені бар жан тәніммен жақсы көремін және шексіз сүйемін.
          </footer>
        </section>
      </main>
      <MiniPlayer
  src={songMp3}
  poster={songPoster}
  title="Жалғыз жұлдыз"
  artist="Жасұлан Көпберген"
/>

    </div>
  );
}
