import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { googleLogin, login, register, sendEmailCode, verifyEmailCode } from '../api/realApi';
import { countryFlag, countryLabel, countryOptions } from '../constants/panelProfileOptions';
import { useAuth } from './AuthContext';
import { useLanguage, withLanguage } from './LanguageContext';
import TurnstileWidget from './TurnstileWidget';
import './PublicAuthPanel.css';

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client?hl=en';
const codeCooldownSeconds = 60;
let googleScriptPromise;

const authCopy = {
  'en-US': { signIn: 'Sign in', create: 'Create account', welcome: 'Welcome back', loginTitle: 'Continue where you left off.', join: 'Join the verified panel', registerTitle: 'Your perspective belongs here.', loginIntro: 'Sign in to continue to your workspace.', registerIntro: 'Create a participant account, verify your email, and begin your first survey.', consentLogin: 'By signing in, you agree to the', consentRegister: 'By creating an account, you agree to the', and: 'and', privacy: 'Privacy Policy', email: 'Email address', password: 'Password', forgot: 'Forgot password?', google: 'Continue with Google', emailOption: 'or continue with email', continueEmail: 'Continue with email', displayName: 'Display name', displayPlaceholder: 'How should we call you?', code: 'Email code', sendCode: 'Send verification code', createButton: 'Create account', showPassword: 'Show password', hidePassword: 'Hide password', back: 'Other sign-up options' },
  'zh-CN': { signIn: '登录', create: '创建账户', welcome: '欢迎回来', loginTitle: '继续你未完成的旅程。', join: '加入经过验证的社群', registerTitle: '你的观点属于这里。', loginIntro: '登录后继续进入你的工作区。', registerIntro: '创建参与者账户、验证邮箱，然后开始第一项问卷。', consentLogin: '登录即表示你同意', consentRegister: '创建账户即表示你同意', and: '和', privacy: '隐私政策', email: '邮箱地址', password: '密码', forgot: '忘记密码？', google: '使用 Google 继续', emailOption: '或使用邮箱继续', continueEmail: '使用邮箱继续', displayName: '显示名称', displayPlaceholder: '我们该如何称呼你？', code: '邮箱验证码', sendCode: '发送验证码', createButton: '创建账户', showPassword: '显示密码', hidePassword: '隐藏密码', back: '其他注册方式' },
  'zh-Hant': { signIn: '登入', create: '建立帳戶', welcome: '歡迎回來', loginTitle: '繼續你未完成的旅程。', join: '加入經驗證的社群', registerTitle: '你的觀點屬於這裡。', loginIntro: '登入後繼續進入你的工作區。', registerIntro: '建立參與者帳戶、驗證電郵，然後開始第一項問卷。', consentLogin: '登入即表示你同意', consentRegister: '建立帳戶即表示你同意', and: '及', privacy: '隱私政策', email: '電郵地址', password: '密碼', forgot: '忘記密碼？', google: '使用 Google 繼續', emailOption: '或使用電郵繼續', continueEmail: '使用電郵繼續', displayName: '顯示名稱', displayPlaceholder: '我們該如何稱呼你？', code: '電郵驗證碼', sendCode: '發送驗證碼', createButton: '建立帳戶', showPassword: '顯示密碼', hidePassword: '隱藏密碼', back: '其他註冊方式' },
  de: { signIn: 'Anmelden', create: 'Konto erstellen', welcome: 'Willkommen zurück', loginTitle: 'Machen Sie dort weiter, wo Sie aufgehört haben.', join: 'Dem verifizierten Panel beitreten', registerTitle: 'Ihre Perspektive gehört hierher.', loginIntro: 'Melden Sie sich an, um fortzufahren.', registerIntro: 'Erstellen Sie ein Teilnehmerkonto und bestätigen Sie Ihre E-Mail.', consentLogin: 'Mit der Anmeldung stimmen Sie den', consentRegister: 'Mit der Kontoerstellung stimmen Sie den', and: 'und der', privacy: 'Datenschutzerklärung', email: 'E-Mail-Adresse', password: 'Passwort', forgot: 'Passwort vergessen?', google: 'Mit Google fortfahren', emailOption: 'oder mit E-Mail fortfahren', continueEmail: 'Mit E-Mail fortfahren', displayName: 'Anzeigename', displayPlaceholder: 'Wie sollen wir Sie nennen?', code: 'E-Mail-Code', sendCode: 'Bestätigungscode senden', createButton: 'Konto erstellen', showPassword: 'Passwort anzeigen', hidePassword: 'Passwort ausblenden', back: 'Andere Anmeldeoptionen' },
  fr: { signIn: 'Se connecter', create: 'Créer un compte', welcome: 'Bon retour', loginTitle: 'Reprenez là où vous vous êtes arrêté.', join: 'Rejoindre le panel vérifié', registerTitle: 'Votre point de vue a sa place ici.', loginIntro: 'Connectez-vous pour continuer.', registerIntro: 'Créez un compte participant et vérifiez votre e-mail.', consentLogin: 'En vous connectant, vous acceptez les', consentRegister: 'En créant un compte, vous acceptez les', and: 'et la', privacy: 'Politique de confidentialité', email: 'Adresse e-mail', password: 'Mot de passe', forgot: 'Mot de passe oublié ?', google: 'Continuer avec Google', emailOption: 'ou continuer avec l’e-mail', continueEmail: 'Continuer avec l’e-mail', displayName: 'Nom affiché', displayPlaceholder: 'Comment devons-nous vous appeler ?', code: 'Code e-mail', sendCode: 'Envoyer le code', createButton: 'Créer un compte', showPassword: 'Afficher le mot de passe', hidePassword: 'Masquer le mot de passe', back: 'Autres options' },
  es: { signIn: 'Iniciar sesión', create: 'Crear cuenta', welcome: 'Bienvenido de nuevo', loginTitle: 'Continúa donde lo dejaste.', join: 'Únete al panel verificado', registerTitle: 'Tu perspectiva pertenece aquí.', loginIntro: 'Inicia sesión para continuar.', registerIntro: 'Crea una cuenta de participante y verifica tu correo.', consentLogin: 'Al iniciar sesión, aceptas los', consentRegister: 'Al crear una cuenta, aceptas los', and: 'y la', privacy: 'Política de privacidad', email: 'Correo electrónico', password: 'Contraseña', forgot: '¿Olvidaste la contraseña?', google: 'Continuar con Google', emailOption: 'o continúa con correo electrónico', continueEmail: 'Continuar con correo electrónico', displayName: 'Nombre visible', displayPlaceholder: '¿Cómo debemos llamarte?', code: 'Código por correo', sendCode: 'Enviar código', createButton: 'Crear cuenta', showPassword: 'Mostrar contraseña', hidePassword: 'Ocultar contraseña', back: 'Otras opciones' },
  it: { signIn: 'Accedi', create: 'Crea un account', welcome: 'Bentornato', loginTitle: 'Riprendi da dove eri rimasto.', join: 'Unisciti al panel verificato', registerTitle: 'La tua prospettiva è importante.', loginIntro: 'Accedi per continuare.', registerIntro: 'Crea un account partecipante e verifica l’e-mail.', consentLogin: 'Accedendo accetti i', consentRegister: 'Creando un account accetti i', and: 'e l’', privacy: 'Informativa sulla privacy', email: 'Indirizzo e-mail', password: 'Password', forgot: 'Password dimenticata?', google: 'Continua con Google', emailOption: 'oppure continua con e-mail', continueEmail: 'Continua con e-mail', displayName: 'Nome visualizzato', displayPlaceholder: 'Come possiamo chiamarti?', code: 'Codice e-mail', sendCode: 'Invia codice', createButton: 'Crea account', showPassword: 'Mostra password', hidePassword: 'Nascondi password', back: 'Altre opzioni' },
  ja: { signIn: 'ログイン', create: 'アカウントを作成', welcome: 'お帰りなさい', loginTitle: '前回の続きから始めましょう。', join: '認証済みパネルに参加', registerTitle: 'あなたの視点はここにあります。', loginIntro: 'ログインして続けます。', registerIntro: '参加者アカウントを作成し、メールを確認してください。', consentLogin: 'ログインすると、', consentRegister: 'アカウントを作成すると、', and: 'および', privacy: 'プライバシーポリシー', email: 'メールアドレス', password: 'パスワード', forgot: 'パスワードをお忘れですか？', google: 'Google で続行', emailOption: 'またはメールで続行', continueEmail: 'メールで続行', displayName: '表示名', displayPlaceholder: 'お呼びする名前を教えてください', code: 'メール認証コード', sendCode: '認証コードを送信', createButton: 'アカウントを作成', showPassword: 'パスワードを表示', hidePassword: 'パスワードを隠す', back: '他の登録方法' },
  ko: { signIn: '로그인', create: '계정 만들기', welcome: '다시 오신 것을 환영합니다', loginTitle: '멈춘 곳에서 계속하세요.', join: '검증된 패널 참여', registerTitle: '당신의 관점이 필요한 곳입니다.', loginIntro: '계속하려면 로그인하세요.', registerIntro: '참여자 계정을 만들고 이메일을 인증하세요.', consentLogin: '로그인하면', consentRegister: '계정을 만들면', and: '및', privacy: '개인정보 처리방침', email: '이메일 주소', password: '비밀번호', forgot: '비밀번호를 잊으셨나요?', google: 'Google로 계속하기', emailOption: '또는 이메일로 계속', continueEmail: '이메일로 계속', displayName: '표시 이름', displayPlaceholder: '어떻게 불러 드릴까요?', code: '이메일 인증 코드', sendCode: '인증 코드 보내기', createButton: '계정 만들기', showPassword: '비밀번호 표시', hidePassword: '비밀번호 숨기기', back: '다른 가입 방법' },
  pt: { signIn: 'Entrar', create: 'Criar conta', welcome: 'Bem-vindo de volta', loginTitle: 'Continue de onde parou.', join: 'Junte-se ao painel verificado', registerTitle: 'A sua perspetiva pertence aqui.', loginIntro: 'Entre para continuar.', registerIntro: 'Crie uma conta de participante e confirme o e-mail.', consentLogin: 'Ao entrar, concorda com os', consentRegister: 'Ao criar uma conta, concorda com os', and: 'e a', privacy: 'Política de privacidade', email: 'E-mail', password: 'Palavra-passe', forgot: 'Esqueceu a palavra-passe?', google: 'Continuar com Google', emailOption: 'ou continue com e-mail', continueEmail: 'Continuar com e-mail', displayName: 'Nome de apresentação', displayPlaceholder: 'Como devemos chamar-lhe?', code: 'Código por e-mail', sendCode: 'Enviar código', createButton: 'Criar conta', showPassword: 'Mostrar palavra-passe', hidePassword: 'Ocultar palavra-passe', back: 'Outras opções' },
  ru: { signIn: 'Войти', create: 'Создать аккаунт', welcome: 'С возвращением', loginTitle: 'Продолжите с того места, где остановились.', join: 'Присоединиться к проверенной панели', registerTitle: 'Ваше мнение важно здесь.', loginIntro: 'Войдите, чтобы продолжить.', registerIntro: 'Создайте аккаунт участника и подтвердите e-mail.', consentLogin: 'Входя, вы соглашаетесь с', consentRegister: 'Создавая аккаунт, вы соглашаетесь с', and: 'и', privacy: 'Политикой конфиденциальности', email: 'Адрес электронной почты', password: 'Пароль', forgot: 'Забыли пароль?', google: 'Продолжить с Google', emailOption: 'или продолжить с e-mail', continueEmail: 'Продолжить с e-mail', displayName: 'Отображаемое имя', displayPlaceholder: 'Как к вам обращаться?', code: 'Код из e-mail', sendCode: 'Отправить код', createButton: 'Создать аккаунт', showPassword: 'Показать пароль', hidePassword: 'Скрыть пароль', back: 'Другие варианты' },
};

