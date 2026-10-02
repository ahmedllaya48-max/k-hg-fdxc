import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, ArrowUpLeft, Award, BookOpen, Check,
  CheckCircle2, ChevronLeft, CircleHelp, Clock3, Code2, Compass,
  Download, FileCheck2, Fingerprint, Flame, Globe2, GraduationCap, House,
  KeyRound, LockKeyhole, Search, Shield, ShieldCheck, Sparkles,
  Target, Trophy, X,
} from 'lucide-react'
import './App.css'

const courses = [
  {
    id: 'basics', title: 'أساسيات الأمن السيبراني', category: 'البداية الصحيحة', level: 'مبتدئ', icon: ShieldCheck, color: 'mint',
    description: 'افهم كيف نحمي الأجهزة والبيانات، ولماذا يبدأ الأمن بعادات يومية بسيطة.',
    lessons: [
      { title: 'ما هو الأمن السيبراني؟', time: '٨ دقائق', summary: 'هو مجموعة ممارسات تحمي الأنظمة والشبكات والبيانات من الوصول غير المصرح به أو التغيير أو التعطيل.', example: 'تخيّل منزلك: القفل يحمي الباب، والتحقق بخطوتين يشبه طلب مفتاح إضافي قبل الدخول.', takeaway: 'السرية، السلامة، والتوافر هي الأهداف الثلاثة الأساسية للأمن.' },
      { title: 'التهديدات ونقاط الضعف', time: '١٠ دقائق', summary: 'التهديد احتمال وقوع ضرر، أما نقطة الضعف فهي خلل قد يستغله ذلك التهديد.', example: 'رسالة احتيالية تهديد، وكلمة مرور معاد استخدامها نقطة ضعف.', takeaway: 'تحديث البرامج وسد الثغرات يقللان مساحة المخاطر.' },
    ],
  },
  {
    id: 'network', title: 'الشبكات والإنترنت', category: 'افهم ما وراء الاتصال', level: 'مبتدئ', icon: Network, color: 'blue',
    description: 'تعرّف إلى عنوان IP وDNS وHTTPS، وكيف تنتقل البيانات بأمان.',
    lessons: [
      { title: 'كيف تتواصل الأجهزة؟', time: '١٢ دقيقة', summary: 'تتبادل الأجهزة حزم بيانات عبر بروتوكولات تتفق على شكل الرسائل وطريقة إيصالها.', example: 'يشبه عنوان IP عنوان المنزل؛ يساعد الشبكة على معرفة الجهاز المقصود.', takeaway: 'كل اتصال رقمي يحتاج إلى عناوين وقواعد واضحة للتخاطب.' },
      { title: 'DNS وHTTPS ببساطة', time: '١٠ دقائق', summary: 'يحوّل DNS أسماء المواقع إلى عناوين، ويحمي HTTPS البيانات أثناء انتقالها.', example: 'علامة القفل تعني أن الاتصال مشفّر؛ لكنها لا تضمن أن الموقع نفسه جدير بالثقة.', takeaway: 'تحقق من اسم النطاق، حتى عندما ترى اتصالاً مشفّراً.' },
    ],
  },
  {
    id: 'passwords', title: 'حماية الحسابات', category: 'عادات رقمية أقوى', level: 'أساسي', icon: KeyRound, color: 'yellow',
    description: 'أنشئ كلمات مرور قوية واستخدم مديراً لها والمصادقة متعددة العوامل.',
    lessons: [
      { title: 'كلمات المرور ومديرها', time: '٧ دقائق', summary: 'كلمة المرور الطويلة والفريدة لكل حساب تمنع تسريب واحد من فتح بقية حساباتك.', example: 'استخدم مدير كلمات مرور موثوقاً لإنشاء كلمات فريدة، بدلاً من تدوير كلمة واحدة بين المواقع.', takeaway: 'الطول والتفرّد أهم من التغيير المتكرر دون سبب.' },
      { title: 'المصادقة متعددة العوامل', time: '٨ دقائق', summary: 'تضيف خطوة تحقق ثانية، مثل تطبيق مصادقة أو مفتاح أمان، بعد كلمة المرور.', example: 'حتى لو عُرفت كلمة المرور، لا يكفي ذلك لتسجيل الدخول من جهاز جديد.', takeaway: 'فعّل التحقق الإضافي خصوصاً للبريد والحسابات المالية.' },
    ],
  },
  {
    id: 'phishing', title: 'التصيد والهندسة الاجتماعية', category: 'تعلّم كيف تلاحظ الإشارات', level: 'أساسي', icon: Fingerprint, color: 'coral',
    description: 'اكتشف الرسائل المزيفة وأساليب الضغط قبل أن تنقر أو تشارك بياناتك.',
    lessons: [
      { title: 'علامات رسالة التصيد', time: '٩ دقائق', summary: 'يحاول المحتال تقليد جهة موثوقة ودفعك لاتخاذ قرار سريع أو كشف بياناتك.', example: 'رسالة تقول «سيُغلق حسابك خلال دقائق» وتطلب فتح رابط غير مألوف تستحق التوقف والتحقق.', takeaway: 'افحص عنوان المرسل والرابط، ولا تشارك رمز التحقق مع أحد.' },
      { title: 'تحقّق قبل أن تنقر', time: '٦ دقائق', summary: 'ارجع إلى الموقع أو التطبيق الرسمي عبر عنوان تعرفه بدلاً من اتباع رابط الرسالة.', example: 'إذا وصلك طلب من البنك، افتح تطبيق البنك بنفسك أو اتصل بالرقم الموجود على بطاقتك.', takeaway: 'التواصل عبر قناة مستقلة يكسر حيلة انتحال الشخصية.' },
    ],
  },
  {
    id: 'encryption', title: 'التشفير والخصوصية', category: 'بياناتك تبقى لك', level: 'متوسط', icon: LockKeyhole, color: 'violet',
    description: 'افهم التشفير والمفاتيح والنسخ الاحتياطية دون تعقيد رياضي.',
    lessons: [
      { title: 'فكرة التشفير', time: '١١ دقيقة', summary: 'يحوّل التشفير البيانات إلى صيغة لا يفهمها إلا من يملك مفتاح فكها المناسب.', example: 'هو أشبه برسالة داخل صندوق مقفل؛ يستطيع الناقل إيصالها دون قراءة محتواها.', takeaway: 'التشفير يحمي المحتوى، لكنه لا يمنع كل أنواع الخطر.' },
      { title: 'نسخك الاحتياطية', time: '٨ دقائق', summary: 'النسخ الاحتياطية المنتظمة تساعد على استعادة بياناتك بعد العطل أو الفقدان.', example: 'احتفظ بنسخة مشفّرة منفصلة عن الجهاز الأساسي، واختبر استعادتها من حين لآخر.', takeaway: 'النسخة التي لم تجرّب استعادتها ليست خطة مكتملة.' },
    ],
  },
  {
    id: 'web', title: 'أمن تطبيقات الويب', category: 'خطوتك إلى المسارات التقنية', level: 'متوسط', icon: Code2, color: 'ink',
    description: 'مفاهيم المصادقة والصلاحيات والتحقق من المدخلات، داخل بيئاتك المصرّح بها.',
    lessons: [
      { title: 'المصادقة والصلاحيات', time: '١٣ دقيقة', summary: 'تجيب المصادقة عن «من أنت؟» وتحدد الصلاحيات «ما الذي يحق لك فعله؟».', example: 'تسجيل الدخول يثبت الهوية؛ أما السماح بتعديل إعدادات الفوترة فيحتاج صلاحية مناسبة.', takeaway: 'امنح كل حساب أقل قدر من الصلاحيات اللازمة لمهمته.' },
      { title: 'التحقق من المدخلات', time: '١٠ دقائق', summary: 'يجب التحقق من البيانات عند حدود النظام وعدم الثقة بأي مدخل لمجرد أنه صادر من الواجهة.', example: 'يتحقق التطبيق من نوع الملف وحجمه على الخادم قبل قبوله، حتى لو تحققت الواجهة منه مسبقاً.', takeaway: 'أمن التطبيق مسؤولية تمتد من التصميم إلى الخادم.' },
    ],
  },
]

