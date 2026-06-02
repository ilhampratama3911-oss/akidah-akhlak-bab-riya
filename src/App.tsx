import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  BookText, 
  ClipboardCheck, 
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle as HelpCircleIcon,
  Circle,
  HelpCircle, 
  User, 
  ChevronLeft, 
  Home as HomeIcon,
  Play,
  Pause,
  ArrowRight,
  Info,
  Github,
  Mail,
  GraduationCap,
  Smartphone,
  ExternalLink,
  Tv,
  Maximize,
  Minimize
} from 'lucide-react';
import { cn } from './lib/utils';
import { fadeIn, pageTransition } from './constants';
// @ts-ignore
import videoUrl from './video.mp4';

const getDynamicVideoUrl = () => {
  try {
    const origin = window.location.origin;
    let pathname = window.location.pathname;
    if (pathname.endsWith('.html')) {
      pathname = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    }
    const base = pathname.endsWith('/') ? pathname : pathname + '/';
    return `${origin}${base}video.mp4`;
  } catch (e) {
    return 'video.mp4';
  }
};

type Screen = 'home' | 'menu' | 'video' | 'materi' | 'evaluasi' | 'kesimpulan' | 'absensi';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <motion.div 
            key="home"
            {...fadeIn}
            className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-100/50">
              <BookOpen className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              MEDIA PEMBELAJARAN <br />
              <span className="text-emerald-600">Cara Menghindari Perilaku Tercela (Riya')</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-md mb-10 leading-relaxed">
              Mengenal dan memahami dalil naqli dari riya', pengertian riya', sebab-sebab riya', dampak negatif riya', cara menghindari sifat riya.
            </p>
            <button 
              id="start-button"
              onClick={() => setScreen('menu')}
              className="group relative flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-200"
            >
              Mulai Belajar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-12 flex gap-4 text-slate-400 text-sm italic">
              <span>Akidah Akhlak</span>
              <span>•</span>
              <span>Kelas X Madrasah Aliyah</span>
            </div>
          </motion.div>
        );

      case 'menu':
        return (
          <motion.div 
            key="menu"
            {...pageTransition}
            className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto py-12 px-4 content-center min-h-[60vh]"
          >
            <MenuCard 
              id="menu-video"
              title="Video Pemantik" 
              icon={<Play className="w-8 h-8" />} 
              color="bg-red-500" 
              onClick={() => setScreen('video')}
            />
            <MenuCard 
              id="menu-materi"
              title="Materi" 
              icon={<BookText className="w-8 h-8" />} 
              color="bg-blue-500" 
              onClick={() => setScreen('materi')}
            />
            <MenuCard 
              id="menu-evaluasi"
              title="Evaluasi" 
              icon={<ClipboardCheck className="w-8 h-8" />} 
              color="bg-amber-500" 
              onClick={() => setScreen('evaluasi')}
            />
            <MenuCard 
              id="menu-kesimpulan"
              title="Kesimpulan" 
              icon={<BookOpen className="w-8 h-8" />} 
              color="bg-teal-500" 
              onClick={() => setScreen('kesimpulan')}
            />
            <MenuCard 
              id="menu-absensi"
              title="Absensi" 
              icon={<Users className="w-8 h-8" />} 
              color="bg-rose-500" 
              onClick={() => setScreen('absensi')}
            />
          </motion.div>
        );

      case 'video':
        return <VideoScreen key="video" onBack={() => setScreen('menu')} />;

      case 'materi':
        return <MateriScreen key="materi" onBack={() => setScreen('menu')} />;

      case 'evaluasi':
        return <EvaluasiScreen key="evaluasi" onBack={() => setScreen('menu')} />;

      case 'kesimpulan':
        return <KesimpulanScreen key="kesimpulan" onBack={() => setScreen('menu')} />;

      case 'absensi':
        return <AbsensiScreen key="absensi" onBack={() => setScreen('menu')} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9f4] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-100/50 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-100/40 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-teal-50/30 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      {screen !== 'home' && (
        <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/20">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <button 
              id="header-logo"
              onClick={() => setScreen('home')}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800 tracking-tight hidden md:block uppercase text-xs">Media Pembelajaran</span>
            </button>
            <div className="flex gap-2 sm:gap-4">
              <NavButton active={screen === 'menu'} onClick={() => setScreen('menu')} icon={<HomeIcon className="w-4 h-4" />} label="Menu" />
              <NavButton active={screen === 'video'} onClick={() => setScreen('video')} icon={<Play className="w-4 h-4" />} label="Video" />
              <NavButton active={screen === 'materi'} onClick={() => setScreen('materi')} icon={<BookText className="w-4 h-4" />} label="Materi" />
              <NavButton active={screen === 'evaluasi'} onClick={() => setScreen('evaluasi')} icon={<ClipboardCheck className="w-4 h-4" />} label="Evaluasi" />
            </div>
          </div>
        </header>
      )}

      <main className="max-w-6xl mx-auto relative z-10 pt-4 pb-20">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>

      {/* Footer credits */}
      {screen === 'home' && (
        <footer className="fixed bottom-6 left-0 right-0 text-center text-slate-400 text-[10px] tracking-widest uppercase">
          Digital Learning Platform Madrasah Aliyah © 2024
        </footer>
      )}
    </div>
  );
}

