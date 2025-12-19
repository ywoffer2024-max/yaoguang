import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useBlessing } from '@/context/BlessingContext';
import { Toast, useToastState } from '@/components/Toast';
import { Check, Copy } from 'lucide-react';

const BlessingSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setIsUnlocked } = useBlessing();
  const { toast, showToast, hideToast } = useToastState();

  const copyPassword = () => {
    if (state.password) {
      navigator.clipboard.writeText(state.password);
      showToast('密码已复制');
    }
  };

  const copyMessage = () => {
    let message = '有一段话想让你看到～\n用手机轻轻触碰珠宝，就能读到我写给你的祝福。';
    if (state.passwordEnabled && state.password) {
      message += `\n\n查看密码：${state.password}`;
    }
    navigator.clipboard.writeText(message);
    showToast('已复制，可发送给 TA');
  };

  const handleViewBlessing = () => {
    setIsUnlocked(true);
    navigate('/view');
  };

  return (
    <MobileLayout className="min-h-screen flex flex-col" useSecondaryBg>
      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />

      {/* Main Content */}
      <main className="flex-1 px-5 py-10 space-y-5 overflow-y-auto">
        {/* Success Header */}
        <div className="text-center space-y-4 animate-fade-in pt-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-brand-gold flex items-center justify-center shadow-card-custom">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-xl font-medium text-foreground">
            你的祝福已成功保存
          </h1>
        </div>

        {/* Access Method Card */}
        <div className="animate-fade-in-up stagger-1">
          <div className="bg-card rounded-2xl p-5 shadow-card-custom">
            <h3 className="font-semibold text-card-foreground text-lg mb-3">访问方式</h3>
            
            {state.passwordEnabled && state.password ? (
              <>
                {/* Password display - primary visual weight */}
                <div className="bg-background border border-primary/30 rounded-xl p-4 mb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold text-primary tracking-[0.2em]">
                      {state.password}
                    </p>
                    <button
                      onClick={copyPassword}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Copy className="w-5 h-5 text-primary/70" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  收礼人需输入以上密码方可查看祝福
                </p>
              </>
            ) : (
              <p className="text-sm text-card-foreground/80 leading-relaxed">
                无需密码，手机触碰珠宝即可查看祝福
              </p>
            )}
          </div>
        </div>

        {/* Message Preview Card */}
        <div className="animate-fade-in-up stagger-2">
          <div className="bg-card rounded-2xl p-5 shadow-card-custom">
            <h3 className="font-semibold text-card-foreground text-lg mb-3">
              发送给 TA 的消息
            </h3>

            <div className="bg-brand-cream rounded-2xl p-4 relative">
              <p className="text-card-foreground text-sm leading-relaxed pr-8">
                有一段话想让你看到～
                <br />
                用手机轻轻触碰珠宝，就能读到我写给你的祝福。
              </p>
              {state.passwordEnabled && state.password && (
                <p className="text-card-foreground/70 text-sm mt-3 pt-3 border-t border-card-foreground/10">
                  查看密码：{state.password}
                </p>
              )}
              <button
                onClick={copyMessage}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-brand-gold/10 transition-colors"
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="sticky bottom-0 p-5 bg-background/80 backdrop-blur-sm">
        <Button
          variant="gold"
          size="full"
          onClick={handleViewBlessing}
          className="font-semibold animate-fade-in"
        >
          查看祝福
        </Button>
      </div>
    </MobileLayout>
  );
};

export default BlessingSuccessPage;