const quizQuestions = [
  { question: 'ما الفائدة الأهم من استخدام كلمة مرور مختلفة لكل حساب؟', choices: ['تسهيل تذكر كل كلمات المرور', 'منع اختراق بقية الحسابات عند تسرّب إحداها', 'تسريع الاتصال بالإنترنت', 'إخفاء عنوان البريد الإلكتروني'], correct: 1, explanation: 'كلمة المرور الفريدة تحصر أثر أي تسرّب في الحساب المتأثر فقط.' },
  { question: 'وصلتك رسالة عاجلة تطلب رمز التحقق. ما التصرف الأفضل؟', choices: ['إرسال الرمز للمرسل', 'الرد وطلب توضيح', 'عدم مشاركته والتحقق عبر القناة الرسمية', 'فتح كل الروابط في الرسالة'], correct: 2, explanation: 'رموز التحقق سرية. تواصل مباشرة عبر التطبيق أو القناة الرسمية المعروفة.' },
  { question: 'ماذا يعني ظهور HTTPS في عنوان الموقع؟', choices: ['أن الموقع خالٍ من الاحتيال', 'أن الاتصال بينك وبين الموقع مشفّر', 'أن كلمة مرورك قوية', 'أن الموقع تابع لجهة حكومية'], correct: 1, explanation: 'HTTPS يحمي الاتصال، لكنه لا يثبت أن الجهة صاحبة الموقع موثوقة.' },
  { question: 'ما مبدأ أقل الصلاحيات؟', choices: ['إعطاء كل مستخدم صلاحية المدير', 'منح الصلاحيات اللازمة للمهمة فقط', 'تعطيل كل الحسابات', 'مشاركة حساب واحد بين الجميع'], correct: 1, explanation: 'تحديد الصلاحيات الضرورية يقلل الضرر إذا أسيء استخدام حساب أو تعرض للاختراق.' },
  { question: 'كيف تتحقق بأمان من رسالة مشبوهة تدّعي أنها من البنك؟', choices: ['الضغط على الرابط للتأكد', 'إعادة إرسالها لأصدقائك', 'فتح التطبيق الرسمي أو الاتصال بالرقم المعروف', 'تنزيل المرفق أولاً'], correct: 2, explanation: 'القناة المستقلة المعروفة تساعد على التأكد دون الاعتماد على روابط المرسل.' },
]

