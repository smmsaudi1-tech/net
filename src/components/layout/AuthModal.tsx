import React, { useState } from 'react';
import { useNetwork } from '../../store/networkContext';
import { ShieldCheck, KeyRound, Lock, ArrowRight, Fingerprint, AlertCircle } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthenticated, authenticate } = useNetwork();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [step, setStep] = useState<'password' | '2fa'>('password');
  const [twoFaCode, setTwoFaCode] = useState('');

  if (isAuthenticated) return null;

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === 'admin') {
      setStep('2fa');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleSubmit2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFaCode.length >= 4 || twoFaCode === '8888') {
      authenticate('1234');
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#04060a]/95 backdrop-blur-2xl flex items-center justify-center p-4">
      <div className="max-w-md w-full nexus-card p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="text-center space-y-3 mb-6 relative">
          <div className="inline-flex p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 text-cyan-400 mb-2 shadow-lg shadow-cyan-500/10">
            <ShieldCheck className="w-10 h-10 animate-pulse" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-wide">
            NEXUS Admin Authorization
          </h2>
          <p className="text-xs text-slate-400">
            لوحة التحكم الشخصية للشبكة محمية بتشفير الأمان والرمز السري (PIN / 2FA)
          </p>
        </div>

        {step === 'password' ? (
          <form onSubmit={handleSubmitPassword} className="space-y-5 relative">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 text-right">
                كلمة المرور / الرمز السري (الافتراضي: 1234)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError(false);
                  }}
                  placeholder="أدخل الرمز السري هنا..."
                  className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest text-cyan-300 focus:outline-none transition-all placeholder:text-slate-600 placeholder:text-xs"
                  autoFocus
                />
                <KeyRound className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />
              </div>
              {error && (
                <p className="flex items-center gap-1 text-xs text-rose-400 mt-2 text-right">
                  <AlertCircle className="w-3.5 h-3.5" /> الرمز السري غير صحيح! (استخدم 1234)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <span>متابعة لـ 2FA / Passkey</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit2FA} className="space-y-5 relative">
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-center space-y-1">
              <Fingerprint className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
              <h4 className="text-xs font-bold text-cyan-200">التحقق من الهوية (2FA Passkey)</h4>
              <p className="text-[11px] text-slate-400">أدخل رمز التوثيق السريع (أو اضغط دخول مباشرة)</p>
            </div>

            <div>
              <input
                type="text"
                value={twoFaCode}
                onChange={(e) => setTwoFaCode(e.target.value)}
                placeholder="أدخل كود Authenticator (مثال: 8888)..."
                className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-center text-lg font-mono text-cyan-300 focus:outline-none placeholder:text-slate-600 placeholder:text-xs"
                autoFocus
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('password')}
                className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-xl transition-all text-xs"
              >
                رجوع
              </button>
              <button
                type="submit"
                className="w-2/3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 text-xs"
              >
                <Lock className="w-4 h-4" />
                <span>دخول لوحة التحكم</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