// Sub-components
function MenuCard({ id, title, icon, color, onClick }: { id: string, title: string, icon: React.ReactNode, color: string, onClick: () => void }) {
  return (
    <motion.button
      id={id}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-white/50 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all w-full max-w-[200px] sm:max-w-[240px] aspect-square gap-6 group"
    >
      <div className={cn("p-5 rounded-3xl text-white shadow-xl shadow-current/20 group-hover:rotate-6 transition-transform", color)}>
        {icon}
      </div>
      <span className="font-bold text-slate-700 text-lg md:text-xl text-center leading-tight">{title}</span>
    </motion.button>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
        active ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// Screen Components

function MateriScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const sections = [
    { 
      title: "A. Pengertian Riya’", 
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/50 p-6 md:p-8 rounded-[2rem] border border-emerald-100/50 shadow-sm leading-relaxed">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">Secara Bahasa</span>
              <p className="text-slate-700 text-base leading-relaxed">
                Pengertian riya’ menurut bahasa berasal dari kata <strong>al-Riya’u</strong> artinya <strong>yang menampakkan</strong>. Yaitu memperlihatkan suatu amal kebaikan kepada sesama manusia.
              </p>
            </div>
            
            <div className="bg-emerald-50/50 p-6 md:p-8 rounded-[2rem] border border-emerald-100/50 shadow-sm leading-relaxed">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">Secara Istilah</span>
              <p className="text-slate-700 text-base leading-relaxed">
                Secara istilah riya’ adalah <strong>melakukan ibadah untuk mendapatkan pujian dari orang lain</strong>, bukan karena Allah semata. Menurut <strong>Imam Ghazali</strong> riya’ adalah mencari kedudukan pada hati manusia dengan memperlihatkan kepada mereka hal-hal kebaikan.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm leading-relaxed">
            <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              Kesimpulan Pengertian
            </h4>
            <p className="text-slate-600">
              Dengan demikian dapat disimpulkan bahwa riya’ adalah melakukan amal kebaikan bukan karena niat ibadah kepada Allah, melainkan demi manusia dengan cara memperlihatkan amal kebaikannya kepada orang lain supaya mendapatkan pujian atau penghargaan.
            </p>
          </div>

          <div className="bg-amber-50/40 p-6 md:p-8 rounded-[2rem] border border-amber-100/40 shadow-sm leading-relaxed">
            <h4 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-600" />
              Sifat yang Erat Kaitannya: Sum’ah
            </h4>
            <p className="text-slate-700">
              Salah satu sifat yang erat kaitannya dengan riya’ adalah <strong>sum’ah</strong> yaitu suka memperdengarkan atau menceritakan kebaikannya kepada orang lain agar didengar dan memperoleh kedudukan serta pujian.
            </p>
          </div>

          <section className="bg-slate-900 text-white p-6 md:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <BookOpen className="w-32 h-32" />
            </div>
            <h3 className="text-xs font-bold text-emerald-400 mb-6 uppercase tracking-[0.25em] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              Dalil Al-Qur'an (QS. al-Baqarah: 264)
            </h3>
            
            <p className="text-2xl md:text-3xl font-serif leading-loose mb-8 text-right font-medium tracking-wide" dir="rtl">
              يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ لَا تُبْطِلُوا۟ صَدَقَـٰتِكُم بِٱلْمَنِّ وَٱلْأَذَىٰ كَٱلَّذِى يُنفِقُ مَالَهُۥ رِئَآءَ ٱلنَّاسِ وَلَا يُؤْمِنُ بِٱللَّهِ وَٱلْيَوْمِ ٱلْـَٔاخِرِ ۖ فَمَثَلُهُۥ كَمَثَلِ صَفْوَانٍ عَلَيْهِ تُرَابٌۭ فَأَصَابَهُۥ وَابِلٌۭ فَتَرَكَهُۥ صَلْدًۭا ۖ لَّا يَقْدِرُونَ عَلَىٰ شَىْءٍۢ مِّمَّا كَسَبُوا۟ ۗ وَٱللَّهُ لَا يَهْدِى ٱلْقَوْمَ ٱلْكَـٰفِرِينَ ٢٦٤
            </p>
            
            <div className="space-y-4 border-t border-slate-800 pt-6">
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-widest rounded-full">Artinya</span>
              <p className="text-slate-300 leading-relaxed text-base italic md:text-lg">
                "Wahai orang-orang yang beriman! Janganlah kamu merusak sedekahmu dengan menyebut-nyebutnya dan menyakiti (perasaan penerima), seperti orang yang menginfakkan hartanya karena riya` (pamer) kepada manusia dan dia tidak beriman kepada Allah dan hari akhir. Perumpaannya (orang itu) seperti batu licin yang di atasnya ada debu, kemudian batu itu ditimpa hujan lebat, maka tinggallah batu itu licin lagi. Mereka tidak memperoleh sesuatu apa pun dari apa yang mereka kerjakan. Dan Allah tidak memberi petunjuk kepada orang-orang kafir."
              </p>
            </div>
          </section>
        </div>
      )
    },
    { 
      title: "B. Ciri-ciri orang yang riya’", 
      content: (
        <div className="space-y-8">
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Beberapa tanda-tanda orang memiliki sifat riya’, antara lain:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                letter: "a", 
                title: "Malas Saat Sendirian", 
                desc: "Dia menjadi pemalas jika sendirian" 
              },
              { 
                letter: "b", 
                title: "Rajin saat Ramai", 
                desc: "Dia menjadi rajin jika berada ditengah-tengah orang yang ramai" 
              },
              { 
                letter: "c", 
                title: "Tergantung Pujian/Celaan", 
                desc: "Dia menambah kegiatan/kerajinan kerjaannya jika dipuji dan mengurangi jika diejek" 
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 font-black text-lg flex items-center justify-center mb-6 border border-emerald-100">
                  {item.letter}
                </div>
                <h4 className="font-bold text-slate-850 text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      title: "C. Bahaya dampak negatif dari sifat riya’", 
      content: (
        <div className="space-y-8">
          <p className="text-slate-750 text-lg leading-relaxed font-medium">
            Sifat riya’ memiliki banyak dampak negatif dalam kehidupan manusia, di antaranya:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Riya’ lebih berbahaya dari pada fitnah Dajjal" },
              { label: "Nilai amal saleh hilang." },
              { label: "Riya’ adalah syirik khofi (tersembunyi)" },
              { label: "Mereka ini tidak mendapat manfaat di dunia dari usaha-usaha mereka dan tidak pula mendapat pahala di akhirat." },
              { label: "Akan merasa hampa dan kecewa apabila perhatian dan pujian yang ia harapkan ternyata tidak didapatnya." },
              { label: "Terkena penyakit rohani berupa gila pujian atau gila hormat" },
              { label: "Bisa menimbulkan pertengkaran bila ia mengungkit-ungkit kebaikannya pada orang lain." },
              { label: "Lebih sangat merusak dari pada serigala menyergap domba" },
              { label: "Menjadi sebab azab di neraka" },
              { label: "Menambah kesesatan seseorang" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-5 bg-rose-50/30 rounded-[1.5rem] border border-rose-100/50 hover:bg-rose-50/50 transition-colors">
                <div className="mt-1 w-6 h-6 shrink-0 rounded-full bg-rose-200 text-rose-700 font-bold text-xs flex items-center justify-center font-mono">
                  {String.fromCharCode(97 + i)}
                </div>
                <p className="text-slate-700 font-medium text-sm leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      title: "D. Sebab-sebab timbulnya sifat riya’", 
      content: (
        <div className="space-y-8">
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Berikut beberapa penyebab sifat riya’, antara lain:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { t: "Terlalu dikagumi orang lain" },
              { t: "Lari dari celaan" },
              { t: "Rakus akan apa yang diperoleh/ terdapat pada orang lain" },
              { t: "Ambisi mendapatkan kedudukan atau kepemimpinan" },
              { t: "Senang karena lezatnya pujian orang lain" },
              { t: "Lalai akan dampak buruk riya’" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-amber-50/30 border border-amber-100/50 rounded-3xl hover:bg-amber-50/50 transition-colors flex flex-col justify-between">
                <span className="text-xs font-black text-amber-500 uppercase tracking-wider mb-3 block font-mono">Poin {String.fromCharCode(97 + i)}</span>
                <h4 className="font-bold text-slate-800 text-sm leading-relaxed">{item.t}</h4>
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      title: "E. Cara menghindari sifat riya’", 
      content: (
        <div className="space-y-8">
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Agar terhindar dari sifat Riya’, seorang muslim dapat melakukan beberapa hal berikut:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Memperbaiki niat ibadah semata-mata karena Allah" },
              { title: "Menghindari sikap suka memamerkan perbuatan baik" },
              { title: "Bersyukur atas nikmat yang telah diberikan" },
              { title: "Meningkatkan kekhusyukan dalam beribadah" },
              { title: "Mengingat bahaya perilaku riya’" },
              { title: "Berdoa kepada Allah agar dijauhkan dari sifat riya’" },
              { title: "Hidup sederhana" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-emerald-50/20 hover:bg-emerald-50/40 rounded-[1.5rem] border border-emerald-100/50 transition-colors items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center font-mono shrink-0">
                  {String.fromCharCode(97 + i)}
                </div>
                <h5 className="font-bold text-slate-850 text-sm leading-snug">{item.title}</h5>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div {...fadeIn} className="px-4">
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm border border-white/50 sticky top-24">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-4">Navigasi Materi</h2>
            <nav className="space-y-2">
              {sections.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "w-full text-left px-5 py-4 rounded-2xl transition-all font-bold text-sm",
                    activeTab === i ? "bg-emerald-600 text-white shadow-xl shadow-emerald-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {s.title}
                </button>
              ))}
            </nav>
            <button 
              onClick={onBack}
              className="w-full mt-10 flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors font-bold text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Keluar
            </button>
          </div>
        </aside>

        <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-[3rem] p-10 md:p-14 shadow-sm border border-white/50 min-h-[600px] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[4rem] -z-0 opacity-50" />
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-10 tracking-tight leading-none italic">{sections[activeTab].title}</h2>
            {sections[activeTab].content}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function EvaluasiScreen({ onBack }: { onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      q: "Menurut bahasa, kata riya’ berasal dari al-Riya’u yang artinya...",
      options: ["Yang menampakkan", "Yang menyembunyikan", "Yang membisikkan", "Yang melebih-lebihkan"],
      correct: 0
    },
    {
      q: "Menurut Imam Ghazali, apakah definisi dari riya’?",
      options: [
        "Melakukan ibadah semata-mata karena ketaatan kepada Allah",
        "Mencari kedudukan pada hati manusia dengan memperlihatkan kepada mereka hal-hal kebaikan",
        "Menyembunyikan amal ibadah sunnah sejauh mungkin dari manusia",
        "Menghargai usaha kebaikan sesama manusia tanpa pamrih"
      ],
      correct: 1
    },
    {
      q: "Salah satu ciri-ciri orang yang terkena sifat riya’ adalah...",
      options: [
        "Selalu bersemangat beribadah ketika ramai maupun saat sendirian",
        "Dia menambah kegiatan/kerajinan kerjanya jika dipuji dan mengurangi jika diejek",
        "Selalu merasa bersyukur atas nikmat yang dia peroleh sendiri",
        "Suka mendoakan kebaikan orang lain secara sembunyi-sembunyi"
      ],
      correct: 1
    },
    {
      q: "Berikut ini yang merupakan bahaya atau dampak negatif dari sifat riya' adalah...",
      options: [
        "Membuat hati menjadi tenang dan damai dalam kehidupan sehari-hari",
        "Mendatangkan pahala berlipat ganda dari Allah SWT",
        "Nilai amal saleh hilang dan riya’ merupakan syirik khofi (tersembunyi)",
        "Meningkatkan rasa persaudaraan dan kekeluargaan antar sesama muslim"
      ],
      correct: 2
    },
    {
      q: "Di bawah ini adalah penyebab/sebab timbulnya sifat riya’ pada manusia, kecuali...",
      options: [
        "Senang karena lezatnya pujian orang lain",
        "Ambisi mendapatkan kedudukan atau kepemimpinan",
        "Lari dari celaan manusia",
        "Selalu membiasakan hidup sederhana dan ikhlas karena Allah"
      ],
      correct: 3
    },
    {
      q: "Bagaimanakah cara menghindari sifat riya’ yang tepat?",
      options: [
        "Meningkatkan ibadah hanya jika berada di keramaian saja",
        "Memperbaiki niat ibadah semata-mata karena Allah dan berdoa memohon perlindungan-Nya",
        "Suka mamerkan prestasi atau amalan baik di forum-forum umum",
        "Berhenti melakukan ibadah sama sekali agar aman dari godaan riya’"
      ],
      correct: 1
    }
  ];

  const handleAnswer = (idx: number) => {
    if (idx === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const finalScore = Math.round((score / questions.length) * 100);
    return (
      <motion.div {...fadeIn} className="max-w-xl mx-auto text-center py-12 px-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl border border-white/50">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <ClipboardCheck className="w-12 h-12 text-amber-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Evaluasi Selesai!</h2>
          <p className="text-slate-500 mb-10 text-lg">Luar biasa! Kamu telah menyelesaikan tantangan ini.</p>
          
          <div className="relative mb-12">
            <div className="text-7xl font-black text-emerald-600">
              {finalScore}
            </div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">Skor Akhir</div>
          </div>

          <div className="bg-slate-50 p-6 rounded-[2rem] mb-10 flex justify-between px-10">
            <div className="text-center">
              <div className="text-xl font-bold text-slate-800">{score}</div>
              <div className="text-xs text-slate-400 uppercase font-bold">Benar</div>
            </div>
            <div className="w-px h-10 bg-slate-200 self-center" />
            <div className="text-center">
              <div className="text-xl font-bold text-slate-800">{questions.length - score}</div>
              <div className="text-xs text-slate-400 uppercase font-bold">Salah</div>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95"
          >
            Kembali ke Menu
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-[3.5rem] p-10 md:p-16 shadow-sm border border-white/50 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Pertanyaan</span>
            <div className="text-4xl font-black text-slate-800">
              #{currentQuestion + 1} <span className="text-slate-300 text-2xl">/ {questions.length}</span>
            </div>
          </div>
          <div className="w-full md:w-64">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              <span>Progres</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <motion.div 
                className="bg-emerald-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-12 leading-[1.1] tracking-tight">
          {questions[currentQuestion].q}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="group flex flex-col p-8 bg-slate-50 border-2 border-transparent rounded-[2rem] hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left relative overflow-hidden"
            >
              <div className="text-xs font-black text-slate-300 uppercase tracking-tighter mb-2 group-hover:text-emerald-500 transition-colors">Opsi {String.fromCharCode(65 + i)}</div>
              <span className="font-bold text-slate-700 text-lg group-hover:text-emerald-900 transition-colors leading-tight">{opt}</span>
              <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full border-2 border-slate-200 group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AbsensiScreen({ onBack }: { onBack: () => void }) {
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  
  const students = [
    { name: "Ahmad Badawi", nim: "11023001" },
    { name: "Ahmad Fatkhi Achsanun Nashih", nim: "11023002" },
    { name: "Desti Puspita Sari", nim: "1123004" },
    { name: "Febriyanto Indra Kurniawan", nim: "11023006" },
    { name: "Ikhtirozul Akhyar", nim: "11023007" },
    { name: "Ilham Pratama", nim: "11023008" },
    { name: "Irfan Tri Susanto", nim: "11023009" },
    { name: "Khoirun nisa'", nim: "11023010" },
    { name: "Laili Nailur Rohmah", nim: "11023011" },
    { name: "Lutfiani Zahra Safilla", nim: "11023012" },
    { name: "Luthfiyatin Nur Inayah", nim: "11023013" },
    { name: "M. Aufa Anwaril Akbar", nim: "11023014" },
    { name: "Muhammad Amirul Mu'minin", nim: "11023016" },
    { name: "Nadila Ayu Wardani", nim: "11023018" },
    { name: "Naila Lailatul M.", nim: "11023019" },
    { name: "Najmatullaili ramadhani", nim: "11023062" },
    { name: "Nur Kholiq Rizqi", nim: "11023021" },
    { name: "Pujo Lukito Setiawan", nim: "11023023" },
    { name: "Shella Arzeti V. N.", nim: "11023025" },
    { name: "Tegar Eka Saputra", nim: "11023026" },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const statusOptions = [
    { label: 'Hadir', value: 'present', color: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-200' },
    { label: 'Izin', value: 'permit', color: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200' },
    { label: 'Sakit', value: 'sick', color: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200' },
    { label: 'Alfa', value: 'absent', color: 'bg-rose-500', text: 'text-rose-600', border: 'border-rose-200' },
  ];

  const handleStatusChange = (nim: string, status: string) => {
    setAttendance(prev => ({ ...prev, [nim]: status }));
  };

  return (
    <motion.div {...fadeIn} className="max-w-5xl mx-auto py-12 px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-[3.5rem] p-8 md:p-14 shadow-sm border border-white/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-5xl font-black text-slate-800 tracking-tighter italic mb-2">Daftar Absensi</h2>
            <p className="text-slate-500 font-medium">Silakan tandai kehadiran mahasiswa hari ini.</p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
          >
            <ChevronLeft className="w-5 h-5" /> Kembali
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="col-span-1">No</div>
            <div className="col-span-5">Nama Mahasiswa / NIM</div>
            <div className="col-span-6 text-center">Keterangan</div>
          </div>
          
          <div className="space-y-3">
            {students.map((student, idx) => (
              <motion.div 
                key={student.nim}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-8 py-5 bg-white/95 backdrop-blur-sm border border-white/50 rounded-[2rem] hover:shadow-lg hover:shadow-slate-200/50 transition-all"
              >
                <div className="md:col-span-1 text-slate-300 font-black text-xl italic">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <div className="md:col-span-5">
                  <div className="font-bold text-slate-800 text-lg leading-tight">{student.name}</div>
                  <div className="text-xs text-slate-400 font-bold tracking-wider">{student.nim}</div>
                </div>
                <div className="md:col-span-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleStatusChange(student.nim, opt.value)}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border-2",
                          attendance[student.nim] === opt.value 
                            ? cn(opt.color, "text-white border-transparent shadow-lg shadow-current/20 scale-105") 
                            : cn("bg-transparent border-slate-100 text-slate-400 hover:border-slate-300")
                        )}
                      >
                        {attendance[student.nim] === opt.value ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Circle className="w-3 h-3" />
                        )}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-8 bg-slate-900 rounded-[2.5rem] gap-6">
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400">
                {Object.values(attendance).filter(v => v === 'present').length}
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Hadir</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-amber-400">
                {Object.values(attendance).filter(v => v === 'permit').length}
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Izin</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-blue-400">
                {Object.values(attendance).filter(v => v === 'sick').length}
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Sakit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-rose-400">
                {Object.values(attendance).filter(v => v === 'absent').length}
              </div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Alfa</div>
            </div>
          </div>
          <button 
            className="w-full md:w-auto px-10 py-5 bg-emerald-500 text-white rounded-[1.5rem] font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
            onClick={() => alert('Data absensi berhasil disimpan secara lokal!')}
          >
            Simpan Absensi
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function VideoScreen({ onBack }: { onBack: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(getDynamicVideoUrl());
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error("Error attempting to exit fullscreen:", err);
      });
    }
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => {
        console.error("Failed to play video:", err);
      });
    }
  };

  const handleVideoError = () => {
    console.warn("Video element failed to load with currentSrc:", currentSrc);
    if (currentSrc === getDynamicVideoUrl()) {
      console.log("Fallback 1: trying videoUrl (Vite Asset)");
      setCurrentSrc(videoUrl);
    } else if (currentSrc === videoUrl) {
      console.log("Fallback 2: trying relative video.mp4");
      setCurrentSrc("video.mp4");
    } else if (currentSrc === "video.mp4") {
      console.log("Fallback 3: trying root /video.mp4");
      setCurrentSrc("/video.mp4");
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentSrc]);

  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-[3.5rem] p-6 md:p-14 shadow-sm border border-white/50">
        
        {/* Header Bagian */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] bg-emerald-50 px-3 py-1.5 rounded-full">Media Interaktif</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter italic mt-3 mb-1">
              Video Pemantik Riya'
            </h2>
            <p className="text-slate-500 font-medium">Saksikan video animasi clay yang menceritakan bahaya dan perilaku riya'.</p>
          </div>
          <button 
            onClick={onBack}
            className="self-start md:self-center flex items-center gap-2 px-6 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95 text-sm"
          >
            <ChevronLeft className="w-5 h-5" /> Kembali ke Menu
          </button>
        </div>

        {/* Video Player */}
        <div className="flex flex-col items-center justify-center py-6 bg-slate-50/50 rounded-[2.5rem] border border-slate-100/85">
          <div 
            ref={containerRef}
            className={`bg-black overflow-hidden relative transition-all duration-300 flex items-center justify-center ${
              isFullscreen 
                ? 'w-screen h-screen' 
                : 'w-full max-w-[340px] aspect-[9/16] rounded-[2rem] shadow-xl border border-slate-200/50'
            }`}
          >
            <video 
              key={currentSrc}
              ref={videoRef}
              src={currentSrc}
              className={`pointer-events-auto w-full h-full ${
                isFullscreen 
                  ? 'object-contain' 
                  : 'absolute top-0 left-0 object-cover scale-[1.15]'
              }`}
              controls
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={handleVideoError}
            />

            {/* Central Play Overlay */}
            {!isPlaying && (
              <div 
                onClick={handlePlayPause}
                className="absolute inset-0 bg-black/30 hover:bg-black/45 transition-colors flex items-center justify-center cursor-pointer z-10"
              >
                <div className="w-16 h-16 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg border border-white/20 hover:scale-105 active:scale-95">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
              </div>
            )}

            {/* Float Exit Fullscreen button inside fullscreen wrapper */}
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 text-white p-3.5 rounded-full backdrop-blur-md transition-all shadow-lg border border-white/10 z-50 hover:scale-105 active:scale-95"
                title="Keluar Layar Penuh"
              >
                <Minimize className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all tracking-wider shadow-md shadow-emerald-500/15 active:scale-95"
              >
                <Maximize className="w-4 h-4" />
                <span>Tonton Layar Penuh (Fullscreen)</span>
              </button>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                💡 Tips Pembelajaran
              </span>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Ketuk tombol <span className="font-bold text-slate-600">Tonton Layar Penuh</span> di atas untuk menyaksikan animasi dengan tampilan yang lebih optimal.
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function KesimpulanScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-[3.5rem] p-8 md:p-14 shadow-sm border border-white/50">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-none italic">Kesimpulan</h2>
          <button onClick={onBack} className="p-3 bg-slate-100 rounded-2xl text-slate-500 hover:bg-slate-200 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
              <h4 className="text-emerald-800 font-bold mb-3 text-xl">Intisari Materi</h4>
              <p className="text-emerald-900/70 leading-relaxed italic">
                "Riya' adalah penghalang keikhlasan. Ia seperti semut hitam di atas batu hitam di kegelapan malam—sangat halus namun mematikan pahala."
              </p>
            </div>
            <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
              <h4 className="text-blue-800 font-bold mb-3 text-xl">Poin Utama</h4>
              <ul className="space-y-2 text-blue-900/70 text-sm font-medium">
                <li>• Niat adalah kunci utama diterimanya amal.</li>
                <li>• Riya' Jali (jelas) & Khafi (samar).</li>
                <li>• Sum'ah: Haus akan pujian lewat pendengaran.</li>
                <li>• Tawadhu adalah obat penawar riya'.</li>
              </ul>
            </div>
          </div>

          <div className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <h4 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-xs">Pesan Untuk Dikirim ke Hati</h4>
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              Ikhlas bukan berarti tidak dipuji, tapi ikhlas adalah saat pujian dan cacian manusia tidak lagi mengubah semangatmu dalam beribadah kepada Allah SWT.
            </p>
            <div className="flex items-center gap-4 text-emerald-400 font-mono text-xs">
              <span className="px-3 py-1 border border-emerald-500/30 rounded-full">IKHLAS</span>
              <span className="px-3 py-1 border border-emerald-500/30 rounded-full">TAUHID</span>
              <span className="px-3 py-1 border border-emerald-500/30 rounded-full">AKHLAQ</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}




