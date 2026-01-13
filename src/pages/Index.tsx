import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import LoginForm from '@/components/LoginForm';
import QuizTab from '@/components/QuizTab';
import ProfileTab from '@/components/ProfileTab';
import LeaderboardTab from '@/components/LeaderboardTab';
import QuizSelector from '@/components/QuizSelector';
import { quizCategories, Question } from '@/data/quizData';

type User = {
  id: string;
  name: string;
  email: string;
  score: number;
  friends: string[];
};

const mockLeaderboard = [
  { id: '1', name: 'Алексей Петров', score: 2450, avatar: 'АП' },
  { id: '2', name: 'Мария Иванова', score: 2380, avatar: 'МИ' },
  { id: '3', name: 'Сергей Козлов', score: 2210, avatar: 'СК' },
  { id: '4', name: 'Елена Смирнова', score: 2100, avatar: 'ЕС' },
  { id: '5', name: 'Дмитрий Волков', score: 1950, avatar: 'ДВ' },
];

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState('quiz');
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user: User = {
      id: '6',
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      score: 0,
      friends: []
    };
    setCurrentUser(user);
    setIsLoggedIn(true);
    toast.success(`Добро пожаловать, ${user.name}!`);
  };

  const handleSelectQuiz = (categoryId: string) => {
    const category = quizCategories.find(c => c.id === categoryId);
    if (category) {
      setSelectedQuizId(categoryId);
      setCurrentQuestions(category.questions);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleBackToMenu = () => {
    setSelectedQuizId(null);
    setCurrentQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === currentQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      const points = 100;
      setScore(score + points);
      toast.success(`+${points} баллов! 🎉`);
    } else {
      toast.error('Неверный ответ');
    }

    setTimeout(() => {
      if (currentQuestion < currentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        if (currentUser) {
          setCurrentUser({ ...currentUser, score: score + (isCorrect ? 100 : 0) });
        }
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-secondary border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-secondary" />
            </div>
            <h1 className="text-xl font-bold text-primary">Роснефть Викторина</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Icon name="Trophy" size={18} className="text-primary" />
              <span className="font-semibold text-white">{currentUser?.score || score} баллов</span>
            </div>
            <Avatar className="border-2 border-primary">
              <AvatarFallback className="bg-primary text-secondary font-bold">
                {currentUser?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-secondary/50 border border-primary/20">
            <TabsTrigger value="quiz" className="data-[state=active]:bg-primary data-[state=active]:text-secondary">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Викторина
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-secondary">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-primary data-[state=active]:text-secondary">
              <Icon name="Medal" size={18} className="mr-2" />
              Рейтинг
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quiz" className="animate-fade-in">
            {!selectedQuizId ? (
              <QuizSelector 
                categories={quizCategories}
                onSelectQuiz={handleSelectQuiz}
              />
            ) : (
              <QuizTab 
                questions={currentQuestions}
                currentQuestion={currentQuestion}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                score={score}
                onAnswer={handleAnswer}
                onRestart={restartQuiz}
                onBackToMenu={handleBackToMenu}
                quizTitle={quizCategories.find(c => c.id === selectedQuizId)?.title}
              />
            )}
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <ProfileTab 
              currentUser={currentUser}
              score={score}
              leaderboard={mockLeaderboard}
            />
          </TabsContent>

          <TabsContent value="leaderboard" className="animate-fade-in">
            <LeaderboardTab leaderboard={mockLeaderboard} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}