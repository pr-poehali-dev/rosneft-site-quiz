import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  score: number;
  friends: string[];
};

type Question = {
  id: number;
  text: string;
  options: string[];
  correct: number;
  projectInfo: {
    title: string;
    description: string;
    status: string;
  };
};

const mockQuestions: Question[] = [
  {
    id: 1,
    text: 'В каком году был запущен проект "Восток Ойл"?',
    options: ['2019', '2020', '2021', '2022'],
    correct: 1,
    projectInfo: {
      title: 'Восток Ойл',
      description: 'Крупнейший нефтегазовый проект Роснефти в Арктике. Запущен в 2020 году, включает разработку месторождений на Таймыре с запасами более 6 млрд тонн нефтяного эквивалента.',
      status: 'Запущен'
    }
  },
  {
    id: 2,
    text: 'Какая технология используется в проекте "Цифровое месторождение"?',
    options: ['Блокчейн', 'Искусственный интеллект', 'Квантовые вычисления', 'Все перечисленное'],
    correct: 1,
    projectInfo: {
      title: 'Цифровое месторождение',
      description: 'Проект по внедрению AI и машинного обучения для оптимизации добычи. Позволяет увеличить эффективность на 15% и снизить затраты благодаря прогнозной аналитике.',
      status: 'В разработке'
    }
  },
  {
    id: 3,
    text: 'Сколько заводов входит в проект "Дальневосточный НПЗ"?',
    options: ['1', '2', '3', '4'],
    correct: 0,
    projectInfo: {
      title: 'Дальневосточный НПЗ',
      description: 'Современный нефтеперерабатывающий завод в Приморском крае мощностью 12 млн тонн нефти в год. Обеспечивает топливом весь Дальний Восток России.',
      status: 'Запущен'
    }
  }
];

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

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === mockQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      const points = 100;
      setScore(score + points);
      toast.success(`+${points} баллов! 🎉`);
    } else {
      toast.error('Неверный ответ');
    }

    setTimeout(() => {
      if (currentQuestion < mockQuestions.length - 1) {
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
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-primary/20 animate-scale-in">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Zap" size={40} className="text-secondary" />
            </div>
            <CardTitle className="text-3xl font-bold">Роснефть Викторина</CardTitle>
            <CardDescription className="text-base">
              Проверьте свои знания о проектах компании
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Введите ваше имя" 
                  required 
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold">
                Войти
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
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
            {!showResult ? (
              <Card className="max-w-3xl mx-auto border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-primary text-primary">
                      Вопрос {currentQuestion + 1} из {mockQuestions.length}
                    </Badge>
                    <Badge className="bg-primary text-secondary">
                      {mockQuestions[currentQuestion].projectInfo.status}
                    </Badge>
                  </div>
                  <Progress value={((currentQuestion + 1) / mockQuestions.length) * 100} className="mb-4" />
                  <CardTitle className="text-2xl">{mockQuestions[currentQuestion].text}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {mockQuestions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        variant={
                          selectedAnswer === null 
                            ? 'outline' 
                            : index === mockQuestions[currentQuestion].correct
                            ? 'default'
                            : selectedAnswer === index
                            ? 'destructive'
                            : 'outline'
                        }
                        className={`h-auto p-4 justify-start text-left text-base ${
                          selectedAnswer === null 
                            ? 'hover:bg-primary/10 hover:border-primary border-primary/20' 
                            : index === mockQuestions[currentQuestion].correct
                            ? 'bg-primary text-secondary'
                            : ''
                        }`}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                        {option}
                        {selectedAnswer !== null && index === mockQuestions[currentQuestion].correct && (
                          <Icon name="Check" size={20} className="ml-auto" />
                        )}
                        {selectedAnswer === index && index !== mockQuestions[currentQuestion].correct && (
                          <Icon name="X" size={20} className="ml-auto" />
                        )}
                      </Button>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary hover:bg-primary/10">
                        <Icon name="Info" size={18} className="mr-2" />
                        Подробнее о проекте
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg border-primary/20">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-primary">
                          {mockQuestions[currentQuestion].projectInfo.title}
                        </DialogTitle>
                        <DialogDescription className="text-base pt-4 text-foreground">
                          {mockQuestions[currentQuestion].projectInfo.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="pt-4">
                        <Badge className="bg-primary text-secondary">
                          {mockQuestions[currentQuestion].projectInfo.status}
                        </Badge>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto text-center border-primary/20 animate-scale-in">
                <CardHeader className="space-y-6">
                  <div className="mx-auto w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Trophy" size={48} className="text-secondary" />
                  </div>
                  <CardTitle className="text-3xl">Викторина завершена!</CardTitle>
                  <CardDescription className="text-xl">
                    Вы набрали <span className="text-primary font-bold text-2xl">{score}</span> баллов
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-primary/10 rounded-lg p-6">
                    <p className="text-lg mb-2">Ваш результат</p>
                    <p className="text-4xl font-bold text-primary">{score}/{mockQuestions.length * 100}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round((score / (mockQuestions.length * 100)) * 100)}% правильных ответов
                    </p>
                  </div>
                  <Button onClick={restartQuiz} className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold">
                    <Icon name="RotateCw" size={18} className="mr-2" />
                    Пройти снова
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card className="max-w-2xl mx-auto border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-4 border-primary">
                    <AvatarFallback className="bg-primary text-secondary text-2xl font-bold">
                      {currentUser?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{currentUser?.name}</CardTitle>
                    <CardDescription>{currentUser?.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-primary/10 border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Icon name="Trophy" size={16} className="text-primary" />
                        Всего баллов
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">{currentUser?.score || score}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/10 border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Icon name="Users" size={16} className="text-primary" />
                        Друзей
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">{currentUser?.friends.length || 0}</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Users" size={20} className="text-primary" />
                    Добавить друзей
                  </h3>
                  <div className="space-y-2">
                    {mockLeaderboard.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="border-2 border-primary">
                            <AvatarFallback className="bg-primary text-secondary font-bold">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.score} баллов</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-secondary">
                          <Icon name="UserPlus" size={16} className="mr-1" />
                          Добавить
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="animate-fade-in">
            <Card className="max-w-3xl mx-auto border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Medal" size={24} className="text-primary" />
                  Рейтинг участников
                </CardTitle>
                <CardDescription>Топ сотрудников по результатам викторин</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLeaderboard.map((user, index) => (
                    <div 
                      key={user.id} 
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                        index < 3 
                          ? 'bg-primary/10 border-primary/30' 
                          : 'border-primary/20 hover:bg-primary/5'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        index === 0 ? 'bg-yellow-500 text-secondary' :
                        index === 1 ? 'bg-gray-400 text-secondary' :
                        index === 2 ? 'bg-amber-700 text-secondary' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {index + 1}
                      </div>
                      <Avatar className="border-2 border-primary">
                        <AvatarFallback className="bg-primary text-secondary font-bold">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Icon name="Trophy" size={14} className="text-primary" />
                          <p className="text-sm text-muted-foreground">{user.score} баллов</p>
                        </div>
                      </div>
                      {index < 3 && (
                        <Icon name="Star" size={24} className="text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
