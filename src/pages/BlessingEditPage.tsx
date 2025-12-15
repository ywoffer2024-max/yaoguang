import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { ArrowLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const MAX_CHARS = 200;

const BlessingEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setBlessingText, setPasswordEnabled, setHasBlessing } = useBlessing();
  const [text, setText] = useState(state.blessingText || '');
  const [passwordOn, setPasswordOn] = useState(state.passwordEnabled);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setText(value);
    }
  };

  const handlePasswordToggle = (checked: boolean) => {
    setPasswordOn(checked);
    setPasswordEnabled(checked);
  };

  const handleSave = () => {
    if (text.trim()) {
      setBlessingText(text);
      setHasBlessing(true);
      setPasswordEnabled(passwordOn);
      navigate('/success');
    }
  };

  const canSave = text.trim().length > 0;

  return (
    <MobileLayout className="min-h-screen flex flex-col" showTopClouds showBottomClouds>
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border/30">
        <div className="flex items-center px-4 py-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-brand-gold" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-brand-gold text-lg pr-10">创建祝福语</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6 space-y-5">
        {/* Text Input Card */}
        <div className="animate-fade-in">
          <div className="bg-card rounded-2xl p-5 shadow-card-custom min-h-[280px] flex flex-col">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="写下你想送出的祝福..."
              className="flex-1 w-full bg-transparent border-0 resize-none 
                text-card-foreground placeholder:text-muted-foreground/60
                focus:outline-none text-base leading-relaxed"
            />
            
            <div className="flex justify-end pt-2">
              <span className={`text-sm ${text.length >= MAX_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}>
                {text.length}/{MAX_CHARS}
              </span>
            </div>
          </div>
        </div>

        {/* Password Toggle Card */}
        <div className="animate-fade-in-up stagger-1">
          <div className="bg-secondary/50 border border-border/50 rounded-2xl p-5">
            {/* Header with toggle */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground text-lg">密码保护</h3>
              <Switch
                checked={passwordOn}
                onCheckedChange={handlePasswordToggle}
                className="data-[state=checked]:bg-brand-gold"
              />
            </div>

            {/* Password Display */}
            <div className="bg-secondary/80 border border-border/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">您的密码</p>
              <p className="text-3xl font-bold text-brand-gold tracking-[0.2em]">
                {state.password || '9795'}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {passwordOn 
                ? '启用密码，收礼人查看祝福需输入此密码。'
                : '不启用密码，任何触碰此珠宝的人均可查看祝福。'
              }
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="sticky bottom-0 p-5 bg-background/80 backdrop-blur-sm">
        <Button
          variant="gold"
          size="full"
          onClick={handleSave}
          disabled={!canSave}
          className="animate-fade-in font-semibold"
        >
          保存祝福
        </Button>
      </div>
    </MobileLayout>
  );
};

export default BlessingEditPage;