const sharedAuthCopy = { nl: { signIn: 'Inloggen', create: 'Account maken', welcome: 'Welkom terug', loginTitle: 'Ga verder waar je was gebleven.', join: 'Word lid van het geverifieerde panel', registerTitle: 'Jouw perspectief hoort hier.', loginIntro: 'Log in om verder te gaan.', registerIntro: 'Maak een deelnemersaccount en verifieer je e-mail.' }, da: { signIn: 'Log ind', create: 'Opret konto', welcome: 'Velkommen tilbage', loginTitle: 'Fortsæt, hvor du slap.', join: 'Deltag i det verificerede panel', registerTitle: 'Dit perspektiv hører hjemme her.', loginIntro: 'Log ind for at fortsætte.', registerIntro: 'Opret en deltagerkonto og bekræft din e-mail.' }, fi: { signIn: 'Kirjaudu', create: 'Luo tili', welcome: 'Tervetuloa takaisin', loginTitle: 'Jatka siitä, mihin jäit.', join: 'Liity vahvistettuun paneeliin', registerTitle: 'Näkökulmasi kuuluu tänne.', loginIntro: 'Kirjaudu jatkaaksesi.', registerIntro: 'Luo osallistujatili ja vahvista sähköpostisi.' }, no: { signIn: 'Logg inn', create: 'Opprett konto', welcome: 'Velkommen tilbake', loginTitle: 'Fortsett der du slapp.', join: 'Bli med i det bekreftede panelet', registerTitle: 'Ditt perspektiv hører hjemme her.', loginIntro: 'Logg inn for å fortsette.', registerIntro: 'Opprett en deltakerkonto og bekreft e-posten din.' }, sv: { signIn: 'Logga in', create: 'Skapa konto', welcome: 'Välkommen tillbaka', loginTitle: 'Fortsätt där du slutade.', join: 'Gå med i den verifierade panelen', registerTitle: 'Ditt perspektiv hör hemma här.', loginIntro: 'Logga in för att fortsätta.', registerIntro: 'Skapa ett deltagarkonto och verifiera din e-post.' }, tr: { signIn: 'Giriş yap', create: 'Hesap oluştur', welcome: 'Tekrar hoş geldiniz', loginTitle: 'Kaldığınız yerden devam edin.', join: 'Doğrulanmış panele katılın', registerTitle: 'Bakış açınız burada önemli.', loginIntro: 'Devam etmek için giriş yapın.', registerIntro: 'Katılımcı hesabı oluşturun ve e-postanızı doğrulayın.' } };

