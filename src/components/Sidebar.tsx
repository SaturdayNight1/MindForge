import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Brain } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const tabs = ['Dashboard', 'Study', 'Decks', 'Analytics', 'Community', 'AI Tutor', 'Settings'];
  return (
    <Card className="w-64 h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2" />
          MindForge
        </CardTitle>
        <CardDescription>Adaptive Learning Platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full space-y-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
          <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};