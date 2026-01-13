import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

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

type QuizTabProps = {
  questions: Question[];
  currentQuestion: number;
  selectedAnswer: number | null;
  showResult: boolean;
  score: number;
  onAnswer: (index: number) => void;
  onRestart: () => void;
};

export default function QuizTab({ 
  questions, 
  currentQuestion, 
  selectedAnswer, 
  showResult, 
  score, 
  onAnswer, 
  onRestart 
}: QuizTabProps) {
  if (showResult) {
    return (
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
            <p className="text-4xl font-bold text-primary">{score}/{questions.length * 100}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {Math.round((score / (questions.length * 100)) * 100)}% правильных ответов
            </p>
          </div>
          <Button onClick={onRestart} className="w-full bg-primary hover:bg-primary/90 text-secondary font-semibold">
            <Icon name="RotateCw" size={18} className="mr-2" />
            Пройти снова
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="max-w-3xl mx-auto border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="border-primary text-primary">
            Вопрос {currentQuestion + 1} из {questions.length}
          </Badge>
          <Badge className="bg-primary text-secondary">
            {question.projectInfo.status}
          </Badge>
        </div>
        <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-4" />
        <CardTitle className="text-2xl">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(index)}
              disabled={selectedAnswer !== null}
              variant={
                selectedAnswer === null 
                  ? 'outline' 
                  : index === question.correct
                  ? 'default'
                  : selectedAnswer === index
                  ? 'destructive'
                  : 'outline'
              }
              className={`h-auto p-4 justify-start text-left text-base ${
                selectedAnswer === null 
                  ? 'hover:bg-primary/10 hover:border-primary border-primary/20' 
                  : index === question.correct
                  ? 'bg-primary text-secondary'
                  : ''
              }`}
            >
              <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
              {option}
              {selectedAnswer !== null && index === question.correct && (
                <Icon name="Check" size={20} className="ml-auto" />
              )}
              {selectedAnswer === index && index !== question.correct && (
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
                {question.projectInfo.title}
              </DialogTitle>
              <DialogDescription className="text-base pt-4 text-foreground">
                {question.projectInfo.description}
              </DialogDescription>
            </DialogHeader>
            <div className="pt-4">
              <Badge className="bg-primary text-secondary">
                {question.projectInfo.status}
              </Badge>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