Object.entries(sharedAuthCopy).forEach(([language, copy]) => {
  authCopy[language] = { ...authCopy['en-US'], ...copy };
});

function codeCooldownStorageKey(email) {
  return `guanyi-email-code-cooldown:${String(email || '').trim().toLowerCase()}`;
}

function readCodeCooldown(email) {
  const storedUntil = Number(window.localStorage.getItem(codeCooldownStorageKey(email)));
  return Number.isFinite(storedUntil) ? Math.max(0, Math.ceil((storedUntil - Date.now()) / 1000)) : 0;
}

function formatWaitTime(seconds) {
  const roundedSeconds = Math.max(1, Math.ceil(Number(seconds) || codeCooldownSeconds));
  if (roundedSeconds < 60) return `${roundedSeconds} seconds`;
  const minutes = Math.ceil(roundedSeconds / 60);
  return `${minutes} minute${minutes === 1 ? '' : 's'}`;
}

function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (googleScriptPromise) return googleScriptPromise;

  googleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);
    if (existing) {
      if (window.google?.accounts?.id) {
        resolve();
        return;
      }
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', () => reject(new Error('Google sign-in failed to load')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Google sign-in failed to load'));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

function GoogleButton({ mode, onCredential, onError, language, label }) {
  const containerRef = useRef(null);
  const handlersRef = useRef({ onCredential, onError });
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    handlersRef.current = { onCredential, onError };
  }, [onCredential, onError]);

  useEffect(() => {
    if (!clientId || !containerRef.current) return undefined;
    let active = true;
    loadGoogleScript()
      .then(() => {
        if (!active || !containerRef.current || !window.google?.accounts?.id) return;
        const container = containerRef.current;
        container.replaceChildren();
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (!response.credential) {
              handlersRef.current.onError('Google did not return a sign-in credential. Please try again.');
              return;
            }
            handlersRef.current.onCredential(response.credential);
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.renderButton(container, {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          text: mode === 'login' ? 'signin_with' : 'signup_with',
          shape: 'pill',
          width: Math.min(container.clientWidth || 360, 380),
          logo_alignment: 'left',
          locale: language === 'zh-CN' ? 'zh_CN' : language === 'zh-Hant' ? 'zh_TW' : language.split('-')[0],
        });
      })
      .catch(() => handlersRef.current.onError('Google sign-in could not be loaded. Please use email instead.'));
    return () => {
      active = false;
      containerRef.current?.replaceChildren();
    };
  }, [clientId, mode, language]);

  if (!clientId) {
    return (
      <button className="public-auth-google-disabled" type="button" disabled title="Set VITE_GOOGLE_CLIENT_ID to enable Google sign-in">
        <span className="grid h-5 w-5 place-items-center rounded-full border border-slate-300 text-[10px] font-black text-slate-500">G</span>
        {label}
      </button>
    );
  }

  return <div ref={containerRef} className="notranslate min-h-11" translate="no" data-translate="no" />;
}

