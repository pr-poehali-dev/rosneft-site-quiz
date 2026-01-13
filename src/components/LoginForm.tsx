import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type LoginFormProps = {
  onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function LoginForm({ onLogin }: LoginFormProps) {
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
          <form onSubmit={onLogin} className="space-y-4">
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
