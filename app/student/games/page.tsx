"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"

type GameType = "memory" | "pattern" | "math" | "wordmatch" | "sorting" | null

export default function StudentGames() {
  const [activeGame, setActiveGame] = useState<GameType>(null)

  const games = [
    {
      id: "memory" as GameType,
      name: "Memory Match",
      icon: "🧠",
      desc: "Match the emoji pairs!",
      color: "bg-[#4A90E2]",
    },
    {
      id: "pattern" as GameType,
      name: "Pattern Game",
      icon: "🎯",
      desc: "Follow the pattern!",
      color: "bg-[#7BC67E]",
    },
    {
      id: "math" as GameType,
      name: "Quick Math",
      icon: "🔢",
      desc: "Solve fun math problems!",
      color: "bg-[#FFC857]",
    },
    {
      id: "wordmatch" as GameType,
      name: "Word Match",
      icon: "📝",
      desc: "Match words to pictures!",
      color: "bg-[#F97316]",
    },
    {
      id: "sorting" as GameType,
      name: "Color Sort",
      icon: "🌈",
      desc: "Sort items by color!",
      color: "bg-[#EC4899]",
    },
  ]

  if (activeGame === "memory") return <MemoryGame onBack={() => setActiveGame(null)} />
  if (activeGame === "pattern") return <PatternGame onBack={() => setActiveGame(null)} />
  if (activeGame === "math") return <MathGame onBack={() => setActiveGame(null)} />
  if (activeGame === "wordmatch") return <WordMatchGame onBack={() => setActiveGame(null)} />
  if (activeGame === "sorting") return <SortingGame onBack={() => setActiveGame(null)} />

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="student" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Learning Games" backHref="/student/dashboard" />

        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">🎮</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Pick a Game!</h1>
          <p className="text-muted-foreground">Learn while having fun!</p>
        </div>

        <div className="grid gap-4">
          {games.map((game) => (
            <Card
              key={game.id}
              className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-0 shadow-lg overflow-hidden"
              onClick={() => setActiveGame(game.id)}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div
                  className={`w-20 h-20 ${game.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg`}
                >
                  {game.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{game.name}</h3>
                  <p className="text-muted-foreground">{game.desc}</p>
                </div>
                <span className="text-3xl hover:scale-125 transition-transform">▶️</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Memory Match Game
function MemoryGame({ onBack }: { onBack: () => void }) {
  const emojis = ["🐶", "🐱", "🐰", "🦊", "🐸", "🐵", "🐼", "🦁"]
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)

  useEffect(() => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    setCards(shuffled)
  }, [])

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        const newMatched = [...matched, ...newFlipped]
        setMatched(newMatched)
        setFlipped([])
        if (newMatched.length === cards.length) {
          setWon(true)
        }
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  const resetGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setWon(false)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="student" />
      <div className="max-w-md mx-auto px-4 pt-16">
        <PageNav title="Memory Match" backHref="/student/games" />
        <div className="text-center mb-4">
          <p className="text-lg font-medium text-foreground">Moves: {moves}</p>
        </div>

        {won ? (
          <Card className="text-center p-8 border-0 shadow-lg">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">You Won!</h2>
            <p className="text-muted-foreground mb-4">Completed in {moves} moves!</p>
            <div className="flex gap-3">
              <Button onClick={resetGame} className="flex-1 bg-[#7BC67E] hover:bg-[#4CAF50]">
                Play Again
              </Button>
              <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
                Back
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {cards.map((emoji, i) => (
              <button
                key={i}
                onClick={() => handleCardClick(i)}
                className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all transform hover:scale-105 ${
                  flipped.includes(i) || matched.includes(i)
                    ? "bg-[#4A90E2] text-white rotate-0"
                    : "bg-muted hover:bg-muted/80 rotate-0"
                } ${matched.includes(i) ? "bg-[#7BC67E]" : ""}`}
              >
                {flipped.includes(i) || matched.includes(i) ? emoji : "❓"}
              </button>
            ))}
          </div>
        )}

        <Button variant="outline" className="w-full mt-6 bg-transparent" onClick={onBack}>
          ← Back to Games
        </Button>
      </div>
    </div>
  )
}

// Pattern Game
function PatternGame({ onBack }: { onBack: () => void }) {
  const colors = ["red", "blue", "green", "yellow"]
  const colorMap: Record<string, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
  }

  const [pattern, setPattern] = useState<string[]>([])
  const [playerPattern, setPlayerPattern] = useState<string[]>([])
  const [isShowing, setIsShowing] = useState(false)
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const showPattern = useCallback(async (patternToShow: string[]) => {
    setIsShowing(true)
    for (const color of patternToShow) {
      await new Promise((r) => setTimeout(r, 500))
      setActiveColor(color)
      await new Promise((r) => setTimeout(r, 500))
      setActiveColor(null)
    }
    setIsShowing(false)
  }, [])

  const startGame = useCallback(() => {
    const newPattern = [colors[Math.floor(Math.random() * 4)]]
    setPattern(newPattern)
    setPlayerPattern([])
    setGameOver(false)
    setGameStarted(true)
    setScore(0)
    setTimeout(() => showPattern(newPattern), 500)
  }, [showPattern])

  const handleColorClick = (color: string) => {
    if (isShowing || gameOver || !gameStarted) return

    const newPlayerPattern = [...playerPattern, color]
    setPlayerPattern(newPlayerPattern)

    if (newPlayerPattern[newPlayerPattern.length - 1] !== pattern[newPlayerPattern.length - 1]) {
      setGameOver(true)
      return
    }

    if (newPlayerPattern.length === pattern.length) {
      setScore(score + 1)
      const newPattern = [...pattern, colors[Math.floor(Math.random() * 4)]]
      setPattern(newPattern)
      setPlayerPattern([])
      setTimeout(() => showPattern(newPattern), 1000)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="student" />
      <div className="max-w-md mx-auto px-4 pt-16">
        <PageNav title="Pattern Game" backHref="/student/games" />
        <div className="text-center mb-6">
          <p className="text-lg font-medium text-foreground">Score: {score}</p>
          {isShowing && <p className="text-[#4A90E2] animate-pulse">Watch the pattern!</p>}
        </div>

        {!gameStarted ? (
          <Card className="text-center p-8 border-0 shadow-lg">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-xl font-bold text-foreground mb-2">Pattern Game</h2>
            <p className="text-muted-foreground mb-4">Watch the colors light up, then repeat the pattern!</p>
            <Button onClick={startGame} className="bg-[#7BC67E] hover:bg-[#4CAF50]">
              Start Game
            </Button>
          </Card>
        ) : gameOver ? (
          <Card className="text-center p-8 border-0 shadow-lg">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Game Over!</h2>
            <p className="text-muted-foreground mb-4">You scored {score} points!</p>
            <Button onClick={startGame} className="bg-[#7BC67E] hover:bg-[#4CAF50]">
              Try Again
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className={`aspect-square rounded-2xl transition-all ${colorMap[color]} ${
                  activeColor === color ? "scale-110 ring-4 ring-white shadow-2xl" : "hover:scale-105"
                } ${isShowing ? "cursor-not-allowed" : "cursor-pointer"}`}
              />
            ))}
          </div>
        )}

        <Button variant="outline" className="w-full mt-6 bg-transparent" onClick={onBack}>
          ← Back to Games
        </Button>
      </div>
    </div>
  )
}

// Math Game
function MathGame({ onBack }: { onBack: () => void }) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operator, setOperator] = useState("+")
  const [options, setOptions] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)

  const generateQuestion = useCallback(() => {
    const ops = ["+", "-"]
    const op = ops[Math.floor(Math.random() * ops.length)]
    const n1 = Math.floor(Math.random() * 10) + 1
    const n2 = Math.floor(Math.random() * 10) + 1

    setNum1(n1)
    setNum2(n2)
    setOperator(op)

    const correct = op === "+" ? n1 + n2 : n1 - n2
    const wrongOptions = [
      correct + Math.floor(Math.random() * 3) + 1,
      correct - Math.floor(Math.random() * 3) - 1,
      correct + Math.floor(Math.random() * 5) - 2,
    ].filter((x) => x !== correct && x >= 0)

    const allOptions = [correct, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
    setFeedback(null)
  }, [])

  useEffect(() => {
    generateQuestion()
  }, [generateQuestion])

  const handleAnswer = (answer: number) => {
    const correct = operator === "+" ? num1 + num2 : num1 - num2
    if (answer === correct) {
      setScore(score + 10)
      setStreak(streak + 1)
      setFeedback("correct")
    } else {
      setStreak(0)
      setFeedback("wrong")
    }
    setTimeout(generateQuestion, 1000)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="student" />
      <div className="max-w-md mx-auto px-4 pt-16">
        <PageNav title="Quick Math" backHref="/student/games" />
        <div className="flex justify-between mb-6">
          <div className="text-center bg-muted px-4 py-2 rounded-xl">
            <p className="text-2xl font-bold text-foreground">{score}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="text-center bg-muted px-4 py-2 rounded-xl">
            <p className="text-2xl font-bold text-foreground">{streak}🔥</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
        </div>

        <Card
          className={`mb-6 border-0 shadow-lg transition-all ${
            feedback === "correct" ? "ring-4 ring-[#7BC67E]" : feedback === "wrong" ? "ring-4 ring-[#D9534F]" : ""
          }`}
        >
          <CardContent className="p-8 text-center">
            {feedback === "correct" && <div className="text-4xl mb-2">🎉</div>}
            {feedback === "wrong" && <div className="text-4xl mb-2">😅</div>}
            <p className="text-4xl font-bold text-foreground">
              {num1} {operator} {num2} = ?
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          {options.map((option, i) => (
            <Button
              key={i}
              onClick={() => handleAnswer(option)}
              className="h-16 text-2xl bg-[#4A90E2] hover:bg-[#1F5DA0]"
              disabled={feedback !== null}
            >
              {option}
            </Button>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-6 bg-transparent" onClick={onBack}>
          ← Back to Games
        </Button>
      </div>
    </div>
  )
}

// Word Match Game - NEW
function WordMatchGame({ onBack }: { onBack: () => void }) {
  const wordPairs = [
    { word: "Apple", icon: "🍎" },
    { word: "Dog", icon: "🐶" },
    { word: "Sun", icon: "☀️" },
    { word: "Book", icon: "📚" },
    { word: "Star", icon: "⭐" },
    { word: "Tree", icon: "🌳" },
  ]

  const [currentPair, setCurrentPair] = useState(wordPairs[0])
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)

  const generateQuestion = useCallback(() => {
    const pair = wordPairs[Math.floor(Math.random() * wordPairs.length)]
    setCurrentPair(pair)

    const wrongOptions = wordPairs
      .filter((p) => p.word !== pair.word)
      .map((p) => p.icon)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const allOptions = [pair.icon, ...wrongOptions].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
    setFeedback(null)
  }, [])

  useEffect(() => {
    generateQuestion()
  }, [generateQuestion])

  const handleAnswer = (selectedIcon: string) => {
    setTotal(total + 1)
    if (selectedIcon === currentPair.icon) {
      setScore(score + 1)
      setFeedback("correct")
    } else {
      setFeedback("wrong")
    }
    setTimeout(generateQuestion, 1000)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="student" />
      <div className="max-w-md mx-auto px-4 pt-16">
        <PageNav title="Word Match" backHref="/student/games" />

        <div className="text-center mb-6">
          <p className="text-lg font-medium text-foreground">
            Score: {score}/{total}
          </p>
        </div>

        <Card
          className={`mb-6 border-0 shadow-lg ${feedback === "correct" ? "ring-4 ring-[#7BC67E]" : feedback === "wrong" ? "ring-4 ring-[#D9534F]" : ""}`}
        >
          <CardContent className="p-8 text-center">
            {feedback === "correct" && <div className="text-3xl mb-2">Great job!</div>}
            {feedback === "wrong" && <div className="text-3xl mb-2">Try again!</div>}
            <p className="text-muted-foreground mb-2">Find the picture for:</p>
            <p className="text-4xl font-bold text-foreground">{currentPair.word}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {options.map((icon, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(icon)}
              disabled={feedback !== null}
              className="aspect-square bg-muted rounded-2xl text-5xl flex items-center justify-center hover:bg-muted/80 hover:scale-105 transition-all disabled:opacity-50"
            >
              {icon}
            </button>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-6 bg-transparent" onClick={onBack}>
          ← Back to Games
        </Button>
      </div>
    </div>
  )
}

// Color Sorting Game - NEW
function SortingGame({ onBack }: { onBack: () => void }) {
  const items = [
    { icon: "🍎", color: "red" },
    { icon: "🍓", color: "red" },
    { icon: "🌹", color: "red" },
    { icon: "🍌", color: "yellow" },
    { icon: "⭐", color: "yellow" },
    { icon: "☀️", color: "yellow" },
    { icon: "🥬", color: "green" },
    { icon: "🌳", color: "green" },
    { icon: "🐸", color: "green" },
    { icon: "🫐", color: "blue" },
    { icon: "💎", color: "blue" },
    { icon: "🌊", color: "blue" },
  ]

  const [currentItem, setCurrentItem] = useState(items[0])
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)

  const generateItem = useCallback(() => {
    const item = items[Math.floor(Math.random() * items.length)]
    setCurrentItem(item)
    setFeedback(null)
  }, [])

  useEffect(() => {
    generateItem()
  }, [generateItem])

  const handleSort = (color: string) => {
    setTotal(total + 1)
    if (color === currentItem.color) {
      setScore(score + 1)
      setFeedback("correct")
    } else {
      setFeedback("wrong")
    }
    setTimeout(generateItem, 800)
  }

  const colorButtons = [
    { color: "red", bg: "bg-red-500" },
    { color: "yellow", bg: "bg-yellow-500" },
    { color: "green", bg: "bg-green-500" },
    { color: "blue", bg: "bg-blue-500" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="student" />
      <div className="max-w-md mx-auto px-4 pt-16">
        <PageNav title="Color Sort" backHref="/student/games" />

        <div className="text-center mb-6">
          <p className="text-lg font-medium text-foreground">
            Score: {score}/{total}
          </p>
        </div>

        <Card
          className={`mb-6 border-0 shadow-lg ${feedback === "correct" ? "ring-4 ring-[#7BC67E]" : feedback === "wrong" ? "ring-4 ring-[#D9534F]" : ""}`}
        >
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">What color is this?</p>
            <span className="text-8xl block">{currentItem.icon}</span>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {colorButtons.map((btn) => (
            <button
              key={btn.color}
              onClick={() => handleSort(btn.color)}
              disabled={feedback !== null}
              className={`h-20 ${btn.bg} rounded-2xl text-white font-bold text-lg capitalize hover:opacity-90 hover:scale-105 transition-all disabled:opacity-50`}
            >
              {btn.color}
            </button>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-6 bg-transparent" onClick={onBack}>
          ← Back to Games
        </Button>
      </div>
    </div>
  )
}