export default function PublicAuthPanel({ mode = 'register', onModeChange, accountType = 'PARTICIPANT' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const panelRef = useRef(null);
  const { setUser } = useAuth();
  const { language } = useLanguage();
  const copy = authCopy[language] || authCopy['en-US'];
  const [registerExpanded, setRegisterExpanded] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ displayName: '', email: '', password: '', verificationCode: '', organizationType: '', region: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [codeCooldown, setCodeCooldown] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [businessLoginMissing, setBusinessLoginMissing] = useState(false);
  const referredBy = new URLSearchParams(location.search).get('ref') || undefined;

  useEffect(() => {
    if (!codeCooldown) return undefined;
    const timer = window.setTimeout(() => setCodeCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [codeCooldown]);

  useEffect(() => {
    setCodeCooldown(readCodeCooldown(registerForm.email));
  }, [registerForm.email]);

  useEffect(() => {
    setError('');
    setMessage('');
    setShowPassword(false);
    setBusinessLoginMissing(false);
  }, [mode]);

  const showError = useCallback((value) => {
    setMessage('');
    setError(value);
  }, []);

  const startCodeCooldown = (email, seconds = codeCooldownSeconds) => {
    const normalizedSeconds = Math.max(1, Math.ceil(Number(seconds) || codeCooldownSeconds));
    window.localStorage.setItem(codeCooldownStorageKey(email), String(Date.now() + normalizedSeconds * 1000));
    setCodeCooldown(normalizedSeconds);
  };

  const clearTurnstileToken = useCallback(() => {
    setTurnstileToken('');
  }, []);

  const resetFormScroll = useCallback(() => {
    window.requestAnimationFrame(() => panelRef.current?.closest('.landing-access-inner')?.scrollTo({ top: 0, behavior: 'auto' }));
  }, []);

  const finishAuth = useCallback(
    (response) => {
      setUser(response.data.user);
      const destination = String(response.data.user?.role || '').toUpperCase() === 'BUSINESS' ? '/business/workspace' : '/dashboard';
      navigate(withLanguage(destination, language), { replace: true });
    },
    [language, navigate, setUser]
  );

  const handleGoogleCredential = useCallback(
    async (credential) => {
      setLoading(true);
      setError('');
      try {
        const response = await googleLogin({ credential, agreedToTermsAt: mode === 'register' ? new Date().toISOString() : undefined, referredBy });
        finishAuth(response);
      } catch (caughtError) {
        showError(caughtError.response?.data?.message || 'Google sign-in failed. Please try email instead.');
      } finally {
        setLoading(false);
      }
    },
    [finishAuth, mode, referredBy, showError]
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      finishAuth(await login(loginForm));
    } catch (caughtError) {
      if (accountType === 'BUSINESS' && [401, 404].includes(caughtError.response?.status)) {
        setBusinessLoginMissing(true);
        showError('We could not find a client workspace for those details. Check your email and password, or create a workspace.');
      } else {
        showError(caughtError.response?.data?.message || 'Login failed. Please check your email and password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    if (!registerForm.email || codeCooldown || sendingCode) return;
    setSendingCode(true);
    setError('');
    try {
      await sendEmailCode({ email: registerForm.email });
      startCodeCooldown(registerForm.email);
      setMessage('Verification code sent. Check your inbox and spam folder.');
    } catch (caughtError) {
      const code = caughtError.response?.data?.error || caughtError.response?.data?.code;
      const retryAfterSeconds = Number(caughtError.response?.data?.retryAfterSeconds || caughtError.response?.headers?.['retry-after']);
      if (code === 'EMAIL_CODE_RATE_LIMITED' || caughtError.response?.status === 429) {
        const waitSeconds = Math.max(1, Math.ceil(retryAfterSeconds || codeCooldownSeconds));
        startCodeCooldown(registerForm.email, waitSeconds);
        setMessage(`Please wait ${formatWaitTime(waitSeconds)} before requesting another code.`);
      } else if (code === 'EMAIL_CODE_SEND_FAILED') {
        showError('Email delivery is temporarily unavailable. Please try again shortly.');
      } else {
        showError('Unable to send a verification code. Please check the address and try again.');
      }
    } finally {
      setSendingCode(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(registerForm.verificationCode)) return showError('Enter the 6-digit email verification code.');
    if (accountType !== 'BUSINESS' && !turnstileToken) return showError('Please complete the security check before creating an account.');
    setLoading(true);
    setError('');
    try {
      if (accountType === 'BUSINESS' && (!registerForm.organizationType || !registerForm.region.trim())) {
        return showError('Please choose your organization type and region.');
      }
      await verifyEmailCode({ email: registerForm.email, code: registerForm.verificationCode });
      finishAuth(
        await register({
          ...registerForm,
          region: accountType === 'BUSINESS' ? countryLabel(registerForm.region) : registerForm.region,
          turnstileToken,
          agreedToTermsAt: new Date().toISOString(),
          referredBy,
          accountType,
        })
      );
    } catch (caughtError) {
      showError(caughtError.response?.data?.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const changeMode = (nextMode) => {
    setRegisterExpanded(nextMode === 'register' ? registerExpanded : false);
    onModeChange(nextMode);
    resetFormScroll();
  };

  const isLogin = mode === 'login';
  const businessTermsPath = withLanguage(accountType === 'BUSINESS' ? '/business/terms' : '/terms', language);
  const privacyPath = withLanguage('/privacy', language);
  const termsLabel = accountType === 'BUSINESS' ? 'Business Researcher Terms' : language === 'zh-CN' ? '服务条款' : language === 'zh-Hant' ? '服務條款' : 'Terms of Service';

  return (
    <section ref={panelRef} className="public-auth-panel" aria-labelledby="public-auth-title">
      <div className="public-auth-tabs" role="tablist" aria-label="Account access">
        <button className={isLogin ? 'is-active' : ''} onClick={() => changeMode('login')} type="button" role="tab" aria-selected={isLogin}>{copy.signIn}</button>
        <button className={!isLogin ? 'is-active' : ''} onClick={() => changeMode('register')} type="button" role="tab" aria-selected={!isLogin}>{copy.create}</button>
      </div>

      <div className="public-auth-content">
        <p className="public-auth-eyebrow">{isLogin ? copy.welcome : accountType === 'BUSINESS' ? 'Business workspace' : copy.join}</p>
        <h2 id="public-auth-title">{isLogin ? copy.loginTitle : accountType === 'BUSINESS' ? 'Create your research workspace.' : copy.registerTitle}</h2>
        <p className="public-auth-intro">{isLogin ? copy.loginIntro : accountType === 'BUSINESS' ? 'Create, share, and manage questionnaires alongside your research projects.' : copy.registerIntro}</p>

        <p className="public-auth-consent">{isLogin ? copy.consentLogin : copy.consentRegister} <Link to={businessTermsPath} target="_blank" rel="noopener noreferrer">{termsLabel}</Link> {copy.and} <Link to={privacyPath} target="_blank" rel="noopener noreferrer">{copy.privacy}</Link>.</p>

        <div className={loading ? 'pointer-events-none opacity-60' : ''}>
          {accountType !== 'BUSINESS' ? <GoogleButton mode={mode} onCredential={handleGoogleCredential} onError={showError} language={language} label={copy.google} /> : null}
        </div>

        {accountType !== 'BUSINESS' ? <div className="public-auth-divider"><span>{copy.emailOption}</span></div> : null}

        {isLogin ? (
          <form className="public-auth-form" onSubmit={handleLogin}>
            <label><span>{copy.email}</span><span className="public-auth-input"><Mail size={17} /><input type="email" autoComplete="email" placeholder="you@example.com" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} required /></span></label>
            <label><span>{copy.password}</span><span className="public-auth-input"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder={copy.password} value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? copy.hidePassword : copy.showPassword}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            <div className="public-auth-secondary"><Link to={withLanguage('/forgot-password', language)}>{copy.forgot}</Link></div>
            <button className="public-auth-submit" type="submit" disabled={loading}>{loading ? <LoaderCircle className="animate-spin" size={18} /> : copy.signIn}{!loading && <Check size={17} />}</button>
            {businessLoginMissing && <button className="public-auth-email-cta" type="button" onClick={() => changeMode('register')}>Create a workspace</button>}
          </form>
        ) : !registerExpanded && accountType !== 'BUSINESS' ? (
          <button className="public-auth-email-cta" type="button" onClick={() => { setRegisterExpanded(true); resetFormScroll(); }}><Mail size={18} /> {copy.continueEmail}</button>
        ) : (
          <form className="public-auth-form public-auth-register-form" onSubmit={handleRegister}>
            {accountType !== 'BUSINESS' && <button className="public-auth-back" type="button" onClick={() => { setRegisterExpanded(false); resetFormScroll(); }}><ChevronLeft size={16} /> {copy.back}</button>}
            <label><span>{accountType === 'BUSINESS' ? 'Contact name' : copy.displayName}</span><span className="public-auth-input"><input type="text" autoComplete="name" placeholder={accountType === 'BUSINESS' ? 'Your name' : copy.displayPlaceholder} value={registerForm.displayName} onChange={(event) => setRegisterForm({ ...registerForm, displayName: event.target.value })} required /></span></label>
            {accountType === 'BUSINESS' && <>
              <label><span>Organization type</span><span className="public-auth-input"><select value={registerForm.organizationType} onChange={(event) => setRegisterForm({ ...registerForm, organizationType: event.target.value })} required><option value="">Select one</option><option value="BUSINESS">Business</option><option value="RESEARCH_OR_EDUCATION">Research or education</option><option value="NONPROFIT_OR_PUBLIC">Nonprofit or public organization</option><option value="INDEPENDENT_RESEARCHER">Independent researcher</option></select></span></label>
              <label><span>Region</span><span className="public-auth-input"><select autoComplete="country" value={registerForm.region} onChange={(event) => setRegisterForm({ ...registerForm, region: event.target.value })} required><option value="">Select your country or territory</option>{countryOptions.map((country) => <option key={country.value} value={country.value}>{countryFlag(country.value)} {country.label}</option>)}</select></span></label>
            </>}
            <label><span>{copy.email}</span><span className="public-auth-input"><Mail size={17} /><input type="email" autoComplete="email" placeholder="you@example.com" value={registerForm.email} onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value, verificationCode: '' })} required /></span></label>
            <><button className="public-auth-code" type="button" onClick={handleSendCode} disabled={!registerForm.email || sendingCode || codeCooldown}>{sendingCode ? 'Sending…' : codeCooldown ? `Resend in ${codeCooldown}s` : copy.sendCode}</button><label><span>{copy.code}</span><span className="public-auth-input"><input inputMode="numeric" autoComplete="one-time-code" maxLength="6" placeholder="6-digit code" value={registerForm.verificationCode} onChange={(event) => setRegisterForm({ ...registerForm, verificationCode: event.target.value.replace(/\D/g, '').slice(0, 6) })} required /></span></label></>
            <label><span>{copy.password}</span><span className="public-auth-input"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength="8" placeholder="At least 8 characters" value={registerForm.password} onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? copy.hidePassword : copy.showPassword}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            {accountType !== 'BUSINESS' && <TurnstileWidget theme="dark" onVerify={setTurnstileToken} onExpire={clearTurnstileToken} onError={clearTurnstileToken} />}
            <button className="public-auth-submit" type="submit" disabled={loading || (accountType !== 'BUSINESS' && !turnstileToken)}>{loading ? <LoaderCircle className="animate-spin" size={18} /> : copy.createButton}{!loading && <Check size={17} />}</button>
          </form>
        )}

        {message && <p className="public-auth-message is-success">{message}</p>}
        {error && <p className="public-auth-message">{error}</p>}
      </div>
    </section>
  );
}