const navigation = [
  { id: 'home', label: 'الرئيسية', icon: House },
  { id: 'quiz', label: 'اختبر نفسك', icon: CircleHelp },
  { id: 'progress', label: 'إنجازاتي', icon: Trophy },
]

const loadProgress = () => {
  try {
    return JSON.parse(localStorage.getItem('waei-progress')) || { lessons: {}, quizBest: 0, quizzesCompleted: 0 }
  } catch {
    return { lessons: {}, quizBest: 0, quizzesCompleted: 0 }
  }
}

function App() {
  const [view, setView] = useState('home')
  const [progress, setProgress] = useState(loadProgress)
  const [courseId, setCourseId] = useState(courses[0].id)
  const [lessonIndex, setLessonIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizResult, setQuizResult] = useState(null)

  const completedLessons = Object.keys(progress.lessons).filter((key) => progress.lessons[key]).length
  const totalLessons = courses.reduce((total, course) => total + course.lessons.length, 0)
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)
  const activeCourse = courses.find((course) => course.id === courseId) || courses[0]
  const activeLesson = activeCourse.lessons[lessonIndex]
  const currentQuestion = quizQuestions[questionIndex]

  function updateProgress(next) {
    setProgress(next)
    localStorage.setItem('waei-progress', JSON.stringify(next))
  }

  function goTo(nextView) {
    setView(nextView)
    if (nextView === 'quiz') resetQuiz()
  }

  function openLesson(course, index = 0) {
    setCourseId(course.id)
    setLessonIndex(index)
    setView('lesson')
  }

  function markLessonComplete() {
    const lessonKey = `${activeCourse.id}-${lessonIndex}`
    updateProgress({ ...progress, lessons: { ...progress.lessons, [lessonKey]: true } })
  }

  function resetQuiz() {
    setQuestionIndex(0)
    setSelectedAnswer(null)
    setQuizScore(0)
    setQuizResult(null)
  }

  function finishQuiz(score) {
    setQuizResult(score)
    updateProgress({ ...progress, quizBest: Math.max(progress.quizBest, score), quizzesCompleted: progress.quizzesCompleted + 1 })
  }

  function nextQuestion() {
    if (selectedAnswer === currentQuestion.correct) setQuizScore((score) => score + 1)
    const finalScore = quizScore + (selectedAnswer === currentQuestion.correct ? 1 : 0)
    if (questionIndex === quizQuestions.length - 1) {
      finishQuiz(finalScore)
      return
    }
    setQuestionIndex((index) => index + 1)
    setSelectedAnswer(null)
  }

  const viewTitle = navigation.find((item) => item.id === view)?.label || (view === 'lesson' ? 'تفاصيل الدرس' : 'نتيجة الاختبار')

  return (
    <div className="app-shell" dir="rtl">
      <aside className="sidebar">
        <button type="button" className="brand" onClick={() => goTo('home')} aria-label="العودة للرئيسية">
          <span className="brand-mark"><Shield size={22} strokeWidth={2.2} /></span>
          <span className="brand-word">وَعْي<span>.</span><small>أكاديمية الأمن الرقمي</small></span>
        </button>
        <div className="sidebar-label">مساحة التعلّم</div>
        <nav className="side-nav" aria-label="التنقل الرئيسي">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button type="button" className={`nav-link ${view === id || (id === 'courses' && view === 'lesson') || (id === 'quiz' && view === 'quiz-result') ? 'active' : ''}`} onClick={() => goTo(id)} key={id}>
              <Icon size={19} strokeWidth={1.8} /><span>{label}</span>
              {id === 'courses' && <span className="nav-count">{courses.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-promo"><div className="promo-icon"><Sparkles size={17} /></div><strong>خطوة اليوم تصنع فرقاً</strong><p>درس صغير الآن، ووعي أكبر كل يوم.</p><button type="button" className="promo-link" onClick={() => openLesson(courses[0])}>ابدأ التعلّم <ArrowLeft size={15} /></button></div>
        <div className="sidebar-footer"><span className="online-dot" /> محتوى تعليمي آمن وأخلاقي</div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb"><span>مساحة التعلّم</span><ChevronLeft size={15} /><strong>{viewTitle}</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Search size={17} /><input aria-label="ابحث عن مسار" placeholder="ابحث عن مسار..." value={search} onFocus={() => setView('courses')} onChange={(event) => { setSearch(event.target.value); setView('courses') }} />{search && <button type="button" aria-label="مسح البحث" onClick={() => setSearch('')}><X size={15} /></button>}</label>
            <a className="apk-download" href={`${import.meta.env.BASE_URL}downloads/waei-cyber-learning.apk`} download="waei-cyber-learning.apk" aria-label="تحميل تطبيق وَعْي لنظام Android"><Download size={16} /><span>تنزيل APK</span></a>
            <div className="profile-avatar" aria-label="ملف المتعلّم">م</div>
          </div>
        </header>

        <main className="page-content">
          {view === 'home' && <HomeView courses={courses} progress={progress} completedLessons={completedLessons} overallProgress={overallProgress} onOpenLesson={openLesson} onNavigate={goTo} />}
          {view === 'courses' && <CoursesView courses={courses} search={search} progress={progress} onOpenLesson={openLesson} />}
          {view === 'lesson' && <LessonView course={activeCourse} lesson={activeLesson} lessonIndex={lessonIndex} completed={Boolean(progress.lessons[`${activeCourse.id}-${lessonIndex}`])} onBack={() => setView('courses')} onComplete={markLessonComplete} onSelectLesson={setLessonIndex} onNext={() => setLessonIndex((index) => (index + 1) % activeCourse.lessons.length)} />}
          {view === 'quiz' && quizResult === null && <QuizView question={currentQuestion} questionIndex={questionIndex} selectedAnswer={selectedAnswer} onSelect={setSelectedAnswer} onNext={nextQuestion} onExit={() => setView('home')} />}
          {view === 'quiz' && quizResult !== null && <QuizResult score={quizResult} onRetry={() => { resetQuiz(); setView('quiz') }} onBrowse={() => goTo('courses')} />}
          {view === 'progress' && <ProgressView courses={courses} progress={progress} completedLessons={completedLessons} overallProgress={overallProgress} onOpenLesson={openLesson} onQuiz={() => goTo('quiz')} />}
        </main>
        <footer className="page-footer"><span>تعلّم بمسؤولية. احمِ نفسك، واحترم خصوصية الآخرين.</span><span>وَعْي © ٢٠٢٦</span></footer>
      </div>
      <nav className="mobile-nav" aria-label="التنقل الرئيسي">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button type="button" className={`nav-link ${view === id || (id === 'courses' && view === 'lesson') ? 'active' : ''}`} onClick={() => goTo(id)} key={id}>
            <Icon size={19} strokeWidth={1.8} /><span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function HomeView({ courses: allCourses, progress, completedLessons, overallProgress, onOpenLesson, onNavigate }) {
  const nextCourse = allCourses.find((course) => course.lessons.some((_, index) => !progress.lessons[`${course.id}-${index}`])) || allCourses[0]
  const nextIndex = nextCourse.lessons.findIndex((_, index) => !progress.lessons[`${nextCourse.id}-${index}`])
  return <div className="home-view page-enter">
    <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line" /> رحلتك الرقمية تبدأ هنا</div><h1>مرحباً بك في <span>وَعْي</span></h1><p>مساحة آمنة تتعلّم فيها حماية نفسك وفهم العالم الرقمي، خطوة بخطوة.</p></div><div className="welcome-date"><span className="date-icon"><Compass size={17} /></span><span>تعلّم على مهل،<br /><strong>وتقدّم بثبات</strong></span></div></section>
    <section className="hero-panel"><div className="hero-copy"><div className="hero-kicker"><span /> مسارك يبدأ من الأساس</div><h2>الأمن السيبراني<br />أبسط مما تتخيّل.</h2><p>مفاهيم واضحة، أمثلة من حياتك اليومية، واختبارات قصيرة تثبّت كل خطوة.</p><button type="button" className="primary-button" onClick={() => onOpenLesson(nextCourse, Math.max(0, nextIndex))}>تابع التعلّم <ArrowLeft size={17} /></button><div className="hero-proof"><span><CheckCircle2 size={15} /> مناسب للمبتدئين</span><span><Clock3 size={15} /> دروس قصيرة وعملية</span></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-outer" /><div className="orbit orbit-inner" /><div className="orbit-center"><ShieldCheck size={48} strokeWidth={1.35} /></div><span className="orbit-tag orbit-tag-top"><LockKeyhole size={15} /></span><span className="orbit-tag orbit-tag-bottom"><Check size={15} /></span><div className="art-caption"><span>مستوى الحماية</span><strong>يرتفع بالمعرفة <ArrowUpLeft size={14} /></strong></div></div><div className="hero-index">٠١ <span>/</span> ٠٦</div></section>
    <section className="stats-grid" aria-label="ملخص تقدمك"><StatCard icon={BookOpen} label="الدروس المكتملة" value={`${completedLessons} / ${allCourses.reduce((sum, course) => sum + course.lessons.length, 0)}`} detail="درساً في مساراتك" color="green" /><StatCard icon={Target} label="تقدّمك الكلّي" value={`${overallProgress}٪`} detail="من رحلتك التعليمية" color="blue" /><StatCard icon={Flame} label="أفضل نتيجة" value={`${progress.quizBest || 0} / ${quizQuestions.length}`} detail="في الاختبارات القصيرة" color="orange" /><StatCard icon={Award} label="اختبارات مكتملة" value={progress.quizzesCompleted || 0} detail="اختبر معلوماتك" color="purple" /></section>
    <section className="section-block"><div className="section-heading"><div><div className="eyebrow small-eyebrow">تعلّم بالترتيب الذي يناسبك</div><h2>مسارات التعلّم</h2></div><button type="button" className="text-link" onClick={() => onNavigate('courses')}>كل المسارات <ArrowLeft size={16} /></button></div><div className="course-grid home-course-grid">{allCourses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} progress={progress} onOpenLesson={onOpenLesson} />)}</div></section>
    <section className="bottom-row"><button type="button" className="daily-card" onClick={() => onOpenLesson(nextCourse, Math.max(0, nextIndex))}><span className="daily-icon"><GraduationCap size={22} /></span><span className="daily-copy"><span className="daily-label">الخطوة التالية</span><strong>{nextCourse.lessons[Math.max(0, nextIndex)].title}</strong><small>{nextCourse.title} · {nextCourse.lessons[Math.max(0, nextIndex)].time}</small></span><span className="daily-arrow"><ArrowLeft size={18} /></span></button><button type="button" className="quiz-promo" onClick={() => onNavigate('quiz')}><span className="quiz-promo-icon"><FileCheck2 size={21} /></span><span><strong>اختبر معلوماتك</strong><small>٥ أسئلة قصيرة، وتعرّف على مستواك</small></span><ChevronLeft size={18} /></button></section>
  </div>
}

function StatCard({ icon: Icon, label, value, detail, color }) {
  return <article className="stat-card"><span className={`stat-icon ${color}`}><Icon size={18} strokeWidth={1.9} /></span><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><span className="stat-detail">{detail}</span></article>
}

function CourseCard({ course, progress, onOpenLesson }) {
  const Icon = course.icon
  const completed = course.lessons.filter((_, index) => progress.lessons[`${course.id}-${index}`]).length
  const percent = Math.round((completed / course.lessons.length) * 100)
  return <article className="course-card"><div className="course-card-top"><span className={`course-icon ${course.color}`}><Icon size={21} strokeWidth={1.7} /></span><span className={`level-badge ${course.level === 'متوسط' ? 'level-intermediate' : ''}`}>{course.level}</span></div><span className="course-category">{course.category}</span><h3>{course.title}</h3><p>{course.description}</p><div className="course-meta"><span><BookOpen size={14} /> {course.lessons.length} دروس</span><span><Clock3 size={14} /> {course.lessons.length * 9} دقيقة</span></div><div className="course-progress-row"><div className="progress-track"><span style={{ width: `${percent}%` }} /></div><span>{percent}٪</span></div><button type="button" className="course-action" onClick={() => { const next = course.lessons.findIndex((_, index) => !progress.lessons[`${course.id}-${index}`]); onOpenLesson(course, Math.max(0, next)) }}>{completed ? 'تابع المسار' : 'استكشف المسار'} <ArrowLeft size={15} /></button></article>
}

function CoursesView({ courses: allCourses, search, progress, onOpenLesson }) {
  const filtered = allCourses.filter((course) => `${course.title} ${course.category} ${course.description}`.includes(search.trim()))
  return <div className="page-enter"><div className="page-intro"><div><div className="eyebrow small-eyebrow">مكتبة المعرفة</div><h1>مسارات التعلّم</h1><p>ابدأ من الأساس، واختر الموضوع الذي يثير فضولك.</p></div><span className="intro-count">{filtered.length} مسارات</span></div>{filtered.length ? <div className="course-grid all-course-grid">{filtered.map((course) => <CourseCard key={course.id} course={course} progress={progress} onOpenLesson={onOpenLesson} />)}</div> : <div className="empty-state"><Search size={25} /><strong>ما وجدنا هذا المسار</strong><span>جرّب كلمة أخرى أو تصفّح جميع المسارات.</span></div>}<div className="ethics-note"><ShieldCheck size={19} /><span><strong>التعلّم هنا مسؤول.</strong> نستخدم أمثلة آمنة للتوعية والدفاع، وعلى الأنظمة التي تملكها أو لديك إذن صريح لاختبارها فقط.</span></div></div>
}

function LessonView({ course, lesson, lessonIndex, completed, onBack, onComplete, onSelectLesson, onNext }) {
  const Icon = course.icon
  return <div className="lesson-view page-enter"><button type="button" className="back-link" onClick={onBack}><ArrowRight size={16} /> العودة إلى المسارات</button><div className="lesson-layout"><article className="lesson-main"><div className="lesson-badges"><span className={`course-icon ${course.color}`}><Icon size={19} /></span><span>{course.title}</span><span className="badge-separator">·</span><span>{course.level}</span></div><div className="lesson-count">الدرس {lessonIndex + 1} من {course.lessons.length} <span /> {lesson.time}</div><h1>{lesson.title}</h1><p className="lesson-summary">{lesson.summary}</p><div className="lesson-content"><section className="lesson-example"><div className="example-heading"><span><Sparkles size={17} /></span><strong>مثال من الحياة اليومية</strong></div><p>{lesson.example}</p></section><section className="takeaway-box"><span><CheckCircle2 size={18} /></span><div><strong>خلاصة الدرس</strong><p>{lesson.takeaway}</p></div></section><div className="lesson-ethics"><ShieldCheck size={16} /><span>تعلّم للدفاع والحماية. لا تختبر أنظمة أو حسابات لا تملكها.</span></div></div><div className="lesson-actions"><button type="button" className={`primary-button ${completed ? 'completed-button' : ''}`} onClick={() => { onComplete(); onNext() }}>{completed ? <><Check size={17} /> مكتمل، إلى الدرس التالي</> : <>أنهيت هذا الدرس <CheckCircle2 size={17} /></>}</button><span>{lessonIndex + 1} من {course.lessons.length} دروس</span></div></article><aside className="lesson-sidebar"><div className="lesson-sidebar-heading"><div><span className="eyebrow small-eyebrow">محتوى المسار</span><h2>{course.title}</h2></div><span className="lesson-total">{course.lessons.length}</span></div><div className="lesson-list">{course.lessons.map((item, index) => <button type="button" className={`lesson-list-item ${index === lessonIndex ? 'selected' : ''}`} onClick={() => onSelectLesson(index)} key={item.title}><span className="lesson-status">{index < lessonIndex || (index === lessonIndex && completed) ? <Check size={14} /> : String(index + 1).padStart(2, '0')}</span><span><strong>{item.title}</strong><small><Clock3 size={12} /> {item.time}</small></span>{index === lessonIndex && <ChevronLeft size={15} />}</button>)}</div><div className="lesson-resource"><Globe2 size={17} /><span><strong>للتوسّع</strong><small>راجع إرشادات التوعية الأمنية من جهة موثوقة.</small></span></div></aside></div></div>
}

function QuizView({ question, questionIndex, selectedAnswer, onSelect, onNext, onExit }) {
  return <div className="quiz-view page-enter"><div className="quiz-topline"><button type="button" className="back-link" onClick={onExit}><ArrowRight size={16} /> خروج</button><span><CircleHelp size={16} /> اختبار أساسيات الأمن</span></div><div className="quiz-card"><div className="quiz-progress-info"><span>السؤال <strong>{questionIndex + 1}</strong> من {quizQuestions.length}</span><span>{Math.round(((questionIndex + 1) / quizQuestions.length) * 100)}٪</span></div><div className="quiz-progress-track"><span style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }} /></div><span className="quiz-topic"><Target size={14} /> مفاهيم أساسية</span><h1>{question.question}</h1><div className="answer-list">{question.choices.map((choice, index) => { const isSelected = selectedAnswer === index; const showCorrect = selectedAnswer !== null && index === question.correct; const showWrong = isSelected && index !== question.correct; return <button type="button" className={`answer-option ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`} onClick={() => onSelect(index)} key={choice}><span className="answer-letter">{'أبجد'[index]}</span><span>{choice}</span>{showCorrect && <CheckCircle2 size={18} />}{showWrong && <X size={18} />}</button> })}</div>{selectedAnswer !== null && <div className={`answer-feedback ${selectedAnswer === question.correct ? 'feedback-correct' : 'feedback-wrong'}`}><strong>{selectedAnswer === question.correct ? 'إجابة صحيحة' : 'ليست الإجابة الصحيحة'}</strong><span>{question.explanation}</span></div>}<div className="quiz-footer"><span><LockKeyhole size={14} /> تعلّم بلا ضغط، تقدّمك محفوظ على جهازك</span><button type="button" className="primary-button" disabled={selectedAnswer === null} onClick={onNext}>{questionIndex === quizQuestions.length - 1 ? 'عرض النتيجة' : 'السؤال التالي'} <ArrowLeft size={16} /></button></div></div><p className="quiz-footnote">الأسئلة للتوعية العامة ولا تغني عن التحقق من الإرشادات الرسمية.</p></div>
}

