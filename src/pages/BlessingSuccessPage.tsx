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
      message += `\n\n祝福钥匙：${state.password}`;
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
          <div className="w-[86px] h-[86px] mx-auto rounded-full bg-brand-gold flex items-center justify-center shadow-card-custom">
            <Check className="w-[43px] h-[43px] text-white" strokeWidth={3} />
          </div>
          <h1 className="text-xl font-medium text-foreground">
            你的祝福已成功保存
          </h1>
        </div>

        {/* Password Status Card */}
        <div className="animate-fade-in-up stagger-1">
          <div className="bg-[hsl(165,35%,18%)] rounded-2xl p-5 border-2 border-[hsl(165,30%,25%)]">
            <h3 className="font-semibold text-brand-cream text-base mb-3">
              {state.passwordEnabled && state.password ? '密码已开启' : '密码未开启'}
            </h3>
            
            {state.passwordEnabled && state.password ? (
              <>
                {/* Password display */}
                <div className="bg-[hsl(165,30%,22%)] rounded-xl p-4 mb-3 border-2 border-[hsl(165,25%,28%)] relative">
                  <p className="text-sm text-brand-cream mb-2">祝福钥匙</p>
                  <p className="text-3xl font-bold text-brand-gold tracking-[0.2em] select-all pr-8">
                    {state.password}
                  </p>
                  <button
                    onClick={copyPassword}
                    className="absolute bottom-4 right-4 p-1.5 rounded-lg hover:bg-[hsl(165,25%,28%)] transition-colors opacity-60 hover:opacity-100"
                    aria-label="复制密码"
                  >
                    <Copy className="w-4 h-4 text-brand-gold" />
                  </button>
                </div>
                <p className="text-sm text-[hsl(45,20%,85%)] leading-relaxed">
                  收礼人查看祝福时需输入该密码
                </p>
              </>
            ) : (
              <p className="text-sm text-[hsl(45,20%,85%)] leading-relaxed">
                任何用手机靠近此珠宝的用户均可查看祝福
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

            <div className="bg-brand-cream rounded-2xl p-4 pb-10 relative">
              <p className="text-card-foreground text-sm leading-relaxed">
                有一段话想让你看到～
                <br />
                用手机轻轻触碰珠宝，就能读到我写给你的祝福。
              </p>
              {state.passwordEnabled && state.password && (
                <p className="text-card-foreground/70 text-sm mt-3 pt-3 border-t border-card-foreground/10">
                  祝福钥匙：{state.password}
                </p>
              )}
              <button
                onClick={copyMessage}
                className="absolute bottom-3 right-3 p-1.5 rounded-lg hover:bg-brand-gold/10 transition-colors opacity-50 hover:opacity-100"
              >
                <Copy className="w-4 h-4 text-card-foreground" />
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
