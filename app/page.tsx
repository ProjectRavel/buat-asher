"use client";

import { useState } from "react";
import { Smile, RotateCw, Users, Trash2, Play } from "lucide-react";

type QuestionType = "truth" | "dare";

interface PlayerQuestions {
  [player: string]: {
    truth: number[];
    dare: number[];
  };
}

export default function TruthOrDareGame() {
  const [players, setPlayers] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [questionType, setQuestionType] = useState<QuestionType | "">("");
  const [playerQuestions, setPlayerQuestions] = useState<PlayerQuestions>({});
  const [notification, setNotification] = useState<string>("");

  const truthQuestions: string[] = [
    // Self-reflection
    "Apa ketakutan terbesarmu yang jarang kamu ceritakan kepada orang lain?",
    "Apa kebiasaan yang kamu rasa paling membentuk siapa dirimu sekarang?",
    "Kalau kamu bisa mengulang satu hari dalam hidupmu, hari apa dan kenapa?",
    "Apa hal yang paling sulit kamu maafkan pada dirimu sendiri?",
    "Kalau hidupmu adalah cerita, bagian mana yang paling membuatmu bangga?",
    "Apa pengalaman paling membingungkan yang pernah kamu alami?",
    "Kalau bisa memberi nasihat pada dirimu sendiri yang lebih muda, apa yang akan kamu katakan?",
    "Apa hal yang paling membuatmu merasa hidup?",
    "Apa hal yang paling membuatmu merasa rentan tapi ingin tetap kamu bagikan?",
    "Apa keputusan terbesar yang kamu buat dan bagaimana dampaknya padamu?",
    "Kalau kamu bisa menghapus satu penyesalan, apa yang akan kamu hapus?",
    "Apa mimpi yang paling kamu takutkan untuk gagal?",
    "Kalau kamu bisa mengubah satu hal dalam kepribadianmu, apa yang ingin kamu ubah?",
    "Apa hal yang paling sulit untuk kamu katakan kepada orang terdekatmu?",
    "Apa pengalaman paling membentuk pandanganmu tentang dunia?",
    "Apa hal paling membingungkan tentang dirimu yang bahkan temanmu nggak tahu?",
    "Siapa orang yang pernah membuatmu menangis tapi juga membuatmu tumbuh?",
    "Apa hal yang paling membuatmu merasa benar-benar bebas?",
    "Kalau kamu harus memilih satu kata untuk mendeskripsikan dirimu, kata apa itu?",
    "Apa hal yang membuatmu paling bangga pada dirimu sendiri?",
    
    // Pengalaman hidup
    "Apa pengalaman paling memalukan yang pernah kamu alami?",
    "Apa hal paling spontan yang pernah kamu lakukan?",
    "Kalau bisa tinggal di satu tempat di dunia ini, di mana dan kenapa?",
    "Apa pengalaman paling ekstrem yang pernah kamu alami?",
    "Siapa orang yang paling berpengaruh dalam hidupmu dan mengapa?",
    "Apa keputusan terberat yang pernah kamu buat dalam hidup?",
    "Pernahkah kamu merasa putus asa tapi kemudian menemukan harapan?",
    "Apa pengalaman yang paling membuatmu merasa kuat?",
    "Kalau bisa mengulang satu momen bahagia, momen apa itu?",
    "Apa hal yang paling membuatmu menyesal?",
    "Pernahkah kamu menghadapi ketakutan terbesarmu? Bagaimana rasanya?",
    "Apa hal paling menantang yang pernah kamu pelajari tentang dirimu?",
    "Pernahkah kamu membuat keputusan yang sepenuhnya berbeda dari orang lain tapi ternyata benar?",
    "Apa hal yang paling kamu syukuri dalam hidupmu?",
    "Kalau hidupmu diilustrasikan sebagai film, adegan mana yang paling dramatis?",
    
    // Persahabatan
    "Siapa teman yang paling berarti bagimu dan kenapa?",
    "Apa hal paling lucu yang pernah kamu lakukan bersama temanmu?",
    "Pernahkah kamu merasa dikhianati teman? Bagaimana kamu menghadapinya?",
    "Apa kenangan paling berkesan bersama teman masa kecilmu?",
    "Siapa teman yang paling menginspirasi hidupmu?",
    "Apa hal yang paling sulit dari mempertahankan persahabatan?",
    "Kalau bisa mengubah satu hal dalam persahabatanmu, apa yang akan kamu ubah?",
    "Apa hal kecil yang selalu kamu hargai dari temanmu?",
    "Pernahkah kamu menyembunyikan sesuatu dari temanmu untuk melindungi mereka?",
    "Siapa teman yang pernah membuatmu menangis tapi juga membuatmu tertawa paling banyak?",
    
    // Percintaan (15+ deep questions)
    "Pernahkah kamu jatuh cinta tapi nggak bisa mengatakannya?",
    "Apa hal yang paling membuatmu nyaman saat bersama seseorang?",
    "Kalau bisa merancang pasangan ideal, apa hal yang paling penting bagimu?",
    "Pernahkah kamu merasa patah hati tapi kemudian bersyukur karena itu terjadi?",
    "Apa kualitas dalam seseorang yang membuatmu langsung tertarik?",
    "Apa kenangan romantis yang paling berkesan dalam hidupmu?",
    "Kalau kamu bisa mengulang satu hubungan masa lalu, apa yang ingin kamu ubah?",
    "Apa hal kecil yang selalu membuatmu merasa dicintai?",
    "Pernahkah kamu jatuh cinta pada orang yang salah? Bagaimana rasanya?",
    "Apa hal yang paling kamu hargai dari pasanganmu sekarang atau sebelumnya?",
    "Kalau harus memilih antara cinta dan persahabatan, mana yang akan kamu pilih?",
    "Apa ketakutan terbesar yang kamu rasakan dalam percintaan?",
    "Pernahkah kamu merasa cemburu tapi mencoba untuk tidak menunjukkannya?",
    "Apa tanda bahwa seseorang benar-benar tulus mencintaimu menurutmu?",
    "Kalau bisa menulis surat cinta untuk diri sendiri, apa yang akan kamu tulis?",
    "Apa hal paling romantis yang ingin kamu lakukan tapi belum sempat?",
    "Pernahkah kamu jatuh cinta pada teman dekat? Bagaimana kamu menghadapinya?",
    "Apa hal yang membuatmu percaya cinta sejati itu ada?",
    
    // Random deep & fun
    "Apa impian yang terdalam tapi jarang kamu ceritakan?",
    "Kalau kamu bisa membaca pikiran satu orang selama sehari, siapa yang akan kamu pilih?",
    "Apa hal paling spontan yang ingin kamu lakukan sebelum meninggal?",
    "Kalau hidupmu tiba-tiba jadi populer, hal apa yang ingin orang tahu tentangmu?",
    "Apa hal paling menakutkan yang pernah kamu alami tapi ternyata membuatmu kuat?",
    "Siapa yang paling membuatmu merasa aman?",
    "Kalau kamu bisa punya satu kemampuan super, apa dan kenapa?",
    "Apa hal yang paling membuatmu bingung soal hidup?",
    "Kalau kamu bisa bertanya satu pertanyaan pada alam semesta, apa itu?",
    "Apa hal yang paling ingin kamu pelajari tapi belum sempat?",
    "Kalau bisa menghapus satu momen canggung dari hidupmu, momen apa itu?",
    "Apa yang paling membuatmu merasa hidup di dunia ini?",
    "Kalau harus tinggal satu hari tanpa teknologi, apa yang akan kamu lakukan?",
    "Apa hal paling berkesan yang pernah kamu dengar dari seseorang?",
    "Kalau kamu bisa mengubah satu aturan sosial, apa yang ingin diubah?",
    "Apa pengalaman yang paling membuatmu tersadar tentang dirimu sendiri?",
    "Kalau kamu bisa makan malam dengan siapa saja di dunia, siapa dan kenapa?",
    "Apa hal paling spontan yang pernah kamu lakukan demi orang lain?",
    "Kalau bisa mengulang satu persahabatan yang hilang, siapa dan kenapa?",
    "Apa hal paling membingungkan yang pernah kamu rasakan tentang perasaanmu sendiri?",
    "Kalau harus menulis buku tentang hidupmu, judulnya apa?",
    "Apa hal paling sederhana yang selalu bisa membuatmu bahagia?",
    "Apa hal yang ingin kamu capai sebelum umur 30?",
    "Kalau bisa mengubah satu hal dalam karaktermu, apa itu?",
    "Apa hal yang paling ingin kamu katakan tapi takut orang lain salah paham?",
    "Apa hal paling memotivasi yang pernah kamu dengar?",
    "Kalau hidupmu adalah lagu, genre apa yang paling cocok?",
    "Apa hal yang membuatmu merasa paling berarti dalam hidup?",
    "Kalau bisa menjawab satu misteri dunia, apa yang ingin kamu ketahui?",
    "Apa pengalaman paling magis yang pernah kamu alami?",
    "Apa hal yang paling membuatmu merasa tenang?",
    "Kalau harus tinggal di satu era masa lalu, era apa yang ingin kamu pilih?",
    "Apa hal paling tak terduga yang pernah terjadi padamu?",
    "Kalau bisa memaafkan satu orang tanpa harus ketemu, siapa dan kenapa?",
    "Apa hal paling menantang yang pernah kamu pelajari dari hubungan?",
    "Kalau bisa punya hewan peliharaan mistis, apa dan kenapa?",
    "Apa pengalaman paling lucu tapi juga bikin malu yang pernah kamu alami?",
    "Apa hal paling absurd tapi ingin kamu lakukan suatu hari nanti?",
    "Kalau bisa mengubah satu momen dalam hidup temanmu, apa itu?",
    "Apa hal yang membuatmu paling penasaran tentang manusia?",
    "Kalau bisa tinggal di satu tempat di dunia tanpa batas waktu, tempat mana?",
    "Apa hal yang ingin kamu bawa ke kehidupan selanjutnya?",
    "Kalau bisa membuat satu peraturan dunia, apa yang akan kamu buat?",
    "Apa hal paling menakjubkan yang pernah kamu lihat?",
    "Kalau bisa mengulang satu kesalahan, apa yang ingin kamu perbaiki?",
    "Apa hal paling berkesan tentang orang tua atau keluargamu?",
    "Kalau bisa menjadi satu karakter fiksi, siapa dan kenapa?",
    "Apa hal paling aneh yang membuatmu tertawa terbahak-bahak?",
    "Apa hal paling mendalam yang pernah kamu pelajari dari seseorang?",
    "Kalau bisa menonton satu momen sejarah, momen apa yang ingin kamu lihat?",
    "Apa hal paling intim tapi menyenangkan yang bisa kamu bagikan tentang dirimu?",
    "Kalau hidupmu diukur dari pengalaman, apa yang paling berharga sejauh ini?",

    //test
    "Siapa orang yang paling menginspirasi kamu dalam hidup?",
  ];


  const dareQuestions: string[] = [
    "Kirim chat ke crush kamu sekarang!",
    "Posting selfie jelek di media sosial selama 5 menit!",
    "Telepon orang random dan bilang 'Aku cinta kamu'",
    "Joget TikTok dance di depan semua orang!",
    "Makan kombinasi makanan aneh yang dipilih teman!",
    "Bicara dengan aksen lucu selama 3 giliran!",
    "Biarkan teman menulis di wajahmu dengan spidol!",
    "Nyanyikan lagu dengan suara opera!",
    "Pose konyol dan jadikan foto profil 24 jam!",
    "Push up 20 kali sekarang!",
    "Tirukan suara 5 hewan berturut-turut!",
    "Minum air campur garam dan gula!",
    "Ceritakan lelucon sampai ada yang tertawa!",
    "Pura-pura jadi bayi selama 2 menit!",
    "Biarkan pemain lain membaca chat terakhirmu!",
  ];

  const addPlayer = () => {
    const trimmedName = inputName.trim();
    if (trimmedName === "") {
      setNotification("⚠️ Nama tidak boleh kosong!");
      setTimeout(() => setNotification(""), 2000);
      return;
    }
    if (players.includes(trimmedName)) {
      setNotification("⚠️ Nama sudah ada!");
      setTimeout(() => setNotification(""), 2000);
      return;
    }
    setPlayers([...players, trimmedName]);
    setInputName("");
    setNotification(`✨ ${trimmedName} berhasil ditambahkan!`);
    setTimeout(() => setNotification(""), 2000);
  };

  const removePlayer = (name: string) => {
    setPlayers(players.filter((p) => p !== name));
  };

  const startGame = () => {
    if (players.length < 2) {
      setNotification("⚠️ Minimal 2 pemain untuk bermain!");
      setTimeout(() => setNotification(""), 2000);
      return;
    }
    setGameStarted(true);
  };

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setShowQuestion(false);
    setCurrentQuestion(null);
    setSelectedPlayer(null);

    const spins = 5 + Math.random() * 3;
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + extraDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      const segmentAngle = 360 / players.length;
      const normalizedRotation = totalRotation % 360;
      const selectedIndex =
        Math.floor(
          (360 - normalizedRotation + segmentAngle / 2) / segmentAngle
        ) % players.length;

      setSelectedPlayer(players[selectedIndex]);
      setSpinning(false);
    }, 4000);
  };

  const selectQuestionType = (type: QuestionType) => {
    if (!selectedPlayer) return;

    setQuestionType(type);
    const questions = type === "truth" ? truthQuestions : dareQuestions;

    if (!playerQuestions[selectedPlayer]) {
      playerQuestions[selectedPlayer] = { truth: [], dare: [] };
    }

    const usedQuestions = playerQuestions[selectedPlayer][type] || [];

    if (usedQuestions.length >= questions.length) {
      playerQuestions[selectedPlayer][type] = [];
      setNotification("🔄 Pertanyaan untuk pemain ini di-reset!");
      setTimeout(() => setNotification(""), 2000);
    }

    const availableQuestions = questions.filter(
      (_, index) => !playerQuestions[selectedPlayer][type].includes(index)
    );

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    const originalIndex = questions.indexOf(selectedQuestion);

    playerQuestions[selectedPlayer][type].push(originalIndex);
    setPlayerQuestions({ ...playerQuestions });

    setCurrentQuestion(selectedQuestion);
    setShowQuestion(true);
  };

  const nextRound = () => {
    setSelectedPlayer(null);
    setShowQuestion(false);
    setCurrentQuestion(null);
    setQuestionType("");
  };

  const resetGame = () => {
    setPlayers([]);
    setGameStarted(false);
    setSelectedPlayer(null);
    setShowQuestion(false);
    setCurrentQuestion(null);
    setPlayerQuestions({});
    setRotation(0);
  };

  const colors: string[] = ["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8", "#fce7f3"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-4 sm:p-6 lg:p-8 relative">
      {/* Subtle floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl z-50 border border-pink-200 animate-bounce">
          <p className="text-pink-600 font-semibold text-sm">{notification}</p>
        </div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">
              Truth or Dare
            </h1>
            <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 rounded-full"></div>
          </div>
        </div>

        {!gameStarted ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-pink-100">
            {/* Header Section */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Daftar Pemain
              </h2>
            </div>

            {/* Input Section */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                placeholder="Masukkan nama pemain..."
                className="flex-1 px-5 py-3.5 text-gray-800 bg-white border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all placeholder-gray-400"
              />
              <button
                onClick={addPlayer}
                className="px-6 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Tambah Pemain
              </button>
            </div>

            {/* Players Grid */}
            {players.length > 0 ? (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-600">
                    Total: {players.length} pemain
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="group relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 border-2 border-pink-200 hover:border-pink-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                            {index + 1}
                          </div>
                          <span className="font-semibold text-gray-800 truncate max-w-[120px]">
                            {player}
                          </span>
                        </div>
                        <button
                          onClick={() => removePlayer(player)}
                          className="opacity-0 group-hover:opacity-100 p-2 bg-red-100 hover:bg-red-200 rounded-xl transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-8 p-8 bg-pink-50 rounded-2xl border-2 border-dashed border-pink-300 text-center">
                <Smile className="w-12 h-12 text-pink-300 mx-auto mb-3" />
                <p className="text-gray-500">Belum ada pemain. Tambahkan minimal 2 pemain untuk mulai!</p>
              </div>
            )}

            {/* Start Button */}
            <button
              onClick={startGame}
              disabled={players.length < 2}
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white font-bold text-lg rounded-2xl hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Play className="w-6 h-6" />
              Mulai Permainan
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Wheel Section */}
            {!showQuestion && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-pink-100">
                <div className="relative w-full max-w-md mx-auto mb-8" style={{aspectRatio: '1/1'}}>
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 z-10">
                    <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[36px] border-l-transparent border-r-transparent border-t-pink-500 drop-shadow-lg"></div>
                  </div>
                  
                  {/* Wheel */}
                  <div
                    className="w-full h-full rounded-full border-8 border-pink-300 relative overflow-hidden shadow-2xl"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                    }}
                  >
                    {players.map((player, index) => {
                      const angle = (360 / players.length) * index;
                      return (
                        <div
                          key={index}
                          className="absolute w-full h-full"
                          style={{
                            transform: `rotate(${angle}deg)`,
                            transformOrigin: 'center'
                          }}
                        >
                          <div
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1/2"
                            style={{
                              background: colors[index % colors.length],
                              clipPath: `polygon(50% 0%, ${50 - Math.tan(Math.PI / players.length) * 50}% 100%, ${50 + Math.tan(Math.PI / players.length) * 50}% 100%)`
                            }}
                          >
                            <div
                              className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white font-bold text-base sm:text-lg drop-shadow-md"
                              style={{
                                transform: 'translateX(-50%) rotate(0deg)'
                              }}
                            >
                              {player}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                    <RotateCw className={`w-7 h-7 text-white ${spinning ? 'animate-spin' : ''}`} />
                  </div>
                </div>

                {/* Selected Player Banner */}
                {selectedPlayer && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl border-2 border-pink-300">
                    <p className="text-center text-pink-700 font-semibold">
                      Pemain Terpilih: <span className="text-xl font-bold">{selectedPlayer}</span>
                    </p>
                  </div>
                )}

                <button
                  onClick={spinWheel}
                  disabled={spinning || !!selectedPlayer}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg rounded-2xl hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {spinning ? (
                    <>
                      <RotateCw className="w-6 h-6 animate-spin" />
                      Berputar...
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6" />
                      Putar Roda
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Truth or Dare Selection */}
            {selectedPlayer && !showQuestion && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-pink-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                    Giliran {selectedPlayer}!
                  </h2>
                  <p className="text-gray-600">Pilih Truth atau Dare</p>
                </div>
                <div className="grid grid-cols-1S gap-4">
                  <button
                    onClick={() => selectQuestionType('truth')}
                    className="group relative overflow-hidden py-12 bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-2xl sm:text-3xl rounded-3xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-4xl mb-2">🤔</div>
                      <div>TRUTH</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Question Display */}
            {showQuestion && (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-pink-100">
                <div className="text-center mb-6">
                  <div className="inline-block p-4 bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl mb-4">
                    <span className="text-6xl">{questionType === 'truth' ? '🤔' : '😈'}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {questionType === 'truth' ? 'TRUTH' : 'DARE'}
                  </h2>
                  <p className="text-sm text-gray-600">untuk {selectedPlayer}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 sm:p-8 mb-6 border-2 border-pink-200">
                  <p className="text-xl sm:text-2xl text-center text-gray-800 font-semibold leading-relaxed">
                    {currentQuestion}
                  </p>
                </div>
                <button
                  onClick={nextRound}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-2xl hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200"
                >
                  ✓ Sudah Dijawab
                </button>
              </div>
            )}

            {/* Reset Button */}
            <button
              onClick={resetGame}
              className="w-full py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-200"
            >
              Mulai Ulang Permainan
            </button>
          </div>
        )}
      </div>

      {/* Watermark */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <p className="text-pink-400/60 text-xs font-medium">
          Created by vels
        </p>
      </div>
    </div>
  );
};