function QuizResult({ score, onRetry, onBrowse }) {
  const passed = score >= 4
  return <div className="result-wrap page-enter"><div className="result-card"><span className={`result-medal ${passed ? 'result-passed' : ''}`}>{passed ? <Trophy size={34} /> : <Target size={34} />}</span><span className="eyebrow small-eyebrow">اكتمل الاختبار</span><h1>{passed ? 'أداء رائع!' : 'كل محاولة تعلّم جديد'}</h1><p>{passed ? 'واضح أنك تنتبه للتفاصيل التي تصنع فرقاً.' : 'راجع المسارات، ثم جرّب مرة ثانية عندما تكون مستعداً.'}</p><div className="result-score"><strong>{score}</strong><span>/ {quizQuestions.length}<small>إجابات صحيحة</small></span></div><div className="result-actions"><button type="button" className="primary-button" onClick={onRetry}>أعد الاختبار <ArrowLeft size={16} /></button><button type="button" className="secondary-button" onClick={onBrowse}>تصفّح المسارات <BookOpen size={16} /></button></div></div></div>
}

function ProgressView({ courses: allCourses, progress, completedLessons, overallProgress, onOpenLesson, onQuiz }) {
  return <div className="progress-view page-enter"><div className="page-intro"><div><div className="eyebrow small-eyebrow">كل خطوة تُحسب</div><h1>إنجازاتك</h1><p>تقدّمك محفوظ على هذا الجهاز، ويمكنك مواصلة رحلتك وقتما تشاء.</p></div><span className="intro-count"><Trophy size={16} /> متعلّم مستمر</span></div><section className="progress-overview"><div className="progress-ring" style={{ '--progress': `${overallProgress * 3.6}deg` }}><div><strong>{overallProgress}<small>٪</small></strong><span>منجَز</span></div></div><div className="progress-copy"><span className="eyebrow small-eyebrow">رحلتك التعليمية</span><h2>{overallProgress ? 'تقدّم جميل، واصل!' : 'رحلتك تبدأ من هنا'}</h2><p>أنهيت {completedLessons} من {allCourses.reduce((sum, course) => sum + course.lessons.length, 0)} درساً. كل مفهوم جديد يجعل حضورك الرقمي أكثر أماناً.</p><button type="button" className="primary-button" onClick={() => { const course = allCourses.find((item) => item.lessons.some((_, index) => !progress.lessons[`${item.id}-${index}`])) || allCourses[0]; onOpenLesson(course) }}>تابع من حيث توقفت <ArrowLeft size={16} /></button></div><div className="progress-decoration"><Award size={92} strokeWidth={0.8} /></div></section><div className="section-heading progress-section-heading"><div><div className="eyebrow small-eyebrow">تفصيل المسارات</div><h2>مستواك في كل موضوع</h2></div><button type="button" className="text-link" onClick={onQuiz}>اختبر معلوماتك <ArrowLeft size={16} /></button></div><div className="progress-course-list">{allCourses.map((course) => { const Icon = course.icon; const done = course.lessons.filter((_, index) => progress.lessons[`${course.id}-${index}`]).length; const percent = Math.round((done / course.lessons.length) * 100); return <button type="button" className="progress-course-row" onClick={() => onOpenLesson(course)} key={course.id}><span className={`course-icon ${course.color}`}><Icon size={19} /></span><span className="progress-course-name"><strong>{course.title}</strong><small>{done} من {course.lessons.length} دروس</small></span><span className="progress-row-bar"><span style={{ width: `${percent}%` }} /></span><strong className="progress-percent">{percent}٪</strong><ChevronLeft size={16} /></button> })}</div></div>
}

export default App
