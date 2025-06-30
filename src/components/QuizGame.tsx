
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Clock, CheckCircle } from 'lucide-react';
import { questions } from '@/data/quizQuestions';
import { toast } from '@/hooks/use-toast';

interface Player {
  name: string;
  score: number;
  answers: number[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizGame = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [players, setPlayers] = useState<Player[]>([
    { name: '', score: 0, answers: [] },
    { name: '', score: 0, answers: [] }
  ]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, gameState, showResult]);

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Time's up!",
        description: `${players[currentPlayer - 1].name} didn't answer in time.`,
        variant: "destructive"
      });
    }
    handleNextQuestion();
  };

  const startGame = () => {
    if (players[0].name && players[1].name) {
      setGameState('playing');
      setTimeLeft(30);
    } else {
      toast({
        title: "Missing player names",
        description: "Please enter names for both players.",
        variant: "destructive"
      });
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newPlayers = [...players];
    
    newPlayers[currentPlayer - 1].answers.push(selectedAnswer);
    if (isCorrect) {
      newPlayers[currentPlayer - 1].score += 1;
    }
    
    setPlayers(newPlayers);
    setShowResult(true);

    toast({
      title: isCorrect ? "Correct!" : "Incorrect!",
      description: isCorrect ? "Well done!" : `The correct answer was: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`,
      variant: isCorrect ? "default" : "destructive"
    });

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    
    if (currentQuestion < questions.length - 1) {
      if (currentPlayer === 2) {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentPlayer(1);
      } else {
        setCurrentPlayer(2);
      }
      setTimeLeft(30);
    } else {
      if (currentPlayer === 1) {
        setCurrentPlayer(2);
        setTimeLeft(30);
      } else {
        setGameState('finished');
      }
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setCurrentQuestion(0);
    setCurrentPlayer(1);
    setTimeLeft(30);
    setPlayers([
      { name: '', score: 0, answers: [] },
      { name: '', score: 0, answers: [] }
    ]);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getWinner = () => {
    if (players[0].score > players[1].score) return { player: players[0], index: 0 };
    if (players[1].score > players[0].score) return { player: players[1], index: 1 };
    return null; // Tie
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Computer Networks Quiz</CardTitle>
            <p className="text-gray-600">Two Player Challenge</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Player 1 Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={players[0].name}
                onChange={(e) => setPlayers([{ ...players[0], name: e.target.value }, players[1]])}
                placeholder="Enter Player 1 name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Player 2 Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={players[1].name}
                onChange={(e) => setPlayers([players[0], { ...players[1], name: e.target.value }])}
                placeholder="Enter Player 2 name"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Quiz Rules:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 30 multiple choice questions</li>
                <li>• 30 seconds per question</li>
                <li>• Players alternate turns</li>
                <li>• Highest score wins!</li>
              </ul>
            </div>
            <Button onClick={startGame} className="w-full bg-blue-500 hover:bg-blue-600">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'finished') {
    const winner = getWinner();
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {players.map((player, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${winner && winner.index === index ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}>
                  <div className="text-center">
                    {winner && winner.index === index && (
                      <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    )}
                    <h3 className="font-bold text-lg">{player.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">{player.score}/30</p>
                    <p className="text-sm text-gray-600">
                      {((player.score / 30) * 100).toFixed(1)}% correct
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              {winner ? (
                <div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">
                    🎉 {winner.player.name} Wins! 🎉
                  </h2>
                  <p className="text-gray-600">
                    Final Score: {winner.player.score} out of 30 questions correct
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">
                    🤝 It's a Tie! 🤝
                  </h2>
                  <p className="text-gray-600">
                    Both players scored {players[0].score} out of 30 questions
                  </p>
                </div>
              )}
            </div>
            
            <Button onClick={resetGame} className="w-full bg-blue-500 hover:bg-blue-600">
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion * 2 + currentPlayer - 1) / 60) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Computer Networks Quiz</h1>
            <Badge variant="outline" className="text-lg px-3 py-1">
              Question {currentQuestion + 1}/30
            </Badge>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-lg font-bold ${currentPlayer === 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                {players[0].name || 'Player 1'}
              </div>
              <div className="text-sm text-gray-600">Score: {players[0].score}</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-orange-500'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
            
            <div className="text-center">
              <div className={`text-lg font-bold ${currentPlayer === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                {players[1].name || 'Player 2'}
              </div>
              <div className="text-sm text-gray-600">Score: {players[1].score}</div>
            </div>
          </div>
        </div>

        {/* Current Player Indicator */}
        <div className="text-center mb-6">
          <Badge className="text-lg px-4 py-2 bg-blue-500">
            {players[currentPlayer - 1].name}'s Turn
          </Badge>
        </div>

        {/* Question Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 mb-6">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    showResult
                      ? index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : index === selectedAnswer && index !== currentQ.correctAnswer
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                      : selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-sm bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && index === currentQ.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {!showResult && (
              <Button 
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              >
                Submit Answer
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizGame;
