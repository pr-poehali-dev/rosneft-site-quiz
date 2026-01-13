import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type LeaderboardUser = {
  id: string;
  name: string;
  score: number;
  avatar: string;
};

type LeaderboardTabProps = {
  leaderboard: LeaderboardUser[];
};

export default function LeaderboardTab({ leaderboard }: LeaderboardTabProps) {
  return (
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
          {leaderboard.map((user, index) => (
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
  );
}
