import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type User = {
  id: string;
  name: string;
  email: string;
  score: number;
  friends: string[];
};

type LeaderboardUser = {
  id: string;
  name: string;
  score: number;
  avatar: string;
};

type ProfileTabProps = {
  currentUser: User | null;
  score: number;
  leaderboard: LeaderboardUser[];
};

export default function ProfileTab({ currentUser, score, leaderboard }: ProfileTabProps) {
  return (
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
            <p className="text-muted-foreground">{currentUser?.email}</p>
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
            {leaderboard.slice(0, 3).map((user) => (
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
  );
}
