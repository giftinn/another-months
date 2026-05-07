import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecretLetterPageProps {
  onBackToStart?: () => void;
}

interface PolaroidItem {
  id: number;
  image: string;
  song: string;
  artist: string;
  audio: string;
}

const polaroids: PolaroidItem[] = [
  {
    id: 1,
    image: 'https://giftinn.github.io/music-host/leowon1.jpg',
    song: 'Close To You',
    artist: 'The Carpenters',
    audio: 'https://giftinn.github.io/music-host/Close%20To%20You%20-%20Carpenters.mp3'
  },
  {
    id: 2,
    image: 'https://giftinn.github.io/music-host/leowon2.jpg',
    song: 'You!',
    artist: 'LANY',
    audio: 'https://giftinn.github.io/music-host/you.mp3'
  },
  {
    id: 3,
    image: 'https://giftinn.github.io/music-host/leowon3.jpg',
    song: 'To The Bone',
    artist: 'Pamungkas',
    audio: 'https://giftinn.github.io/music-host/pamungkas.mp3'
  }
];

const SecretLetterPage: React.FC<SecretLetterPageProps> = ({ onBackToStart }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const fullText = `Happy Mensiversary for Us! 
  
First, thank you for your time buat buka gift sederhana dari aku ini (and i hope u like it hehe). I just wanna say, happy mensive for my dearest sayang.

another month with you, and somehow my heart still feels just as full and maybe even more. thank you for choosing me every day, for staying, for loving me in ways that feel warm and safe. being with you isn’t just about the happy moments, it’s about knowing we’re growing together, step by step.

then, i wanna say thank you for everything u did to me, it means a lot to me fr. makasihh udah mau nge-treat aku sebaik ituu, makasih udah mau dengerin semua keluh kesah aku, cerita random aku. aku jugaa makasih banget selama ini kamu selalu sabar sama aku, thank you, sayang. and i’m so sorry if i’m still not perfect. sorry for the times i overthink, get moody, or don’t handle things as well as i should. i know i still have so much to learn about love, about patience, about how to be better for you.

and bcs it's our special day, aku berharap hubungan kita makin kuat, perasaan kamu ke aku masih tetap sama dan kalau bisa makin sayang dan cinta ke aku, dan semua mimpi kita berdua terwujud satu persatu. aku juga berharap semoga kita selalu dikelilingi sama hal-hal baik dan dijauhin dari yang jahat-jahat. thenn, i just wanna say that u aren't alone. kamu harus percaya kalau kamu selalu dikelilingi orang-orang yang sayang sama kamu, utamanya aku yang selalu disini buat tempat kamu pulang. 

With all my heart, 
your boyfriend`;

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowFinalMessage(true);
        }, 2000);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="text-center space-y-6 max-w-5xl mx-auto px-4">

      {/* LETTER BOX */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-6 sm:p-10 bg-gradient-to-br from-white/90 to-blue-50/90 rounded-3xl border-2 border-blue-200 backdrop-blur-lg shadow-2xl relative overflow-hidden">

          {/* corners */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-blue-300 rounded-full"/>
          <div className="absolute top-2 right-2 w-3 h-3 bg-blue-300 rotate-45"/>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-blue-300 rounded-full"/>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-lg"/>

          {/* TEXT */}
          <div className="text-left">
            <div className="text-sm sm:text-base text-blue-900 whitespace-pre-wrap leading-relaxed font-medium">
              {displayedText}
              {displayedText.length < fullText.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-blue-400 ml-1"
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>


      {/* POLAROID */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >

            <h3 className="text-xl sm:text-2xl font-bold text-blue-900">
              Our Songs & Memories 🎧
            </h3>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {polaroids.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, rotate: -8, y: 40 }}
                  animate={{ opacity: 1, rotate: i % 2 ? 6 : -6, y: 0 }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="bg-white p-3 rounded-xl shadow-xl w-60"
                >
                  <img
                    src={item.image}
                    alt="memory"
                    className="rounded-lg mb-3 object-cover w-full h-48"
                  />

                  <div className="text-left mb-2">
                    <p className="font-semibold text-blue-900 text-sm">
                      {item.song}
                    </p>
                    <p className="text-xs text-blue-600">
                      {item.artist}
                    </p>
                  </div>

                  {/* AUDIO */}
                  <audio controls className="w-full accent-blue-500">
                    <source src={item.audio} type="audio/mpeg" />
                  </audio>

                </motion.div>
              ))}
            </div>

            {onBackToStart && (
              <button
                onClick={onBackToStart}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
              >
                Back to Start
              </button>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretLetterPage;




















