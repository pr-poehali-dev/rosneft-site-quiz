import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { QuizCategory } from '@/data/quizData';

type QuizSelectorProps = {
  categories: QuizCategory[];
  onSelectQuiz: (categoryId: string) => void;
};

export default function QuizSelector({ categories, onSelectQuiz }: QuizSelectorProps) {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Выберите викторину</h2>
        <p className="text-muted-foreground">Проверьте свои знания по разным направлениям деятельности Роснефти</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="border-primary/20 hover:border-primary/40 transition-all cursor-pointer hover:shadow-lg"
            onClick={() => onSelectQuiz(category.id)}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon name={category.icon as any} size={24} className="text-primary" />
              </div>
              <CardTitle className="text-xl">{category.title}</CardTitle>
              <CardDescription className="text-sm">{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {category.questions.length} вопросов
                </Badge>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectQuiz(category.id);
                  }}
                >
                  Начать
                  <Icon name="ArrowRight" size={16} className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
