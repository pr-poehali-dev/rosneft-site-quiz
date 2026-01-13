import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import LoginForm from '@/components/LoginForm';
import QuizTab from '@/components/QuizTab';
import ProfileTab from '@/components/ProfileTab';
import LeaderboardTab from '@/components/LeaderboardTab';

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
  },
  {
    id: 4,
    text: 'Какова мощность проекта "Южный поток"?',
    options: ['32 млрд м³ газа в год', '55 млрд м³ газа в год', '63 млрд м³ газа в год', '78 млрд м³ газа в год'],
    correct: 2,
    projectInfo: {
      title: 'Южный поток',
      description: 'Газопровод по дну Черного моря протяженностью 900 км. Предназначен для транспортировки 63 млрд кубометров газа в год в страны Южной и Центральной Европы.',
      status: 'Запущен'
    }
  },
  {
    id: 5,
    text: 'Какое месторождение является крупнейшим в проекте "Сахалин-1"?',
    options: ['Чайво', 'Одопту', 'Аркутун-Даги', 'Все одинаковые'],
    correct: 0,
    projectInfo: {
      title: 'Сахалин-1',
      description: 'Международный проект по разработке трех нефтегазовых месторождений на шельфе Сахалина. Чайво - крупнейшее из них с рекордными наклонно-направленными скважинами до 12 км.',
      status: 'Запущен'
    }
  },
  {
    id: 6,
    text: 'В каком году был введён в эксплуатацию НПЗ в Туапсе?',
    options: ['1929', '1945', '1961', '1980'],
    correct: 0,
    projectInfo: {
      title: 'Туапсинский НПЗ',
      description: 'Один из старейших российских заводов, основан в 1929 году. Мощность переработки 12 млн тонн нефти в год. Специализируется на производстве высокооктановых бензинов и дизельного топлива.',
      status: 'Запущен'
    }
  },
  {
    id: 7,
    text: 'Какой проект Роснефти направлен на снижение углеродного следа?',
    options: ['Зеленая энергия', 'Углеродная нейтральность 2035', 'Экопром', 'Чистый воздух'],
    correct: 1,
    projectInfo: {
      title: 'Углеродная нейтральность 2035',
      description: 'Стратегическая программа по достижению углеродной нейтральности к 2035 году. Включает внедрение возобновляемых источников энергии, улавливание CO2 и лесовосстановление.',
      status: 'В разработке'
    }
  },
  {
    id: 8,
    text: 'Какова протяженность трубопровода ВСТО (Восточная Сибирь - Тихий океан)?',
    options: ['2800 км', '3500 км', '4700 км', '5200 км'],
    correct: 2,
    projectInfo: {
      title: 'ВСТО',
      description: 'Нефтепровод Восточная Сибирь - Тихий океан протяженностью 4700 км. Связывает нефтяные месторождения Восточной Сибири с портами Тихого океана для экспорта в страны АТР.',
      status: 'Запущен'
    }
  },
  {
    id: 9,
    text: 'Какая технология используется для разработки трудноизвлекаемых запасов?',
    options: ['Гидроразрыв пласта', 'Термогазовое воздействие', 'Паротепловая обработка', 'Все перечисленное'],
    correct: 3,
    projectInfo: {
      title: 'Технологии ТрИЗ',
      description: 'Комплекс передовых технологий для добычи трудноизвлекаемых запасов нефти: гидроразрыв, паротепловое воздействие, термогаз. Увеличивает коэффициент извлечения на 15-40%.',
      status: 'Запущен'
    }
  },
  {
    id: 10,
    text: 'Сколько НПЗ входит в состав Роснефти?',
    options: ['9', '11', '13', '15'],
    correct: 2,
    projectInfo: {
      title: 'Сеть НПЗ Роснефти',
      description: '13 крупнейших нефтеперерабатывающих заводов России и за рубежом с совокупной мощностью более 100 млн тонн в год. Производят топливо стандартов Евро-5 и Евро-6.',
      status: 'Запущен'
    }
  },
  {
    id: 11,
    text: 'Какой проект Роснефти связан с освоением Арктического шельфа?',
    options: ['Полярная звезда', 'Северный путь', 'Приразломное', 'Арктика-СПГ'],
    correct: 2,
    projectInfo: {
      title: 'Приразломное',
      description: 'Первая в России ледостойкая стационарная платформа для добычи нефти на арктическом шельфе в Печорском море. Запасы более 70 млн тонн нефти особого сорта ARCO.',
      status: 'Запущен'
    }
  },
  {
    id: 12,
    text: 'Какая система используется для мониторинга безопасности на объектах?',
    options: ['SafeGuard Pro', 'RN-Safety System', 'Цифровой контроль', 'Умная безопасность'],
    correct: 1,
    projectInfo: {
      title: 'RN-Safety System',
      description: 'Интегрированная система управления промышленной безопасностью с использованием IoT-датчиков, AI-аналитики и дистанционного мониторинга в режиме реального времени.',
      status: 'В разработке'
    }
  },
  {
    id: 13,
    text: 'В каком году Роснефть стала публичной компанией?',
    options: ['2002', '2006', '2010', '2013'],
    correct: 1,
    projectInfo: {
      title: 'IPO Роснефти',
      description: 'В 2006 году состоялось первичное размещение акций Роснефти - крупнейшее IPO в российской истории того времени. Компания привлекла более $10 млрд инвестиций.',
      status: 'Запущен'
    }
  },
  {
    id: 14,
    text: 'Какой объем нефти добывает Роснефть в год?',
    options: ['150 млн тонн', '200 млн тонн', '240 млн тонн', '280 млн тонн'],
    correct: 2,
    projectInfo: {
      title: 'Добыча Роснефти',
      description: 'Роснефть - крупнейшая нефтяная компания России с добычей около 240 млн тонн нефти в год. Это более 40% всей добычи страны и 5% мировой нефти.',
      status: 'Запущен'
    }
  },
  {
    id: 15,
    text: 'Какой проект направлен на подготовку кадров для нефтегазовой отрасли?',
    options: ['Роснефть-класс', 'Нефтегаз-образование', 'Энергия знаний', 'Кадровый резерв'],
    correct: 0,
    projectInfo: {
      title: 'Роснефть-класс',
      description: 'Образовательная программа в 23 регионах России. Включает профильные классы в школах, стипендии, практику на объектах компании и гарантированное трудоустройство лучших выпускников.',
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
            <QuizTab 
              questions={mockQuestions}
              currentQuestion={currentQuestion}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              score={score}
              onAnswer={handleAnswer}
              onRestart={restartQuiz}
            />
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
